import React from 'react'
import Tippy from '@tippyjs/react'
import Big from 'big.js';
import Blockies from 'react-blockies'

import { useAppSelector } from '../../../../../store/hooks'

import useMatomoEcommerce from '../../../../../hooks/useMatomoEcommerce';

import { KacyPoligon } from '@/constants/tokenAddresses';

import { BNtoDecimal } from '../../../../../utils/numerals';
import { decimalToBN } from '../../../../../utils/poolUtils';

import * as S from './styles'

type IPoolPriceUSDProps = {
  price_usd: string,
  decimals: number
}
interface ITokenAssetInProps {
  amountTokenIn: string | Big;
  setamountTokenIn: React.Dispatch<React.SetStateAction<string | Big>>;
  poolPriceUSD: IPoolPriceUSDProps;
  maxActive: boolean;
  setMaxActive: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTokenInBalance: Big;
  inputAmountTokenRef: React.RefObject<HTMLInputElement>;
  errorMsg: string;
  disabled: string;
}

const TokenAssetIn = ({
  amountTokenIn,
  setamountTokenIn,
  poolPriceUSD,
  maxActive,
  setMaxActive,
  selectedTokenInBalance,
  inputAmountTokenRef,
  errorMsg,
  disabled
 }: ITokenAssetInProps) => {
  const { pool, userWalletAddress } = useAppSelector(state => state)
  const { trackEventFunction } = useMatomoEcommerce()

  function wei2String(input: Big) {
    return input.div(Big(10).pow(Number(18)))
  }

  let diff = '0'
  const indexKacy = pool.underlying_assets.findIndex(
    asset => asset.token.id === KacyPoligon
  )
  if (indexKacy !== -1) {
    diff = Big(poolPriceUSD.price_usd)
      .mul(2)
      .div(98)
      .toFixed()
  }

  function handleMaxUserBalance() {
    if (!inputAmountTokenRef || !amountTokenIn || userWalletAddress.length === 0 || !Big(selectedTokenInBalance).gt(0)) {
      return
    }

    if (inputAmountTokenRef.current !== null) {
      inputAmountTokenRef.current.focus()

      if (maxActive) {
        inputAmountTokenRef.current.value = ''
        setamountTokenIn(new Big(0))
        setMaxActive(false)
        return
      }
      const tokenInBalance = wei2String(selectedTokenInBalance)
      inputAmountTokenRef.current.value = tokenInBalance.toString()
      setamountTokenIn(selectedTokenInBalance)
      setMaxActive(true)
    }
  }

  return (
    <S.TokenAssetIn>
      <S.Body>
        <S.PoolInfo>
          <S.Title>Send</S.Title>
          <S.Token>
            <span>
              {pool.logo ? (
                <img src={pool.logo} alt="" width={22} height={22} />
                ) : (
                  <Blockies
                    className="poolIcon"
                    seed={pool.name}
                    size={8}
                    scale={3}
                  />
                )}
            </span>
            <S.Symbol>{pool.symbol}</S.Symbol>
          </S.Token>
          <S.Span onClick={() => handleMaxUserBalance()}>
            Balance:{' '}
            {selectedTokenInBalance > new Big(-1)
              ? BNtoDecimal(
                  selectedTokenInBalance.div(
                    Big(10).pow(18)
                  ),
                  18
                )
              : '...'}
          </S.Span>
        </S.PoolInfo>
        <S.AmountContainer>
          <S.ButtonMax
            type="button"
            maxActive={maxActive}
            onClick={() => {
              handleMaxUserBalance()
              trackEventFunction(
                'click-on-maxBtn',
                'input-in-Invest',
                'operations-invest'
              )
            }}
          >
            Max
          </S.ButtonMax>
          <Tippy content={disabled} disabled={disabled.length === 0}>
            <S.Input
              className="noscroll"
              readOnly={userWalletAddress.length === 0}
              ref={inputAmountTokenRef}
              // value={inputAmountTokenRef?.current?.value}
              type="number"
              placeholder="0"
              step="any"
              // onWheel={() => handleOnWheel()}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                // eslint-disable-next-line prettier/prettier
                const target = e.target as HTMLInputElement
                // don't allow negative numbers
                if (e.key.length === 1 && e.key.search(/[0-9,.]/) === -1) {
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

                  const valueFormatted = decimalToBN(value)

                  setMaxActive(false)
                  setamountTokenIn(valueFormatted)
                }
              }
            />
          </Tippy>
          <p className="price-dolar">
            {pool.id &&
              amountTokenIn &&
              'USD: ' +
                BNtoDecimal(
                  Big(amountTokenIn.toString())
                    .mul(
                      Big(poolPriceUSD?.price_usd || 0).add(diff)
                    )
                    .div(Big(10).pow(Number(poolPriceUSD?.decimals || 18))),
                  18,
                  2,
                  2
                )}
          </p>
        </S.AmountContainer>
      </S.Body>
      {errorMsg && errorMsg !== '' && (
        <S.ErrorMSG>{errorMsg}</S.ErrorMSG>
      )}
  </S.TokenAssetIn>)
}

export default TokenAssetIn
