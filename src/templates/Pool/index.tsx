import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Big from 'big.js'
import Link from 'next/link'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

import { BNtoDecimal } from '@/utils/numerals'
import substr from '@/utils/substr'
import { useUserProfile } from '@/hooks/query/useUserProfile'
import { usePoolInfo } from '@/hooks/query/usePoolInfo'
import { usePoolData } from '@/hooks/query/usePoolData'

import { useAppDispatch } from '../../store/hooks'
import { setTokensSwapProvider } from '../../store/reducers/tokenListSwapProvider'

import useMatomoEcommerce from '../../hooks/useMatomoEcommerce'

import { NATIVE_ADDRESS, SUBGRAPH_URL } from '../../constants/tokenAddresses'

import Breadcrumb from '../../components/Breadcrumb'
import Loading from '../../components/Loading'
import ChartProducts from '../../components/ChartProducts'
import ScrollUpButton from '../../components/ScrollUpButton'
import BreadcrumbItem from '../../components/Breadcrumb/BreadcrumbItem'
import TokenWithNetworkImage from '../../components/TokenWithNetworkImage'
import FeeBreakdown from './FeeBreakdown'
import ActivityTable from './ActivityTable'

import Change from './Change'
import MyAsset from './MyAsset'
import Summary from './Summary'
import Distribution from './Distribution'
import TokenDescription from './TokenDescription'
import ShareImageModal from './ShareImageModal'
import NewPoolOperations from './NewPoolOperations'
import SharedImage from './SharedImage'

import tooltip from '../../../public/assets/utilities/tooltip.svg'

import * as S from './styles'

export interface IfarmInfoYYProps {
  urlFarmContract: string
  farmName: string
}

interface InfoPool {
  tvl: string
  swapFees: string
  withdrawFees: string
  volume: string
  price: string
  decimals: number
}

export interface IPriceAndChangeTokens {
  [key: string]: {
    change: number
    price: number
    image: string
  }
}

type ListTokensRes = {
  id: string
  decimals: number
  logo: string
  network: number
  symbol: string
}

