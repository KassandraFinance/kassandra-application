import React from 'react'
import Image from 'next/image'

import { TokenType } from '../../../../../store/reducers/poolCreationSlice'

import CoinSummary from '../CoinSummary'
import InputNumberRight from '../../../../../components/Inputs/InputNumberRight'

import closeIcon from '../../../../../../public/assets/utilities/close-icon.svg'

import { CoinGeckoResponseType } from '../../AddLiquidity'

import * as S from './styles'

interface IPoolSummaryProps {
  creation?: boolean;
  coinsList: TokenType[];
  totalAllocation: number;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
    isLocked: boolean
  ) => void;
  onRemoveToken?: (token: TokenType) => void;
  onLockToken?: (id: string) => void;
  priceList: CoinGeckoResponseType | undefined;
}

const PoolSummary = ({
  coinsList,
  totalAllocation,
  priceList,
  creation = false,
  onChange = () => {
    return
  },
  onRemoveToken = () => {
    return
  },
  onLockToken = () => {
    return
  }
}: IPoolSummaryProps) => {
  function handleInvalid(event: any) {
    event.target.setCustomValidity(errorMessage)
  }

  const errorMessage =
    totalAllocation > 100
      ? `The total can't be over 100%`
      : totalAllocation < 100
      ? `The total can't be lower than 100%`
      : ''

  return (
    <S.PoolSummary>
      <S.Header>
        <S.HeaderTitle>Fund Summary</S.HeaderTitle>

        <S.HeaderTitle>Allocation</S.HeaderTitle>
      </S.Header>

      <S.Body>
        <S.CoinsContainer>
          {coinsList.map(coin => (
            <S.CoinContainer key={coin.name}>
              <CoinSummary
                coinImage={coin.icon}
                coinName={coin.name}
                coinSymbol={coin.symbol}
                price={
                  priceList && priceList[coin.address]
                    ? priceList[coin.address].usd
                    : 0
                }
              />

              {creation ? (
                <>
                  <S.AllocationContainer>
                    <S.LockButton
                      type="button"
                      onClick={() => onLockToken(coin.symbol)}
                      active={coin.isLocked}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="lock">
                          <path
                            id="Lock Bottom"
                            d="M12.6667 7.33203H3.33333C2.59695 7.33203 2 7.92898 2 8.66536V13.332C2 14.0684 2.59695 14.6654 3.33333 14.6654H12.6667C13.403 14.6654 14 14.0684 14 13.332V8.66536C14 7.92898 13.403 7.33203 12.6667 7.33203Z"
                            stroke="#FCFCFC"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            id="lock-up-closed"
                            d="M4.66666 7.33203V4.66536C4.66666 3.78131 5.01785 2.93346 5.64297 2.30834C6.26809 1.68322 7.11593 1.33203 7.99999 1.33203C8.88404 1.33203 9.73189 1.68322 10.357 2.30834C10.9821 2.93346 11.3333 3.78131 11.3333 4.66536V7.33203"
                            stroke="#FCFCFC"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                      </svg>
                    </S.LockButton>

                    <InputNumberRight
                      form="poolCreationForm"
                      name={coin.symbol}
                      type="number"
                      placeholder="100%"
                      lable={`${coin.name} allocation`}
                      required
                      min="1"
                      max="99"
                      value={coin.allocation.toString()}
                      onChange={event =>
                        onChange(event, coin.symbol, coin.isLocked)
                      }
                    />

                    <S.RemoveButton
                      type="button"
                      onClick={() => onRemoveToken(coin)}
                    >
                      <Image src={closeIcon} />
                    </S.RemoveButton>
                  </S.AllocationContainer>
                  {Number(coin.allocation) < 1 && (
                    <S.Error>Allocation must be above 1%</S.Error>
                  )}
                  {Number(coin.allocation) > 100 && (
                    <S.Error>Allocation must be below 100%</S.Error>
                  )}
                </>
              ) : (
                <S.Text>{coin.allocation}%</S.Text>
              )}

              <S.ProgressBar>
                <S.ProgressValue
                  value={Number(coin.allocation)}
                ></S.ProgressValue>
              </S.ProgressBar>
            </S.CoinContainer>
          ))}
        </S.CoinsContainer>

        <S.TotalContainer value={totalAllocation}>
          <S.Text>Total Allocated</S.Text>

          <S.Text>{totalAllocation}%</S.Text>

          <S.ProgressBar>
            <S.ProgressValue value={totalAllocation}></S.ProgressValue>
            {totalAllocation !== 100 && (
              <S.InputValidation
                form="poolCreationForm"
                id="checkWeights"
                name="inputCheckWeights"
                type="radio"
                value={totalAllocation}
                onInvalid={handleInvalid}
                required
                checked={totalAllocation === 100}
                onChange={() => {
                  return
                }}
              />
            )}
          </S.ProgressBar>
        </S.TotalContainer>

        {totalAllocation > 100 && <S.Error>{errorMessage}</S.Error>}
        {totalAllocation < 100 && <S.Error>{errorMessage}</S.Error>}
      </S.Body>
    </S.PoolSummary>
  )
}

export default PoolSummary
