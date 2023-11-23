import React from 'react'

import Button from '@/components/Button'
import NewPoolOperations from '@/templates/Pool/NewPoolOperations'

import * as S from './styles'

type Operations = 'Invest' | 'Withdraw'

interface IOperationProps {
  hasStake: boolean
  handleClickStakeButton: (scrollToValue: number) => void
}

const Operation = ({ hasStake, handleClickStakeButton }: IOperationProps) => {
  const [isOpenPoolOperation, setIsOpenPoolOperation] = React.useState(false)
  const [operation, setOperation] = React.useState<Operations>('Invest')

  function handleClick(operation: Operations) {
    setOperation(operation)
    setIsOpenPoolOperation(true)
  }

  return (
    <S.Operation>
      <S.ButtonWarap>
        <Button
          background="secondary"
          text="Buy"
          fullWidth
          onClick={() => handleClick('Invest')}
        />
      </S.ButtonWarap>

      <S.ButtonWarap>
        <Button
          background="black"
          text="Sell"
          className="sell"
          fullWidth
          onClick={() => handleClick('Withdraw')}
        />
      </S.ButtonWarap>

      {hasStake && (
        <S.StakeButton onClick={() => handleClickStakeButton(0)}>
          <p>Stake</p>
          <img
            src="/assets/iconGradient/lightning.svg"
            alt="Lightning Icon"
            width={16}
            height={16}
          />
        </S.StakeButton>
      )}

      <NewPoolOperations
        isOpenPoolOperation={isOpenPoolOperation}
        setIsOpenPoolOperation={setIsOpenPoolOperation}
        operation={operation}
        setOperation={setOperation}
      />
    </S.Operation>
  )
}

export default Operation
