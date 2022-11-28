import React from 'react'
import Image from 'next/image'
import Tippy from '@tippyjs/react'

import BigNumber from 'bn.js'
import Big from 'big.js'

import ahype from '../../../../../public/assets/logos/ahype.svg'

import * as S from './styles'

interface ITokenAssetOutProps {
  decimals?: BigNumber | Big;
  swapAmount?: BigNumber | Big;
  disabled?: string;
  operation?: string;
  swapOutAddress?: string;
  poolTokensArray?: any[];
  calculateAmountIn?: (amoutOut: BigNumber) => Promise<void>;
  setSwapOutAmount?: React.Dispatch<React.SetStateAction<BigNumber[]>>;
  setMaxActive?: React.Dispatch<React.SetStateAction<boolean>>;
}

const TokenAssetOut = ({
  decimals,
  swapAmount,
  disabled,
  operation,
  swapOutAddress,
  poolTokensArray,
  calculateAmountIn,
  setSwapOutAmount,
  setMaxActive
}: ITokenAssetOutProps) => {
  return (
    <S.TokenAssetOut>
      <S.FlexContainer>
        <S.TokenContainer>
          <S.Title>Swap to</S.Title>
          <S.Token>
            <div className="img">
              <Image
                // src={poolTokens[0]?.symbol === 'aHYPE' ? ahype : tricrypto}
                src={ahype}
                alt=""
                width={22}
                height={22}
              />
            </div>
            <S.Symbol>aHYPE</S.Symbol>
          </S.Token>
          <S.Balance>
            {/* Balance:{' '}
        {swapBalance > new BigNumber(-1)
          ? BNtoDecimal(swapBalance, decimals.toNumber())
          : '...'} */}
            Balance: ...
          </S.Balance>
        </S.TokenContainer>
        <S.InputContainer>
          <Tippy content={disabled} disabled={true}>
            <S.Input
            // readOnly={disabled.length > 0 || operation === 'Withdraw'}
            // type="number"
            // placeholder="0"
            // value={
            //   decimals.gt(new BigNumber(-1))
            //     ? Number(BNtoDecimal(
            //       swapAmount || new BigNumber(0),
            //       decimals.toNumber()
            //     ).replace(/\s/g, ''))
            //     : '0'
            // }
            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            //   let { value } = e.target

            //   if (value.length === 0) {
            //     // eslint-disable-next-line prettier/prettier
            //     value = e.target.dataset.lastvalue as string
            //   }
            //   else if (value[0] === '0') {
            //     e.target.value = value.replace(/^0+/, '')
            //   }

            //   if (e.target.value[0] === '.') {
            //     e.target.value = `0${e.target.value}`
            //   }
            //   const decimalsNum = decimals.toNumber()
            //   const values = e.target.value.split('.')
            //   const paddedRight = `${values[0]}${`${values[1] || 0
            //     }${'0'.repeat(decimalsNum)}`.slice(0, decimalsNum)}`
            //   setSwapOutAmount && setSwapOutAmount([new BigNumber(paddedRight)])
            //   if (calculateAmountIn) {
            //     calculateAmountIn(new BigNumber(paddedRight))
            //   }
            //   setMaxActive && setMaxActive(false)
            // }}
            />
          </Tippy>
          <S.PriceDolar>
            {/* {poolTokensArray &&
          'USD: ' +
          BNtoDecimal(
            Big(swapAmount.toString())
              .mul(Big(priceDollar(swapOutAddress, poolTokensArray)))
              .div(Big(10).pow(Number(decimals))),
            18,
            2,
            2
          )} */}
            USD: 0.00
          </S.PriceDolar>
        </S.InputContainer>
      </S.FlexContainer>
    </S.TokenAssetOut>
  )
}

export default TokenAssetOut
