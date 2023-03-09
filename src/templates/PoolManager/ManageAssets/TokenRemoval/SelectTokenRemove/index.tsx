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

  const inputRef = React.useRef<HTMLInputElement>(null)

  function handleCheckLpNeeded() {
    const { balanceInWallet, value } = lpNeeded

    if (tokenSelection.address === '') return colorType.NEUTRAL

    if (balanceInWallet.gte(value)) {
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

  function handleInvalid(event: any) {
    if (!lpNeeded.balanceInWallet.gte(lpNeeded.value)) {
      return event.target.setCustomValidity(
        "you don't have enough LP to remove that asset!"
      )
    }
  }

  return (
    <S.SelectTokenRemove>
      <SelectToken />
      <S.RemovedTokenReviewCard>
        <S.LineRemovedTokenReview>
          <S.ValueText>Allocation</S.ValueText>
          {tokenSelection.weight !== '' ? (
            <S.AllocationAndHoldingValue>
              {(Number(tokenSelection.weight ?? 0) * 100).toFixed(2)}%
            </S.AllocationAndHoldingValue>
          ) : (
            <S.AllocationAndHoldingValue>---</S.AllocationAndHoldingValue>
          )}
        </S.LineRemovedTokenReview>
        <S.LineRemovedTokenReview>
          <S.ValueText>Holding</S.ValueText>
          <S.TokenValueContainer>
            {tokenSelection.balanceUSD !== 0 ? (
              <S.AllocationAndHoldingValue>
                ${Number(tokenSelection.balanceUSD).toFixed(2)}
              </S.AllocationAndHoldingValue>
            ) : (
              <S.AllocationAndHoldingValue>---</S.AllocationAndHoldingValue>
            )}
            {tokenSelection.balance !== 0 ? (
              <S.TextBalance>
                {Number(tokenSelection.balance).toFixed(2)}{' '}
                {tokenSelection.symbol}
              </S.TextBalance>
            ) : (
              <S.TextBalance>---</S.TextBalance>
            )}
          </S.TokenValueContainer>
        </S.LineRemovedTokenReview>
        <S.LineRemovedTokenReview>
          <S.ValueText color={color[handleCheckLpNeeded()]}>
            Lp needed for removal
          </S.ValueText>
          <S.TokenValueContainer>
            {!lpNeeded.value.lte(0) ? (
              <S.AllocationAndHoldingValue>
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
              {tokenSelection.address !== ''
                ? BNtoDecimal(lpNeeded.balanceInWallet, 18, 2)
                : '---'}
              <input
                form="manageAssetsForm"
                id="inputBalanceValue"
                name="inputBalanceValue"
                type="radio"
                value={BNtoDecimal(lpNeeded.balanceInWallet, 18, 2)}
                onInvalid={handleInvalid}
                ref={inputRef}
                required
                checked={lpNeeded.balanceInWallet.gte(lpNeeded.value)}
                onChange={() => {
                  return
                }}
              />
            </S.TextBalance>
          </S.TokenValueContainer>
        </S.LineRemovedTokenReview>
      </S.RemovedTokenReviewCard>

      <S.NotificationStatusContainer
        showError={!lpNeeded.balanceInWallet.gte(lpNeeded.value)}
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
