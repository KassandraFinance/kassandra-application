import React from 'react'
import useSWR from 'swr'
import Image from 'next/image'
import { request } from 'graphql-request'

import Big from 'big.js'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

import { BNtoDecimal } from '../../utils/numerals'

import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { setFees } from '../../store/reducers/fees'

import useMatomoEcommerce from '../../hooks/useMatomoEcommerce'

import Header from '../../components/Header'
import Breadcrumb from '../../components/Breadcrumb'
import Loading from '../../components/Loading'
import ChartProducts from '../../components/ChartProducts'
import PoolOperations from '../../components/PoolOperations'
import ScrollUpButton from '../../components/ScrollUpButton'
import BreadcrumbItem from '../../components/Breadcrumb/BreadcrumbItem'
import PoweredBy from './PoweredBy'
import ActivityTable from './ActivityTable'

import tooltip from '../../../public/assets/utilities/tooltip.svg'
import ahype from '../../../public/assets/logos/ahype.svg'

import { GET_INFO_POOL } from './graphql'

import Change from './Change'
import MyAsset from './MyAsset'
import Summary from './Summary'
import Distribution from './Distribution'
import TokenDescription from './TokenDescription'
import ShareImageModal from './ShareImageModal'
import SharedImage from './SharedImage'

import * as S from './styles'

import NewPoolOperations from './NewPoolOperations'
import { URL_1INCH, products } from '../../constants/tokenAddresses'
import { setTokenList1Inch } from '../../store/reducers/tokenList1Inch'

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
    request('https://backend.kassandra.finance', query, {
      id: pool.id,
      day: Math.trunc(Date.now() / 1000 - 60 * 60 * 24)
    })
  )

  async function getTokenList1Inch() {
    const res = await fetch(`${URL_1INCH}${pool.chainId}/tokens`)
    const json = await res.json()

    dispatch(setTokenList1Inch(Object.values(json.tokens)))
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

      // dispatch(
      //   setTokenAddress2Index(
      //     tokenDetails.reduce(
      //       (acc, cur, i) => ({ [cur.address]: i, ...acc }),
      //       {}
      //     )
      //   )
      // )

      // dispatch(
      //   setFees({
      //     Invest: '0',
      //     Withdraw: (data.pool.fee_exit * 100).toFixed(2),
      //     Swap: (data.pool.fee_swap * 100).toFixed(2)
      //   })
      // )

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
          fundImage={pool.logo}
        />
      </ShareImageModal>
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href={`/explore`}>Explore</BreadcrumbItem>
        <BreadcrumbItem
          href={`/explore/${pool.symbol.toLowerCase()}`}
          isLastPage
        >
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
                <img src={pool.logo} alt="" />
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
                    <p>by {pool.manager}</p>
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
                  <h2>${infoPool.tvl}</h2>
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
                  <h2>${infoPool.volume}</h2>
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
                  <h2>${infoPool.swapFees}</h2>
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
                  <h2>${infoPool.withdrawFees}</h2>
                </S.IndexData>
              </S.IntroCharts>
              <ChartProducts />
              <ScrollUpButton />
              <Change crpPoolAddress={pool.id} />
              {/* <MyAsset
                product={pool}
                price={infoPool.price}
                pid={typeof pool.poolId === 'undefined' ? -1 : pool.poolId}
                decimals={infoPool.decimals}
              /> */}
              <Summary
                strategy={data?.pool.strategy || 'Coming soon...'}
                poolContract={pool.core_pool}
                poolController={pool.id}
                summary={pool.summary}
                symbol={pool.symbol}
                link={pool.url}
                icon={ahype}
              />
              {/* <PoweredBy partners={pool.partners} /> */}
              <Distribution />
              {/* <ActivityTable product={pool} /> */}
              <TokenDescription symbol={pool.symbol} />
            </S.ProductDetails>
            {/* <PoolOperations
              poolChain={products[0].chain}
              poolSymbol={products[0].symbol}
              crpPoolAddress={products[0].sipAddress}
              corePoolAddress={products[0].coreAddress}
              productCategories={products[0].categories}
            /> */}
            <NewPoolOperations />
          </S.Product>
        </S.Container>
      )}
    </>
  )
}

export default Pool
