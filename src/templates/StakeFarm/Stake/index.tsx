import React from 'react'
import Big from 'big.js'
import { useConnectWallet } from '@web3-onboard/react'

import {
  BACKEND_KASSANDRA,
  KacyPoligon,
  Staking,
  WETH_POLYGON,
  networks
} from '@/constants/tokenAddresses'

import useMatomoEcommerce from '@/hooks/useMatomoEcommerce'
import useStaking from '@/hooks/useStaking'

import StakeCard from '@/components/StakeCard'

import * as S from './styles'

import {
  poolsKacyFuji,
  poolsInvestor,
  poolsKacy,
  KACY_ADDRESS
} from '@/constants/pools'
import useCoingecko from '@/hooks/useCoingecko'

export interface IInfoStakedProps {
  votingMultiplier: string
  startDate: string
  endDate: string
  kacyRewards: Big
  withdrawDelay: any
  hasExpired: boolean
  apr: Big
  stakingToken: string
  vestingPeriod: string
  lockPeriod: string
}

const Stake = () => {
  const [investor, setInvestor] = React.useState([false, false])

  const { trackCategoryPageView } = useMatomoEcommerce()
  const stakingContract = useStaking(Staking)
  const [{ wallet }] = useConnectWallet()

  const networkChain = networks[43114]
  const { priceToken } = useCoingecko(
    137,
    networkChain.nativeCurrency.address,
    [WETH_POLYGON, KacyPoligon]
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
