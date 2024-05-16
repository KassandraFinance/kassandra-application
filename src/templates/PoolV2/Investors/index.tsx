import React from 'react'

import InvestorsTable from './InvestorsTable'
import Pagination from '@/components/Pagination'

import * as S from './styles'
import { IPoolDataProps } from '@/hooks/query/usePoolData'

interface IInvestorsProps {
  pool: IPoolDataProps
}

const Investors = ({ pool }: IInvestorsProps) => {
  const [skip, setSkip] = React.useState(0)
  const [totalItems, setTotalItems] = React.useState(0)
  const take = 10

  function handlePageClick(data: { selected: number }) {
    setSkip(data.selected * take)
  }

  return (
    <S.Investors>
      <InvestorsTable
        pool={pool}
        skip={skip}
        take={take}
        setTotalItems={setTotalItems}
      />

      <S.PaginationWrapper>
        <Pagination
          skip={skip}
          totalItems={totalItems}
          take={take}
          handlePageClick={handlePageClick}
        />
      </S.PaginationWrapper>
    </S.Investors>
  )
}

export default Investors
