import React from 'react'
import Image from 'next/image'

import none from '@assets/icons/coming-soon.svg'

import { UnderlyingAssetsInfoType } from '@/utils/updateAssetsToV2'

import * as S from './styles'

interface TokenIconsProps {
  poolInfo: UnderlyingAssetsInfoType[]
}

const FundTokenIcons = ({ poolInfo }: TokenIconsProps) => {
  return (
    <S.Container>
      {poolInfo
        .slice(0, poolInfo.length >= 3 ? 3 : poolInfo.length)
        .map((asset, index) => {
          return (
            <S.ImageWrapper key={index}>
              <Image
                src={asset.token.wraps?.logo ?? asset.token.logo ?? none}
                alt=""
                width={16}
                height={16}
              />
              <span>
                {(Number(poolInfo[index].weight_normalized) * 100).toFixed(2)}%
              </span>
            </S.ImageWrapper>
          )
        })}
    </S.Container>
  )
}

export default FundTokenIcons
