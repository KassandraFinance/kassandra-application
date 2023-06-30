import Link from 'next/link'
import Big from 'big.js'

import { useUserProfile } from '@/hooks/query/useUserProfile'
import { BNtoDecimal } from '@/utils/numerals'
import substr from '@/utils/substr'

import ItemInformation from './ItemInformation'
import WeightChangeAssetList from './WeightChangeAssetList'

import * as S from './styles'

export type ActivityInfo = {
  amount: string
  symbol: string
  value: string
  logo: string
  weight?: string
  newWeight?: string
}

export interface IActivityCardProps {
  actionType: actionsType
  date: Date
  scan: string
  wallet: string
  activityInfo: ActivityInfo[]
  txHash: string
  managerAddress: string
  pool: {
    name: string
    symbol: string
    logo: string
  }

  sharesRedeemed?: {
    amount: string
    value: string
  }

  newBalancePool?: ActivityInfo[]
}

export enum actionsType {
  DEPOSIT,
  WITHDRAWAL,
  REBALANCE,
  ADDITION,
  REMOVAL
}

const activityProps: Record<
  actionsType,
  { title: string; icon: string; subTitle?: string; titleShares?: string }
> = {
  [actionsType.DEPOSIT]: {
    title: 'Deposit',
    icon: '/assets/icons/deposit.svg',
    subTitle: 'Amount',
    titleShares: 'Shares Received'
  },
  [actionsType.WITHDRAWAL]: {
    title: 'Withdrawal',
    icon: '/assets/icons/withdraw.svg',
    subTitle: 'Amount',
    titleShares: 'Shares Redeemed '
  },
  [actionsType.REBALANCE]: {
    title: 'Weight Change',
    icon: '/assets/icons/rebalance.svg'
  },
  [actionsType.ADDITION]: {
    title: 'Asset Addition',
    icon: '/assets/icons/addition.svg',
    subTitle: 'Asset added'
  },
  [actionsType.REMOVAL]: {
    title: 'Asset Removal',
    icon: '/assets/icons/removal.svg',
    subTitle: 'Asset removed'
  }
}

const ActivityCard = ({
  actionType,
  date,
  scan,
  activityInfo,
  wallet,
  pool,
  txHash,
  newBalancePool,
  sharesRedeemed,
  managerAddress
}: IActivityCardProps) => {
  const { data } = useUserProfile({ address: wallet })

  const userImage = data?.image || ''
  const nickname = data?.nickname || ''

  return (
    <S.ActivityCard>
      <S.ActivityActionTitle>
        <S.ActionTitle>
          <img
            src={activityProps[actionType].icon}
            alt=""
            width={24}
            height={24}
          />
          <p>{activityProps[actionType].title}</p>
        </S.ActionTitle>
        <Link href={`${scan}tx/${txHash}`} passHref>
          <S.ActionTimeContent target="_blank">
            <p>
              {date.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
            <span>{date.toLocaleDateString('pt-BR')}</span>
            <img
              src="/assets/utilities/external-link.svg"
              alt="external-link"
              width={16}
              height={16}
            />
          </S.ActionTimeContent>
        </Link>
      </S.ActivityActionTitle>

      <S.ActivityBodyContainer>
        <S.PoolAndUserWrapper>
          <ItemInformation
            title={managerAddress === wallet ? 'Manager' : 'Investor'}
            name={nickname}
            description={substr(wallet)}
            userWalletAddress={wallet}
            ImageUrl={userImage}
          />

          <ItemInformation
            title="Pool"
            name={pool.name}
            description={pool.symbol}
            ImageUrl={pool.logo}
          />
        </S.PoolAndUserWrapper>

        <S.TokenWrapper>
          {actionType !== actionsType.REBALANCE ? (
            <>
              {activityInfo.map((activity, i) => (
                <ItemInformation
                  key={activity.value + activity.newWeight}
                  title={
                    i === 0 ? activityProps[actionType].subTitle : undefined
                  }
                  name={`${BNtoDecimal(Big(activity.amount), 4)} ${
                    activity.symbol
                  }`}
                  description={`$${activity.value}`}
                  ImageUrl={activity.logo}
                  newWeight={activity.newWeight}
                  weight={activity.weight}
                />
              ))}
              {newBalancePool && (
                <WeightChangeAssetList
                  assetInfoList={newBalancePool}
                  take={4}
                />
              )}
              {sharesRedeemed && (
                <ItemInformation
                  title={activityProps[actionType].titleShares ?? 'Shares'}
                  name={`${BNtoDecimal(Big(sharesRedeemed.amount), 4)} ${
                    pool.symbol
                  }`}
                  tokenName={pool.name}
                  description={`$${sharesRedeemed.value}`}
                  ImageUrl={pool.logo}
                />
              )}
            </>
          ) : (
            <WeightChangeAssetList assetInfoList={activityInfo} />
          )}
        </S.TokenWrapper>
      </S.ActivityBodyContainer>
    </S.ActivityCard>
  )
}

export default ActivityCard
