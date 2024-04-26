import React from 'react'

import * as S from './styles'

interface IGradientLabelProps {
  text: string | number
  img?: {
    url: string
    width: number
    height: number
  }
}

const Label = ({ text, img }: IGradientLabelProps) => (
  <S.Label>
    {img && (
      <img
        src={img.url}
        alt={`${text} icon`}
        width={img.width}
        height={img.height}
      />
    )}
    <p>{text}</p>
  </S.Label>
)

export default Label
