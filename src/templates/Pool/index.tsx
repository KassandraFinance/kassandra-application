import React from 'react'
import useSWR from 'swr'
import Image from 'next/image'
import { request } from 'graphql-request'

import Big from 'big.js'
import BigNumber from 'bn.js'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

import { BNtoDecimal } from '../../utils/numerals'

import { ITokenDetails } from '../../context/PoolTokensContext'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { setFees } from '../../store/reducers/fees'
import { setPoolImages } from '../../store/reducers/poolImages'
import { setTokenAddress2Index } from '../../store/reducers/tokenAddress2Index'
import { usePoolTokens } from '../../context/PoolTokensContext'

import useYieldYak from '../../hooks/useYieldYak'
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

import { URL_1INCH } from '../../constants/tokenAddresses'

import { setTokenList1Inch } from '../../store/reducers/tokenList1Inch'
import { GET_INFO_POOL } from './graphql'

import Change from './Change'
import MyAsset from './MyAsset'
import Summary from './Summary'
import Distribution from './Distribution'
import TokenDescription from './TokenDescription'
import ShareImageModal from './ShareImageModal'
import SharedImage from './SharedImage'

import * as S from './styles'

import NewPoolOperations from '../../components/NewPoolOperations'

const invertToken: { [key: string]: string } = {
  '0xe28Ad9Fa07fDA82abab2E0C86c64A19D452b160E':
    '0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab', //WETH
  '0xFA17fb53da4c837594127b73fFd09fdb15f42C49':
    '0xd586e7f844cea2f87f50152665bcbc2c279d8d70', //DAI
  '0xbbcED92AC9B958F88A501725f080c0360007e858':
    '0x50b7545627a5162f82a992c33b87adc75187b218', //WBTC
  '0x19707F26050Dfe7eb3C1b36E49276A088cE98752':
    '0x60781C2586D68229fde47564546784ab3fACA982', // PNG
  '0xbF5bFFbf7D94D3B29aBE6eb20089b8a9E3D229f7':
    '0x8729438EB15e2C8B576fCc6AeCdA6A148776C0F5', //QI
  '0xd0F41b1C9338eB9d374c83cC76b684ba3BB71557':
    '0x2b2C81e08f1Af8835a78Bb2A90AE924ACE0eA4bE' //SAVAX
}

const farmInfoYY: { [key: string]: IfarmInfoYYProps } = {
  '0xe28Ad9Fa07fDA82abab2E0C86c64A19D452b160E': {
    farmName: 'BankerJoe',
    urlFarmContract:
      'https://yieldyak.com/farms/detail/0xe28Ad9Fa07fDA82abab2E0C86c64A19D452b160E'
  }, //WETH

  '0xFA17fb53da4c837594127b73fFd09fdb15f42C49': {
    farmName: 'BENQI',
    urlFarmContract:
      'https://yieldyak.com/farms/detail/0xFA17fb53da4c837594127b73fFd09fdb15f42C49'
  }, //DAI

  '0xbbcED92AC9B958F88A501725f080c0360007e858': {
    farmName: 'Aave',
    urlFarmContract:
      'https://yieldyak.com/farms/detail/0xbbcED92AC9B958F88A501725f080c0360007e858'
  }, //WBTC

  '0x19707F26050Dfe7eb3C1b36E49276A088cE98752': {
    farmName: 'PNG',
    urlFarmContract:
      'https://yieldyak.com/farms/detail/0x19707F26050Dfe7eb3C1b36E49276A088cE98752'
  }, //PNG

  '0xbF5bFFbf7D94D3B29aBE6eb20089b8a9E3D229f7': {
    farmName: 'BENQI',
    urlFarmContract:
      'https://yieldyak.com/farms/detail/0xbF5bFFbf7D94D3B29aBE6eb20089b8a9E3D229f7'
  }, //QI

  '0xd0F41b1C9338eB9d374c83cC76b684ba3BB71557': {
    farmName: 'sAVAX',
    urlFarmContract:
      'https://yieldyak.com/farms/detail/0xd0F41b1C9338eB9d374c83cC76b684ba3BB71557'
  } //sAVAX
}

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

const network2coingeckoID: any = {
  1: 'ethereum',
  43114: 'avalanche',
  43113: 'avalanche'
}

