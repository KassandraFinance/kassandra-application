import { ReactElement } from 'react'
import Link from 'next/link'

import Swap from './Swap'
import PoolInfo from './PoolInfo'
import TransactionInfo from './TransactionInfo'
import TokenChangeUpdate from './TokenChangeUpdate'
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

type TransactionData = {
  sharesPrice: string
  tokenIn: {
    logo?: string
    symbol?: string
    amount?: string
    value?: string
  }
  tokenOut: {
    logo?: string
    symbol?: string
    amount?: string
    value?: string
  }
}

type RebalanceData = {
  logo: string
  symbol: string
  weight: string
  newWeight: string
}

type RebalancePoolData = {
  assetChange?: RebalanceData
  rebalanceData: RebalanceData[]
}

export interface IActivityCardProps {
  actionType: actionsType
  date: Date
  scan: string
  wallet: string
  txHash: string
  transactionData?: TransactionData
  rebalancePoolData?: RebalancePoolData
  pool: {
    name: string
    symbol: string
    logo: string
  }
}

type ActivityReturn = {
  title: string
  icon: string
  subTitle?: string
  titleShares?: string
}

export enum actionsType {
  DEPOSIT,
  WITHDRAWAL,
  REBALANCE,
  ADDITION,
  REMOVAL,
  SWAP
}

const activityProps: Record<actionsType, ActivityReturn> = {
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
  },
  [actionsType.SWAP]: {
    title: 'Swap',
    icon: '/assets/icons/deposit.svg',
    subTitle: 'Swap'
  }
}

const ActivityCard = ({
  actionType,
  date,
  scan,
  wallet,
  pool,
  txHash,
  rebalancePoolData,
  transactionData
}: IActivityCardProps) => {
  const ActivityComponents: Record<actionsType, ReactElement> = {
    [actionsType.DEPOSIT]: (
      <TransactionInfo
        typeAction={actionType}
        walletAddress={wallet}
        poolSymbol={pool.symbol}
        transactionDetails={transactionData}
      />
    ),
    [actionsType.WITHDRAWAL]: (
      <TransactionInfo
        typeAction={actionType}
        walletAddress={wallet}
        poolSymbol={pool.symbol}
        transactionDetails={transactionData}
      />
    ),
    [actionsType.REBALANCE]: (
      <WeightChangeAssetList
        assetInfoList={rebalancePoolData?.rebalanceData ?? []}
      />
    ),
    [actionsType.ADDITION]: (
      <TokenChangeUpdate
        title={activityProps[actionType]?.subTitle ?? ''}
        assetChange={rebalancePoolData?.assetChange}
        assetInfoList={rebalancePoolData?.rebalanceData ?? []}
      />
    ),
    [actionsType.REMOVAL]: (
      <TokenChangeUpdate
        title={activityProps[actionType]?.subTitle ?? ''}
        assetChange={rebalancePoolData?.assetChange}
        assetInfoList={rebalancePoolData?.rebalanceData ?? []}
      />
    ),
    [actionsType.SWAP]: (
      <Swap transactionData={transactionData} walletAddress={wallet} />
    )
  }

  return (
    <S.ActivityCard>
      <S.ActivityBodyContainer>
        <S.PoolAndUserWrapper>
          <S.ActivityActionTitle>
            <Link href={`${scan}/tx/${txHash}`} passHref>
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
            <S.ActionTitle>
              <img
                src={activityProps[actionType].icon}
                alt=""
                width={24}
                height={24}
              />
              <p>{activityProps[actionType].title}</p>
            </S.ActionTitle>
          </S.ActivityActionTitle>

          <PoolInfo
            title="Pool"
            name={pool.name}
            description={pool.symbol}
            logo={pool.logo}
          />
        </S.PoolAndUserWrapper>

        <S.ActivityCardBody>
          {ActivityComponents[actionType]}
        </S.ActivityCardBody>
      </S.ActivityBodyContainer>
    </S.ActivityCard>
  )
}

export default ActivityCard
