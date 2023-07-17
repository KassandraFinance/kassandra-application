import React from 'react'
import Big from 'big.js'
import { useConnectWallet } from '@web3-onboard/react'

import { BNtoDecimal } from '@/utils/numerals'
import { getBalanceToken, decimalToBN } from '@/utils/poolUtils'

import useMatomoEcommerce from '@/hooks/useMatomoEcommerce'
import { useDebounce } from '@/hooks/useDebounce'
import { TokenSelectProps } from '@/store/reducers/poolCreationSlice'

import TokenSelected from '@/templates/Pool/NewPoolOperations/Form/TokenSelected'

import * as S from './styles'

interface IGasFeeProps {
  error: boolean
  feeNumber: number
  feeString: string
}

interface InputProps {
  amountTokenIn: Big | string
  setAmountTokenIn: React.Dispatch<React.SetStateAction<Big | string>>
  selectedTokenInBalance: Big
  setSelectedTokenInBalance: React.Dispatch<React.SetStateAction<Big>>
  maxActive?: boolean
  setMaxActive?: React.Dispatch<React.SetStateAction<boolean>>
  inputAmountTokenRef: React.RefObject<HTMLInputElement>
  errorMsg: string
  title: string
  priceToken: (address: string) => string
  gasFee?: IGasFeeProps
  tokenSelect: TokenSelectProps
}

const Input = ({
  amountTokenIn,
  setAmountTokenIn,
  selectedTokenInBalance,
  setSelectedTokenInBalance,
  maxActive,
  setMaxActive,
  inputAmountTokenRef,
  gasFee,
  title,
  priceToken,
  tokenSelect,
  errorMsg = ''
}: InputProps) => {
  const [{ wallet }] = useConnectWallet()
  const chainId = Number(wallet?.chains[0].id ?? '0x89')

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target

    if (value.length === 0) {
      value = e.target.dataset.lastvalue as string
    } else if (value[0] === '0') {
      e.target.value = value.replace(/^0+/, '')
    }

    if (e.target.value[0] === '.') {
      e.target.value = `0${e.target.value}`
    }

    const valueFormatted = decimalToBN(value, tokenSelect?.decimals || 18)

    setMaxActive && setMaxActive(false)
    setAmountTokenIn(valueFormatted)
  }

  const debounce = useDebounce<React.ChangeEvent<HTMLInputElement>>(
    handleOnChange,
    500
  )

  function handleMaxUserBalance() {
    if (
      !amountTokenIn ||
      !inputAmountTokenRef ||
      Big(selectedTokenInBalance).lte(0)
    ) {
      return
    }

    if (setMaxActive && inputAmountTokenRef.current !== null) {
      inputAmountTokenRef.current.focus()
      if (maxActive) {
        inputAmountTokenRef.current.value = ''
        setAmountTokenIn(new Big(0))

        setMaxActive(false)
        return
      }

      const tokenInBalance = wei2String(selectedTokenInBalance)
      inputAmountTokenRef.current.value = tokenInBalance.toFixed()

      setAmountTokenIn(selectedTokenInBalance)
      setMaxActive(true)
    }
  }

  const debounceMax = useDebounce(handleMaxUserBalance, 500)

  const { trackEventFunction } = useMatomoEcommerce()

  function handleOnWheel() {
    if (document.activeElement?.classList.contains('noscroll')) {
      ;(document.activeElement as HTMLElement).blur()
    }
  }

  function wei2String(input: Big) {
    return input.div(Big(10).pow(Number(tokenSelect.decimals)))
  }

  // get balance of swap in token
  React.useEffect(() => {
    if (
      !wallet ||
      chainId.toString().length === 0 ||
      tokenSelect.address.length === 0
    ) {
      return setSelectedTokenInBalance(Big(0))
    }

    ;(async () => {
      const userTokenBalance = await getBalanceToken(
        tokenSelect.address,
        wallet.accounts[0].address,
        chainId
      )

      setSelectedTokenInBalance(userTokenBalance)
    })()
  }, [tokenSelect, wallet])

  return (
    <S.InputAndOutputValueToken>
      <S.FlexContainer>
        <S.Top>
          <S.Info>
            <S.Title>{title}</S.Title>
            <TokenSelected tokenSelect={tokenSelect} />
            <S.Span spanlight={true} onClick={debounceMax}>
              Balance:{' '}
              {selectedTokenInBalance > new Big(-1)
                ? BNtoDecimal(
                    selectedTokenInBalance.div(
                      Big(10).pow(tokenSelect?.decimals || 18)
                    ),
                    tokenSelect?.decimals || 18
                  )
                : '...'}
            </S.Span>
          </S.Info>
          <S.Amount>
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
            <S.Input
              className="noscroll"
              ref={inputAmountTokenRef}
              type="number"
              placeholder="0"
              step={Big(1)
                .div(Big(10).pow(tokenSelect?.decimals || 18))
                .toFixed()}
              onWheel={() => handleOnWheel()}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                const target = e.target as HTMLInputElement
                // don't allow negative numbers`
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
              onChange={debounce}
              form="poolCreationForm"
              min={Big(1)
                .div(Big(10).pow(tokenSelect?.decimals || 18))
                .toFixed()}
              max={selectedTokenInBalance
                .div(Big(10).pow(tokenSelect?.decimals || 18))
                .toString()}
              required
            />
            <p className="price-dolar">
              {tokenSelect.address &&
                amountTokenIn &&
                'USD: ' +
                  BNtoDecimal(
                    Big(amountTokenIn)
                      .mul(
                        Big(
                          priceToken(tokenSelect.address.toLocaleLowerCase()) ||
                            0
                        )
                      )
                      .div(Big(10).pow(Number(tokenSelect.decimals))),
                    18,
                    2,
                    2
                  )}
            </p>
          </S.Amount>
        </S.Top>
        {errorMsg !== '' ? (
          <S.ErrorMSG>{errorMsg}</S.ErrorMSG>
        ) : (
          <>
            {gasFee && gasFee?.error && (
              <S.GasFeeError>
                Don’t forget the gas fee! Leave at least some{' '}
                {gasFee.feeString.slice(0, 8)} {tokenSelect.symbol} on your
                wallet to ensure a smooth transaction
              </S.GasFeeError>
            )}
          </>
        )}
      </S.FlexContainer>
    </S.InputAndOutputValueToken>
  )
}

export default Input