const Pool = () => {
  const [openModal, setOpenModal] = React.useState(false)
  const [loading, setLoading] = React.useState<boolean>(true)
  const [infoPool, setInfoPool] = React.useState<InfoPool>({
    tvl: '...',
    swapFees: '...',
    withdrawFees: '...',
    volume: '...',
    price: '0',
    decimals: 18
  })

  const { trackProductPageView, trackEventFunction } = useMatomoEcommerce()

  const dispatch = useAppDispatch()

  const router = useRouter()
  const { data: pool } = usePoolData({ id: router.query.address as string })

  const { data } = usePoolInfo({
    id: pool?.id || '',
    day: Math.trunc(Date.now() / 1000 - 60 * 60 * 24)
  })
  const { data: userProfile } = useUserProfile({ address: pool?.manager?.id })

  async function getTokensForOperations() {
    const resJson = await fetch(`${SUBGRAPH_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
          query($chainId: Int) {
            tokens(where: {chain_ids_contains: [$chainId] } first: 1000) {
              id
              decimals
              logo
              name
              symbol
            }
        }
        `,
        variables: { chainId: pool?.chain_id }
      })
    })
    const response = await resJson.json()

    const tokensSwapProvider = response.data.tokens as ListTokensRes[]
    const tokenAddressesSwapProvider = tokensSwapProvider.map(token => token.id)
    let poolAssets: {
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
    }[] = []
    if (pool?.underlying_assets) {
      poolAssets = [...pool.underlying_assets].sort(
        (a, b) => Number(b.weight_normalized) - Number(a.weight_normalized)
      )
    }
    const formatTokensSwapProvider = [
      {
        address: NATIVE_ADDRESS,
        decimals: pool?.chain?.token_decimals,
        logoURI: pool?.chain?.logo ?? '',
        name: pool?.chain?.token_name,
        symbol: pool?.chain?.token_symbol
      }
    ]

    for (const token of tokensSwapProvider) {
      formatTokensSwapProvider.push({
        address: token.id,
        decimals: token.decimals,
        logoURI: token.logo,
        name: token.symbol,
        symbol: token.symbol
      })
    }

    for (const asset of poolAssets) {
      const address = asset.token.wraps?.id ?? asset.token.id

      if (!tokenAddressesSwapProvider.includes(address)) {
        formatTokensSwapProvider.push({
          address: address.toLowerCase(),
          decimals: asset.token.wraps?.decimals ?? asset.token.decimals,
          logoURI: asset.token.wraps?.logo ?? asset.token.logo ?? '',
          name: asset.token.wraps?.name ?? asset.token.name,
          symbol: asset.token.wraps?.symbol ?? asset.token.symbol
        })
      }
    }

    dispatch(setTokensSwapProvider(formatTokensSwapProvider))
  }

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1800)
  }, [])

  React.useEffect(() => {
    if (pool) {
      try {
        getTokensForOperations()
        trackProductPageView(pool?.id || '', pool?.symbol || '', pool.name)
      } catch (error) {
        console.log(error)
      }
    }
  }, [pool])

  React.useEffect(() => {
    if (data) {
      const swapFees = data.swap.reduce((acc, current) => {
        return Big(current.volume_usd).add(acc)
      }, Big(0))

      const withdrawFees = data.withdraw.reduce((acc, current) => {
        return Big(current.volume_usd).add(acc)
      }, Big(0))

      const volume = data.volumes.reduce((acc, current) => {
        return Big(current.volume_usd).add(acc)
      }, Big(0))

      setInfoPool({
        tvl: BNtoDecimal(Big(data.total_value_locked_usd), 2, 2, 2),
        swapFees: BNtoDecimal(Big(swapFees), 2, 2, 2),
        withdrawFees: BNtoDecimal(Big(withdrawFees), 2, 2, 2),
        volume: BNtoDecimal(Big(volume), 2, 2, 2),
        price: data.price_usd,
        decimals: data.decimals
      })
    }
  }, [data])

  return (
    <>
      <ShareImageModal
        poolId={pool?.id || ''}
        setOpenModal={setOpenModal}
        openModal={openModal}
        productName={pool?.symbol || ''}
      >
        <SharedImage
          crpPoolAddress={pool?.id || ''}
          totalValueLocked={infoPool.tvl}
          socialIndex={pool?.symbol || ''}
          productName={pool?.name || ''}
          poolLogo={pool?.logo || ''}
          tokens={pool?.underlying_assets || []}
        />
      </ShareImageModal>
      <Breadcrumb>
        <BreadcrumbItem href="/">Invest</BreadcrumbItem>
        <BreadcrumbItem
          href={`/pool/${pool?.symbol?.toLowerCase()}`}
          isLastPage
        >
          ${pool?.symbol}
        </BreadcrumbItem>
      </Breadcrumb>
      {loading ? (
        <S.LoadingContent>
          <Loading marginTop={0} />
        </S.LoadingContent>
      ) : (
        <S.Container>
          <S.Product>
            <S.ProductDetails>
              <S.Intro introMobile={false} introDesktop={true}>
                <TokenWithNetworkImage
                  tokenImage={{
                    url: pool?.logo || '',
                    height: 75,
                    width: 75,
                    withoutBorder: true
                  }}
                  networkImage={{
                    url: pool?.chain?.logo || '',
                    height: 20,
                    width: 20
                  }}
                  blockies={{
                    size: 8,
                    scale: 9,
                    seedName: pool?.name || ''
                  }}
                />
                <S.NameIndex>
                  <S.NameAndSymbol>
                    <h1>{pool?.name}</h1>
                    <button
                      onClick={() => {
                        setOpenModal(true)
                        trackEventFunction(
                          'click',
                          `social-share-${pool?.name}`,
                          'pool'
                        )
                      }}
                      className="circle"
                    >
                      <Image
                        src="/assets/icons/share.svg"
                        width={32}
                        height={32}
                      />
                    </button>
                  </S.NameAndSymbol>
                  <S.SymbolAndMade>
                    <h3>${pool?.symbol}</h3>
                    {pool?.manager?.id && (
                      <Link
                        href={`/profile/${pool?.manager.id}?tab=managed-pools`}
                        passHref
                      >
                        <a>
                          by{' '}
                          {userProfile?.nickname
                            ? userProfile.nickname
                            : substr(pool?.manager?.id)}
                        </a>
                      </Link>
                    )}
                  </S.SymbolAndMade>
                </S.NameIndex>
              </S.Intro>
              <S.Line className="second-line" />
              <S.IntroCharts>
                <S.IndexData>
                  <span>
                    TVL
                    <Tippy content="The Total Value Locked is the amount invested inside the pool, or simply the total value of all tokens inside the pool combined.">
                      <S.Tooltip tabIndex={0}>
                        <Image
                          src={tooltip}
                          alt="Explanation"
                          height={16}
                          width={16}
                        />
                      </S.Tooltip>
                    </Tippy>
                  </span>
                  <p>${infoPool.tvl}</p>
                </S.IndexData>
                <S.IndexData>
                  <span>
                    VOLUME (24h)
                    <Tippy content="Total volume of transactions in the last 24 hours. This includes new investments, withdrawals, token swaps and token transfers, which include swaps in decentralized exchanges.">
                      <S.Tooltip tabIndex={0}>
                        <Image
                          src={tooltip}
                          alt="Explanation"
                          height={16}
                          width={16}
                        />
                      </S.Tooltip>
                    </Tippy>
                  </span>
                  <p>${infoPool.volume}</p>
                </S.IndexData>
                <S.IndexData>
                  <span>
                    Swap fees (24h)
                    <Tippy content="Amount of fees collected in the last 24 hours when people swap tokens inside the pool. This fee is paid to all investors of the pool.">
                      <S.Tooltip tabIndex={0}>
                        <Image
                          src={tooltip}
                          alt="Explanation"
                          height={16}
                          width={16}
                        />
                      </S.Tooltip>
                    </Tippy>
                  </span>
                  <p>${infoPool.swapFees}</p>
                </S.IndexData>
                <S.IndexData>
                  <span>
                    Withdraw fees (24h)
                    <Tippy content="Amount of fees collected in the last 24 hours when people withdraw from the strategy. This fee is paid to the Kassandra Decentralized Autonomous Organization.">
                      <S.Tooltip tabIndex={0}>
                        <Image
                          src={tooltip}
                          alt="Explanation"
                          height={16}
                          width={16}
                        />
                      </S.Tooltip>
                    </Tippy>
                  </span>
                  <p>${infoPool.withdrawFees}</p>
                </S.IndexData>
              </S.IntroCharts>
              <ChartProducts />
              <ScrollUpButton />
              <Change />
              <FeeBreakdown
                feeJoinBroker={data?.fee_join_broker || '0'}
                feeJoinManager={data?.fee_join_manager || '0'}
                feeAum={data?.fee_aum || '0'}
                feeAumKassandra={data?.fee_aum_kassandra || '0'}
                withdrawFee={data?.fee_exit || '0'}
              />
              {pool && (
                <MyAsset
                  chain={pool?.chain}
                  poolToken={pool?.address || ''}
                  symbol={pool?.symbol || ''}
                  price={infoPool.price}
                  pid={pool.pool_id || 0}
                  decimals={infoPool.decimals}
                />
              )}
              <Summary />
              {/* {pool?.partners && <PoweredBy />} */}
              <Distribution />
              <ActivityTable />
              <TokenDescription />
            </S.ProductDetails>
            <NewPoolOperations />
          </S.Product>
        </S.Container>
      )}
    </>
  )
}

export default Pool
