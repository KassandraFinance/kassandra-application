import React from 'react'
import Big from 'big.js'

import { BNtoDecimal } from '@/utils/numerals'

import * as S from './styles'
import { LoadingAnimation } from '../styles'

interface IKacyEarnedProps {
  kacyEarned: Big
  kacyPrice: Big
}

const KacyEarned = ({ kacyEarned, kacyPrice }: IKacyEarnedProps) => {
  return (
    <S.KacyEarned data-testid="apr">
      <p>
        KACY <span>Earned</span>
      </p>
      {kacyEarned.lt(0) ? (
        <>
          <LoadingAnimation width={8.5} height={1.8} />
          <LoadingAnimation width={8.5} height={1.8} />
        </>
      ) : (
        <>
          <h3>{BNtoDecimal(kacyEarned.div(Big(10).pow(18)), 18, 2)}</h3>
          <span>
            <b>&#8776;</b>{' '}
            {BNtoDecimal(
              kacyEarned.mul(kacyPrice).div(Big(10).pow(18)),
              6,
              2,
              2
            )}{' '}
            <b>USD</b>
          </span>
        </>
      )}
    </S.KacyEarned>
  )
}

export default KacyEarned
