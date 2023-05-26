import React from 'react'
import Image from 'next/image'
import useSWR from 'swr'
import { request } from 'graphql-request'
import Big from 'big.js'
import Link from 'next/link'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

import { BNtoDecimal } from '../../utils/numerals'
import substr from '@/utils/substr'

import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { setTokensSwapProvider } from '../../store/reducers/tokenListSwapProvider'

import useMatomoEcommerce from '../../hooks/useMatomoEcommerce'

import { BACKEND_KASSANDRA, URL_PARASWAP } from '../../constants/tokenAddresses'

import { GET_INFO_POOL } from './graphql'

import Breadcrumb from '../../components/Breadcrumb'
import Loading from '../../components/Loading'
import ChartProducts from '../../components/ChartProducts'
import ScrollUpButton from '../../components/ScrollUpButton'
import BreadcrumbItem from '../../components/Breadcrumb/BreadcrumbItem'
import TokenWithNetworkImage from '../../components/TokenWithNetworkImage'
import PoweredBy from './PoweredBy'
import FeeBreakdown from './FeeBreakdown'
// import ActivityTable from './ActivityTable'

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

type ResTokenSwapProvider = {
  address: string
  decimals: number
  img: string
  network: number
  symbol: string
}

const Pool = () => {
  const [profileName, setProfileName] = React.useState(null)
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

  const { pool } = useAppSelector(state => state)
  const dispatch = useAppDispatch()

  const { data } = useSWR([GET_INFO_POOL], query =>
    request(BACKEND_KASSANDRA, query, {
      id: pool.id,
      day: Math.trunc(Date.now() / 1000 - 60 * 60 * 24)
    })
  )

  async function getProfile() {
    const response = await fetch(`/api/profile/${pool.manager.id}`)
    const userProfile = await response.json()

    if (userProfile.nickname) {
      setProfileName(userProfile.nickname)
    }
  }

  async function getTokensForOperations() {
    const resJson = await fetch(`${URL_PARASWAP}/tokens/${pool.chain_id}`)
    const response = await resJson.json()
    const tokensSwapProvider = response.tokens as ResTokenSwapProvider[]
    const tokenAddressesSwapProvider = tokensSwapProvider.map(
      token => token.address
    )
    const poolAssets = [...pool.underlying_assets].sort(
      (a, b) => Number(b.weight_normalized) - Number(a.weight_normalized)
    )

    const formatPoolTokens = poolAssets.map(asset => {
      const address = asset.token.wraps?.id ?? asset.token.id
      const decimals = asset.token.wraps?.decimals ?? asset.token.decimals
      const logoURI = asset.token.wraps?.logo ?? asset.token.logo ?? ''
      const name = asset.token.wraps?.name ?? asset.token.name
      const symbol = asset.token.wraps?.symbol ?? asset.token.symbol

      return {
        address: address.toLowerCase(),
        decimals,
        logoURI,
        name,
        symbol
      }
    })

    const formatTokensSwapProvider = tokensSwapProvider.map(token => ({
      address: token.address,
      decimals: token.decimals,
      logoURI:
        token.img === 'https://cdn.paraswap.io/token/token.png'
          ? ''
          : token.img,
      name: token.symbol,
      symbol: token.symbol
    }))

    for (const token of formatPoolTokens) {
      if (!tokenAddressesSwapProvider.includes(token.address)) {
        formatTokensSwapProvider.push(token)
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
        trackProductPageView(pool.id, pool.symbol, pool.name)
      } catch (error) {
        console.log(error)
      }
    }
  }, [pool])

  React.useEffect(() => {
    if (data?.pool) {
      const swapFees = data.pool.swap.reduce(
        (acc: Big, current: { volume_usd: string }) => {
          return Big(current.volume_usd).add(acc)
        },
        0
      )

      const withdrawFees = data.pool.withdraw.reduce(
        (acc: Big, current: { volume_usd: string }) => {
          return Big(current.volume_usd).add(acc)
        },
        0
      )

      const volume = data.pool.volumes.reduce(
        (acc: Big, current: { volume_usd: string }) => {
          return Big(current.volume_usd).add(acc)
        },
        0
      )

      setInfoPool({
        tvl: BNtoDecimal(Big(data.pool.total_value_locked_usd), 2, 2, 2),
        swapFees: BNtoDecimal(Big(swapFees), 2, 2, 2),
        withdrawFees: BNtoDecimal(Big(withdrawFees), 2, 2, 2),
        volume: BNtoDecimal(Big(volume), 2, 2, 2),
        price: data.pool.price_usd,
        decimals: data.pool.decimals
      })
    }
  }, [data])

  React.useEffect(() => {
    if (pool.manager.id !== '') {
      getProfile()
    }
  }, [pool.manager.id])

  return (
    <>
      <ShareImageModal
        poolId={pool.id}
        setOpenModal={setOpenModal}
        openModal={openModal}
        productName={pool.symbol}
      >
        <SharedImage
          crpPoolAddress={pool.id}
          totalValueLocked={infoPool.tvl}
          socialIndex={pool.symbol}
          productName={pool.name}
          poolLogo={pool.logo}
          tokens={pool.underlying_assets}
        />
      </ShareImageModal>
      <Breadcrumb>
        <BreadcrumbItem href="/">Invest</BreadcrumbItem>
        <BreadcrumbItem href={`/pool/${pool.symbol.toLowerCase()}`} isLastPage>
          ${pool.symbol}
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
                    url: pool.logo,
                    height: 75,
                    width: 75,
                    withoutBorder: true
                  }}
                  networkImage={{
                    url: pool.chain?.logo,
                    height: 20,
                    width: 20
                  }}
                  blockies={{
                    size: 8,
                    scale: 9,
                    seedName: pool.name
                  }}
                />
                <S.NameIndex>
                  <S.NameAndSymbol>
                    <h1>{pool.name}</h1>
                    <button
                      onClick={() => {
                        setOpenModal(true)
                        trackEventFunction(
                          'click',
                          `social-share-${pool.name}`,
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
                    <h3>${pool.symbol}</h3>
                    {pool.manager.id && (
                      <Link
                        href={`/profile/${pool.manager.id}?tab=managed-pools`}
                        passHref
                      >
                        <a>
                          by{' '}
                          {profileName ? profileName : substr(pool.manager.id)}
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
                feeJoinBroker={data.pool.fee_join_broker}
                feeJoinManager={data.pool.fee_join_manager}
                feeAum={data.pool.fee_aum}
                feeAumKassandra={data.pool.fee_aum_kassandra}
                withdrawFee={data.pool.fee_exit}
              />
              <MyAsset
                chain={pool.chain}
                poolToken={pool.address}
                symbol={pool.symbol}
                price={infoPool.price}
                pid={pool.poolId}
                decimals={infoPool.decimals}
              />
              <Summary />
              {pool.partners && <PoweredBy />}
              <Distribution />
              {/* <ActivityTable /> */}
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
