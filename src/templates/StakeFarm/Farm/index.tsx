import React from 'react'
import Big from 'big.js'

import { KacyPoligon, networks } from '@/constants/tokenAddresses'
import {
  PoolType,
  addressesForReqFarmPool,
  addressesForReqLpPool,
  poolsFunds
} from '@/constants/pools'

import usePriceLP from '@/hooks/usePriceLPEthers'
import useMatomoEcommerce from '@/hooks/useMatomoEcommerce'
import { usePoolsPriceList } from '@/hooks/query/usePoolsPriceList'
import { useTokensData } from '@/hooks/query/useTokensData'
import useGetToken from '@/hooks/useGetToken'

import StakeCard from '@/components/StakeCard'

import * as S from './styles'

const Farm = () => {
  const [poolPrice, setPoolPrice] = React.useState<Record<string, Big>>({})

  const polygonChainId = 137 // choose chain to get token price
  const networkChain = networks[polygonChainId]

  const { data } = usePoolsPriceList({ addresses: addressesForReqFarmPool })
  const { data: priceTokensData } = useTokensData({
    chainId: networkChain.chainId,
    tokenAddresses: addressesForReqLpPool
  })
  const { priceToken } = useGetToken({
    nativeTokenAddress: networkChain.nativeCurrency.address,
    tokens: priceTokensData || {}
  })
  const { getPricePoolLP } = usePriceLP()
  const { trackCategoryPageView } = useMatomoEcommerce()

  const kacyPrice = priceToken(KacyPoligon.toLowerCase())

  async function getPoolsPrices() {
    if (!data || Big(kacyPrice).lte(0)) return

    const poolPriceList = {}
    for (const pool of poolsFunds) {
      switch (pool.type) {
        case PoolType.FARM:
          Object.assign(poolPriceList, {
            [pool.poolTokenAddress]:
              data?.find(token => token.address === pool.poolTokenAddress)
                ?.price_usd ?? '0'
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
                priceToken(pool.poolTokenAddress.toLowerCase())
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
