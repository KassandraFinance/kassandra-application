import React from 'react'

import SelectToken from './SelectToken'

import * as S from './styles'

// interface SelectTokenRemove {
//   test: string;
// }

const SelectTokenRemove = () => {
  return (
    <S.SelectTokenRemove>
      <SelectToken />
      <S.RemovedTokenReviewCard>
        <S.LineRemovedTokenReview>
          <S.ValueText>Allocation</S.ValueText>
          {/* <S.AllocationAndHoldingValue>---</S.AllocationAndHoldingValue> */}
          <S.AllocationAndHoldingValue>37%</S.AllocationAndHoldingValue>
        </S.LineRemovedTokenReview>
        <S.LineRemovedTokenReview>
          <S.ValueText>Holding</S.ValueText>
          <S.TokenValueContainer>
            {/* <S.AllocationAndHoldingValue>---</S.AllocationAndHoldingValue>
            <S.TextBalance>---</S.TextBalance> */}
            <S.AllocationAndHoldingValue>$ 3,4567</S.AllocationAndHoldingValue>
            <S.TextBalance>3,4567 WBTC</S.TextBalance>
          </S.TokenValueContainer>
        </S.LineRemovedTokenReview>
        <S.LineRemovedTokenReview>
          <S.ValueText color="#2CE878" /* color="#E8372C" */>
            Lp needed for removal
          </S.ValueText>
          <S.TokenValueContainer>
            <S.AllocationAndHoldingValue>14000</S.AllocationAndHoldingValue>
            {/* <S.AllocationAndHoldingValue>---</S.AllocationAndHoldingValue> */}
            <S.TextBalance>
              <img
                src="/assets/utilities/wallet.svg"
                alt=""
                width={12}
                height={10}
              />{' '}
              <strong>Balance:</strong>
              {/* --- */}
              14000 LP
            </S.TextBalance>
          </S.TokenValueContainer>
        </S.LineRemovedTokenReview>
      </S.RemovedTokenReviewCard>
      <S.NotificationStatusContainer>
        <img src="/assets/notificationStatus/queued.svg" alt="" />
        <p>You still need 9000 LP to remove wBTC from this pool</p>
      </S.NotificationStatusContainer>
    </S.SelectTokenRemove>
  )
}

export default SelectTokenRemove
