import React from 'react'
import * as S from './styles'

interface IInputToggleProps {
  toggleName?: string;
  toggleId?: string;
  handleToggleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputToggle = ({
  toggleName,
  toggleId,
  handleToggleChange
}: IInputToggleProps) => {
  return (
    <S.WrapperToggle>
      <S.Label>{toggleName}</S.Label>
      <S.InputToggle
        type="checkbox"
        name={toggleName || 'toggleName'}
        id={toggleId || 'toggleId'}
        onChange={event => handleToggleChange(event)}
      />
    </S.WrapperToggle>
  )
}

export default InputToggle
