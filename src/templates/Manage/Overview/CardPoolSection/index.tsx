import React from 'react'

import FundCard from '@ui/FundCard'
import InputFilter from '@ui/Inputs/InputFilter'

import * as S from './styles'

type PoolData = {
  id: string
  name: string
  logo?: string | null
  chain?: {
    logo?: string | null
  } | null
}

interface ICardPoolSectionProps {
  data?: PoolData[]
}

const CardPoolSection = ({ data }: ICardPoolSectionProps) => {
  const [filter, setFilter] = React.useState('')

  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value)
  }

  function handleClear() {
    setFilter('')
  }

  function searchPool(search: string, pools: PoolData[]) {
    const expressao = new RegExp(search, 'i')
    const arr = pools.filter(pool => expressao.test(pool.name))
    return arr
  }

  return (
    <S.CardPoolSection>
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

      <S.PoolsListWrapper>
        <S.PoolsListContainer>
          {data &&
            searchPool(filter, data).map(pool => (
              <FundCard
                key={pool.id}
                poolAddress={pool.id}
                link={`/manage/${pool.id}`}
              />
            ))}
        </S.PoolsListContainer>
      </S.PoolsListWrapper>
    </S.CardPoolSection>
  )
}

export default CardPoolSection
