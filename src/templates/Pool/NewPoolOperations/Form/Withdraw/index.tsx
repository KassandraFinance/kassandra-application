import React from 'react'
import InputAndOutputValueToken from '../InputAndOutputValueToken'
import ListOfAllAsset from '../ListOfAllAsset'
import { TokenAssetIn } from '../TokenAssetIn/styles'

import * as S from './styles'

interface IWithdrawProps {
  typeWithdraw: string;
}

const Withdraw = ({ typeWithdraw }: IWithdrawProps) => {
  return (
    <S.Withdraw>
      <TokenAssetIn />
      <ListOfAllAsset />
      {/* <InputAndOutputValueToken /> */}
    </S.Withdraw>
  )
}

export default Withdraw
