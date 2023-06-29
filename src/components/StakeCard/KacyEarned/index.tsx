import React from 'react'
import Big from 'big.js'
import { useConnectWallet } from '@web3-onboard/react'

import { networks } from '@/constants/tokenAddresses'

import useStaking from '@/hooks/useStaking'

import { BNtoDecimal } from '@/utils/numerals'

import * as S from './styles'

interface IKacyEarnedProps {
  pid: number
  userWalletAddress: string
  kacyEarned: Big
  setKacyEarned: React.Dispatch<React.SetStateAction<Big>>
  kacyPrice: Big
  stakingAddress: string
  chainId: number
}

const KacyEarned = ({
  pid,
  userWalletAddress,
  kacyEarned,
  setKacyEarned,
  kacyPrice,
  stakingAddress,
  chainId
}: IKacyEarnedProps) => {
  const networkChain = networks[chainId]
  const staking = useStaking(stakingAddress, networkChain.chainId)
  const [{ wallet }] = useConnectWallet()

  async function getKacyEaned() {
    if (wallet?.provider) {
      const earnedResponse = await staking.earned(
        pid,
        wallet?.accounts[0].address
      )
      setKacyEarned(Big(earnedResponse.toString()))
    }
  }

  React.useEffect(() => {
    const interval = setInterval(async () => {
      getKacyEaned()
    }, 10000)

    getKacyEaned()

    return () => clearInterval(interval)
  }, [userWalletAddress])

  return (
    <S.KacyEarned>
      <p>
        KACY <span>Earned</span>
      </p>
      <h3>
        {kacyEarned.lt(Big(0))
          ? '...'
          : BNtoDecimal(kacyEarned.div(Big(10).pow(18)), 18, 2)}
      </h3>
      <span>
        <b>&#8776;</b>{' '}
        {kacyEarned.lt(Big(0)) || kacyPrice.lt(0)
          ? '...'
          : BNtoDecimal(
              kacyEarned.mul(kacyPrice).div(Big(10).pow(18)),
              6,
              2,
              2
            )}{' '}
        <b>USD</b>
      </span>
    </S.KacyEarned>
  )
}

export default KacyEarned
