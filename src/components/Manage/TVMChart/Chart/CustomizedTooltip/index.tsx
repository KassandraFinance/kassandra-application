import { TooltipProps } from 'recharts'

import Big from 'big.js'
import { BNtoDecimal } from '../../../../../utils/numerals'

import * as S from './styles'

import { DataType } from '../index'

interface ICustomizedTooltip {
  currentValue: DataType;
}

const CustomizedTooltip = ({
  active,
  payload,
  currentValue
}: ICustomizedTooltip & TooltipProps) => {
  let value = '0'
  if (active && payload && payload.length) {
    value = payload[0].value.toString()
  } else {
    value = currentValue.close
  }

  return (
    <S.CustomizedTooltip>
      <S.Title>Total Value Managed</S.Title>

      <S.ValueContainer>
        <S.Value>${BNtoDecimal(Big(value), 2)}</S.Value>
      </S.ValueContainer>
    </S.CustomizedTooltip>
  )
}

export default CustomizedTooltip
