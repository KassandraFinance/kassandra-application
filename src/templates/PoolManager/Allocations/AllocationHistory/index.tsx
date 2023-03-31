import Pagination from '@/components/Pagination'
import TitleSection from '@/components/TitleSection'

import assetDistribution from '../../../../../public/assets/iconGradient/assets-distribution.svg'
import ActivityCard, { actionsType } from '../../ActivityCard'

import * as S from './styles'

export type ActivityInfo = {
  amount: string,
  symbol: string,
  value: string,
  logo: string,
  weight?: string,
  newWeight?: string
}

export type IPoolInfo = {
  name: string,
  symbol: string,
  logo: string,
  blockExplorerUrl: string
}

export type ActivityCardProps = {
  key: string,
  actionType: actionsType,
  date: Date,
  wallet: string,
  txHash: string,
  activityInfo: ActivityInfo[],
  newBalancePool?: ActivityInfo[],
  sharesRedeemed?: {
    amount: string,
    value: string
  }
}
interface IAllocationHistoryProps {
  allocationHistory: ActivityCardProps[];
  poolInfo: IPoolInfo;
}

const AllocationHistory = ({
  allocationHistory,
  poolInfo
}: IAllocationHistoryProps) => {
  return (
    <S.AllocationHistory>
      <TitleSection title="Allocation History" image={assetDistribution} />

      <S.ActivityCardContainer>
        {allocationHistory &&
          allocationHistory.map(activity => (
            <ActivityCard
              key={activity.key}
              actionType={activity.actionType}
              date={activity.date}
              scan={poolInfo.blockExplorerUrl}
              wallet={activity.wallet}
              txHash={activity.txHash}
              activityInfo={activity.activityInfo}
              pool={poolInfo}
              sharesRedeemed={activity.sharesRedeemed}
              newBalancePool={activity.newBalancePool}
            />
          ))}
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
