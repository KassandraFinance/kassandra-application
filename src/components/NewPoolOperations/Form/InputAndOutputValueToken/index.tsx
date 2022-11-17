import React from 'react'
import Tippy from '@tippyjs/react'

import TokenSelected from '../TokenSelected'

import * as S from './styles'

const InputAndOutputValueToken = () => {
  return (
    <S.InputAndOutputValueToken>
      <S.FlexContainer>
        <S.Top>
          <S.Info>
            <S.Span>Pay with</S.Span>
            {/* {tokensList} */}
            {/* <TokenSelected tokenDetails={tokenDetails} setSwapAddress={setSwapAddress} /> */}
            <TokenSelected />
            <S.Span spanlight={true}>
              {/* Balance:{' '}
              {swapBalance > new BigNumber(-1)
                ? BNtoDecimal(swapBalance, decimals.toNumber())
                : '...'} */}
              Balance ...
            </S.Span>
          </S.Info>
          <S.Amount>
            {/* {setSwapAmount && ( */}
            <S.ButtonMax
              type="button"
              maxActive={false}
              // onClick={() => {
              //   setMax()
              //   trackEventFunction(
              //     'click-on-maxBtn',
              //     `input-in-${title}`,
              //     'operations-invest'
              //   )
              // }}
            >
              Max
            </S.ButtonMax>
            {/* <Tippy content={disabled} disabled={disabled.length === 0}> */}
            <S.Input
            // className="noscroll"
            // readOnly={disabled.length > 0}
            // ref={inputRef}
            // // value={inputRef?.current?.value}
            // type="number"
            // placeholder="0"
            // step="any"
            // onWheel={() => handleOnWheel()}
            // onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            //   const target = e.target as HTMLInputElement
            //   // don't allow negative numbers
            //   if (e.key === '-') {
            //     e.preventDefault()
            //   }
            //   // Blink bug makes the value come empty if pressing the decimal symbol that is not that of the current locale
            //   else if (e.key === '.' || e.key === ',') {
            //     // first time value will be ok, if pressing twice it zeroes, we ignore those
            //     if (target.value.length > 0 && target.value.search(/[,.]/) === -1) {
            //       target.dataset.lastvalue = target.value
            //     }
            //   }
            //   else if (e.key === 'Backspace' || e.key === 'Delete') {
            //     target.dataset.lastvalue = '0'
            //   }
            // }}
            // onChange={
            //   (e: React.ChangeEvent<HTMLInputElement>) => {
            //     let { value } = e.target

            //     if (value.length === 0) {
            //       value = e.target.dataset.lastvalue as string
            //     }
            //     else if (value[0] === '0') {
            //       e.target.value = value.replace(/^0+/, '')
            //     }

            //     if (e.target.value[0] === '.') {
            //       e.target.value = `0${e.target.value}`
            //     }

            //     const decimalsNum = decimals.toNumber()
            //     const values = value.split('.')
            //     const paddedRight = `${values[0]}${`${values[1] || 0}${'0'.repeat(decimalsNum)}`.slice(0, decimalsNum)
            //       }`
            //     setMaxActive && setMaxActive(false)
            //     setInputValue && setInputValue(new BigNumber(paddedRight))
            //   }
            // }
            />
            {/* </Tippy> */}
            <span className="price-dolar">
              {/* {address && amount &&
          'USD: ' +
          BNtoDecimal(
            Big(amount.toString())
              .mul(Big(priceDollar(address, poolTokensArray)))
              .div(Big(10).pow(Number(decimals))),
            18,
            2,
            2
          )} */}
              asdasd
            </span>
          </S.Amount>
        </S.Top>
      </S.FlexContainer>
    </S.InputAndOutputValueToken>
  )
}

export default InputAndOutputValueToken
