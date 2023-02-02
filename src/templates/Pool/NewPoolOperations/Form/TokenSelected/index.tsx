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
        <div className="img">
          <Image
            src={tokenSelect.logoURI || none}
            alt=""
            width={22}
            height={22}
          />
        </div>
        {tokenSelect.symbol}
        <div id="arrow-down">
          <Image src={arrow} alt="" />
        </div>
      </S.Selected>
    </S.SelectToken>
  )
}

export default TokenSelected
