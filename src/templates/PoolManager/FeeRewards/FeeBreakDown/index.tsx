import Big from 'big.js'

import { BNtoDecimal } from '@/utils/numerals'

import { Pool } from '../index'

import * as S from './styles'

type Props = {
  pool: Pool
}

const FeeBreakDown = ({ pool }: Props) => {
  return (
    <S.FeeBreakdown>
      <h3>Fee Breakdown</h3>
      <hr />
      <S.ReviewListContainer>
        <S.ListContent>
          <S.FeeBreakdownTitle>Deposit fee</S.FeeBreakdownTitle>
          <S.FeeBreakdownPorcentage>
            {BNtoDecimal(
              Big(pool.fee_join_manager).add(pool.fee_join_broker).mul(100),
              4
            )}
            %
          </S.FeeBreakdownPorcentage>
        </S.ListContent>
        <S.ListContent>
          <S.FeeBreakdownParagraph>
            Broker commission (
            {BNtoDecimal(Big(pool.fee_join_broker).mul(100), 4)}%)
          </S.FeeBreakdownParagraph>
          <S.FeeBreakdownParagraphAmount>
            ${Big(pool.total_fees_join_broker_usd).toFixed(2)}
          </S.FeeBreakdownParagraphAmount>
        </S.ListContent>
        <S.ListContent>
          <S.FeeBreakdownParagraph>
            Manager share ({BNtoDecimal(Big(pool.fee_join_manager).mul(100), 4)}
            %)
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
            {BNtoDecimal(Big(pool.fee_aum).mul(100), 4)}%
          </S.FeeBreakdownPorcentage>
        </S.ListContent>

        <S.ListContent>
          <S.FeeBreakdownParagraph>
            Kassandra Share (
            {BNtoDecimal(Big(pool.fee_aum_kassandra).mul(100), 4)}%)
          </S.FeeBreakdownParagraph>
          <S.FeeBreakdownParagraphAmount>
            ${Big(pool.total_fees_aum_kassandra_usd).toFixed(2)}
          </S.FeeBreakdownParagraphAmount>
        </S.ListContent>
        <S.ListContent>
          <S.FeeBreakdownParagraph>
            Manager Share (
            {BNtoDecimal(
              Big(pool.fee_aum).sub(pool.fee_aum_kassandra).mul(100),
              4
            )}
            %)
          </S.FeeBreakdownParagraph>
          <S.FeeBreakdownParagraphAmount>
            ${Big(pool.total_fees_aum_manager_usd).toFixed(2)}
          </S.FeeBreakdownParagraphAmount>
        </S.ListContent>
        <S.ListContent>
          <S.FeeBreakdownParagraph>All time</S.FeeBreakdownParagraph>
          <S.FeeBreakdownParagraphTotalAMount>
            $
            {Big(pool.total_fees_aum_manager_usd)
              .add(pool.total_fees_aum_kassandra_usd)
              .toFixed(2)}
          </S.FeeBreakdownParagraphTotalAMount>
        </S.ListContent>
      </S.ReviewListContainer>
    </S.FeeBreakdown>
  )
}

export default FeeBreakDown
