import TitleSection from '@/components/TitleSection'
import Big from 'big.js'

import assetDistribution from '../../../../../public/assets/iconGradient/assets-distribution.svg'
import ActivityCard, { actionsType } from '../../ActivityCard'

import * as S from './styles'

interface IAllocationHistoryProps {
  test?: string;
}

const AllocationHistory = (props: IAllocationHistoryProps) => {
  return (
    <S.AllocationHistory>
      <TitleSection title="Allocation History" image={assetDistribution} />

      <S.ActivityCardContainer>
        <ActivityCard
          actionTitle="Weight Change"
          actionType={actionsType.ADDITION}
          // sharesRedeemed={0.56}
        />
        <ActivityCard
          actionTitle="Asset Addition"
          actionType={actionsType.REBALANCE}
        />
        <ActivityCard
          actionTitle="Weight Change"
          actionType={actionsType.REMOVAL}
        />
      </S.ActivityCardContainer>
    </S.AllocationHistory>
  )
}

export default AllocationHistory
