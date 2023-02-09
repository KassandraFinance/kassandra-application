import React from 'react'
import Image from 'next/image'

import { useAppSelector } from '../../../store/hooks'

import iconPower from '../../../../public/assets/iconGradient/voting-power-rank.svg'

import Partner, { PartnerData } from '../../../components/Partner'

import * as S from './styles'

const PoweredBy = () => {
  const { pool } = useAppSelector(state => state)

  return (
    <S.PoweredBy>
      <S.Title>
        <Image src={iconPower} alt="Powered by Icon" width={18} height={18} />
        <h2>Powered by</h2>
      </S.Title>
      <S.Line />
      <S.PartnersContent>
        {pool.partners &&
          pool.partners.map(
            (partner, index) =>
              partner && (
                <Partner
                  key={index + partner.logo}
                  href={partner.url}
                  logo={partner.logo}
                />
              )
          )}
      </S.PartnersContent>
    </S.PoweredBy>
  )
}

export default PoweredBy
