import React from 'react'

import * as S from './styles'

interface IInputTimeProps {
  form?: string
  name: string
  min?: number
  max?: number
  step?: number
  InputTimeValue?: number
  handleInputTime: (event: React.ChangeEvent<HTMLInputElement>) => void
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
        id={name}
        name={name}
        min={min}
        max={max}
        step={step}
        value={InputTimeValue && InputTimeValue > 0 ? InputTimeValue : ''}
        onChange={event => handleInputTime(event)}
        placeholder="Time"
        required={InputTimeValue ? true : false}
      />
      <S.Label htmlFor={name}>{name}</S.Label>
    </S.WrapperInputTime>
  )
}

export default InputTime
