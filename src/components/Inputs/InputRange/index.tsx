import React from 'react'
import * as S from './styles'

interface IInputRangeProps {
  name: string;
  min?: number;
  max?: number;
  step?: number;
  InputRangeValue: number;
  handleInputRate: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputRange = ({
  name,
  InputRangeValue,
  handleInputRate,
  min = 0,
  max = 1,
  step = 0.01
}: IInputRangeProps) => {
  return (
    <S.WrapperToggle>
      <S.Label>{name}</S.Label>
      <S.InputRange
        type="range"
        name={name}
        min={min}
        max={max}
        step={step}
        value={InputRangeValue}
        onChange={event => handleInputRate(event)}
      />
      <S.InputNumber
        type="number"
        name={name}
        min={min}
        max={max}
        step={step}
        value={InputRangeValue}
        onChange={event => handleInputRate(event)}
      />
    </S.WrapperToggle>
  )
}

export default InputRange
