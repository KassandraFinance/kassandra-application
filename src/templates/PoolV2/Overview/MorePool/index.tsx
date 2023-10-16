import React from 'react'

import FundCard from '@/components/FundCard'

import * as S from './styles'

const MorePool = () => {
  return (
    <S.MorePool>
      <S.MorePoolHeader>
        <h1>More Pools</h1>

        <S.Line />
      </S.MorePoolHeader>

      <S.FundCardContainer>
        <FundCard
          key={'0x38918142779e2CD1189cBd9e932723C968363D1E'}
          poolAddress={'0x38918142779e2CD1189cBd9e932723C968363D1E'}
          link={`/pool/"0x38918142779e2CD1189cBd9e932723C968363D1E`}
        />
        <FundCard
          key={'0xA6CAB4b1019ee22309dcA5ba62C3372a791dcB2E'}
          poolAddress={'0xA6CAB4b1019ee22309dcA5ba62C3372a791dcB2E'}
          link={`/pool/"0xA6CAB4b1019ee22309dcA5ba62C3372a791dcB2E`}
        />
        <FundCard
          key={
            '1370x83db290ae85e02fef7ccf45c1b551e75e7f8cc82000100000000000000000b52'
          }
          poolAddress={
            '1370x83db290ae85e02fef7ccf45c1b551e75e7f8cc82000100000000000000000b52'
          }
          link={`/pool/"1370x83db290ae85e02fef7ccf45c1b551e75e7f8cc82000100000000000000000b52`}
        />
      </S.FundCardContainer>
    </S.MorePool>
  )
}

export default MorePool