const Pool = () => {
  const [openModal, setOpenModal] = React.useState(false)
  const [loading, setLoading] = React.useState<boolean>(true)
  const [infoDataYY, setinfoDataYY] = React.useState<{
    [key: string]: { apy: number }
  }>()
  const [infoPool, setInfoPool] = React.useState<InfoPool>({
    tvl: '...',
    swapFees: '...',
    withdrawFees: '...',
    volume: '...',
    price: '0',
    decimals: 18
  })

  const { trackProductPageView, trackEventFunction } = useMatomoEcommerce()
  const { convertBalanceYRTtoWrap, getDecimals } = useYieldYak()
  const { setPoolTokens } = usePoolTokens()

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

  const { data: coinGeckoResponse } = useSWR(
    `/api/image-coingecko?poolinfo=${
      network2coingeckoID[pool.chainId]
    }&tokenAddress=${pool.underlying_assets_addresses}`
  )

  async function getDataYieldyak() {
    try {
      const response = await fetch('https://staging-api.yieldyak.com/apys')
      const dataYY = await response.json()
      setinfoDataYY(dataYY)
    } catch (error) {
      console.log(error)
    }
  }

  async function getHoldings(
    token: string,
    balance: string
  ): Promise<{ balancePoolYY: Big, decimalsYY: BigNumber }> {
    const decimals: string = await getDecimals(token)

    const tokensShares = await convertBalanceYRTtoWrap(
      new BigNumber(Big(balance).mul(Big('10').pow(18)).toFixed(0, 0)),
      token
    )

    return {
      balancePoolYY: Big(tokensShares.toString()).div(
        Big(10).pow(Number(decimals))
      ),
      decimalsYY: new BigNumber(decimals)
    }
  }

  async function getTokenDetails() {
    const poolInfo: ITokenDetails = {
      balance_in_pool: '',
      address: data.pool.id,
      allocation: 0,
      allocation_goal: 0,
      decimals: new BigNumber(data.pool.decimals),
      price: Number(data.pool.price_usd),
      name: pool.name,
      symbol: data.pool.symbol
    }

    const tokenDetails: ITokenDetails[] = await Promise.all(
      data.pool.underlying_assets.map(
        async (item: {
          balance: string,
          token: {
            id: string,
            decimals: string | number | BigNumber,
            price_usd: string,
            name: string,
            symbol: string
          },
          weight_goal_normalized: string,
          weight_normalized: string
        }) => {
          let symbol
          let balance
          let address
          let decimals: BigNumber
          let dataInfoYY
          if (item.token.symbol === 'YRT') {
            const { balancePoolYY, decimalsYY } = await getHoldings(
              item.token.id,
              item.balance
            )
            symbol = item.token.name.split(' ').pop()
            balance = Big(balancePoolYY.toString())
            address = invertToken[item.token.id]
            decimals = decimalsYY
            dataInfoYY = {
              apy: infoDataYY && infoDataYY[item.token.id]?.apy,
              item: farmInfoYY[item.token.id]
            }
          } else {
            symbol = item.token.symbol === 'WAVAX' ? 'AVAX' : item.token.symbol
            balance = item.balance
            address = item.token.id
            decimals = new BigNumber(item.token.decimals)
            dataInfoYY = null
          }
          return {
            balance_in_pool: balance,
            dataInfoYY,
            address,
            allocation: (Number(item.weight_normalized) * 100).toFixed(2),
            allocation_goal: (
              Number(item.weight_goal_normalized) * 100
            ).toFixed(2),
            decimals: decimals,
            price: Number(
              coinGeckoResponse.infoToken[
                invertToken[item.token.id] ?? item.token.id
              ]?.price
            ),
            name: item.token.name,
            symbol,
            priceChange: Number(
              coinGeckoResponse.infoToken[
                invertToken[item.token.id] ?? item.token.id
              ]?.change
            ),
            image:
              coinGeckoResponse.images[
                invertToken[item.token.id] ?? item.token.id
              ]
          }
        }
      )
    )

    tokenDetails.push(poolInfo)

    dispatch(
      setTokenAddress2Index(
        tokenDetails.reduce((acc, cur, i) => ({ [cur.address]: i, ...acc }), {})
      )
    )
    dispatch(
      setFees({
        Invest: '0',
        Withdraw: (data.pool.fee_exit * 100).toFixed(2),
        Swap: (data.pool.fee_swap * 100).toFixed(2)
      })
    )
    setPoolTokens(tokenDetails)
    dispatch(setPoolImages(coinGeckoResponse.images))
  }

  React.useEffect(() => {
    getDataYieldyak()
  }, [data])

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

  // React.useEffect(() => {
  //   if (data && coinGeckoResponse) {
  //     getTokenDetails()

  //     const swapFees = data.swap.reduce(
  //       (acc: Big, current: { volume_usd: string }) => {
  //         return Big(current.volume_usd).add(acc)
  //       },
  //       0
  //     )

  //     const withdrawFees = data.withdraw.reduce(
  //       (acc: Big, current: { volume_usd: string }) => {
  //         return Big(current.volume_usd).add(acc)
  //       },
  //       0
  //     )

  //     const volume = data.volumes.reduce(
  //       (acc: Big, current: { volume_usd: string }) => {
  //         return Big(current.volume_usd).add(acc)
  //       },
  //       0
  //     )

  //     setInfoPool({
  //       tvl: BNtoDecimal(Big(data.pool.total_value_locked_usd), 2, 2, 2),
  //       swapFees: BNtoDecimal(Big(swapFees), 2, 2, 2),
  //       withdrawFees: BNtoDecimal(Big(withdrawFees), 2, 2, 2),
  //       volume: BNtoDecimal(Big(volume), 2, 2, 2),
  //       price: data.pool.price_usd,
  //       decimals: data.pool.decimals
  //     })
  //   }
  // }, [data, coinGeckoResponse])

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
                      onClick={() => setOpenModal(true)}
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
              <ChartProducts crpPoolAddress={pool.id} />
              <ScrollUpButton />
              <Change crpPoolAddress={pool.id} />
              {/* <MyAsset
                product={pool}
                price={infoPool.price}
                pid={typeof pool.poolId === 'undefined' ? -1 : pool.poolId}
                decimals={infoPool.decimals}
              /> */}
              {/* <Summary
                strategy={data?.pool.strategy || 'Coming soon...'}
                poolContract={pool.core_address}
                poolController={pool.id}
                summary={pool.summary}
                symbol={pool.symbol}
                link={pool.url}
                icon={pool.logo}
              /> */}
              {/* <PoweredBy partners={pool.partners} /> */}
              {coinGeckoResponse && <Distribution />}
              {/* <ActivityTable product={pool} /> */}
              <TokenDescription symbol={pool.symbol} />
            </S.ProductDetails>
            {/* <PoolOperations
              poolChain={product.chain}
              poolSymbol={product.symbol}
              crpPoolAddress={product.sipAddress}
              corePoolAddress={product.coreAddress}
              productCategories={product.categories}
            /> */}
            <NewPoolOperations />
          </S.Product>
        </S.Container>
      )}
    </>
  )
}

export default Pool
