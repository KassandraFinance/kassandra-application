import React from 'react'
import Tippy from '@tippyjs/react'

import { useAppSelector } from '../../../../../store/hooks'

import * as S from './styles'

const TokenAssetIn = () => {
  const { pool } = useAppSelector(state => state)

  const messageError = false

  return (
    <S.TokenAssetIn>
      <S.Body>
        <S.PoolInfo>
          <S.Title>Send</S.Title>
          <S.Token>
            <span>
              <img src={pool.logo} alt="" width={22} height={22} />
            </span>
            <S.Symbol>{pool.symbol}</S.Symbol>
          </S.Token>
          <S.Span>
            Balance:{' '}
            {/* {selectedTokenInBalance > new Big(-1)
              ? BNtoDecimal(
                  selectedTokenInBalance.div(
                    Big(10).pow(tokenSelect.decimals)
                  ),
                  tokenSelect.decimals
                )
              : '...'} */}
              $0,00
          </S.Span>
        </S.PoolInfo>
        <S.AmountContainer>
          <S.ButtonMax
            type="button"
            // maxActive={0}
            // onClick={() => {
            //   handleMaxUserBalance()
            //   trackEventFunction(
            //     'click-on-maxBtn',
            //     'input-in-Invest',
            //     'operations-invest'
            //   )
            // }}
          >
            Max
          </S.ButtonMax>
          <Tippy content="{disabled}" disabled={"disabled".length === 0}>
          <S.Input
            className="noscroll"
            // readOnly={disabled.length > 0}
            // ref={inputAmountTokenRef}
            // value={inputRef?.current?.value}
            type="number"
            placeholder="0"
            step="any"
            // onWheel={() => handleOnWheel()}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              // eslint-disable-next-line prettier/prettier
              const target = e.target as HTMLInputElement
              // don't allow negative numbers
              if (e.key === '-') {
                e.preventDefault()
              }
              // Blink bug makes the value come empty if pressing the decimal symbol that is not that of the current locale
              else if (e.key === '.' || e.key === ',') {
                // first time value will be ok, if pressing twice it zeroes, we ignore those
                if (target.value.length > 0 && target.value.search(/[,.]/) === -1) {
                  target.dataset.lastvalue = target.value
                }
              }
              else if (e.key === 'Backspace' || e.key === 'Delete') {
                target.dataset.lastvalue = '0'
              }
            }}
            onChange={
              (e: React.ChangeEvent<HTMLInputElement>) => {
                let { value } = e.target

                if (value.length === 0) {
                  value = e.target.dataset.lastvalue as string
                }
                else if (value[0] === '0') {
                  e.target.value = value.replace(/^0+/, '')
                }

                if (e.target.value[0] === '.') {
                  e.target.value = `0${e.target.value}`
                }

                // const decimalsNum = tokenSelect.decimals
                const values = value.split('.')
                // const paddedRight = `${values[0]}${`${values[1] || 0}${'0'.repeat(decimalsNum)}`.slice(0, decimalsNum)}`

                // setMaxActive(false)
                // setAmountTokenIn(paddedRight)
              }
            }
          />
          </Tippy>
          <span className="price-dolar">
          USD: 0,00
            {/* {tokenSelect.address &&
              amountTokenIn &&
              'USD: ' +
                BNtoDecimal(
                  Big(amountTokenIn.toString())
                    .mul(
                      Big(priceToken(tokenSelect.address) || 0)
                    )
                    .div(Big(10).pow(Number(tokenSelect.decimals))),
                  18,
                  2,
                  2
                )} */}
          </span>
        </S.AmountContainer>
      </S.Body>
      {messageError ? (
        <S.ErrorMSG>errorMsg</S.ErrorMSG>
        ) : (
        <>
          {/* {gasFee && gasFee?.error && (
            <S.GasFeeError>
              Don’t forget the gas fees! Leave at least{' '}
               AVAX on your wallet to ensure a
              smooth transaction
            </S.GasFeeError>
          )} */}
        </>
      )}
  </S.TokenAssetIn>)
}

export default TokenAssetIn
