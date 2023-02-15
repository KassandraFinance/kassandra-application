import React from 'react'

import * as S from './styles'

interface IInputTimeProps {
  form?: string;
  name: string;
  min?: number;
  max?: number;
  step?: number;
  InputTimeValue: number | undefined;
  handleInputTime: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputTime = ({
  form = undefined,
  name,
  InputTimeValue,
  handleInputTime,
  min = 0,
  max = 1,
  step = 0.01
}: IInputTimeProps) => {
  return (
    <S.WrapperInputTime>
      <S.InputNumber
        form={form}
        type="number"
        name={name}
        min={min}
        max={max}
        step={step}
        value={InputTimeValue}
        onChange={event => handleInputTime(event)}
        placeholder="Time"
        required={InputTimeValue ? true : false}
      />
      <S.Label>{name}</S.Label>
    </S.WrapperInputTime>
  )
}

export default InputTime
