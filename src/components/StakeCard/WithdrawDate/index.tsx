/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useConnectWallet } from '@web3-onboard/react'

import { networks } from '@/constants/tokenAddresses'

import useStaking from '@/hooks/useStaking'
import { useCountdown } from '@/hooks/useCountDown'

import * as S from './styles'

interface IWithdrawDateProps {
  pid: number
  stakingAddress: string
  chainId: number
}

const WithdrawDate = ({ pid, stakingAddress, chainId }: IWithdrawDateProps) => {
  const [withdrawDelay, setWithdrawDelay] = React.useState(0)
  const [{ wallet }] = useConnectWallet()

  const networkChain = networks[chainId]

  const staking = useStaking(stakingAddress, networkChain.chainId)

  const { dateFormated } = useCountdown(withdrawDelay)

  async function handleWithdrawDelay() {
    if (wallet?.provider) {
      const unix_timestamp = await staking.stakedUntil(
        pid,
        wallet?.accounts[0].address
      )
      const countDownDate = new Date(Number(unix_timestamp) * 1000).getTime()

      setWithdrawDelay(countDownDate)
    }
  }

  React.useEffect(() => {
    handleWithdrawDelay()
  }, [])

  return <S.WithdrawDate>Withdraw in {dateFormated ?? 0}</S.WithdrawDate>
}

export default WithdrawDate
