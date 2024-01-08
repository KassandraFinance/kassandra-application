import React from 'react'
import { useRouter } from 'next/router'
import Tippy from '@tippyjs/react'
import Big from 'big.js'
import Blockies from 'react-blockies'
import { useConnectWallet } from '@web3-onboard/react'

import { usePoolInfo } from '@/hooks/query/usePoolInfo'
import { usePoolData } from '@/hooks/query/usePoolData'

import useMatomoEcommerce from '../../../../../hooks/useMatomoEcommerce'

import { BNtoDecimal } from '../../../../../utils/numerals'
import { decimalToBN } from '../../../../../utils/poolUtils'

import * as S from './styles'

interface ITokenAssetInProps {
  amountTokenIn: string | Big
  setamountTokenIn: React.Dispatch<React.SetStateAction<string | Big>>
  maxActive: boolean
  setMaxActive: React.Dispatch<React.SetStateAction<boolean>>
  selectedTokenInBalance: Big
  inputAmountTokenRef: React.RefObject<HTMLInputElement>
  disabled: string
}

const TokenAssetIn = ({
  amountTokenIn,
  setamountTokenIn,
  maxActive,
  setMaxActive,
  selectedTokenInBalance,
  inputAmountTokenRef,
  disabled
}: ITokenAssetInProps) => {
  const [{ wallet }] = useConnectWallet()
  const { trackEventFunction } = useMatomoEcommerce()

  const router = useRouter()
  const { data: pool } = usePoolData({ id: router.query.address as string })

  const { data } = usePoolInfo({
    id: pool?.id || '',
    day: Math.trunc(Date.now() / 1000 - 60 * 60 * 24)
  })

  const priceUSD = BNtoDecimal(
    Big(amountTokenIn.toString() ?? 0)
      .mul(data?.price_usd ?? 0)
      .div(Big(10).pow(Number(data?.decimals ?? 18))),
    18,
    2,
    2
  )

  const priceUSDPartial = priceUSD?.split('.')
  const priceUSDLength = priceUSDPartial[1]?.length ?? 0

  function wei2String(input: Big) {
    return input.div(Big(10).pow(Number(18)))
  }

  function handleMaxUserBalance() {
    if (
      !wallet ||
      !amountTokenIn ||
      !inputAmountTokenRef ||
      !Big(selectedTokenInBalance).gt(0)
    ) {
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
      inputAmountTokenRef.current.value = tokenInBalance.toFixed()
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
              {pool?.logo ? (
                <img src={pool.logo} alt="" width={22} height={22} />
              ) : (
                <Blockies
                  className="poolIcon"
                  seed={pool?.name || ''}
                  size={8}
                  scale={3}
                />
              )}
            </span>
            <S.Symbol>{pool?.symbol}</S.Symbol>
          </S.Token>
          <S.Span onClick={() => handleMaxUserBalance()}>
            Balance:{' '}
            {selectedTokenInBalance > new Big(-1)
              ? BNtoDecimal(selectedTokenInBalance.div(Big(10).pow(18)), 18)
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
              readOnly={!wallet}
              ref={inputAmountTokenRef}
              // value={inputAmountTokenRef?.current?.value}
              type="number"
              placeholder="0"
              step="any"
              disabled={disabled.length !== 0}
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
                  if (
                    target.value.length > 0 &&
                    target.value.search(/[,.]/) === -1
                  ) {
                    target.dataset.lastvalue = target.value
                  }
                } else if (e.key === 'Backspace' || e.key === 'Delete') {
                  target.dataset.lastvalue = '0'
                }
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                let { value } = e.target

                if (value.length === 0) {
                  value = e.target.dataset.lastvalue as string
                } else if (value[0] === '0') {
                  e.target.value = value.replace(/^0+/, '')
                }

                if (e.target.value[0] === '.') {
                  e.target.value = `0${e.target.value}`
                }

                const valueFormatted = decimalToBN(value)

                setMaxActive(false)
                setamountTokenIn(valueFormatted)
              }}
            />
          </Tippy>
          <p className="price-dolar">
            USD: {pool?.id && priceUSDLength > 6 ? '0.00' : priceUSD}
          </p>
        </S.AmountContainer>
      </S.Body>
      {Big(amountTokenIn).gt(selectedTokenInBalance) && (
        <S.ErrorMSG>This amount exceeds your balance!</S.ErrorMSG>
      )}
    </S.TokenAssetIn>
  )
}

export default TokenAssetIn
