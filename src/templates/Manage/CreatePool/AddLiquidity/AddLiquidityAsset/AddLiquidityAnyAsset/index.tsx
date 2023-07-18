import React from 'react'
import Image from 'next/image'
import Big from 'big.js'
import Tippy from '@tippyjs/react'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setTokenInAmount } from '@/store/reducers/poolCreationSlice'
import tokenSelectionActive from '@/store/reducers/tokenSelectionActive'

import Input from './Input'

import tooltip from '@assets/utilities/tooltip.svg'
import { MIN_DOLLAR_TO_CREATE_POOL } from '@/constants/tokenAddresses'

import * as S from './styles'

type AddLiquidityAnyAssetProps = {
  priceToken: (address: string) => string
}

const AddLiquidityAnyAsset = ({ priceToken }: AddLiquidityAnyAssetProps) => {
  const [tokenInbalance, setTokenInBalance] = React.useState(Big('0'))
  const [maxActive, setMaxActive] = React.useState(false)
  const amountInRef = React.useRef<HTMLInputElement>(null)

  const dispatch = useAppDispatch()
  const { tokenIn, tokenInAmount } = useAppSelector(
    state => state.poolCreation.createPoolData
  )

  function handleInvalid(event: any) {
    return event.target.setCustomValidity(' ')
  }

  React.useEffect(() => {
    dispatch(setTokenInAmount('0.0'))
    setMaxActive(false)
  }, [tokenSelectionActive])

  const totalDollarIn = Big(tokenInAmount)
    .div(Big(10).pow(tokenIn?.decimals || 18))
    .mul(priceToken(tokenIn.address))

  return (
    <S.AddLiquidityAnyAsset>
      <S.Title>set the pool’s initial liquidity</S.Title>
      <Input
        amountTokenIn={tokenInAmount}
        errorMsg={
          totalDollarIn.lt(MIN_DOLLAR_TO_CREATE_POOL)
            ? `Value must be greater than $${MIN_DOLLAR_TO_CREATE_POOL}`
            : ''
        }
        inputAmountTokenRef={amountInRef}
        selectedTokenInBalance={tokenInbalance}
        setAmountTokenIn={input => {
          dispatch(setTokenInAmount(input.toString()))
        }}
        setSelectedTokenInBalance={setTokenInBalance}
        title="Add with"
        setMaxActive={setMaxActive}
        maxActive={maxActive}
        priceToken={priceToken}
        tokenSelect={tokenIn}
      />
      <S.PriceImpactContainer>
        <S.Tippy>
          <span>Slippage tolerance</span>
          <Tippy
            content={
              <S.TippyContent>
                Slippage allows you to configure how much the price can change
                against you. Slippages larger than 1% could allow a bad actor to
                purposely run a transaction before you just so you pay the
                maximum slippage, this is called frontrunning.
              </S.TippyContent>
            }
          >
            <span>
              <Image src={tooltip} alt="Explanation" width={14} height={14} />
            </span>
          </Tippy>
        </S.Tippy>
        <span>1%</span>
      </S.PriceImpactContainer>
      {totalDollarIn.lt(MIN_DOLLAR_TO_CREATE_POOL) && (
        <S.InputValidation
          form="poolCreationForm"
          id="select-token"
          name="select-token"
          type="radio"
          onInvalid={handleInvalid}
          required
          checked={totalDollarIn.gte(MIN_DOLLAR_TO_CREATE_POOL)}
          onChange={() => {
            return
          }}
        />
      )}
    </S.AddLiquidityAnyAsset>
  )
}
export default AddLiquidityAnyAsset
