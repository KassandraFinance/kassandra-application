import TitleSection from '@ui/TitleSection'
import InvestorsTable from './InvestorsTable'
import Pagination from '@/components/Pagination'

import featuredIcon from '@assets/iconGradient/featured.svg'

import * as S from './styles'

const Investors = () => {
  return (
    <S.Investors>
      <S.TitleWrapper>
        <TitleSection title="Inverstor’s leaderboard" image={featuredIcon} />
      </S.TitleWrapper>

      <InvestorsTable />

      <S.PaginationWrapper>
        <Pagination
          skip={0}
          totalItems={20}
          take={10}
          handlePageClick={() => console.log('click')}
        />
      </S.PaginationWrapper>
    </S.Investors>
  )
}

export default Investors
