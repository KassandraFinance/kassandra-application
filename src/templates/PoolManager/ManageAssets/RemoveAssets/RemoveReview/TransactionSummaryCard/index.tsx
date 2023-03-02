import React from 'react'

import * as S from './styles'

// interface ITransactionSummaryCardProps {
//   test: string;
// }

const TransactionSummaryCard = () => {
  return (
    <S.TransactionSummaryCard>
      <h3>Transaction summary</h3>

      <S.TransactionSummaryCardBody>
        <S.LpSendWrapper>
          <p>LP Sent</p>

          <S.LpSendValueWrapper>
            <S.LpSendValue>
              <p>500</p>
              <span>~$500.00</span>
            </S.LpSendValue>
            <img src="" alt="" width={20} height={20} />
          </S.LpSendValueWrapper>
        </S.LpSendWrapper>

        <S.RemovalInformationList>
          <S.RemovalInformation>
            <p>Asset removed</p>

            <S.SymbolAndImgWrapper>
              <p>wBTC</p>
              <img src="" alt="" width={20} height={20} />
            </S.SymbolAndImgWrapper>
          </S.RemovalInformation>

          <S.RemovalInformation>
            <p>Received (est.)</p>

            <S.ReceivedInfo>
              <p>$ 3,4567</p>
              <span>3,4567 WBTC</span>
            </S.ReceivedInfo>
          </S.RemovalInformation>

          <S.RemovalInformation>
            <p>Allocation</p>
            <S.AllocationValue>37%</S.AllocationValue>
          </S.RemovalInformation>
        </S.RemovalInformationList>
      </S.TransactionSummaryCardBody>
    </S.TransactionSummaryCard>
  )
}

export default TransactionSummaryCard
