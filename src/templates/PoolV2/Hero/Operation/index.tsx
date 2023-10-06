import React from 'react'

import Button from '@/components/Button'
import NewPoolOperations from '@/templates/Pool/NewPoolOperations'

import * as S from './styles'

type Operations = 'Invest' | 'Withdraw'

const Operation = () => {
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
