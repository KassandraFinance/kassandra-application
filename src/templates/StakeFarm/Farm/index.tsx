import React from 'react'

import useMatomoEcommerce from '@/hooks/useMatomoEcommerce'

import StakeCard from '@/components/StakeCard'

import {
  AHYPE_ADDRESS,
  PHYPE,
  PoolType,
  TRICRYPTO_ADDRESS,
  WAVAX_POLYGON,
  poolsFunds
} from '@/constants/pools'

import * as S from './styles'
import {
  BACKEND_KASSANDRA,
  KacyPoligon,
  WETH_POLYGON,
  networks
} from '@/constants/tokenAddresses'
import useCoingecko from '@/hooks/useCoingecko'
import Big from 'big.js'
import { GET_INFO_POOL } from '../graphql'
import request from 'graphql-request'
import useSWR from 'swr'
import usePriceLP from '@/hooks/usePriceLPEthers'

const Farm = () => {
  const [poolPrice, setPoolPrice] = React.useState<Record<string, Big>>({})

  const networkChain = networks[137]
  const { priceToken } = useCoingecko(
    networkChain.chainId,
    networkChain.nativeCurrency.address,
    [WETH_POLYGON, KacyPoligon, WAVAX_POLYGON]
  )
  const { trackCategoryPageView } = useMatomoEcommerce()
  const { getPricePoolLP } = usePriceLP(137)

  const poolFarmsAddresses = [PHYPE.id, TRICRYPTO_ADDRESS, AHYPE_ADDRESS]
  const { data } = useSWR(
    [GET_INFO_POOL, poolFarmsAddresses],
    (query, addresses) => request(BACKEND_KASSANDRA, query, { addresses })
  )

  const kacyPrice = priceToken(KacyPoligon.toLowerCase())

  async function getPoolsPrices() {
    if (!data || Big(kacyPrice ?? 0).lte(0)) return

    const poolPriceList = {}
    for (const [i, pool] of poolsFunds.entries()) {
      switch (pool.type) {
        case PoolType.FARM:
          Object.assign(poolPriceList, {
            [pool.poolPriceAddress]:
              data?.pools?.find(
                (token: any) => token.address === pool.poolPriceAddress
              )?.price_usd ?? '0'
          })
          break

        case PoolType.LP:
          Object.assign(poolPriceList, {
            [pool.poolPriceAddress]: await getPricePoolLP(
              Big(priceToken(pool?.poolPriceAddress.toLowerCase()) ?? '0'),
              pool?.lpPool
            )
          })
          break
      }
    }

    setPoolPrice(poolPriceList)
  }

  React.useEffect(() => {
    getPoolsPrices()
  }, [data, kacyPrice])

  console.log(poolPrice)
  React.useEffect(() => {
    trackCategoryPageView([
      'farm',
      process.env.NEXT_PUBLIC_MASTER === '1' ? 'Avalanche' : 'Fuji'
    ])
  }, [])

  return (
    <S.GridStaking>
      {poolsFunds.map(pool => {
        return (
          <StakeCard
            key={pool.pid}
            pid={pool.pid}
            address={pool.address}
            symbol={pool.symbol}
            properties={{ ...pool.properties }}
            stakeWithVotingPower={pool.stakeWithVotingPower}
            stakeWithLockPeriod={pool.stakeWithLockPeriod}
            isLP={pool.isLP}
            stakingAddress={pool.stakingContract}
            chain={pool.chain}
            //
            //pool={pool}
            kacyPrice={Big(kacyPrice ?? 0)}
            poolPrice={Big(poolPrice[pool?.poolPriceAddress] ?? 0)}
          />
        )
      })}
    </S.GridStaking>
  )
}

export default Farm
