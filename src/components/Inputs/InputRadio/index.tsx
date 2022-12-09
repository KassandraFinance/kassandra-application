import React from 'react'

import * as S from './styles'

interface IInputRadioProps {
  text: string;
  inputId: string;
  value?: string;
  name?: string;
  handleClickInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputChecked?: boolean;
}

// eslint-disable-next-line prettier/prettier
const InputRadio = ({ text, inputId, value, name, inputChecked, handleClickInput }: IInputRadioProps) => {
  return (
    <S.InputRadioContainer>
      <S.InputRadio
        type="radio"
        id={inputId}
        value={value || 'inputValue'}
        name={name || 'inputName'}
        onChange={event => handleClickInput(event)}
        checked={inputChecked}
      />
      <S.Label htmlFor={inputId}>{text}</S.Label>
    </S.InputRadioContainer>
  )
}

export default InputRadio
