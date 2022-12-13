import React from 'react'
import Image from 'next/image'

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
  coins: CoinType[];
  creation?: boolean;
}

const FundSummary = ({ coins, creation = false }: IFundSummaryProps) => {
  const [value, setValue] = React.useState('')

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.name)
    setValue(e.target.value)
  }

  return (
    <S.FundSummary>
      <S.Header>
        <S.HeaderTitle>Fund Summary</S.HeaderTitle>

        <S.HeaderTitle>Allocation</S.HeaderTitle>
      </S.Header>

      <S.Body>
        <S.CoinsContainer>
          {coins.map(coin => (
            <S.CoinContainer key={coin.coinName}>
              <CoinSummary
                coinImage={coin.coinImage}
                coinName={coin.coinName}
                coinSymbol={coin.coinSymbol}
                price={coin.price}
              />

              {creation ? (
                <>
                  <S.AllocationContainer>
                    <S.LockButton
                      onClick={() => console.log('lock')}
                      active={false}
                    >
                      <Image src={unlockIcon} />
                    </S.LockButton>

                    <InputNumberRight
                      name="aaveAllocation"
                      type="number"
                      placeholder="100%"
                      lable="aave allocation"
                      required
                      min={1}
                      max={100}
                      value={value}
                      onChange={handleInput}
                    />

                    <S.RemoveButton onClick={() => console.log('remove item')}>
                      <Image src={closeIcon} />
                    </S.RemoveButton>
                  </S.AllocationContainer>

                  <S.Error>Allocation must be above 1%</S.Error>
                </>
              ) : (
                <S.Text>{value}%</S.Text>
              )}

              <S.ProgressBar>
                <S.ProgressValue value={50}></S.ProgressValue>
              </S.ProgressBar>
            </S.CoinContainer>
          ))}
        </S.CoinsContainer>

        <S.TotalContainer>
          <S.Text>Total Allocated</S.Text>

          <S.Text>101%</S.Text>

          <S.ProgressBar>
            <S.ProgressValue value={67}></S.ProgressValue>
          </S.ProgressBar>
        </S.TotalContainer>

        <S.Error>The total can’t be over 100%</S.Error>
      </S.Body>
    </S.FundSummary>
  )
}

export default FundSummary
