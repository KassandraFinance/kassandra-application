import React from 'react'
import router from 'next/router'
import Big from 'big.js'
import request from 'graphql-request'
import useSWR from 'swr'
import { AbiItem } from 'web3-utils'

import { BACKEND_KASSANDRA } from '@/constants/tokenAddresses'
import KassandraController from '@/constants/abi/KassandraController.json'
import { GET_FEES } from './graphql'

import { useAppSelector } from '@/store/hooks'

import { BNtoDecimal } from '@/utils/numerals'
import { getDateDiff } from '@/utils/date'
import web3 from '@/utils/web3'

import TitleSection from '@/components/TitleSection'
import FeesChart, { FeeGraph } from './FeesChart'

import Button from '@ui/Button'
import Loading from '@ui/Loading'

import poolsAssetsIcon from '../../../../public/assets/iconGradient/assets-distribution.svg'

import * as S from './styles'

const dataMock: Fees[] = [ 
  {
    "timestamp": 1678924800,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'
  },
  {
    "timestamp": 1678320000,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1677715200,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1677110400,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1676505600,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1675900800,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1675296000,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1674691200,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1674086400,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1673481600,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1672876800,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1672272000,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1671667200,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1671062400,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1670457600,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1669852800,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1669248000,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1668643200,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1668038400,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1667433600,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1666828800,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1666224000,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1665619200,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1665014400,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1664409600,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1663804800,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1663200000,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1662595200,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1661990400,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1661385600,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1660780800,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1660176000,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1659571200,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1658966400,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1658361600,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1657756800,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1657152000,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1656547200,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1655942400,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1655337600,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1654732800,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1654128000,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1653523200,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1652918400,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1652313600,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1651708800,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1651104000,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },
  {
    "timestamp": 1650499200,
    period: 1,
    type: 'join',
    volume_broker_usd: '0',
    volume_usd: '15'  },






  {
    "timestamp": 1678924800,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'
  },
  {
    "timestamp": 1678320000,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1677715200,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1677110400,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1676505600,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1675900800,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1675296000,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1674691200,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1674086400,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1673481600,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1672876800,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1672272000,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1671667200,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1671062400,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1670457600,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1669852800,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1669248000,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1668643200,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1668038400,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1667433600,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1666828800,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1666224000,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1665619200,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1665014400,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1664409600,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1663804800,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1663200000,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1662595200,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1661990400,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1661385600,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1660780800,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1660176000,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1659571200,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1658966400,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1658361600,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1657756800,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1657152000,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1656547200,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1655942400,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1655337600,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1654732800,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1654128000,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1653523200,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1652918400,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1652313600,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1651708800,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1651104000,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
  {
    "timestamp": 1650499200,
    period: 1,
    type: 'aum',
    volume_broker_usd: '0',
    volume_usd: '10'  },
]

type Fees = {
  type: 'join' | 'aum',
  period: number,
  volume_usd: string,
  volume_broker_usd: string | null,
  timestamp: number
}


type Result = {
  pool: {
    manager: {
      id: string
    },

    price_usd: string,
    symbol: string,
    controller: string,
    fee_join_manager: string,
    fee_join_broker: string,

    total_fees_join_manager_usd: string,
    total_fees_join_broker_usd: string,

    total_fees_aum_usd: string,
    fee_aum: string,

    fees: Fees[],

    lasCollectedAum: Fees[]
  }
}

const FeeRewards = () => {
  const [feesAum, setFeesAum] = React.useState({ kassandra: '0', manager: '0' })

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const userWalletAddress = useAppSelector(state => state.userWalletAddress)

  const { data } = useSWR<Result>([GET_FEES, poolId], (query, poolId) =>
    request(BACKEND_KASSANDRA, query, { poolId })
  )

  const pool = data?.pool ?? undefined
  const dateDiff = getDateDiff(pool ? pool?.lasCollectedAum[0].timestamp * 1000 : 1)

  function createIntervalTime(months = 12): Array<number> {
    const date = new Date()
    let year = date.getUTCFullYear()
    let month = date.getUTCMonth()
    const periods = []
    for (let index = 0; index < months; index++) {
      const dateTime = Date.UTC(year, month, 1, 0, 0, 0, 0)
      periods.push(dateTime / 1000)
      month = month === 1 ? months : month - 1
      year = month === months ? year - 1 : year
    }
    return periods
  }

  function addTotalOnFees(fees: Fees[]): FeeGraph {
    const periods = createIntervalTime()
    const size = periods.length
    const aggFees: FeeGraph = new Array(periods.length)
    for (let index = 0; index < size; index++) {
      aggFees[index] = {
        feesAumManager: '0',
        feesJoinManager: '0',
        totalFeesToManager: '0',
        timestamp: periods[index]
      }
    }
    for (const fee of fees) {
      const index = periods.findIndex(period => fee.timestamp > period)
      const feeBroker = Big(fee.volume_broker_usd ?? 0)
      if (index !== -1) {
        const feesToManager = Big(fee.volume_usd).sub(feeBroker)
        aggFees[index].totalFeesToManager = Big(aggFees[index].totalFeesToManager).add(feesToManager).toFixed()
        if (fee.type === 'aum') {
          const feeManager = aggFees[index].feesAumManager
          aggFees[index].feesAumManager = Big(feeManager).add(feesToManager).toFixed()
        } else {
          const feeManager = aggFees[index].feesJoinManager
          aggFees[index].feesJoinManager = Big(feeManager).add(feesToManager).toFixed()
        }
      }
    }
    return  aggFees
  }
  
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



  return pool ? (
    <S.FeeRewards>
      <S.FeesContainer>
        <S.AumFees>
          <S.AvailableAumFees>
            <h3>Available Rewards</h3>
            <S.ManagerFee>
              <p>MANAGEMENT FEE ({BNtoDecimal(Big(pool.fee_aum), 4)}%)</p>
              <S.AmountFees>
                <span>${BNtoDecimal(Big(pool.price_usd).mul(feesAum.manager).div(1e18), 18)}</span>
                <span>{`${BNtoDecimal(Big(feesAum.manager).div(Big(10).pow(18)), 18)} ${pool.symbol}`}</span>
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
              onClick={() => { handleClaimRewards(pool.controller) }}
            />
          </S.AvailableAumFees>
          <S.ClaimedRewards>
            <p>ALL TIME REWARDS</p>
            <span>${Big(pool.total_fees_aum_usd).add(pool.total_fees_join_manager_usd).toFixed(2)}</span>
          </S.ClaimedRewards>
        </S.AumFees>

        <S.FeeBreakdownContainer>
          <h3>Fee Breakdown</h3>
          <hr />
          <S.ReviewListContainer>
            <S.ListContent>
              <S.FeeBreakdownTitle>Deposit fee</S.FeeBreakdownTitle>
              <S.FeeBreakdownPorcentage>
                {BNtoDecimal(
                  Big(pool.fee_join_manager).add(pool.fee_join_broker),
                  4
                )}
                %
              </S.FeeBreakdownPorcentage>
            </S.ListContent>
            <S.ListContent>
              <S.FeeBreakdownParagraph>
                Broker commission ({BNtoDecimal(Big(pool.fee_join_broker), 4)}%)
              </S.FeeBreakdownParagraph>
              <S.FeeBreakdownParagraphAmount>
                ${Big(pool.total_fees_join_broker_usd).toFixed(2)}
              </S.FeeBreakdownParagraphAmount>
            </S.ListContent>
            <S.ListContent>
              <S.FeeBreakdownParagraph>
                Manager share ({BNtoDecimal(Big(pool.fee_join_manager), 4)}%)
              </S.FeeBreakdownParagraph>
              <S.FeeBreakdownParagraphAmount>
                ${Big(pool.total_fees_join_manager_usd).toFixed(2)}
              </S.FeeBreakdownParagraphAmount>
            </S.ListContent>
            <S.ListContent>
              <S.FeeBreakdownParagraph>All time</S.FeeBreakdownParagraph>
              <S.FeeBreakdownParagraphTotalAMount>
                $
                {Big(pool.total_fees_join_manager_usd)
                  .add(pool.total_fees_join_broker_usd)
                  .toFixed(2)}
              </S.FeeBreakdownParagraphTotalAMount>
            </S.ListContent>
          </S.ReviewListContainer>
          <hr />
          <S.ReviewListContainer>
            <S.ListContent>
              <S.FeeBreakdownTitle>Management Fee</S.FeeBreakdownTitle>
              <S.FeeBreakdownPorcentage>
                {BNtoDecimal(Big(pool.fee_aum).add(pool.fee_aum), 4)}%
              </S.FeeBreakdownPorcentage>
            </S.ListContent>

            <S.ListContent>
              <S.FeeBreakdownParagraph>
                Kassandra Share ({BNtoDecimal(Big(pool.fee_aum), 4)}%)
              </S.FeeBreakdownParagraph>
              <S.FeeBreakdownParagraphAmount>
                ${Big(pool.total_fees_aum_usd).toFixed(2)}
              </S.FeeBreakdownParagraphAmount>
            </S.ListContent>
            <S.ListContent>
              <S.FeeBreakdownParagraph>
                Manager Share ({BNtoDecimal(Big(pool.fee_aum), 4)}%)
              </S.FeeBreakdownParagraph>
              <S.FeeBreakdownParagraphAmount>
                ${Big(pool.total_fees_aum_usd).toFixed(2)}
              </S.FeeBreakdownParagraphAmount>
            </S.ListContent>
            <S.ListContent>
              <S.FeeBreakdownParagraph>All time</S.FeeBreakdownParagraph>
              <S.FeeBreakdownParagraphTotalAMount>
                $
                {Big(pool.total_fees_aum_usd)
                  .add(pool.total_fees_aum_usd)
                  .toFixed(2)}
              </S.FeeBreakdownParagraphTotalAMount>
            </S.ListContent>
          </S.ReviewListContainer>
          <hr />
        </S.FeeBreakdownContainer>
      </S.FeesContainer>

      <S.FeesChartContainer>
        <S.TitleWrapper>
          <TitleSection title="Pool Assets" image={poolsAssetsIcon} />
        </S.TitleWrapper>
          <FeesChart fees={addTotalOnFees(dataMock)} />
      </S.FeesChartContainer>
    </S.FeeRewards>
  ) : (
    <Loading marginTop={10} />
  )
}

export default FeeRewards
