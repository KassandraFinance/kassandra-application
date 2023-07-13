import React from 'react'
import { useConnectWallet } from '@web3-onboard/react'

import { useManagerPools } from '@/hooks/query/useManagerPools'

import FundCard from '@ui/FundCard'
import InputFilter from '@ui/Inputs/InputFilter'

import * as S from './styles'

type ManagerPoolsType = {
  __typename?: 'Pool' | undefined
  id: string
  name: string
  logo?: string | null | undefined
  chain?:
    | {
        __typename?: 'Chain' | undefined
        logo?: string | null | undefined
      }
    | null
    | undefined
}

const ManagedPools = () => {
  const [filter, setFilter] = React.useState('')

  const [{ wallet }] = useConnectWallet()

  const { data: managerPools } = useManagerPools({
    manager: wallet?.accounts[0].address
  })

  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value)
  }

  function handleClear() {
    setFilter('')
  }

  function searchPool(search: string, managerPools: ManagerPoolsType[]) {
    const expressao = new RegExp(search, 'i')
    const arr = managerPools.filter(pool => expressao.test(pool.name))
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
