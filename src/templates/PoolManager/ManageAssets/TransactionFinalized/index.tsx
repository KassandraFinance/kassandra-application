import React, { ReactNode } from 'react'
import Image from 'next/image'

import Button from '../../../../components/Button'

import * as S from './styles'

interface ITransactionFinalized {
  title: string
  image: any
  onCLick: () => void
  children: ReactNode
}

const TransactionFinalized = ({
  title,
  image,
  children,
  onCLick
}: ITransactionFinalized) => {
  return (
    <S.TransactionFinalized>
      <S.ImageWrapper>
        <Image src={image} layout="fill" />
      </S.ImageWrapper>

      <S.Title>{title}</S.Title>

      {children}

      <Button text="Done" background="primary" fullWidth onClick={onCLick} />
    </S.TransactionFinalized>
  )
}

export default TransactionFinalized
