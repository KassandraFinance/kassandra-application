import React, { ReactNode } from 'react'
import Image from 'next/image'

import Button from '../../../../components/Button'

import * as S from './styles'

interface ITransactionFinalized {
  title: string;
  image: any;
  children: ReactNode;
}

const TransactionFinalized = ({
  title,
  image,
  children
}: ITransactionFinalized) => {
  return (
    <S.TransactionFinalized>
      <S.ImageWrapper>
        <Image src={image} layout="fill" />
      </S.ImageWrapper>

      <S.Title>{title}</S.Title>

      {children}

      <Button text="Done" backgroundPrimary fullWidth />
    </S.TransactionFinalized>
  )
}

export default TransactionFinalized
