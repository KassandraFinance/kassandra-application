import React from 'react'
import Tippy from '@tippyjs/react'
import Big from 'big.js';

import { useAppSelector } from '../../../../../store/hooks'
import { ERC20 } from '../../../../../hooks/useERC20Contract';

import { BNtoDecimal } from '../../../../../utils/numerals';

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
  setSelectedTokenInBalance: React.Dispatch<React.SetStateAction<Big>>;
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
  setSelectedTokenInBalance,
  inputAmountTokenRef,
  errorMsg,
  disabled
 }: ITokenAssetInProps) => {
  const { pool, userWalletAddress, chainId } = useAppSelector(state => state)

  function wei2String(input: Big) {
    return BNtoDecimal(input.div(Big(10).pow(Number(18))), 18).replace(/\u00A0/g, '')
  }

  function handleMaxUserBalance() {
    if (!inputAmountTokenRef || !amountTokenIn || userWalletAddress.length === 0) {
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

      inputAmountTokenRef.current.value = wei2String(selectedTokenInBalance)
      setamountTokenIn(selectedTokenInBalance)
      setMaxActive(true)
    }
  }

  React.useEffect(() => {
    if (
      pool.id.length === 0 ||
      userWalletAddress.length === 0 ||
      chainId.toString().length === 0 ||
      chainId !== pool.chainId
    ) {
      return
    }

    const token = ERC20(pool.id)
    token
      .balance(userWalletAddress)
      .then(newBalance =>
        setSelectedTokenInBalance(Big(newBalance.toString()))
      )
  }, [userWalletAddress, pool])

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
              // trackEventFunction(
              //   'click-on-maxBtn',
              //   'input-in-Invest',
              //   'operations-invest'
              // )
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

                  const decimalsNum = 18
                  const values = value.split('.')
                  const paddedRight = `${values[0]}${`${values[1] || 0}${'0'.repeat(decimalsNum)}`.slice(0, decimalsNum)}`

                  setMaxActive(false)
                  setamountTokenIn(paddedRight)
                }
              }
            />
          </Tippy>
          <span className="price-dolar">
            {pool.id &&
              amountTokenIn &&
              'USD: ' +
                BNtoDecimal(
                  Big(amountTokenIn.toString())
                    .mul(
                      Big(poolPriceUSD?.price_usd || 0)
                    )
                    .div(Big(10).pow(Number(poolPriceUSD?.decimals || 18))),
                  18,
                  2,
                  2
                )}
          </span>
        </S.AmountContainer>
      </S.Body>
      {errorMsg !== '' ? (
          <S.ErrorMSG>{errorMsg}</S.ErrorMSG>
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
