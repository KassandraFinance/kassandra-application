import React from 'react'

import { useAppSelector } from '@/store/hooks'
import useManagerPools, { GetManagerPoolsType } from '@/hooks/useManagerPools'

import FundCard from '@ui/FundCard'
import InputFilter from '@ui/Inputs/InputFilter'

import * as S from './styles'

const ManagedPools = () => {
  const [filter, setFilter] = React.useState('')

  const userWalletAddress = useAppSelector(state => state.userWalletAddress)

  const { managerPools } = useManagerPools(userWalletAddress)

  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value)
  }

  function handleClear() {
    setFilter('')
  }

  function searchPool(search: string, managerPools: GetManagerPoolsType) {
    const expressao = new RegExp(search, 'i')
    const arr = managerPools.pools.filter(pool => expressao.test(pool.name))
    return arr
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
          {managerPools &&
            searchPool(filter, managerPools).map(pool => (
              <FundCard
                key={pool.id}
                poolAddress={pool.id}
                link={`/manage/${pool.id}`}
              />
            ))}
        </S.ManagedPoolsContainer>
      </S.ManagedPoolsWrapper>
    </S.ManagedPools>
  )
}

export default ManagedPools
