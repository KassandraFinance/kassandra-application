import React from 'react'
import Blockies from 'react-blockies'
import Big from 'big.js'

import { BNtoDecimal } from '@/utils/numerals'

import { mockTokens } from '@/constants/tokenAddresses'

import { useAppSelector } from '@/store/hooks'

import SelectToken from './SelectToken'
import WarningCard from '@/components/WarningCard'

import * as S from './styles'

enum colorType {
  NEUTRAL,
  POSITIVE,
  NEGATIVE
}

type IPoolInfoProps = {
  name: string
  symbol: string
  logo?: string
}

interface ISelectTokenRemoveProps {
  poolInfo: IPoolInfoProps
  chainId: number
  priceToken: (address: string) => string
}

// eslint-disable-next-line prettier/prettier
const SelectTokenRemove = ({
  poolInfo,
  priceToken,
  chainId
}: ISelectTokenRemoveProps) => {
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
      <SelectToken priceToken={priceToken} chainId={chainId} />
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
            {tokenSelection.balance !== '0' ? (
              <S.AllocationAndHoldingValue>
                {tokenSelection.logo !== '' && (
                  <img
                    src={tokenSelection.logo}
                    alt=""
                    width={18}
                    height={18}
                  />
                )}
                {Number(tokenSelection.balance).toFixed(2)}{' '}
              </S.AllocationAndHoldingValue>
            ) : (
              <S.AllocationAndHoldingValue>---</S.AllocationAndHoldingValue>
            )}
            {tokenSelection.balance !== '' ? (
              <S.TextBalance>
                $
                {Big(tokenSelection?.balance ?? 0)
                  .mul(
                    Big(
                      priceToken(
                        chainId === 5
                          ? mockTokens[tokenSelection.address]
                          : tokenSelection.address.toLowerCase()
                      ) ?? 0
                    )
                  )
                  .toFixed(2)}
              </S.TextBalance>
            ) : (
              <S.TextBalance>---</S.TextBalance>
            )}
          </S.TokenValueContainer>
        </S.LineRemovedTokenReview>
        <S.LineRemovedTokenReview>
          <S.ValueText color={color[handleCheckLpNeeded()]}>
            {poolInfo.symbol} needed for removal
          </S.ValueText>
          <S.TokenValueContainer>
            {!lpNeeded.value.lte(0) ? (
              <S.AllocationAndHoldingValue>
                <span>
                  {poolInfo?.logo ? (
                    <img src={poolInfo.logo} alt="" width={18} height={18} />
                  ) : (
                    <Blockies
                      className="poolIcon"
                      seed={poolInfo.name}
                      size={4}
                      scale={6}
                    />
                  )}
                </span>
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

      <WarningCard showCard={!lpNeeded.balanceInWallet.gte(lpNeeded.value)}>
        <p>
          You still need{' '}
          {BNtoDecimal(lpNeeded.value, tokenSelection.decimals, 2)}{' '}
          {poolInfo.symbol} to remove {tokenSelection.symbol} from this pool
        </p>
      </WarningCard>
    </S.SelectTokenRemove>
  )
}

export default SelectTokenRemove
