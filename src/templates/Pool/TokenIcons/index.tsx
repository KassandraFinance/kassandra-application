import Image from 'next/image'
import React from 'react'

import { useAppSelector } from '../../../store/hooks'

import none from '../../../../public/assets/icons/coming-soon.svg'

import * as S from './styles'

type ITokenInfoProps = {
  id: string,
  balance_in_pool: string,
  address: string,
  name: string,
  symbol: string,
  allocation: number,
  price: number
}

const TokenIcons = () => {
  const assets = useAppSelector(state => state.pool.underlying_assets)

  return (
    <S.Container>
      {assets
        .slice(0, assets.length >= 3 ? 3 : assets.length)
        .map((asset, index) => (
          <S.ImageWrapper
            key={index}
            className={asset.token.id ? '' : 'svg-none'}
            index={index}
          >
            <Image
              src={asset.token.logo ?? asset.token.wraps.logo ?? none.src}
              alt=""
              width={18}
              height={18}
            />
          </S.ImageWrapper>
        ))}
    </S.Container>
  )
}

export default TokenIcons
