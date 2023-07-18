import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/router'

import { usePoolData } from '@/hooks/query/usePoolData'

import none from '../../../../public/assets/icons/coming-soon.svg'

import * as S from './styles'

const TokenIcons = () => {
  const router = useRouter()
  const { data: pool } = usePoolData({ id: router.query.address as string })

  const assets = pool?.underlying_assets
  return (
    <S.Container>
      {assets
        ?.slice(0, assets.length >= 3 ? 3 : assets.length)
        .map((asset, index) => (
          <S.ImageWrapper
            key={index}
            className={asset.token.id ? '' : 'svg-none'}
            index={index}
          >
            <Image
              src={asset.token.logo ?? asset.token.wraps?.logo ?? none.src}
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
