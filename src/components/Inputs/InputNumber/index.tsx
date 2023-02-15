import React from 'react'

import * as S from './styles'

interface IInputNumberProps {
  form?: string;
  name: string;
  min?: number;
  max?: number;
  step?: number;
  InputNumberValue: number;
  handleInputNumber: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputNumber = ({
  form = undefined,
  name,
  InputNumberValue,
  handleInputNumber,
  min = 0,
  max = 1,
  step = 0.01
}: IInputNumberProps) => {
  return (
    <S.WrapperInputNumber>
      <S.Label value={String(InputNumberValue)}>
        <S.InputNumber
          form={form}
          type="Number"
          id={name}
          name={name}
          value={InputNumberValue}
          min={min}
          max={max}
          step={step}
          onChange={event => handleInputNumber(event)}
          required
        />
      </S.Label>
    </S.WrapperInputNumber>
  )
}

export default InputNumber
