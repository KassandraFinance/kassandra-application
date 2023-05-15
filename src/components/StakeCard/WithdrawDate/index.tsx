/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'

import { Staking } from '../../../constants/tokenAddresses'

import { useCountdown } from '@/hooks/useCountDown'
import useStakingContract from '../../../hooks/useStakingContract'

import * as S from './styles'

interface IWithdrawDateProps {
  pid: number
  userWalletAddress: string
}

const WithdrawDate = ({ pid, userWalletAddress }: IWithdrawDateProps) => {
  const [withdrawDelay, setWithdrawDelay] = React.useState(0)

  const { stakedUntil } = useStakingContract(Staking)
  const { dateFormated } = useCountdown(withdrawDelay)

  async function handleWithdrawDelay() {
    const unix_timestamp = await stakedUntil(pid, userWalletAddress)
    const countDownDate = new Date(Number(unix_timestamp) * 1000).getTime()

    setWithdrawDelay(countDownDate)
  }

  React.useEffect(() => {
    handleWithdrawDelay()
  }, [])

  return <S.WithdrawDate>Withdraw in {dateFormated ?? 0}</S.WithdrawDate>
}

export default WithdrawDate
