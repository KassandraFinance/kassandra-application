import React from 'react'
import Big from 'big.js'
import { useConnectWallet } from '@web3-onboard/react'

import { networks } from '@/constants/tokenAddresses'

import Button from '@/components/Button'

import useManagePoolController from '@/hooks/useManagePoolController'

import { getDateDiff } from '@/utils/date'
import { BNtoDecimal } from '@/utils/numerals'

import { Pool } from '../index'

import * as S from './styles'

type Props = {
  pool: Pool
}

const AvailableRewards = ({ pool }: Props) => {
  const [feesAum, setFeesAum] = React.useState({ kassandra: '0', manager: '0' })
  const dateDiff = pool?.lasCollectedAum[0]?.timestamp
    ? getDateDiff(pool?.lasCollectedAum[0]?.timestamp * 1000)
    : { string: 'days', value: 0 }

  const lastHarvest = pool?.last_harvest
    ? getDateDiff(Number(pool.last_harvest) * 1000)
    : { string: 'days', value: 0 }

  const [{ wallet }] = useConnectWallet()
  const { getAumFeesToManagerAndKassandra, withdrawAumFees } =
    useManagePoolController(pool.controller, networks[pool.chain_id].rpc)

  async function handleClaimRewards() {
    if (!wallet) return

    function handleSuccess() {
      setFeesAum({ kassandra: '0', manager: '0' })
    }

    try {
      await withdrawAumFees(handleSuccess)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    if (!pool || !wallet) return
    const getAvailableAumFee = async () => {
      try {
        const { feesToManager, feesToKassandra } =
          await getAumFeesToManagerAndKassandra(wallet.accounts[0].address)

        setFeesAum({ kassandra: feesToKassandra, manager: feesToManager })
      } catch (error) {
        console.log(error)
      }
    }
    getAvailableAumFee()
  }, [wallet])

  return (
    <S.AvailableRewards>
      <S.AvailableAumFees>
        <h3>Available Rewards</h3>
        <S.ManagerFee>
          <p>
            MANAGEMENT FEE (
            {BNtoDecimal(
              Big(pool.fee_aum).sub(pool.fee_aum_kassandra).mul(100),
              4
            )}
            %)
          </p>
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
          <p>Last reward update</p>
          <span>{`${dateDiff?.value} ${dateDiff?.string} ago`}</span>
        </S.Harvest>

        <S.Harvest>
          <p>Last Harvest</p>
          <span>{`${lastHarvest?.value} ${lastHarvest?.string} ago`}</span>
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
          {Big(pool.total_fees_aum_manager_usd)
            .add(pool.total_fees_join_manager_usd)
            .toFixed(2)}
        </span>
      </S.ClaimedRewards>
    </S.AvailableRewards>
  )
}

export default AvailableRewards
