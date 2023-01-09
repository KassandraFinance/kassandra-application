import React from 'react'
import Tippy from '@tippyjs/react'
import Big from 'big.js'
import BigNumber from 'bn.js'

import { addressNativeToken1Inch } from '../../../../../constants/tokenAddresses'

import { BNtoDecimal } from '../../../../../utils/numerals'
import web3 from '../../../../../utils/web3'

import { useAppSelector } from '../../../../../store/hooks'

import { ERC20 } from '../../../../../hooks/useERC20Contract'
import useCoingecko from '../../../../../hooks/useCoingecko'
import useMatomoEcommerce from '../../../../../hooks/useMatomoEcommerce'

import TokenSelect from '../TokenSelect'
import TokenSelected from '../TokenSelected'

import * as S from './styles'

interface IInputAndOutputValueTokenProps {
  typeAction: string;
  amountTokenIn: Big | string;
  setAmountTokenIn: React.Dispatch<React.SetStateAction<Big | string>>;
  selectedTokenInBalance: Big;
  setSelectedTokenInBalance: React.Dispatch<React.SetStateAction<Big>>;
  maxActive?: boolean;
  setMaxActive?: React.Dispatch<React.SetStateAction<boolean>>;
  inputAmountTokenRef: React.RefObject<HTMLInputElement>;
  errorMsg: string;
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
  errorMsg = ''
}: IInputAndOutputValueTokenProps) => {
  const { pool, chainId, tokenSelect, tokenList1Inch, userWalletAddress } = useAppSelector(
    state => state
  )

  const tokenAddresses = tokenList1Inch.map(token => token.address)
  const { trackEventFunction } = useMatomoEcommerce()
  const { priceToken } = useCoingecko(
    pool.chain.nativeTokenName.toLowerCase(),
    pool.chain.addressWrapped.toLowerCase(),
    tokenAddresses.toString()
  )

  const disabled = userWalletAddress.length === 0 ?
    "Please connect your wallet by clicking the button below"
    :
    chainId !== pool.chainId ?
      `Please change to the ${pool.chain.chainName} by clicking the button below`
      :
      ""

  const isInvestType = typeAction === 'Invest' ? true : false

  function handleOnWheel() {
    if (document.activeElement?.classList.contains("noscroll")) {
      // eslint-disable-next-line prettier/prettier
      (document.activeElement as HTMLElement).blur()
    }
  }

  function wei2String(input: Big) {
    return BNtoDecimal(input.div(Big(10).pow(Number(tokenSelect.decimals))), tokenSelect.decimals).replace(/\u00A0/g, '')
  }

  function handleMaxUserBalance() {
    if (!inputAmountTokenRef || !amountTokenIn) {
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

      inputAmountTokenRef.current.value = wei2String(selectedTokenInBalance)
      setAmountTokenIn(selectedTokenInBalance)
      setMaxActive(true)
    }
  }

  // get balance of swap in token
  React.useEffect(() => {
    if (
      tokenSelect.address.length === 0 ||
      userWalletAddress.length === 0 ||
      chainId.toString().length === 0 ||
      chainId !== pool.chainId
    ) {
      return
    }

    if (tokenSelect.address === addressNativeToken1Inch) {
      web3.eth
        .getBalance(userWalletAddress)
        .then(newBalance =>
          setSelectedTokenInBalance(Big(newBalance.toString()))
        )
      return
    }

    const token = ERC20(tokenSelect.address)

    token
      .balance(userWalletAddress)
      .then(newBalance =>
        setSelectedTokenInBalance(Big(newBalance.toString()))
      )
  }, [
    chainId,
    typeAction,
    tokenSelect,
    userWalletAddress,
    pool
  ])

  return (
    <S.InputAndOutputValueToken>
      <S.FlexContainer>
        <S.Top>
          <S.Info>
            <S.Title>{isInvestType ? 'Pay with' : 'Swap to'}</S.Title>
            {isInvestType ? <TokenSelected/> : <TokenSelect />}
            <S.Span spanlight={true}>
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
            <S.Input
              className="noscroll"
              readOnly={!isInvestType || disabled.length > 0 }
              ref={inputAmountTokenRef}
              value={isInvestType ? inputAmountTokenRef.current?.value : Number(
                BNtoDecimal(
                  new Big(amountTokenIn)?.div(Big(10).pow(18)) || new BigNumber(0),
                  18,
                  6
                ).replace(/\s/g, '')
              )}
              type="number"
              placeholder="0"
              step="any"
              onWheel={() => handleOnWheel()}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
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

                  const decimalsNum = tokenSelect.decimals
                  const values = value.split('.')
                  const paddedRight = `${values[0]}${`${values[1] || 0}${'0'.repeat(decimalsNum)}`.slice(0, decimalsNum)}`

                  setMaxActive && setMaxActive(false)
                  setAmountTokenIn(paddedRight)
                }
              }
            />
            </Tippy>
            <span className="price-dolar">
              {tokenSelect.address &&
                amountTokenIn &&
                'USD: ' +
                  BNtoDecimal(
                    Big(amountTokenIn.toString())
                      .mul(
                        Big(priceToken(tokenSelect.address.toLocaleLowerCase()) || 0)
                      )
                      .div(Big(10).pow(Number(tokenSelect.decimals))),
                    18,
                    2,
                    2
                  )}
            </span>
          </S.Amount>
        </S.Top>
        {errorMsg !== '' ? (
          <S.ErrorMSG color="red">{errorMsg}</S.ErrorMSG>
          ) : (
          <>
            {/* {gasFee && gasFee?.error && (
              <S.Span color="amber">
                Don’t forget the gas fees! Leave at least{' '}
                {gasFee.feeString.slice(0, 8)} AVAX on your wallet to ensure a
                smooth transaction
              </S.Span>
            )} */}
          </>
        )}
      </S.FlexContainer>
    </S.InputAndOutputValueToken>
  )
}

export default InputAndOutputValueToken
