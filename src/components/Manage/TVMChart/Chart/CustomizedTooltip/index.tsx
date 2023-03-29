import { TooltipProps } from 'recharts'
import Big from 'big.js'

import { BNtoDecimal } from '@/utils/numerals'

import { DataType } from '../index'

import * as S from './styles'

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
    value = payload[0]?.value?.toString()
  } else {
    value = currentValue?.close ?? '0'
  }

  return (
    <S.CustomizedTooltip>
      <S.ValueContainer>
        <S.Value>${BNtoDecimal(Big(value || 0), 2)}</S.Value>
      </S.ValueContainer>
    </S.CustomizedTooltip>
  )
}

export default CustomizedTooltip
