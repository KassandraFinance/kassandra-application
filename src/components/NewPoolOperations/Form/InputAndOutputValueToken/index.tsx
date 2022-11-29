import React from 'react'
import Tippy from '@tippyjs/react'
import Big from 'big.js'

import { BNtoDecimal } from '../../../../utils/numerals'
import web3 from '../../../../utils/web3'

import { useAppSelector } from '../../../../store/hooks'

import { ERC20 } from '../../../../hooks/useERC20Contract'

import TokenSelected from '../TokenSelected'

import * as S from './styles'

//   setSwapAddress: React.Dispatch<React.SetStateAction<string>>;

const InputAndOutputValueToken = () => {
  const [selectedTokenInBalance, setSelectedTokenInBalance] = React.useState(
    new Big(-1)
  )
  // const [selectedTokenIn, setSelectedTokenIn] = React.useState('')

  const { pool, chainId, tokenSelect, userWalletAddress } = useAppSelector(
    state => state
  )

  function handleOnWheel() {
    if (document.activeElement?.classList.contains("noscroll")) {
      // eslint-disable-next-line prettier/prettier
      (document.activeElement as HTMLElement).blur()
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

    // setSwapInBalance(new BigNumber(-1))
    if (tokenSelect.address === pool.chain.addressWrapped) {
      web3.eth
        .getBalance(userWalletAddress)
        .then(newBalance =>
          setSelectedTokenInBalance(new Big(newBalance.toString()))
        )

      return
    }

    const token = ERC20(tokenSelect.address)

    token
      .balance(userWalletAddress)
      .then(newBalance =>
        setSelectedTokenInBalance(new Big(newBalance.toString()))
      )
  }, [
    chainId,
    // newTitle,
    tokenSelect.address,
    userWalletAddress,
    pool.underlying_assets_addresses
    // swapOutAddress
  ])

  //   disabled={
  //   userWalletAddress.length === 0
  //     ? "Please connect your wallet by clicking the button below"
  //     : chainId !== poolChain.chainId
  //       ? `Please change to the ${poolChain.chainName} by clicking the button below`
  //       : ""
  // }

  return (
    <S.InputAndOutputValueToken>
      <S.FlexContainer>
        <S.Top>
          <S.Info>
            <S.Title>Pay with</S.Title>
            <TokenSelected />
            <S.Span spanlight={true}>
              Balance:{' '}
              {selectedTokenInBalance > new Big(-1)
                ? BNtoDecimal(
                    selectedTokenInBalance.div(
                      Big(10).pow(tokenSelect.decimals)
                    ),
                    tokenSelect.decimals,
                    6
                  )
                : '...'}
            </S.Span>
          </S.Info>
          <S.Amount>
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
              className="noscroll"
              // readOnly={disabled.length > 0}
              // ref={inputRef}
              // value={inputRef?.current?.value}
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
              //     // setMaxActive && setMaxActive(false)
              //     setInputValue && setInputValue(new BigNumber(paddedRight))
              //   }
              // }
            />
            {/* </Tippy> */}
            <span className="price-dolar">
              {/* {tokenSelect.address &&
                amount &&
                'USD: ' +
                  BNtoDecimal(
                    Big(amount.toString())
                      .mul(
                        Big(priceDollar(tokenSelect.address, poolTokensArray))
                      )
                      .div(Big(10).pow(Number(18))),
                    // .div(Big(10).pow(Number(decimals))),
                    18,
                    2,
                    2
                  )} */}
              USD: 0.00
            </span>
          </S.Amount>
        </S.Top>
      </S.FlexContainer>
    </S.InputAndOutputValueToken>
  )
}

export default InputAndOutputValueToken
