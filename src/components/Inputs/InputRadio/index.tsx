import React from 'react'

import * as S from './styles'

interface IInputRadioProps {
  form?: string;
  text: string;
  inputId: string;
  value?: string;
  name?: string;
  required?: boolean;
  handleClickInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputChecked?: boolean;
}

// eslint-disable-next-line prettier/prettier
const InputRadio = ({
  form = undefined,
  text,
  inputId,
  value,
  name,
  required = false,
  inputChecked,
  handleClickInput
}: IInputRadioProps) => {
  return (
    <S.InputRadioContainer>
      <S.InputRadio
        form={form}
        type="radio"
        id={inputId}
        value={value || 'inputValue'}
        name={name || 'inputName'}
        required={required}
        onChange={event => handleClickInput(event)}
        checked={inputChecked}
      />
      <S.Label htmlFor={inputId}>{text}</S.Label>
    </S.InputRadioContainer>
  )
}

export default InputRadio
