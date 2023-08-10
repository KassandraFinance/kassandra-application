import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Big from 'big.js'

import { BNtoDecimal } from '../../../utils/numerals'

import useMatomoEcommerce from '../../../hooks/useMatomoEcommerce'
import useYieldYakEthers from '../../../hooks/useYieldYakEthers'
import { usePoolData } from '@/hooks/query/usePoolData'
import { useTokensData } from '@/hooks/query/useTokensData'

import { YIELDYAK_API } from '../../../constants/tokenAddresses'

import ModalViewCoin from '@/components/Modals/ModalViewCoin'

import none from '../../../../public/assets/icons/coming-soon.svg'
import iconBar from '../../../../public/assets/iconGradient/product-bar.svg'
import arrowIcon from '@assets/utilities/arrow-left.svg'
import eyeShowIcon from '@assets/utilities/eye-show.svg'

import * as S from './styles'
import {
  THead,
  TH,
  ColumnTitle,
  TableViewButtonContainer,
  TableViewButton,
  TD,
  ValueWrapper,
  Value,
  ViewButton,
  SecondaryTextValue,
  TRHead,
  TBody
} from '@/templates/Explore/CommunityPoolsTable/styles'
import {
  TableLine,
  TableLineTitle,
  ValueContainer,
  Value as V,
  SecondaryValue
} from '@ui/Modals/ModalViewCoin/styles'

