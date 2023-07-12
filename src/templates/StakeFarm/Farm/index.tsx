import React from 'react'
import Big from 'big.js'
import useSWR from 'swr'
import request from 'graphql-request'

import {
  BACKEND_KASSANDRA,
  KacyPoligon,
  networks
} from '@/constants/tokenAddresses'
import { GET_INFO_POOL } from './graphql'
import {
  PoolType,
  addressesForReqFarmPool,
  addressesForReqLpPool,
  poolsFunds
} from '@/constants/pools'

import useCoingecko from '@/hooks/useCoingecko'
import usePriceLP from '@/hooks/usePriceLPEthers'
import useMatomoEcommerce from '@/hooks/useMatomoEcommerce'

import StakeCard from '@/components/StakeCard'

import * as S from './styles'

interface IDataFarmPriceProps {
  pools: {
    price_usd: string
    address: string
  }[]
}

const Farm = () => {
  const [poolPrice, setPoolPrice] = React.useState<Record<string, Big>>({})

  const polygonChainId = 137 // choose chain to get token price
  const networkChain = networks[polygonChainId]
  const { priceToken } = useCoingecko(
    networkChain.chainId,
    networkChain.nativeCurrency.address,
    addressesForReqLpPool
  )
  const { getPricePoolLP } = usePriceLP(137)
  const { trackCategoryPageView } = useMatomoEcommerce()

  const { data } = useSWR<IDataFarmPriceProps>(
    [GET_INFO_POOL, addressesForReqFarmPool],
    (query, addresses) => request(BACKEND_KASSANDRA, query, { addresses })
  )

  const kacyPrice = priceToken(KacyPoligon.toLowerCase())

  async function getPoolsPrices() {
    if (!data || Big(kacyPrice).lte(0)) return

    const poolPriceList = {}
    for (const pool of poolsFunds) {
      switch (pool.type) {
        case PoolType.FARM:
          Object.assign(poolPriceList, {
            [pool.poolTokenAddress]:
              data?.pools?.find(
                token => token.address === pool.poolTokenAddress
              )?.price_usd ?? '0'
          })
          break

        case PoolType.LP:
          Object.assign(poolPriceList, {
            [pool.poolTokenAddress]: await getPricePoolLP({
              lpType: pool.lpPool?.type,
              chainId: pool.chain.id,
              poolAddress: pool.address,
              tokenPoolAddress: pool.poolTokenAddress,
              balancerPoolId: pool.lpPool?.balancerPoolId,
              tokenPoolPrice: Big(
                priceToken(pool?.poolTokenAddress.toLowerCase())
              )
            })
          })
          break
      }
    }

    setPoolPrice(poolPriceList)
  }

  React.useEffect(() => {
    getPoolsPrices()
  }, [data, kacyPrice])

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
            pool={pool}
            kacyPrice={Big(kacyPrice)}
            poolPrice={Big(poolPrice[pool?.poolTokenAddress] ?? 0)}
          />
        )
      })}
    </S.GridStaking>
  )
}

export default Farm
