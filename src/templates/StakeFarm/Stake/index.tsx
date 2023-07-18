import React from 'react'
import Big from 'big.js'
import { useConnectWallet } from '@web3-onboard/react'

import { KacyPoligon, Staking, networks } from '@/constants/tokenAddresses'
import {
  poolsKacyFuji,
  poolsInvestor,
  poolsKacy,
  addressesForReqStakePool
} from '@/constants/pools'

import useStaking from '@/hooks/useStaking'
import useMatomoEcommerce from '@/hooks/useMatomoEcommerce'
import { useTokensData } from '@/hooks/query/useTokensData'
import useGetToken from '@/hooks/useGetToken'

import StakeCard from '@/components/StakeCard'

import * as S from './styles'

const Stake = () => {
  const [investor, setInvestor] = React.useState([false, false])

  const polygonChainId = 137 // choose chain to get token price
  const networkChain = networks[polygonChainId]

  const { trackCategoryPageView } = useMatomoEcommerce()
  const stakingContract = useStaking(Staking)
  const [{ wallet }] = useConnectWallet()
  const { data } = useTokensData({
    chainId: networkChain.chainId,
    tokenAddresses: addressesForReqStakePool
  })
  const { priceToken } = useGetToken({
    nativeTokenAddress: networkChain.nativeCurrency.address,
    tokens: data || {}
  })
  const kacyPrice = priceToken(KacyPoligon.toLowerCase())

  React.useEffect(() => {
    trackCategoryPageView([
      'Stake',
      process.env.NEXT_PUBLIC_MASTER === '1' ? 'Avalanche' : 'Fuji'
    ])
  }, [])

  React.useEffect(() => {
    if (!wallet?.provider) {
      return
    }

    const calc = async () => {
      const res = await Promise.all([
        stakingContract.balance(0, wallet?.accounts[0].address || ''),
        stakingContract.balance(1, wallet?.accounts[0].address || '')
      ])

      setInvestor([
        Big(res[0].toString()).gt(Big(0)),
        Big(res[1].toString()).gt(Big(0))
      ])
    }

    calc()
  }, [wallet])

  return (
    <S.GridStaking>
      {process.env.NEXT_PUBLIC_MASTER === '1'
        ? poolsKacy.map(pool => (
            <StakeCard
              key={pool.pid}
              pool={pool}
              kacyPrice={Big(kacyPrice)}
              poolPrice={Big(kacyPrice)}
            />
          ))
        : poolsKacyFuji.map(pool => (
            <StakeCard
              key={pool.pid}
              pool={pool}
              kacyPrice={Big(kacyPrice)}
              poolPrice={Big(kacyPrice)}
            />
          ))}
      {process.env.NEXT_PUBLIC_MASTER === '1' &&
        poolsInvestor.map((pool, i) => {
          if (investor[i] && pool.pid === i) {
            return (
              <StakeCard
                key={pool.pid}
                pool={pool}
                kacyPrice={Big(kacyPrice)}
                poolPrice={Big(kacyPrice)}
              />
            )
          }
        })}
    </S.GridStaking>
  )
}

export default Stake
