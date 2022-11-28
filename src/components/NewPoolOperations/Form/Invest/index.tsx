import React from 'react'
import InputAndOutputValueToken from '../InputAndOutputValueToken'
import TokenAssetOut from '../TokenAssetOut'

// import { useAppSelector } from '../../../../store/hooks'

import * as S from './styles'

const Invest = () => {
  // const { pool } = useAppSelector(state => state)

  // function handleSubmit() {

  // }
  return (
    <S.Invest>
      <InputAndOutputValueToken />
      <img
        src="/assets/icons/arrow-down.svg"
        alt=""
        style={{ margin: '12px 0' }}
      />
      <TokenAssetOut />
    </S.Invest>
  )
}

export default Invest
