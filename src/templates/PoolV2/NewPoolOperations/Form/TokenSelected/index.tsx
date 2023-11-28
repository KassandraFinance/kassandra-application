import React from 'react'
import Image from 'next/image'

import { useAppDispatch } from '../../../../../store/hooks'

import { setTokenSelectionActive } from '../../../../../store/reducers/tokenSelectionActive'
import { TokenSelectProps } from '@/store/reducers/poolCreationSlice'

import none from '@assets/icons/coming-soon.svg'

import * as S from './styles'

type TokenSelectedProps = {
  tokenSelect: TokenSelectProps
}

const TokenSelected = ({ tokenSelect }: TokenSelectedProps) => {
  const dispatch = useAppDispatch()

  return (
    <S.SelectToken>
      <S.Selected
        onClick={() => {
          dispatch(setTokenSelectionActive(true))
        }}
      >
        <S.tokenInfo>
          <Image
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
