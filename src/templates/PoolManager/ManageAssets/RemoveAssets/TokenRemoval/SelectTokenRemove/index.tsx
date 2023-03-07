import React from 'react'

import { BNtoDecimal } from '@/utils/numerals'

import { useAppSelector } from '@/store/hooks'

import SelectToken from './SelectToken'

import * as S from './styles'

enum colorType {
  NEUTRAL,
  POSITIVE,
  NEGATIVE
}

const SelectTokenRemove = () => {
  const { tokenSelection, lpNeeded } = useAppSelector(
    state => state.removeAsset
  )

  function handleCheckLpNeeded() {
    const { balance, value } = lpNeeded

    if (balance.lte(0)) return colorType.NEUTRAL

    if (balance.gte(value)) {
      return colorType.POSITIVE
    } else {
      return colorType.NEGATIVE
    }
  }

  const color = {
    0: '#bdbdbd',
    1: '#2CE878',
    2: '#E8372C'
  }

  return (
    <S.SelectTokenRemove>
      <SelectToken />
      <S.RemovedTokenReviewCard>
        <S.LineRemovedTokenReview>
          <S.ValueText>Allocation</S.ValueText>
          {tokenSelection.weight !== '' ? (
            <S.AllocationAndHoldingValue>
              {(Number(tokenSelection.weight) * 100).toFixed(2)}%
            </S.AllocationAndHoldingValue>
          ) : (
            <S.AllocationAndHoldingValue>---</S.AllocationAndHoldingValue>
          )}
        </S.LineRemovedTokenReview>
        <S.LineRemovedTokenReview>
          <S.ValueText>Holding</S.ValueText>
          <S.TokenValueContainer>
            {tokenSelection ? (
              <>
                <S.AllocationAndHoldingValue>
                  ${Number(tokenSelection.balanceUSD).toFixed(2)}
                </S.AllocationAndHoldingValue>
                <S.TextBalance>
                  {Number(tokenSelection.balance).toFixed(2)}{' '}
                  {tokenSelection.symbol}
                </S.TextBalance>
              </>
            ) : (
              <>
                <S.AllocationAndHoldingValue>---</S.AllocationAndHoldingValue>
                <S.TextBalance>---</S.TextBalance>
              </>
            )}
          </S.TokenValueContainer>
        </S.LineRemovedTokenReview>
        <S.LineRemovedTokenReview>
          <S.ValueText color={color[handleCheckLpNeeded()]}>
            Lp needed for removal
          </S.ValueText>
          <S.TokenValueContainer>
            {lpNeeded ? (
              <S.AllocationAndHoldingValue>
                {/* {(Number(assetSelectionInfo.allocation) * 100).toFixed(2)}% */}
                {BNtoDecimal(lpNeeded.value, tokenSelection.decimals, 2)}
              </S.AllocationAndHoldingValue>
            ) : (
              <S.AllocationAndHoldingValue>---</S.AllocationAndHoldingValue>
            )}
            <S.TextBalance>
              <img
                src="/assets/utilities/wallet.svg"
                alt=""
                width={12}
                height={10}
              />{' '}
              <strong>Balance:</strong>
              {/* --- */}
              {lpNeeded ? BNtoDecimal(lpNeeded.balance, 18, 2) : '---'}
              {/* 14000 LP */}
            </S.TextBalance>
          </S.TokenValueContainer>
        </S.LineRemovedTokenReview>
      </S.RemovedTokenReviewCard>

      <S.NotificationStatusContainer
        showError={!lpNeeded.balance.gte(lpNeeded.value)}
      >
        <img src="/assets/notificationStatus/queued.svg" alt="" />
        <p>
          You still need{' '}
          {BNtoDecimal(lpNeeded.value, tokenSelection.decimals, 2)} LP to remove{' '}
          {tokenSelection.symbol} from this pool
        </p>
      </S.NotificationStatusContainer>
    </S.SelectTokenRemove>
  )
}

export default SelectTokenRemove
