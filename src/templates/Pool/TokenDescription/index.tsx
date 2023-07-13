import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

import { usePoolData } from '@/hooks/query/usePoolData'

import iconBar from '../../../../public/assets/iconGradient/product-bar.svg'

import * as S from './styles'

const TokenDescription = () => {
  const router = useRouter()
  const { data: pool } = usePoolData({ id: router.query.address as string })

  return pool?.summary ? (
    <>
      <S.Title>
        <Image src={iconBar} alt="" height={18} width={18} />
        <h2>Token Description</h2>
      </S.Title>
      <S.Line />
      <S.Text>
        <ReactMarkdown skipHtml={true} linkTarget={'_blank'}>
          {pool.summary}
        </ReactMarkdown>
      </S.Text>
    </>
  ) : (
    <></>
  )
}

export default TokenDescription
