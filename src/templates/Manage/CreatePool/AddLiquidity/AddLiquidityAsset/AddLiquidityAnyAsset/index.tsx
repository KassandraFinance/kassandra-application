import React from 'react'
import Image from 'next/image'
import Big from 'big.js'
import Tippy from '@tippyjs/react'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setTokenInAmount } from '@/store/reducers/poolCreationSlice'
import tokenSelectionActive from '@/store/reducers/tokenSelectionActive'

import Input from './Input'

import tooltip from '@assets/utilities/tooltip.svg'

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

  React.useEffect(() => {
    dispatch(setTokenInAmount('0.0'))
    setMaxActive(false)
  }, [tokenSelectionActive])

  return (
    <S.AddLiquidityAnyAsset>
      <S.Title>set the pool’s initial liquidity</S.Title>
      <Input
        amountTokenIn={tokenInAmount}
        errorMsg=""
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
          <span>Price Impact</span>
          <Tippy content="aaaaa">
            <span>
              <Image src={tooltip} alt="Explanation" width={14} height={14} />
            </span>
          </Tippy>
        </S.Tippy>
        <span>1%</span>
      </S.PriceImpactContainer>
    </S.AddLiquidityAnyAsset>
  )
}
export default AddLiquidityAnyAsset
