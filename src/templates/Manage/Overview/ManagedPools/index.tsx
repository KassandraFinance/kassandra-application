import React from 'react'

import FundCard from '../../../../components/FundCard'
import InputFilter from '../../../../components/Inputs/InputFilter'

import * as S from './styles'

const ManagedPools = () => {
  const [filter, setFilter] = React.useState('')

  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value)
  }

  function handleClear() {
    setFilter('')
  }

  return (
    <S.ManagedPools>
      <S.FilterContainer>
        <S.FilterWrapper>
          <InputFilter
            name="managedPoolsFilter"
            placeholder="Filter"
            value={filter}
            onChange={handleFilter}
            onClear={handleClear}
          />
        </S.FilterWrapper>
      </S.FilterContainer>

      <S.ManagedPoolsWrapper>
        <S.ManagedPoolsContainer>
          <FundCard poolAddress="0x38918142779e2CD1189cBd9e932723C968363D1E" />
          <FundCard poolAddress="0xA6CAB4b1019ee22309dcA5ba62C3372a791dcB2E" />
        </S.ManagedPoolsContainer>
      </S.ManagedPoolsWrapper>
    </S.ManagedPools>
  )
}

export default ManagedPools
