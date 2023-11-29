import React from 'react'

import * as S from './styles'

interface ILoadingProps {
  width?: number
  line?: number
  height?: number
  spacings?: number
}

const SkeletonLoading = ({
  height = 2,
  line = 1,
  spacings = 2.4,
  width
}: ILoadingProps) => (
  <S.SkeletonLoading spacings={spacings}>
    {Array(line)
      .fill(line)
      .map((_, index) => (
        <S.SkeletonLoadingContent key={index} height={height} width={width} />
      ))}
  </S.SkeletonLoading>
)

export default SkeletonLoading
