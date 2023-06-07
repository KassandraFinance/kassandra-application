/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useConnectWallet } from '@web3-onboard/react'

import { networks } from '@/constants/tokenAddresses'

import useStaking from '@/hooks/useStaking'

import { BNtoDecimal } from '@/utils/numerals'
import Big from 'big.js'
import BigNumber from 'bn.js'

import * as S from './styles'

interface IKacyEarnedProps {
  pid: number
  userWalletAddress: string
  kacyEarned: BigNumber
  setKacyEarned: React.Dispatch<React.SetStateAction<BigNumber>>
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
      const earnedResponse: BigNumber = await staking.earned(
        pid,
        wallet?.accounts[0].address
      )
      setKacyEarned(earnedResponse)
    }
  }

  React.useEffect(() => {
    const interval = setInterval(async () => {
      getKacyEaned()
    }, 6000)

    getKacyEaned()

    return () => clearInterval(interval)
  }, [userWalletAddress])

  return (
    <S.KacyEarned>
      <p>
        KACY <span>Earned</span>
      </p>
      <h3>
        {kacyEarned.lt(new BigNumber('0'))
          ? '...'
          : BNtoDecimal(kacyEarned, 18, 2)}
      </h3>
      <span>
        <b>&#8776;</b>{' '}
        {kacyEarned.lt(new BigNumber('0')) || kacyPrice.lt(0)
          ? '...'
          : BNtoDecimal(
              Big(kacyEarned.toString()).mul(kacyPrice).div(Big(10).pow(18)),
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
