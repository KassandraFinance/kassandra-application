import React from 'react'

import * as S from './styles'

interface ILoadingProps {
  width?: number | string
  line?: number
  height?: number
  spacings?: number
  borderRadios?: number
}

const SkeletonLoading = ({
  height = 2,
  line = 1,
  spacings = 2.4,
  width,
  borderRadios = 4,
  ...rest
}: ILoadingProps) => (
  <S.SkeletonLoading spacings={spacings}>
    {Array(line)
      .fill(line)
      .map((_, index) => (
        <S.SkeletonLoadingContent
          key={index}
          height={height}
          width={width}
          borderRadios={borderRadios}
          {...rest}
        />
      ))}
  </S.SkeletonLoading>
)

export default SkeletonLoading
