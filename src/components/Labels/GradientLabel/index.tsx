import React from 'react'

import * as S from './styles'

interface IGradientLabelProps {
  text: string | number
  img?: {
    url: string
    width?: number
    height?: number
  }
}

const GradientLabel = ({ text, img }: IGradientLabelProps) => (
  <S.GradientLabel>
    {img && (
      <img
        src={img.url}
        alt={`${text} icon`}
        width={img?.width ?? 8}
        height={img?.height ?? 8}
      />
    )}

    <p>{text}</p>
  </S.GradientLabel>
)

export default GradientLabel
