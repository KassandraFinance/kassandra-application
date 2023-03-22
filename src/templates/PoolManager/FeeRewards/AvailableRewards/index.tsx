import React from 'react'
import Big from 'big.js'

import Button from '@/components/Button'

import useManage from '@/hooks/useManage'
import { useAppSelector } from '@/store/hooks'

import { getDateDiff } from '@/utils/date'
import { BNtoDecimal } from '@/utils/numerals'

import { Pool } from '../index'

import * as S from './styles'

type Props = {
  pool: Pool
}

const AvailableRewards = ({ pool }: Props) => {
  const [feesAum, setFeesAum] = React.useState({ kassandra: '0', manager: '0' })
  const dateDiff = getDateDiff(
    pool ? pool?.lasCollectedAum[0].timestamp * 1000 : 1
  )

  const userWalletAddress = useAppSelector(state => state.userWalletAddress)
  const controller = useManage(pool.controller)

  async function handleClaimRewards() {
    try {
      await controller.withdrawAumFees(userWalletAddress)
      setFeesAum({ kassandra: '0', manager: '0' })
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    if (!pool) return
    const getAvailableAumFee = async () => {
      try {
        const { feesToManager, feesToKassandra } =
          await controller.getAumFeesToManagerAndKassandra(userWalletAddress)
        setFeesAum({ kassandra: feesToKassandra, manager: feesToManager })
      } catch (error) {
        console.log(error)
      }
    }
    getAvailableAumFee()
  }, [pool])

  return (
    <S.AvailableRewards>
      <S.AvailableAumFees>
        <h3>Available Rewards</h3>
        <S.ManagerFee>
          <p>MANAGEMENT FEE ({BNtoDecimal(Big(pool.fee_aum), 4)}%)</p>
          <S.AmountFees>
            <span>
              $
              {BNtoDecimal(
                Big(pool.price_usd).mul(feesAum.manager).div(1e18),
                18
              )}
            </span>
            <span>{`${BNtoDecimal(
              Big(feesAum.manager).div(Big(10).pow(18)),
              18
            )} ${pool.symbol}`}</span>
          </S.AmountFees>
        </S.ManagerFee>
        <S.Harvest>
          <p>LAST HARVEST</p>
          <span>{`${dateDiff?.value} ${dateDiff?.string} ago`}</span>
        </S.Harvest>
        <Button
          disabledNoEvent={Big(feesAum.manager).lte(0)}
          backgroundSecondary
          size="large"
          text="Claim Rewards"
          onClick={() => {
            handleClaimRewards()
          }}
        />
      </S.AvailableAumFees>
      <S.ClaimedRewards>
        <p>ALL TIME REWARDS</p>
        <span>
          $
          {Big(pool.total_fees_aum_usd)
            .add(pool.total_fees_join_manager_usd)
            .toFixed(2)}
        </span>
      </S.ClaimedRewards>
    </S.AvailableRewards>
  )
}

export default AvailableRewards