const Distribution = () => {
  const [infoDataYY, setinfoDataYY] = React.useState<{
    [key: string]: { apy: number }
  }>()
  const [balanceYY, setBalanceYY] = React.useState<{
    [key: string]: Big
  }>()
  const [yieldYakFarm, setYieldYakFarm] = React.useState<
    { address: string; platform: string }[]
  >([])
  const [inViewCollum, setInViewCollum] = React.useState(1)
  const [isOpen, setIsOpen] = React.useState(false)
  const [tokenData, setTokenData] = React.useState({
    logo: '',
    name: '',
    address: ''
  })
  const [tokenMobile, setTokenMobile] = React.useState({
    allocation: '',
    holdingValue: '0',
    holdingAmount: '0',
    price: '0',
    change: 0,
    yield: 'no Yield',
    id: ''
  })

  const { convertBalanceYRTtoWrap } = useYieldYakEthers()
  const { trackEventFunction } = useMatomoEcommerce()

  const router = useRouter()
  const { data: pool } = usePoolData({ id: router.query.address as string })

  const tokenAddresses = pool?.underlying_assets.map(token => {
    if (token.token.is_wrap_token === 0) {
      return token.token.id
    } else {
      return token?.token?.wraps?.id || ''
    }
  })

  const { data } = useTokensData({
    chainId: Number(pool?.chain?.id || 0),
    tokenAddresses: tokenAddresses || []
  })

  async function getDataYieldyak() {
    try {
      const response = await fetch(`${YIELDYAK_API}/apys`)
      const dataYY = await response.json()
      setinfoDataYY(dataYY)
    } catch (error) {
      console.log(error)
    }
  }

  async function getYieldyakFarm() {
    try {
      const response = await fetch(`${YIELDYAK_API}/farms`)
      const dataYY = await response.json()
      setYieldYakFarm(dataYY)
    } catch (error) {
      console.log(error)
    }
  }

  async function getHoldings(
    token: string,
    balance: string,
    decimals: string
  ): Promise<{ balancePoolYY: Big }> {
    const tokensShares = await convertBalanceYRTtoWrap(
      Big(balance).mul(Big('10').pow(18)).toFixed(0, 0),
      token
    )
    return {
      balancePoolYY: tokensShares.div(Big(10).pow(Number(decimals)))
    }
  }

  function handleSortingForHighLiquidity() {
    if (!pool) {
      return []
    }

    const tokenSorting = [...pool.underlying_assets].sort(
      (a, b) => Number(b.weight_normalized) - Number(a.weight_normalized)
    )

    return tokenSorting
  }

  function handleCurrentInView(n: number) {
    setInViewCollum(prev => {
      const newPrev = prev + n
      if (newPrev < 1) {
        return 4
      } else if (newPrev > 4) {
        return 1
      } else {
        return newPrev
      }
    })
  }

  function handleView(token: {
    __typename?: 'Asset' | undefined
    balance: string
    weight_normalized: string
    weight_goal_normalized: string
    token: {
      __typename?: 'Token' | undefined
      id: string
      name: string
      logo?: string | null | undefined
      symbol: string
      decimals: number
      is_wrap_token: number
      wraps?:
        | {
            __typename?: 'Token' | undefined
            id: string
            decimals: number
            symbol: string
            name: string
            logo?: string | null | undefined
          }
        | null
        | undefined
    }
  }) {
    if (token.token.is_wrap_token === 0) {
      setTokenData({
        logo: token.token.logo || '',
        name: token.token.symbol,
        address: ''
      })
      setTokenMobile({
        allocation: (Number(token.weight_normalized) * 100).toFixed(2) || '0',
        holdingValue: BNtoDecimal(
          Big(token.balance || 0).times(
            Big(data?.[token.token.id.toLowerCase()]?.usd || 0)
          ),
          18,
          5,
          2
        ),
        holdingAmount: BNtoDecimal(Big(token.balance || '0'), 18, 5),
        price: BNtoDecimal(
          Big(data?.[token.token.id.toLowerCase()]?.usd || 0),
          18,
          5,
          2
        ),
        change:
          data?.[token.token.id.toLowerCase()]?.pricePercentageChangeIn24h || 0,
        yield: 'no Yield',
        id: ''
      })
    } else {
      setTokenData({
        logo: token.token.wraps?.logo || '',
        name: token.token.wraps?.symbol || '',
        address: ''
      })
      setTokenMobile({
        allocation: (Number(token.weight_normalized) * 100).toFixed(2) || '0',
        holdingValue: BNtoDecimal(
          (balanceYY?.[token.token.id] || Big(0)).times(
            Big(data?.[token.token.wraps?.id?.toLowerCase() || '']?.usd || 0)
          ),
          18,
          5,
          2
        ),
        holdingAmount: BNtoDecimal(
          balanceYY?.[token.token.id] || Big(0),
          18,
          5
        ),
        price: BNtoDecimal(
          Big(data?.[token.token.wraps?.id.toLowerCase() || '']?.usd || 0),
          18,
          5,
          2
        ),
        change:
          data?.[token.token.wraps?.id.toLowerCase() || '']
            ?.pricePercentageChangeIn24h || 0,
        yield:
          token.token.symbol === 'YRT'
            ? `${infoDataYY?.[token.token.id]?.apy || '0.0'}% APY`
            : 'no Yield',
        id: token.token.symbol === 'YRT' ? token.token.id : ''
      })
    }
    setIsOpen(true)
  }

  React.useEffect(() => {
    if (!pool) {
      return
    }

    const getBalanceYY = async () => {
      let balance = {}
      for (const token of pool.underlying_assets) {
        if (token.token.is_wrap_token === 1) {
          const { balancePoolYY } = await getHoldings(
            token.token.id,
            token.balance,
            token?.token?.wraps?.decimals?.toString() || ''
          )

          balance = { ...balance, [token.token.id]: balancePoolYY }
        }
      }

      setBalanceYY(balance)
    }

    getBalanceYY()
  }, [pool])

  React.useEffect(() => {
    getDataYieldyak()
    getYieldyakFarm()
  }, [])

  return (
    <S.Distribution>
      <S.Title>
        <Image src={iconBar} alt="" width={18} height={18} />
        <h2>Distribution</h2>
      </S.Title>
      <S.Line />

      <S.DistributionTable>
        <THead>
          <TRHead>
            <TH>
              <ColumnTitle>Coin</ColumnTitle>
            </TH>
            <TH isView={inViewCollum === 1}>
              <ColumnTitle align="right">Allocation</ColumnTitle>
            </TH>
            <TH isView={inViewCollum === 2}>
              <ColumnTitle align="right">Holding</ColumnTitle>
            </TH>
            <TH isView={inViewCollum === 3}>
              <ColumnTitle align="right">Price 24h</ColumnTitle>
            </TH>
            <TH isView={inViewCollum === 4}>
              <ColumnTitle align="right">Yield</ColumnTitle>
            </TH>
            <TH>
              <TableViewButtonContainer>
                <TableViewButton onClick={() => handleCurrentInView(-1)}>
                  <Image src={arrowIcon} width={7} height={12} />
                </TableViewButton>

                <TableViewButton onClick={() => handleCurrentInView(1)}>
                  <Image src={arrowIcon} width={7} height={12} />
                </TableViewButton>
              </TableViewButtonContainer>
            </TH>
          </TRHead>
        </THead>

        <TBody>
          {handleSortingForHighLiquidity().map(token => {
            if (token.token.is_wrap_token === 0) {
              return (
                <TRHead key={token.token.id}>
                  <TD>
                    <S.FlexWrapper>
                      <Image
                        src={token.token.logo || none.src}
                        width={24}
                        height={24}
                      />
                      <Value align="left">{token.token.symbol}</Value>
                    </S.FlexWrapper>
                  </TD>
                  <TD isView={inViewCollum === 1}>
                    <Value>
                      {(Number(token.weight_normalized) * 100).toFixed(2) || 0}%
                    </Value>
                  </TD>
                  <TD isView={inViewCollum === 2}>
                    <ValueWrapper>
                      <Value>
                        ${' '}
                        {BNtoDecimal(
                          Big(token.balance || 0).times(
                            Big(data?.[token.token.id.toLowerCase()]?.usd || 0)
                          ),
                          18,
                          5,
                          2
                        )}
                      </Value>

                      <SecondaryTextValue align="right">
                        {BNtoDecimal(Big(token.balance || '0'), 18, 5)}
                      </SecondaryTextValue>
                    </ValueWrapper>
                  </TD>
                  <TD isView={inViewCollum === 3}>
                    <ValueWrapper>
                      <Value>
                        ${' '}
                        {BNtoDecimal(
                          Big(data?.[token.token.id.toLowerCase()]?.usd || 0),
                          18,
                          5,
                          2
                        )}
                      </Value>

                      <SecondaryTextValue
                        align="right"
                        value={
                          data?.[token.token.id.toLowerCase()]
                            ?.pricePercentageChangeIn24h || 0
                        }
                      >
                        {data?.[token.token.id.toLowerCase()]
                          ?.pricePercentageChangeIn24h
                          ? `${
                              data?.[token.token.id.toLowerCase()]
                                .pricePercentageChangeIn24h < 0
                                ? ''
                                : '+'
                            }${data?.[
                              token.token.id.toLowerCase()
                            ].pricePercentageChangeIn24h.toFixed(2)}%`
                          : '-'}
                      </SecondaryTextValue>
                    </ValueWrapper>
                  </TD>
                  <TD isView={inViewCollum === 4}>
                    <Value>no Yield</Value>
                  </TD>
                  <TD onClick={() => handleView(token)}>
                    <ViewButton type="button">
                      <Image src={eyeShowIcon} />
                    </ViewButton>
                  </TD>
                </TRHead>
              )
            }

            return (
              <TRHead key={token.token.id}>
                <TD>
                  <S.FlexWrapper>
                    <Image
                      src={token.token?.wraps?.logo || none.src}
                      width={24}
                      height={24}
                    />
                    <ValueWrapper>
                      <Value align="left">{token.token?.wraps?.symbol}</Value>

                      <SecondaryTextValue>
                        {yieldYakFarm.find(item => {
                          if (item.address === token.token.id) {
                            return item.platform
                          }
                        })?.platform || ''}
                      </SecondaryTextValue>
                    </ValueWrapper>
                  </S.FlexWrapper>
                </TD>
                <TD isView={inViewCollum === 1}>
                  <Value>
                    {(Number(token.weight_normalized) * 100).toFixed(2) || 0}%
                  </Value>
                </TD>
                <TD isView={inViewCollum === 2}>
                  <ValueWrapper>
                    <Value>
                      ${' '}
                      {BNtoDecimal(
                        (balanceYY?.[token.token.id] || Big(0)).times(
                          Big(
                            data?.[token.token.wraps?.id?.toLowerCase() || '']
                              ?.usd || 0
                          )
                        ),
                        18,
                        5,
                        2
                      )}
                    </Value>

                    <SecondaryTextValue align="right">
                      {BNtoDecimal(
                        balanceYY?.[token.token.id] || Big(0),
                        18,
                        5
                      )}
                    </SecondaryTextValue>
                  </ValueWrapper>
                </TD>
                <TD isView={inViewCollum === 3}>
                  <ValueWrapper>
                    <Value>
                      ${' '}
                      {BNtoDecimal(
                        Big(
                          data?.[token.token.wraps?.id.toLowerCase() || '']
                            ?.usd || 0
                        ),
                        18,
                        5,
                        2
                      )}
                    </Value>

                    <SecondaryTextValue
                      align="right"
                      value={
                        data?.[token.token.wraps?.id.toLowerCase() || '']
                          ?.pricePercentageChangeIn24h || 0
                      }
                    >
                      {data?.[token.token.wraps?.id.toLowerCase() || '']
                        ?.pricePercentageChangeIn24h
                        ? `${
                            data?.[token.token.wraps?.id.toLowerCase() || '']
                              ?.pricePercentageChangeIn24h < 0
                              ? ''
                              : '+'
                          }${data?.[
                            token.token.wraps?.id.toLowerCase() || ''
                          ]?.pricePercentageChangeIn24h.toFixed(2)}%`
                        : '-'}
                    </SecondaryTextValue>
                  </ValueWrapper>
                </TD>
                <TD isView={inViewCollum === 4}>
                  {token.token.symbol === 'YRT' ? (
                    <ValueWrapper>
                      <Value>
                        {infoDataYY?.[token.token.id]?.apy || '0.0'}% APY
                      </Value>
                      <S.YieldYakContent
                        href={`https://yieldyak.com/farms/detail/${token.token.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackEventFunction(
                            'click-on-link',
                            'yield-pool',
                            'distribution'
                          )
                        }
                      >
                        <SecondaryTextValue align="right">
                          Yield Yak
                        </SecondaryTextValue>
                        <svg
                          width="12"
                          height="13"
                          viewBox="0 0 12 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.15137 1.39096C7.15137 1.09737 7.40876 0.859375 7.72628 0.859375L11.1757 0.859375C11.4933 0.859375 11.7507 1.09737 11.7507 1.39096V4.58049C11.7507 4.87408 11.4933 5.11208 11.1757 5.11208C10.8582 5.11208 10.6008 4.87408 10.6008 4.58049V2.77755L4.67968 8.2525C4.45516 8.4601 4.09115 8.4601 3.86663 8.2525C3.64211 8.0449 3.64211 7.70832 3.86663 7.50072L9.89942 1.92255H7.72628C7.40876 1.92255 7.15137 1.68455 7.15137 1.39096ZM1.97474 3.83564C1.82226 3.83564 1.67603 3.89164 1.56821 3.99133C1.46039 4.09103 1.39982 4.22624 1.39982 4.36722L1.39982 10.2147C1.39982 10.3557 1.46039 10.4909 1.56821 10.5906C1.67603 10.6903 1.82226 10.7463 1.97474 10.7463H8.29877C8.45124 10.7463 8.59748 10.6903 8.70529 10.5906C8.81311 10.4909 8.87368 10.3557 8.87368 10.2147V7.02516C8.87368 6.73158 9.13108 6.49358 9.44859 6.49358C9.76611 6.49358 10.0235 6.73158 10.0235 7.02516V10.2147C10.0235 10.6376 9.84179 11.0433 9.51834 11.3424C9.19489 11.6414 8.7562 11.8095 8.29877 11.8095H1.97474C1.51731 11.8095 1.07861 11.6414 0.755163 11.3424C0.431713 11.0433 0.25 10.6376 0.25 10.2147L0.25 4.36722C0.25 3.94427 0.431713 3.53863 0.755163 3.23956C1.07861 2.94048 1.51731 2.77246 1.97474 2.77246H5.42421C5.74172 2.77246 5.99912 3.01046 5.99912 3.30405C5.99912 3.59764 5.74172 3.83564 5.42421 3.83564H1.97474Z"
                            fill="#969696"
                          />
                        </svg>
                      </S.YieldYakContent>
                    </ValueWrapper>
                  ) : (
                    <Value>no Yield</Value>
                  )}
                </TD>
                <TD onClick={() => handleView(token)}>
                  <ViewButton type="button">
                    <Image src={eyeShowIcon} />
                  </ViewButton>
                </TD>
              </TRHead>
            )
          })}
        </TBody>

        <ModalViewCoin
          isOpen={isOpen}
          title={tokenData}
          onClick={() => setIsOpen(false)}
        >
          <TableLine>
            <TableLineTitle>Allocation</TableLineTitle>

            <ValueContainer>
              <V>{tokenMobile.allocation}%</V>
            </ValueContainer>
          </TableLine>

          <TableLine>
            <TableLineTitle>Holding</TableLineTitle>

            <ValueContainer>
              <V>$ {tokenMobile.holdingValue}</V>

              <SecondaryValue>{tokenMobile.holdingAmount}</SecondaryValue>
            </ValueContainer>
          </TableLine>

          <TableLine>
            <TableLineTitle>Price 24h</TableLineTitle>

            <ValueContainer>
              <V>$ {tokenMobile.price}</V>

              <SecondaryValue value={tokenMobile.change}>
                {tokenMobile.change.toFixed(2)}%
              </SecondaryValue>
            </ValueContainer>
          </TableLine>

          <TableLine>
            <TableLineTitle>Yield</TableLineTitle>

            <ValueContainer>
              <V>{tokenMobile.yield}</V>

              {tokenMobile.id.length > 0 ? (
                <S.YieldYakContent
                  href={`https://yieldyak.com/farms/detail/${tokenMobile.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEventFunction(
                      'click-on-link',
                      'yield-pool',
                      'distribution'
                    )
                  }
                >
                  <SecondaryValue>Yield Yak</SecondaryValue>

                  <svg
                    width="12"
                    height="13"
                    viewBox="0 0 12 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.15137 1.39096C7.15137 1.09737 7.40876 0.859375 7.72628 0.859375L11.1757 0.859375C11.4933 0.859375 11.7507 1.09737 11.7507 1.39096V4.58049C11.7507 4.87408 11.4933 5.11208 11.1757 5.11208C10.8582 5.11208 10.6008 4.87408 10.6008 4.58049V2.77755L4.67968 8.2525C4.45516 8.4601 4.09115 8.4601 3.86663 8.2525C3.64211 8.0449 3.64211 7.70832 3.86663 7.50072L9.89942 1.92255H7.72628C7.40876 1.92255 7.15137 1.68455 7.15137 1.39096ZM1.97474 3.83564C1.82226 3.83564 1.67603 3.89164 1.56821 3.99133C1.46039 4.09103 1.39982 4.22624 1.39982 4.36722L1.39982 10.2147C1.39982 10.3557 1.46039 10.4909 1.56821 10.5906C1.67603 10.6903 1.82226 10.7463 1.97474 10.7463H8.29877C8.45124 10.7463 8.59748 10.6903 8.70529 10.5906C8.81311 10.4909 8.87368 10.3557 8.87368 10.2147V7.02516C8.87368 6.73158 9.13108 6.49358 9.44859 6.49358C9.76611 6.49358 10.0235 6.73158 10.0235 7.02516V10.2147C10.0235 10.6376 9.84179 11.0433 9.51834 11.3424C9.19489 11.6414 8.7562 11.8095 8.29877 11.8095H1.97474C1.51731 11.8095 1.07861 11.6414 0.755163 11.3424C0.431713 11.0433 0.25 10.6376 0.25 10.2147L0.25 4.36722C0.25 3.94427 0.431713 3.53863 0.755163 3.23956C1.07861 2.94048 1.51731 2.77246 1.97474 2.77246H5.42421C5.74172 2.77246 5.99912 3.01046 5.99912 3.30405C5.99912 3.59764 5.74172 3.83564 5.42421 3.83564H1.97474Z"
                      fill="#969696"
                    />
                  </svg>
                </S.YieldYakContent>
              ) : null}
            </ValueContainer>
          </TableLine>
        </ModalViewCoin>
      </S.DistributionTable>
    </S.Distribution>
  )
}

export default Distribution
