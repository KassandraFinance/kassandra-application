import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { usePoolData } from '@/hooks/query/usePoolData'

import iconPower from '../../../../public/assets/iconGradient/voting-power-rank.svg'

import Partner from '../../../components/Partner'

import * as S from './styles'

const PoweredBy = () => {
  const router = useRouter()
  const { data: pool } = usePoolData({ id: router.query.address as string })

  return (
    <S.PoweredBy>
      <S.Title>
        <Image src={iconPower} alt="Powered by Icon" width={18} height={18} />
        <h2>Powered by</h2>
      </S.Title>
      <S.Line />
      <S.PartnersContent>
        {pool?.partners &&
          pool.partners.map(
            partner =>
              partner && (
                <Partner
                  key={partner.logo}
                  href={partner?.url || ''}
                  logo={partner?.logo || ''}
                />
              )
          )}
      </S.PartnersContent>
    </S.PoweredBy>
  )
}

export default PoweredBy
