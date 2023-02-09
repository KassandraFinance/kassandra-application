import React from 'react'
import Image from 'next/image'

import { useAppDispatch, useAppSelector } from '../../../../../store/hooks'

import { setTokenSelectionActive } from '../../../../../store/reducers/tokenSelectionActive'

import arrow from '../../../../../../public/assets/utilities/arrow-select-down.svg'
import none from '../../../../../../public/assets/icons/coming-soon.svg'

import * as S from './styles'

const TokenSelected = () => {
  const { tokenSelect } = useAppSelector(state => state)
  const dispatch = useAppDispatch()

  return (
    <S.SelectToken>
      <S.Selected
        onClick={() => {
          dispatch(setTokenSelectionActive(true))
        }}
      >
        <S.tokenInfo>
          <img
            src={tokenSelect.logoURI || none}
            alt=""
            width={22}
            height={22}
          />
          <p>{tokenSelect.symbol}</p>
        </S.tokenInfo>
        <img
          src="/assets/utilities/arrow-down-thin.svg"
          alt=""
          width={14}
          height={14}
        />
      </S.Selected>
    </S.SelectToken>
  )
}

export default TokenSelected
