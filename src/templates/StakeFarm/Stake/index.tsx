import React from 'react'
import BigNumber from 'bn.js'
import { useConnectWallet } from '@web3-onboard/react'

import { Staking } from '@/constants/tokenAddresses'

import useMatomoEcommerce from '@/hooks/useMatomoEcommerce'
import useStaking from '@/hooks/useStaking'

import StakeCard from '@/components/StakeCard'

import * as S from './styles'

import { poolsKacyFuji, poolsInvestor, poolsKacy } from '@/constants/pools'

const Stake = () => {
  const [investor, setInvestor] = React.useState([false, false])

  const { trackCategoryPageView } = useMatomoEcommerce()
  const { balance } = useStaking(Staking)
  const [{ wallet }] = useConnectWallet()

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
        balance(0, wallet?.accounts[0].address || ''),
        balance(1, wallet?.accounts[0].address || '')
      ])

      setInvestor([
        res[0].gt(new BigNumber('0')),
        res[1].gt(new BigNumber('0'))
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
              pid={pool.pid}
              symbol={pool.symbol}
              properties={{ ...pool.properties }}
              stakeWithVotingPower={pool.stakeWithVotingPower}
              stakeWithLockPeriod={pool.stakeWithLockPeriod}
              isLP={pool.isLP}
              chain={pool.chain}
              stakingAddress={pool.stakingContract}
            />
          ))
        : poolsKacyFuji.map(pool => (
            <StakeCard
              key={pool.pid}
              pid={pool.pid}
              symbol={pool.symbol}
              properties={{ ...pool.properties }}
              stakeWithVotingPower={pool.stakeWithVotingPower}
              stakeWithLockPeriod={pool.stakeWithLockPeriod}
              isLP={pool.isLP}
              chain={pool.chain}
              stakingAddress={pool.stakingContract}
            />
          ))}
      {process.env.NEXT_PUBLIC_MASTER === '1' &&
        poolsInvestor.map((pool, i) => {
          if (investor[i] && pool.pid === i) {
            return (
              <StakeCard
                key={pool.pid}
                pid={pool.pid}
                symbol={pool.symbol}
                properties={{ ...pool.properties }}
                stakeWithVotingPower={pool.stakeWithVotingPower}
                stakeWithLockPeriod={pool.stakeWithLockPeriod}
                isLP={pool.isLP}
                chain={pool.chain}
                stakingAddress={pool.stakingContract}
              />
            )
          }
        })}
    </S.GridStaking>
  )
}

export default Stake
