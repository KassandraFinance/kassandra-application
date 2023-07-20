import { TooltipProps } from 'recharts'
import Big from 'big.js'

import { BNtoDecimal } from '@/utils/numerals'
import { getDateInHours } from '@/utils/date'

import { DataType } from '../index'

import * as S from './styles'

interface ICustomizedTooltip {
  currentValue: DataType
}

const CustomizedTooltip = ({
  active,
  payload,
  currentValue
}: ICustomizedTooltip & TooltipProps) => {
  let value = 0
  let timestamp = getDateInHours(new Date().getTime() / 1000)
  if (active && payload && payload.length) {
    value = Number(payload[0]?.value || 0)
    timestamp = payload[0].payload?.timestamp
      ? getDateInHours(payload[0].payload?.timestamp)
      : timestamp
  } else {
    timestamp = currentValue?.timestamp
      ? getDateInHours(currentValue?.timestamp)
      : timestamp
    value = currentValue?.close ?? 0
  }

  return (
    <S.CustomizedTooltip>
      <S.ValueContainer>
        <S.Value>
          ${BNtoDecimal(Big(value), 2)}
          <S.TimestampSpan>{timestamp}</S.TimestampSpan>
        </S.Value>
      </S.ValueContainer>
    </S.CustomizedTooltip>
  )
}

export default CustomizedTooltip
