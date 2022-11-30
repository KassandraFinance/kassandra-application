import React from 'react'
import Big from 'big.js'

import InputAndOutputValueToken from '../InputAndOutputValueToken'
import TokenAssetOut from '../TokenAssetOut'

// import { useAppSelector } from '../../../../store/hooks'

import * as S from './styles'

const Invest = () => {
  const [amountTokenIn, setAmountTokenIn] = React.useState<Big>(Big(0))
  // const { pool } = useAppSelector(state => state)

  // function handleSubmit() {

  // }

  const inputAmountTokenRef = React.useRef<HTMLInputElement>(null)

  return (
    <S.Invest>
      <InputAndOutputValueToken
        amountTokenIn={amountTokenIn}
        setAmountTokenIn={setAmountTokenIn}
      />
      <img
        src="/assets/icons/arrow-down.svg"
        alt=""
        style={{ margin: '12px 0' }}
      />
      <TokenAssetOut
      // amountTokenIn={amountTokenIn}
      // setAmountTokenIn={setAmountTokenIn}
      />
    </S.Invest>
  )
}

export default Invest
