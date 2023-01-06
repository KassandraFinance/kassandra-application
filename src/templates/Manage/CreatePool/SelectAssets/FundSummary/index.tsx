import React from 'react'
import Image from 'next/image'

import { TokenType } from '../../../../../store/reducers/poolCreationSlice'

import CoinSummary from '../CoinSummary'
import InputNumberRight from '../../../../../components/Inputs/InputNumberRight'

import closeIcon from '../../../../../../public/assets/utilities/close-icon.svg'
import unlockIcon from '../../../../../../public/assets/utilities/unlock.svg'

import * as S from './styles'

export type CoinType = {
  coinName: string,
  coinSymbol: string,
  coinImage: string,
  price: number | null,
  url?: string | null
}

interface IFundSummaryProps {
  creation?: boolean;
  coinsList: TokenType[];
  totalAllocation: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveToken?: (token: TokenType) => void;
  onLockToken?: (id: string) => void;
}

const FundSummary = ({
  coinsList,
  totalAllocation,
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
}: IFundSummaryProps) => {
  return (
    <S.FundSummary>
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
                price={5}
              />

              {creation ? (
                <>
                  <S.AllocationContainer>
                    <S.LockButton
                      onClick={() => onLockToken(coin.symbol)}
                      active={coin.isLocked}
                    >
                      <Image src={unlockIcon} />
                    </S.LockButton>

                    <InputNumberRight
                      name={coin.symbol}
                      type="number"
                      placeholder="100%"
                      lable={`${coin.name} allocation`}
                      required
                      min={1}
                      max={100}
                      value={coin.allocation.toString()}
                      onChange={onChange}
                    />

                    <S.RemoveButton onClick={() => onRemoveToken(coin)}>
                      <Image src={closeIcon} />
                    </S.RemoveButton>
                  </S.AllocationContainer>
                  {coin.allocation < 1 && (
                    <S.Error>Allocation must be above 1%</S.Error>
                  )}
                </>
              ) : (
                <S.Text>{coin.allocation}%</S.Text>
              )}

              <S.ProgressBar>
                <S.ProgressValue value={coin.allocation}></S.ProgressValue>
              </S.ProgressBar>
            </S.CoinContainer>
          ))}
        </S.CoinsContainer>

        <S.TotalContainer>
          <S.Text>Total Allocated</S.Text>

          <S.Text>{totalAllocation}%</S.Text>

          <S.ProgressBar>
            <S.ProgressValue value={totalAllocation}></S.ProgressValue>
          </S.ProgressBar>
        </S.TotalContainer>

        {totalAllocation > 100 && (
          <S.Error>The total can’t be over 100%</S.Error>
        )}
      </S.Body>
    </S.FundSummary>
  )
}

export default FundSummary
