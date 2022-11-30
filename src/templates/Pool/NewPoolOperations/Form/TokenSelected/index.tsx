import React from 'react'
import Image from 'next/image'

// import { ITokenDetails } from '../../../../context/PoolTokensContext'
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks'

import { setTokenSelected } from '../../../../../store/reducers/tokenSelected'

import arrow from '../../../../../../public/assets/utilities/arrow-select-down.svg'
import none from '../../../../../../public/assets/icons/coming-soon.svg'

import * as S from './styles'

// interface ISelectInputProps {
//   // poolTokens: ITokenDetails[];
//   tokenDetails: any[];
//   setSwapAddress: React.Dispatch<React.SetStateAction<string>>;
// }

const TokenSelected = () => {
  const { tokenSelect } = useAppSelector(state => state)
  const dispatch = useAppDispatch()

  return (
    <S.SelectToken openOptions={true}>
      <S.Selected
        openOptions={true}
        onClick={() => {
          dispatch(setTokenSelected(true))
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
