import React from 'react'
import Big from 'big.js'

import { useAppSelector } from '@/store/hooks'

import { BNtoDecimal } from '@/utils/numerals'

import TokenWithNetworkImage from '@/components/TokenWithNetworkImage'

import * as S from './styles'

const TransactionSummaryCard = () => {
  const { tokenSelection, poolInfo, lpNeeded } = useAppSelector(
    state => state.removeAsset
  )

  return (
    <S.TransactionSummaryCard>
      <h3>Transaction summary</h3>

      <S.TransactionSummaryCardBody>
        <S.LpSendWrapper>
          <p>LP Sent</p>

          <S.LpSendValueWrapper>
            <S.LpSendValue>
              <p>{BNtoDecimal(lpNeeded.value, 2)}</p>
              <span>~${BNtoDecimal(lpNeeded.valueInDollar, 2)}</span>
            </S.LpSendValue>
            <TokenWithNetworkImage
              tokenImage={{
                url: poolInfo.logo,
                height: 20,
                width: 20,
                withoutBorder: true
              }}
              networkImage={{
                url: poolInfo.chainLogo,
                height: 10,
                width: 10
              }}
              blockies={{
                size: 4,
                scale: 7,
                seedName: poolInfo.name
              }}
            />
          </S.LpSendValueWrapper>
        </S.LpSendWrapper>

        <S.RemovalInformationList>
          <S.RemovalInformation>
            <p>Asset removed</p>

            <S.SymbolAndImgWrapper>
              <p>{tokenSelection.symbol}</p>
              <img src={tokenSelection.logo} alt="" width={20} height={20} />
            </S.SymbolAndImgWrapper>
          </S.RemovalInformation>

          <S.RemovalInformation>
            <p>Received (est.)</p>

            <S.ReceivedInfo>
              <p>$ {tokenSelection.balanceUSD?.toFixed(2)}</p>
              <span>
                {BNtoDecimal(
                  Big(tokenSelection.balance),
                  tokenSelection.decimals,
                  2
                )}{' '}
                {tokenSelection.symbol}
              </span>
            </S.ReceivedInfo>
          </S.RemovalInformation>

          <S.RemovalInformation>
            <p>Allocation</p>
            <S.AllocationValue>
              {(Number(tokenSelection.weight) * 100).toFixed(2)}%
            </S.AllocationValue>
          </S.RemovalInformation>
        </S.RemovalInformationList>
      </S.TransactionSummaryCardBody>
    </S.TransactionSummaryCard>
  )
}

export default TransactionSummaryCard
