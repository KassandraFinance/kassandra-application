import React from 'react'
import Big from 'big.js'
import { AbiItem } from 'web3-utils'

import Button from '@/components/Button'

import KassandraController from '@/constants/abi/KassandraController.json'

import { useAppSelector } from '@/store/hooks'

import { getDateDiff } from '@/utils/date'
import { BNtoDecimal } from '@/utils/numerals'
import web3 from '@/utils/web3'

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

    
  async function handleClaimRewards(controller: string) {
    try {
      const controllerContract = new web3.eth.Contract((KassandraController as unknown) as AbiItem, controller)
      await controllerContract.methods.withdrawCollectedManagementFees().send({ from: userWalletAddress })
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    if (!pool) return
    const getAvailableAumFee = async (controller: string) => {
      try {
        const controllerContract = new web3.eth.Contract((KassandraController as unknown) as AbiItem, controller)
        const { feesToManager, feesToKassandra } = await controllerContract.methods.withdrawCollectedManagementFees().call({ from: userWalletAddress })
        setFeesAum({ kassandra: feesToKassandra, manager: feesToManager })
      } catch (error) {
        console.log(error)
      }
    }
    getAvailableAumFee(pool.controller)
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
            handleClaimRewards(pool.controller)
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
