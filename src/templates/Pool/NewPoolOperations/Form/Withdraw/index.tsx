import Big from 'big.js'
import React from 'react'

import InputAndOutputValueToken from '../InputAndOutputValueToken'
import ListOfAllAsset from '../ListOfAllAsset'
import TokenAssetIn from '../TokenAssetIn'

import * as S from './styles'

interface IWithdrawProps {
  typeWithdraw: string;
}

const Withdraw = ({ typeWithdraw }: IWithdrawProps) => {
  const [amountTokenOut, setAmountTokenOut] = React.useState<Big | string>(
    Big(0)
  )
  const [selectedTokenInBalance, setSelectedTokenInBalance] = React.useState(
    new Big(-1)
  )
  const [errorMsg, setErrorMsg] = React.useState('')
  const [maxActive, setMaxActive] = React.useState<boolean>(false)
  const inputAmountTokenRef = React.useRef<HTMLInputElement>(null)

  return (
    <S.Withdraw>
      <TokenAssetIn />
      <img src="/assets/icons/arrow-down.svg" alt="" width={20} height={20} />
      {typeWithdraw === 'Best_value' ? (
        <ListOfAllAsset />
      ) : (
        <InputAndOutputValueToken
          typeAction={typeWithdraw}
          amountTokenIn={amountTokenOut}
          setAmountTokenIn={setAmountTokenOut}
          selectedTokenInBalance={selectedTokenInBalance}
          setSelectedTokenInBalance={setSelectedTokenInBalance}
          maxActive={maxActive}
          setMaxActive={setMaxActive}
          inputAmountTokenRef={inputAmountTokenRef}
          errorMsg={errorMsg}
        />
      )}
    </S.Withdraw>
  )
}

export default Withdraw
