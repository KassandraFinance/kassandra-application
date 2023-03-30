import Pagination from '@/components/Pagination'
import TitleSection from '@/components/TitleSection'

import assetDistribution from '../../../../../public/assets/iconGradient/assets-distribution.svg'
import ActivityCard, { actionsType } from '../../ActivityCard'

import * as S from './styles'

// interface IAllocationHistoryProps {
// }

const AllocationHistory = () => {
  return (
    <S.AllocationHistory>
      <TitleSection title="Allocation History" image={assetDistribution} />

      <S.ActivityCardContainer>
        {/* <ActivityCard
          actionTitle="Weight Change"
          actionType={actionsType.ADDITION}
          sharesRedeemed={'0.56'}
        />
        <ActivityCard
          actionTitle="Asset Addition"
          actionType={actionsType.REBALANCE}
        />
        <ActivityCard
          actionTitle="Weight Change"
          actionType={actionsType.REMOVAL}
        /> */}
      </S.ActivityCardContainer>

      <S.PaginationContainer>
        <Pagination
          skip={0}
          totalItems={100}
          take={10}
          handlePageClick={() => console.log('')}
        />
      </S.PaginationContainer>
    </S.AllocationHistory>
  )
}

export default AllocationHistory
