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
import useCoingecko from '@/hooks/useCoingecko'
import useMatomoEcommerce from '@/hooks/useMatomoEcommerce'

import StakeCard from '@/components/StakeCard'

import * as S from './styles'

const Stake = () => {
  const [investor, setInvestor] = React.useState([false, false])

  const { trackCategoryPageView } = useMatomoEcommerce()
  const stakingContract = useStaking(Staking)
  const [{ wallet }] = useConnectWallet()

  const networkChain = networks[137]
  const { priceToken } = useCoingecko(
    networkChain.chainId,
    networkChain.nativeCurrency.address,
    addressesForReqStakePool
  )

  const kacyPrice = priceToken(KacyPoligon.toLowerCase()) ?? 0

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
