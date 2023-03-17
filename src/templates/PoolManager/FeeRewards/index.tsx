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
import web3 from '@/utils/web3'

import Button from '@ui/Button'
import Loading from '@ui/Loading'

import * as S from './styles'

type Result = {
  pool: {
    manager: string,

    price_usd: string,
    symbol: string,
    controller: string,
    fee_join_manager: string,
    fee_join_broker: string,
    total_fees_join_manager: string,
    total_fees_join_broker: string,

    total_fees_join_manager_usd: string,
    total_fees_join_broker_usd: string,

    total_fees_aum_usd: string,
    fee_aum: string
  }
}

const FeeRewards = () => {
  const [feesAum, setFeesAum] = React.useState({ kassandra: '0', manager: '0'})

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const userWalletAddress = useAppSelector(state => state.userWalletAddress)

  const { data } = useSWR<Result>([GET_FEES, poolId], (query, poolId) =>
    request(BACKEND_KASSANDRA, query, { poolId })
  )

  const pool = data?.pool ?? undefined

  React.useEffect(() => {
    if (!pool) return
    const getAvailableAumFee = async (controller: string) => {
      try {
        // eslint-disable-next-line prettier/prettier
        const controllerContract = new web3.eth.Contract((KassandraController as unknown) as AbiItem, controller)
        const {feesToManager, feesToKassandra } = await controllerContract.methods.withdrawCollectedManagementFees().call({ from: userWalletAddress })
        setFeesAum({ kassandra: feesToKassandra, manager: feesToManager })
      } catch (error) {
        console.error(error)
      }
    }
    getAvailableAumFee(userWalletAddress)
  }, [pool])

  async function handleClaimRewards(controller: string) {
    try {
      const controllerContract = new web3.eth.Contract((KassandraController as unknown) as AbiItem, controller)
      await controllerContract.methods.withdrawCollectedManagementFees().call({ from: userWalletAddress })
    } catch (error) {
      console.log(error)
    }
  }

  return pool ? (
    <S.FeeRewards>
      <S.AumFees>
        <S.AvailableAumFees>
          <h3>Available Rewards</h3>
          <S.ManagerFee>
            <p>MANAGEMENT FEE ({BNtoDecimal(Big(pool.fee_aum), 4)}%)</p>
            <S.AmountFees>
              <span>${Big(pool.price_usd).mul(feesAum.manager).toFixed(2)}</span>
              <span>{`${BNtoDecimal(Big(feesAum.manager), 4)} ${pool.symbol}`}</span>
            </S.AmountFees>
          </S.ManagerFee>
          <S.Harvest>
            <p>LAST HARVEST</p>
            <span>27 days agoo</span>
          </S.Harvest>
          <Button
            disabledNoEvent={Big(feesAum.manager).lte(0)}
            backgroundSecondary
            size="large"
            text="Claim Rewards"
            onClick={() => {handleClaimRewards(pool.controller)}}
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
    </S.FeeRewards>
  ) : (
    <Loading marginTop={10} />
  )
}

export default FeeRewards
