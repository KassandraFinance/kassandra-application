import React from 'react'
import Link from 'next/link'
import CopyToClipboard from 'react-copy-to-clipboard'
import Blockies from 'react-blockies'
import Big from 'big.js'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { TokenType, setLiquidity } from '@/store/reducers/poolCreationSlice'
import { ParaSwap } from '@/services/ParaSwap'
import { useTokensData } from '@/hooks/query/useTokensData'

import substr from '@/utils/substr'
import { BNtoDecimal } from '@/utils/numerals'

import { ToastInfo } from '@/components/Toastify/toast'
import FeeBreakdown from '../../ConfigureFee/FeeBreakdown'
import ModalViewCoinMobile from '@/components/Modals/ModalViewCoinMobile'

import * as S from './styles'

export type ITokenModalProps = {
  icon: string
  name: string
  tokenData: {
    name: string
    value: string
  }[]
}

const PoolReview = () => {
  const [viewColumnInTable, setViewColumnInTable] = React.useState(1)
  const [isOpenModal, setisOpenModal] = React.useState(false)
  const [tokenForModal, setTokenForModal] = React.useState<ITokenModalProps>()
  const [initialPrice, setInitialPrice] = React.useState(Big('0'))
  const [totalLiquidity, setTotalLiquidity] = React.useState(Big('0'))

  const dispatch = useAppDispatch()
  const poolData = useAppSelector(state => state.poolCreation.createPoolData)

  const tokensList = poolData.tokens ? poolData.tokens : []
  let addressesList: string[] = []
  for (const token of tokensList) {
    addressesList = [...addressesList, token.address]
  }

  const { data } = useTokensData({
    chainId: poolData?.networkId || 137,
    tokenAddresses: addressesList
  })

  function handleCurrentViewTable(method: string, value: number) {
    if (method === 'next') {
      setViewColumnInTable(value === 3 ? 1 : viewColumnInTable + 1)
    } else {
      setViewColumnInTable(value === 1 ? 3 : viewColumnInTable - 1)
    }
  }

  function handleClickViewCoin(item: TokenType, address: string) {
    const { allocation, amount, icon, name } = item
    const priceList = data ? data : {}

    setisOpenModal(true)
    setTokenForModal({
      name,
      icon,
      tokenData: [
        {
          name: 'Allocation',
          value: allocation.toString()
        },
        {
          name: 'Amount',
          value: BNtoDecimal(Big(amount), 2)
        },
        {
          name: 'Amount (USD)',
          value: BNtoDecimal(Big(amount).mul(Big(priceList[address].usd)), 2)
        }
      ]
    })
  }

  function getTotalLiquidity() {
    const priceArr = data ? data : {}
    let total = Big(0)
    for (const coin of tokensList) {
      total = total.add(
        Big(coin.amount).mul(
          Big(priceArr[coin.address.toLowerCase()]?.usd ?? 0)
        )
      )
    }
    return total
  }

  function getInitialPrice() {
    let invariant = Big(0)
    const numberOfTokens = poolData.tokens ? poolData.tokens?.length : 0
    const initialLiquidity = getTotalLiquidity()

    for (const token of tokensList) {
      const weight = Number(token.allocation) / 100
      const amountPowWeight = Big(token.amount).toNumber() ** weight

      if (invariant.lte(0)) {
        invariant = invariant.add(amountPowWeight)
      } else {
        invariant = invariant.mul(amountPowWeight)
      }
    }

    const price = initialLiquidity.div(invariant.mul(numberOfTokens))

    return price
  }

  async function getTokensAmountOut() {
    const swapProvider = new ParaSwap()
    const amount = poolData.tokenInAmount

    const amounts = await swapProvider.getAmountsOut({
      chainId: poolData.networkId?.toString() ?? '137',
      srcToken: [
        {
          id: poolData.tokenIn.address,
          decimals: poolData.tokenIn.decimals || 18
        }
      ],
      destToken: tokensList.map(token => {
        return {
          id: token.address,
          decimals: token.decimals,
          amount: Big(amount).mul(token.allocation).toFixed(0)
        }
      })
    })

    // const amounts = await swapProvider.getAmountsOut({
    //   amount,
    //   chainId: poolData.networkId?.toString() ?? '137',
    //   destTokens: tokensList.map(token => ({
    //     token: {
    //       id: token.address,
    //       decimals: token.decimals
    //     },
    //     weight_normalized: Big(token.allocation).div(100).toString()
    //   })),
    //   srcDecimals: poolData.tokenIn.decimals?.toString() || '18',
    //   srcToken: poolData.tokenIn.address
    // })

    for (let i = 0; i < amounts.amountsToken.length; i++) {
      dispatch(
        setLiquidity({
          token: tokensList[i].symbol,
          liquidity: Big(amounts.amountsToken[i])
            .div(Big(10).pow(tokensList[i].decimals))
            .toFixed(),
          tokenPriceList: data ?? {}
        })
      )
    }
    return amounts
  }

  React.useEffect(() => {
    if (!data) return
    if (poolData.methodCreate === 'any-asset') {
      getTokensAmountOut()
    } else {
      setInitialPrice(getInitialPrice())
      setTotalLiquidity(getTotalLiquidity())
    }
  }, [data])

  React.useEffect(() => {
    if (!poolData.tokens) return
    for (let i = 0; i < poolData.tokens?.length; i++) {
      if (Big(poolData.tokens[i].amount).lte(0)) return
    }
    if (poolData.methodCreate === 'any-asset') {
      setInitialPrice(getInitialPrice())
      setTotalLiquidity(getTotalLiquidity())
    }
  }, [poolData.tokens])

  return (
    <S.PoolReview>
      <S.PoolReviewContainer>
        <S.PoolReviewHeader>
          <S.PoolNameContainer>
            <S.ImageWrapper>
              {poolData.icon?.image_preview ? (
                <img
                  src={poolData.icon?.image_preview}
                  alt=""
                  width={64}
                  height={64}
                />
              ) : (
                <Blockies size={8} scale={9} seed={poolData.poolName ?? ''} />
              )}
            </S.ImageWrapper>
            <S.PoolNameContent>
              <p>{poolData.poolName}</p>
              <span>{poolData.poolSymbol}</span>
            </S.PoolNameContent>
          </S.PoolNameContainer>
          <S.PoolValueContent>
            <span>~${data ? BNtoDecimal(initialPrice, 2) : 0}</span>
            <p>INITIAL PRICE</p>
          </S.PoolValueContent>
        </S.PoolReviewHeader>
        <hr />

        <S.ReviewTable>
          <S.ReviewThead>
            <S.ReviewTh>Assets</S.ReviewTh>
            <S.ReviewTh isView={viewColumnInTable === 1}>Allocation</S.ReviewTh>
            <S.ReviewTh isView={viewColumnInTable === 2}>Amount</S.ReviewTh>
            <S.ReviewTh isView={viewColumnInTable === 3}>
              Amount (USD)
            </S.ReviewTh>
            <S.ReviewThImg>
              <span
                onClick={() =>
                  handleCurrentViewTable('back', viewColumnInTable)
                }
              >
                <img
                  src="/assets/utilities/arrow-left.svg"
                  alt=""
                  width={7}
                  height={12}
                />
              </span>
              <span
                onClick={() =>
                  handleCurrentViewTable('next', viewColumnInTable)
                }
              >
                <img
                  src="/assets/utilities/arrow-left.svg"
                  alt=""
                  width={7}
                  height={12}
                  id="arrow-right"
                />
              </span>
            </S.ReviewThImg>
          </S.ReviewThead>
          <S.ReviewTbody>
            {poolData.tokens?.map((token, index) => {
              return (
                <S.ReviewTr key={token.allocation + index}>
                  <S.ReviewTd>
                    <img src={token.icon} alt="" width={18} height={18} />
                    {token.name}
                  </S.ReviewTd>
                  <S.ReviewTd isView={viewColumnInTable === 1}>
                    {token.allocation}%
                  </S.ReviewTd>
                  <S.ReviewTd isView={viewColumnInTable === 2}>
                    {BNtoDecimal(Big(token.amount), 3)}
                  </S.ReviewTd>
                  <S.ReviewTd isView={viewColumnInTable === 3}>
                    $
                    {data
                      ? BNtoDecimal(
                          Big(token.amount).mul(
                            Big(data[token.address.toLowerCase()]?.usd ?? 0)
                          ),
                          2
                        )
                      : 0}
                  </S.ReviewTd>
                  <S.ReviewTd
                    id="eyeIcon"
                    onClick={() => handleClickViewCoin(token, token.address)}
                  >
                    <img
                      src="/assets/utilities/eye-show.svg"
                      alt=""
                      width={20}
                      height={20}
                    />
                  </S.ReviewTd>
                </S.ReviewTr>
              )
            })}
          </S.ReviewTbody>
        </S.ReviewTable>

        <hr />
        <S.TvlContainer>
          <span>
            TVL{' '}
            <img
              src="/assets/utilities/tooltip.svg"
              alt=""
              width={20}
              height={20}
            />
          </span>
          <p>${data ? BNtoDecimal(totalLiquidity, 2) : 0}</p>
        </S.TvlContainer>
      </S.PoolReviewContainer>

      <S.WrapperPoolPrivacy>
        <S.PoolPrivacyLine>
          <p>Privacy</p>
          <span>{poolData.privacy}</span>
        </S.PoolPrivacyLine>
        {poolData.privacy === 'private' && (
          <S.WrapperPoolPrivate>
            {poolData.privateAddressList &&
              poolData?.privateAddressList?.length > 0 && (
                <p>addresses that can invest</p>
              )}
            <S.PrivateAddressList>
              {poolData.privateAddressList?.map((wallet, index) => {
                return (
                  <S.PrivateAddress
                    key={wallet.address}
                    hasBorder={Number.isInteger(index / 2)}
                  >
                    <p>{substr(wallet.address)}</p>
                    <S.WrapperAddressImages>
                      <span onClick={() => ToastInfo('Address copied')}>
                        <CopyToClipboard text={wallet.address}>
                          <svg
                            width="14"
                            height="15"
                            viewBox="0 0 12 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.00068 12.3334H1.16735C1.01269 12.3387 0.858581 12.3122 0.714603 12.2555C0.570625 12.1988 0.439858 12.113 0.330432 12.0036C0.221007 11.8942 0.135264 11.7634 0.0785358 11.6194C0.0218072 11.4755 -0.00469379 11.3214 0.000680608 11.1667L0.000680608 5.33336C-0.00469379 5.17871 0.0218072 5.0246 0.0785358 4.88062C0.135264 4.73664 0.221007 4.60587 0.330432 4.49645C0.439858 4.38702 0.570625 4.30128 0.714603 4.24455C0.858581 4.18782 1.01269 4.16132 1.16735 4.1667H3.50068V1.83336C3.49531 1.67871 3.52181 1.5246 3.57854 1.38062C3.63526 1.23664 3.72101 1.10587 3.83043 0.996448C3.93986 0.887023 4.07063 0.80128 4.2146 0.744551C4.35858 0.687823 4.51269 0.661322 4.66735 0.666696L10.5007 0.666696C10.6553 0.661322 10.8094 0.687823 10.9534 0.744551C11.0974 0.80128 11.2282 0.887023 11.3376 0.996448C11.447 1.10587 11.5328 1.23664 11.5895 1.38062C11.6462 1.5246 11.6727 1.67871 11.6673 1.83336V7.6667C11.6726 7.82133 11.6461 7.9754 11.5893 8.11934C11.5326 8.26328 11.4468 8.39401 11.3374 8.50342C11.228 8.61283 11.0973 8.69857 10.9533 8.75533C10.8094 8.81209 10.6553 8.83865 10.5007 8.83336H8.16735V11.1667C8.17264 11.3213 8.14608 11.4754 8.08932 11.6193C8.03256 11.7633 7.94681 11.894 7.8374 12.0034C7.728 12.1128 7.59726 12.1986 7.45333 12.2553C7.30939 12.3121 7.15532 12.3387 7.00068 12.3334ZM1.16735 5.33336V11.1667H7.00068V8.83336H4.66735C4.51271 8.83865 4.35864 8.81209 4.2147 8.75533C4.07076 8.69857 3.94003 8.61283 3.83062 8.50342C3.72122 8.39401 3.63547 8.26328 3.57871 8.11934C3.52195 7.9754 3.49539 7.82133 3.50068 7.6667V5.33336H1.16735ZM4.66735 1.83336V7.6667H10.5007V1.83336H4.66735Z"
                              fill="#ffffff"
                            />
                          </svg>
                        </CopyToClipboard>
                      </span>
                      <Link
                        href={`https://polygonscan.com/address/${wallet.address}`}
                        passHref
                      >
                        <a target="_blank">
                          <img
                            src="/assets/utilities/external-link.svg"
                            alt="Follow our Twitter feed"
                            width={18}
                            height={18}
                          />
                        </a>
                      </Link>
                    </S.WrapperAddressImages>
                  </S.PrivateAddress>
                )
              })}
            </S.PrivateAddressList>
          </S.WrapperPoolPrivate>
        )}
      </S.WrapperPoolPrivacy>

      <FeeBreakdown />

      {isOpenModal && (
        <ModalViewCoinMobile
          modalOpen={isOpenModal}
          setModalOpen={setisOpenModal}
          tokenForModal={tokenForModal}
        />
      )}
    </S.PoolReview>
  )
}

export default PoolReview
