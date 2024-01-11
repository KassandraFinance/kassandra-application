import React from 'react'
import Big from 'big.js'
import { useConnectWallet } from '@web3-onboard/react'
import { getAddress } from 'ethers'

import { networks } from '@/constants/tokenAddresses'

import { useManagerChangeTVL } from '@/hooks/query/useManagerChangeTVL'
import { useManagerDeposits } from '@/hooks/query/useManagerDeposits'
import { useManagerTVMChart } from '@/hooks/query/useManagerTVMChart'
import { useManagerUniqueInvestors } from '@/hooks/query/useManagerUniqueInvestors'
import { useManagerWithdraws } from '@/hooks/query/useManagerWithdraws'

import { calcChange } from '@/utils/numerals'

import TitleSection from '@/components/TitleSection'
import StatusCard from '@/components/Manage/StatusCard'
import TVMChart from '@/components/Manage/TVMChart'
import ManagedPools from './ManagedPools'
import Loading from '@/components/Loading'
import WarningCard from '@/components/WarningCard'
import ExternalLink from '@/components/ExternalLink'

import managerOveriewIcon from '@assets/iconGradient/section-title-eye.svg'
import managedPoolsIcon from '@assets/iconGradient/assets-distribution.svg'

import * as S from './styles'

const dataList = ['1D', '1M', '3M', '6M', '1Y', 'ALL']

const periods: Record<string, number> = {
  '1D': 60 * 60 * 24,
  '1M': 60 * 60 * 24 * 30,
  '3M': 60 * 60 * 24 * 30 * 3,
  '6M': 60 * 60 * 24 * 30 * 6,
  '1Y': 60 * 60 * 24 * 30 * 12,
  ALL: new Date().getTime() / 1000
}

type ChangeListType = {
  name: string
  key: 'day' | 'week' | 'month' | 'year' | 'max'
  value: number
}

const changeList: ChangeListType[] = [
  {
    name: '1 Day',
    key: 'day',
    value: 0
  },
  {
    name: '1 Week',
    key: 'week',
    value: 0
  },

  {
    name: '1 Month',
    key: 'month',
    value: 0
  },
  {
    name: '1 Year',
    key: 'year',
    value: 0
  },
  {
    name: 'All',
    key: 'max',
    value: 0
  }
]

type NewPool = {
  id: string
  hash: string
  name: string
  chainId: string
}

interface IOverviewProps {
  newPoolCreated: NewPool | undefined
}

const Overview = ({ newPoolCreated }: IOverviewProps) => {
  const [depostiPeriod, setDepositPeriod] = React.useState<string>('1D')
  const [withdrawalPeriod, setWithdrawalPeriod] = React.useState<string>('1D')
  const [tvlPeriod, setTvlPeriod] = React.useState<string>('1D')

  const [{ wallet }] = useConnectWallet()
  const walletAddress = wallet?.provider
    ? getAddress(wallet.accounts[0].address)
    : ''

  const { data } = useManagerTVMChart({
    manager: walletAddress,
    timestamp: Math.trunc(new Date().getTime() / 1000 - periods[tvlPeriod])
  })

  const totalValueLockedChart = React.useMemo(() => {
    if (!data) return
    return data.total_value_locked.map(value => {
      return {
        close: Number(value.close),
        timestamp: value.timestamp
      }
    })
  }, [data])

  const { data: dataChange } = useManagerChangeTVL({
    manager: walletAddress,
    day: Math.trunc(Date.now() / 1000 - 60 * 60 * 24),
    week: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 7),
    month: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 30),
    year: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 365)
  })

  const { data: withdraws } = useManagerWithdraws({
    manager: walletAddress,
    timestamp: Math.trunc(
      new Date().getTime() / 1000 - periods[withdrawalPeriod]
    )
  })

  const { data: deposit } = useManagerDeposits({
    manager: walletAddress,
    timestamp: Math.trunc(new Date().getTime() / 1000 - periods[depostiPeriod])
  })

  const { data: uniqueInvestors } = useManagerUniqueInvestors({
    manager: walletAddress
  })

  function handleWithdraws(
    withdraws: {
      timestamp: number
      volume_usd: string
    }[]
  ) {
    let totalWithdraws = Big(0)
    for (const withdraw of withdraws) {
      totalWithdraws = totalWithdraws.add(withdraw.volume_usd)
    }

    return totalWithdraws
  }

  const change = React.useMemo(() => {
    if (!dataChange) return changeList
    const calcChangeList = changeList.map(change => {
      return {
        name: change.name,
        value: Number(
          calcChange(dataChange.now[0]?.close, dataChange[change.key][0]?.close)
        )
      }
    })
    return calcChangeList
  }, [dataChange])

  return (
    <S.Overview>
      <S.TitleWrapper>
        <TitleSection title="Manager Overview" image={managerOveriewIcon} />
      </S.TitleWrapper>

      <S.ManagerOverviewContainer>
        <S.ChartWrapper>
          {totalValueLockedChart && dataChange ? (
            <TVMChart
              data={totalValueLockedChart}
              changeList={change}
              selectedPeriod={tvlPeriod}
              setSelectedPeriod={setTvlPeriod}
            />
          ) : (
            <Loading marginTop={15} />
          )}
        </S.ChartWrapper>

        <S.StatsContainer>
          <StatusCard
            title="Total Deposits"
            value={`+${handleWithdraws(deposit?.deposits || []).toFixed(2)}`}
            status="POSITIVE"
            dataList={dataList}
            selected={depostiPeriod}
            onClick={(period: string) => setDepositPeriod(period)}
          />
          <StatusCard
            title="Total Withdrawals"
            value={`-${handleWithdraws(withdraws?.withdraws || []).toFixed(2)}`}
            status="NEGATIVE"
            dataList={dataList}
            selected={withdrawalPeriod}
            onClick={(period: string) => setWithdrawalPeriod(period)}
          />
          <StatusCard
            title="Unique Depositors"
            value={uniqueInvestors?.unique_investors?.toString() || '0'}
          />
        </S.StatsContainer>
      </S.ManagerOverviewContainer>

      <S.ManagedPoolsContainer>
        <S.TitleWrapper>
          <TitleSection title="Managed Pools" image={managedPoolsIcon} />
        </S.TitleWrapper>

        {newPoolCreated && (
          <S.WarningCardContainer>
            <WarningCard showCard={true}>
              <div>
                <S.text>
                  Hey there! Just wanted to let you know that the pool you
                  created with the name &quot;{newPoolCreated.name}&quot;
                  hasn&apos;t been indexed in our subgraph yet. If you want more
                  details about this pool, check out the creation link.
                </S.text>

                <S.ExternalLinkContainer>
                  <ExternalLink
                    text="View Pool Transaction"
                    hrefLink={`${networks[
                      Number(newPoolCreated?.chainId) ?? 137
                    ]?.blockExplorer}/tx/${newPoolCreated?.hash}`}
                  />
                </S.ExternalLinkContainer>
              </div>
            </WarningCard>
          </S.WarningCardContainer>
        )}

        <ManagedPools />
      </S.ManagedPoolsContainer>
    </S.Overview>
  )
}

export default Overview
