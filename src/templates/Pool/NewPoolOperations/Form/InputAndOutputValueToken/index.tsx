import React from 'react'
import Tippy from '@tippyjs/react'
import Big from 'big.js'
import { useConnectWallet } from '@web3-onboard/react'

import { BNtoDecimal } from '../../../../../utils/numerals'
import { getBalanceToken, decimalToBN } from '../../../../../utils/poolUtils'

import { useAppSelector } from '../../../../../store/hooks'

import PoolOperationContext from '../PoolOperationContext'

import useMatomoEcommerce from '../../../../../hooks/useMatomoEcommerce'
import { useDebounce } from '@/hooks/useDebounce'

import TokenSelect from '../TokenSelect'
import TokenSelected from '../TokenSelected'

import * as S from './styles'

interface IGasFeeProps {
  error: boolean
  feeNumber: number
  feeString: string
}

interface IInputAndOutputValueTokenProps {
  typeAction: string
  amountTokenIn: Big | string
  setAmountTokenIn: React.Dispatch<React.SetStateAction<Big | string>>
  selectedTokenInBalance: Big
  setSelectedTokenInBalance: React.Dispatch<React.SetStateAction<Big>>
  maxActive?: boolean
  setMaxActive?: React.Dispatch<React.SetStateAction<boolean>>
  inputAmountTokenRef: React.RefObject<HTMLInputElement>
  errorMsg: string
  gasFee?: IGasFeeProps
}

const InputAndOutputValueToken = ({
  typeAction,
  amountTokenIn,
  setAmountTokenIn,
  selectedTokenInBalance,
  setSelectedTokenInBalance,
  maxActive,
  setMaxActive,
  inputAmountTokenRef,
  gasFee,
  errorMsg = ''
}: IInputAndOutputValueTokenProps) => {
  const [{ wallet }] = useConnectWallet()
  const { pool, tokenSelect } = useAppSelector(state => state)
  const { priceToken } = React.useContext(PoolOperationContext)

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

    const valueFormatted = decimalToBN(value, tokenSelect.decimals)

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
      pool.chain_id !== chainId ||
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

  const disabled = !wallet
    ? 'Please connect your wallet by clicking the button below'
    : chainId !== pool.chain_id
    ? `Please change to the ${pool.chain.chainName} by clicking the button below`
    : ''

  const isInvestType = typeAction === 'Invest' ? true : false

  function handleOnWheel() {
    if (document.activeElement?.classList.contains('noscroll')) {
      // eslint-disable-next-line prettier/prettier
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
      chainId !== pool.chain_id ||
      chainId.toString().length === 0 ||
      tokenSelect.address.length === 0
    ) {
      return setSelectedTokenInBalance(Big(0))
    }

    ;(async () => {
      const userTokenBalance = await getBalanceToken(
        tokenSelect.address,
        wallet.accounts[0].address,
        chainId,
        pool.pool_version === 1 ? pool.chain.addressWrapped : undefined
      )

      setSelectedTokenInBalance(userTokenBalance)
    })()
  }, [tokenSelect, wallet])

  return (
    <S.InputAndOutputValueToken>
      <S.FlexContainer>
        <S.Top>
          <S.Info>
            <S.Title>{isInvestType ? 'Pay with' : 'Swap to'}</S.Title>
            {isInvestType ? (
              <TokenSelected tokenSelect={tokenSelect} />
            ) : (
              <TokenSelect />
            )}
            <S.Span spanlight={true} onClick={debounceMax}>
              Balance:{' '}
              {selectedTokenInBalance > new Big(-1)
                ? BNtoDecimal(
                    selectedTokenInBalance.div(
                      Big(10).pow(tokenSelect.decimals)
                    ),
                    tokenSelect.decimals
                  )
                : '...'}
            </S.Span>
          </S.Info>
          <S.Amount>
            {isInvestType && (
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
            )}
            <Tippy content={disabled} disabled={disabled.length === 0}>
              {isInvestType ? (
                <S.Input
                  className="noscroll"
                  readOnly={!isInvestType || disabled.length > 0}
                  ref={inputAmountTokenRef}
                  type="number"
                  placeholder="0"
                  step="any"
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
                />
              ) : (
                <S.amountTokenOutText>
                  {BNtoDecimal(
                    Big(amountTokenIn)?.div(
                      Big(10).pow(tokenSelect.decimals)
                    ) || Big(0),
                    tokenSelect.decimals,
                    6
                  ).replace(/\s/g, '')}
                </S.amountTokenOutText>
              )}
            </Tippy>
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

export default InputAndOutputValueToken
