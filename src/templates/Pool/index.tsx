import React from 'react'
import Image from 'next/image'
import useSWR from 'swr'
import { request } from 'graphql-request'
import Big from 'big.js'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

import { BNtoDecimal } from '../../utils/numerals'

import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { setTokenList1Inch } from '../../store/reducers/tokenList1Inch'

import useMatomoEcommerce from '../../hooks/useMatomoEcommerce'

import { BACKEND_KASSANDRA, URL_1INCH } from '../../constants/tokenAddresses'

import { GET_INFO_POOL } from './graphql'

import Header from '../../components/Header'
import Breadcrumb from '../../components/Breadcrumb'
import Loading from '../../components/Loading'
import ChartProducts from '../../components/ChartProducts'
import ScrollUpButton from '../../components/ScrollUpButton'
import BreadcrumbItem from '../../components/Breadcrumb/BreadcrumbItem'
import TokenWithNetworkImage from '../../components/TokenWithNetworkImage'
// import PoweredBy from './PoweredBy'
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
  urlFarmContract: string;
  farmName: string;
}

interface InfoPool {
  tvl: string;
  swapFees: string;
  withdrawFees: string;
  volume: string;
  price: string;
  decimals: number;
}

export interface IPriceAndChangeTokens {
  [key: string]: {
    change: number,
    price: number,
    image: string
  };
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

  const pool = useAppSelector(state => state.pool)
  const dispatch = useAppDispatch()

  const { data } = useSWR([GET_INFO_POOL], query =>
    request(BACKEND_KASSANDRA, query, {
      id: pool.id,
      day: Math.trunc(Date.now() / 1000 - 60 * 60 * 24)
    })
  )

  async function getTokenList1Inch() {
    const res = await fetch(`${URL_1INCH}${pool.chainId}/tokens`)
    const json = await res.json()
    const listToken1Linch = json.tokens
    const listTokenPool = {}

    pool.underlying_assets.forEach(item => {
      if (item.token.is_wrap_token) {
        Object.assign(listTokenPool, {
          [item.token.wraps.id.toLowerCase()]: {
            address: item.token.wraps.id.toLowerCase(),
            decimals: item.token.wraps.decimals,
            logoURI: item.token.wraps.logo,
            name: item.token.wraps.name,
            symbol: item.token.wraps.symbol
          }
        })
        return
      }
      Object.assign(listTokenPool, {
        [item.token.id.toLowerCase()]: {
          address: item.token.id.toLowerCase(),
          decimals: item.token.decimals,
          logoURI: item.token.logo,
          name: item.token.name,
          symbol: item.token.symbol
        }
      })
      return
    })

    const listToken = { ...listTokenPool, ...listToken1Linch }

    dispatch(setTokenList1Inch(Object.values(listToken)))
  }

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1800)
  }, [])

  React.useEffect(() => {
    if (pool) {
      getTokenList1Inch()
      trackProductPageView(pool.id, pool.symbol, pool.name)
    }
  }, [pool])

  React.useEffect(() => {
    if (data) {
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

  return (
    <>
      <Header />
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
        />
      </ShareImageModal>
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
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
                    {pool.manager && <p>by {pool.manager}</p>}
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
              <MyAsset
                chain={pool.chain}
                poolToken={pool.address}
                symbol={pool.symbol}
                price={infoPool.price}
                pid={pool.poolId}
                decimals={infoPool.decimals}
              />
              <Summary strategy={data?.pool.strategy || 'Coming soon...'} />
              {/* {pool.partners ?? <PoweredBy partners={pool.partners} />} */}
              <Distribution />
              {/* <ActivityTable /> */}
              <TokenDescription symbol={pool.symbol} />
            </S.ProductDetails>
            <NewPoolOperations />
          </S.Product>
        </S.Container>
      )}
    </>
  )
}

export default Pool
