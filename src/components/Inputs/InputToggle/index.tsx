import React from 'react'

import * as S from './styles'

interface IInputToggleProps {
  toggleName: string
  isChecked: boolean
  handleToggleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputToggle = ({
  toggleName,
  isChecked,
  handleToggleChange
}: IInputToggleProps) => {
  return (
    <S.WrapperToggle>
      <S.Label>{toggleName}</S.Label>
      <S.InputToggle
        type="checkbox"
        checked={isChecked}
        name={toggleName}
        id={toggleName}
        onChange={event => handleToggleChange(event)}
      />
    </S.WrapperToggle>
  )
}

export default InputToggle
