import React from 'react'

import CoinSummary from '../../../CreatePool/SelectAssets/CoinSummary'
import InputNumberRight from '../../../../../components/Inputs/InputNumberRight'

import arrowDown from '../../../../../../public/assets/utilities/arrow-down.svg'

import * as S from './styles'
import Image from 'next/image'

const AddLiquidityOperation = () => {
  const [tokenAmount, setTokenAmount] = React.useState('')
  const [tokenAllocation, setTokenAllocation] = React.useState('')

  function handleTokenAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTokenAmount(e.target.value)
  }

  function handleTokenAllocatinChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTokenAllocation(e.target.value)
  }

  return (
    <S.AddLiquidityOperation>
      <S.Title>Add Liquidity</S.Title>

      <S.Container>
        <S.InputContainer>
          <CoinSummary
            coinName="Wrapped Bitcoin"
            coinSymbol="wbtc"
            coinImage="https://tokens.1inch.io/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png"
            url={`https://heimdall-frontend.vercel.app/coins/btc`}
            price={0}
          />

          <S.InputWrapper>
            <InputNumberRight
              name="inputTokenAmount"
              type="number"
              buttonText="Max"
              button
              value={tokenAmount}
              min="1"
              max="any"
              lable="Token Amount"
              placeholder=""
              onChange={handleTokenAmountChange}
            />

            <S.Balance>Balance: 50000.255</S.Balance>
          </S.InputWrapper>
        </S.InputContainer>

        <S.Line />

        <S.InputContainer>
          <S.InputText>Allocation</S.InputText>

          <InputNumberRight
            name="inputTokenAllocation"
            type="number"
            buttonText="Max"
            button
            value={tokenAllocation}
            min="1"
            max="any"
            lable="Token Allocation"
            placeholder=""
            onChange={handleTokenAllocatinChange}
          />
        </S.InputContainer>
      </S.Container>

      <Image src={arrowDown} />

      <S.Title>Receive (est.)</S.Title>

      <S.Container>
        <S.InputContainer>
          <CoinSummary
            coinName="Pool Name LP"
            coinSymbol="pnlp"
            coinImage="https://tokens.1inch.io/0x62edc0692bd897d2295872a9ffcac5425011c661.png"
            url={`https://heimdall-frontend.vercel.app/coins/btc`}
            price={0}
          />

          <S.InputWrapper>
            <S.Value>0</S.Value>

            <S.SecondaryValue>~$0.00</S.SecondaryValue>
          </S.InputWrapper>
        </S.InputContainer>
      </S.Container>
    </S.AddLiquidityOperation>
  )
}

export default AddLiquidityOperation
