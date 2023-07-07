import React from 'react'
import Big from 'big.js'

import { BNtoDecimal } from '@/utils/numerals'

import * as S from './styles'

interface IKacyEarnedProps {
  kacyEarned: Big
  kacyPrice: Big
}

const KacyEarned = ({ kacyEarned, kacyPrice }: IKacyEarnedProps) => {
  return (
    <S.KacyEarned>
      <p>
        KACY <span>Earned</span>
      </p>
      <h3>
        {kacyEarned.lt(0)
          ? '...'
          : BNtoDecimal(kacyEarned.div(Big(10).pow(18)), 18, 2)}
      </h3>
      <span>
        <b>&#8776;</b>{' '}
        {kacyEarned.lt(0) || kacyPrice.lt(0)
          ? '...'
          : BNtoDecimal(
              kacyEarned.mul(kacyPrice).div(Big(10).pow(18)),
              6,
              2,
              2
            )}{' '}
        <b>USD</b>
      </span>
    </S.KacyEarned>
  )
}

export default KacyEarned
