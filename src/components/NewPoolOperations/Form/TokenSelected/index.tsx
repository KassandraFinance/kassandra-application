import React from 'react'
import Image from 'next/image'

import { ITokenDetails } from '../../../../context/PoolTokensContext'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'

import { setTokenSelected } from '../../../../store/reducers/tokenSelected'

import arrow from '../../../../../public/assets/utilities/arrow-select-down.svg'
import none from '../../../../../public/assets/icons/coming-soon.svg'

import avax from '../../../../../public/assets/logos/avax.png'

import * as S from './styles'

interface ISelectInputProps {
  // poolTokens: ITokenDetails[];
  tokenDetails: any[];
  setSwapAddress: React.Dispatch<React.SetStateAction<string>>;
}

const TokenSelected = () => {
  const { poolImages, tokenSelect } = useAppSelector(state => state)
  const dispatch = useAppDispatch()

  return (
    <S.SelectToken openOptions={true}>
      <S.Selected
        openOptions={true}
        onClick={() => {
          // setOpenOptions(false)
          // setSwapAddress(token.address)
          dispatch(setTokenSelected(true))
        }}
      >
        <div className="img">
          <Image
            // src={poolImages[tokenDetails?.address] || none}
            src={tokenSelect.logoURI || none}
            alt=""
            width={22}
            height={22}
          />
        </div>
        {/* {tokenDetails?.symbol} */}
        {tokenSelect.symbol}
        <div id="arrow-down">
          <Image src={arrow} alt="" />
        </div>
      </S.Selected>

      {/* {openOptions && (
        <>
          <S.Backdrop onClick={() => setOpenOptions(false)} />
          <S.OptionsContent>
            {poolTokens &&
              poolTokens.map((token: ITokenDetails) => (
                <S.Option
                  key={token.symbol}
                  onClick={() => {
                    setOpenOptions(false)
                    setSwapAddress(token.address)
                  }}
                >
                  <div className="img">
                    <Image
                      src={poolImages[token.address] || none}
                      alt=""
                      width={22}
                      height={22}
                    />
                  </div>
                  {token.symbol}
                </S.Option>
              ))}
          </S.OptionsContent>
        </>
      )} */}
    </S.SelectToken>
  )
}

export default TokenSelected
