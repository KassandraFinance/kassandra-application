import React from 'react'

import TitleSection from '@ui/TitleSection'
import InvestorsTable from './InvestorsTable'
import Pagination from '@/components/Pagination'

import featuredIcon from '@assets/iconGradient/featured.svg'

import * as S from './styles'

const Investors = () => {
  const [skip, setSkip] = React.useState(0)
  const [totalItems, setTotalItems] = React.useState(0)
  const take = 10

  function handlePageClick(data: { selected: number }) {
    setSkip(data.selected * take)
  }

  return (
    <S.Investors>
      <S.TitleWrapper>
        <TitleSection title="Inverstor’s leaderboard" image={featuredIcon} />
      </S.TitleWrapper>

      <InvestorsTable skip={skip} take={take} setTotalItems={setTotalItems} />

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
