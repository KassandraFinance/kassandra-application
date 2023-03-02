import React from 'react'
import useSWR from 'swr'
import { request } from 'graphql-request'

import { BACKEND_KASSANDRA } from '../../../../constants/tokenAddresses'

import FundCard from '../../../../components/FundCard'
import InputFilter from '../../../../components/Inputs/InputFilter'

import { GET_POOLS } from './graphql'

import * as S from './styles'

const ManagedPools = () => {
  const [filter, setFilter] = React.useState('')
  const [pools, setPools] = React.useState([])

  const { data } = useSWR([GET_POOLS], query =>
    request(BACKEND_KASSANDRA, query)
  )

  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value)
  }

  function handleClear() {
    setFilter('')
  }

  React.useEffect(() => {
    if (data?.pools) {
      setPools(data.pools)
    }
  }, [data])

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
          {pools.map((pool: { id: string, address: string }) => (
            <FundCard key={pool.id} poolAddress={pool.id} />
          ))}
        </S.ManagedPoolsContainer>
      </S.ManagedPoolsWrapper>
    </S.ManagedPools>
  )
}

export default ManagedPools
