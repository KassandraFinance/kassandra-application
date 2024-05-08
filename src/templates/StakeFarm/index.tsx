import React from 'react'
import { useRouter } from 'next/router'
import { getAddress } from 'ethers'
import { useConnectWallet } from '@web3-onboard/react'
import Big from 'big.js'

import VotingPower from '@/components/VotingPower'
import Breadcrumb from '@/components/Breadcrumb'
import BreadcrumbItem from '@/components/Breadcrumb/BreadcrumbItem'
import Farm from './Farm'
import Stake from './Stake'
import { useVotingPower } from '@/hooks/query/useVotingPower'

import * as S from './styles'
import { StakeFarmPools } from './AllPools'
import { allPools } from '@/constants/pools'
import { StakeListViewSection } from './ListView'
import { ViewOptions } from '@/components/NewSelectTabs/ViewOptions'

const tabs = [
  {
    tabName: 'stake',
    text: 'Stake Pools'
  },
  {
    tabName: 'farm',
    text: 'Farm Pools'
  }
]

const StakeFarm = () => {
  const [isSelectTab, setIsSelectTab] = React.useState<
    string | string[] | undefined
  >('stake')
  const [selectedView, setSelectedView] = React.useState('grid')

  const numPoolsInvestors = 2
  const allPoolsNumber = (allPools.length - numPoolsInvestors).toString()
  const [{ wallet }] = useConnectWallet()

  const walletAddress = wallet ? getAddress(wallet.accounts[0].address) : ''
  const { data: votingData } = useVotingPower({ id: walletAddress })

  const router = useRouter()

  React.useEffect(() => {
    const isSelectQueryTab = router.query.tab

    if (isSelectQueryTab) {
      setIsSelectTab(isSelectQueryTab)
    }
  }, [router])

  const fakePoolsData = [
    {
      logoUrl: '/assets/logos/kacy-stake.svg',
      chainLogoUrl: '/assets/logos/avalanche.svg',
      name: '$KACY',
      votingPower: '2/',
      withdrawDelay: '15',
      earned: 0,
      apr: 132.94,
      totalStaked: '702.5 LP-AVAX',
      stakedInUsd: '43.321 USD',
      startDate: '13 Nov, 2023',
      rewardDate: '11 Feb, 2024',
      poolReward: 0,
      poolRewardValue: 0,
      contract: '0x384572384203409123098123'
    },
    {
      logoUrl: '/assets/logos/kacy-stake.svg',
      chainLogoUrl: '/assets/logos/avalanche.svg',
      name: '$NOTKACY',
      votingPower: '3/',
      withdrawDelay: '23',
      earned: 12,
      apr: 72.94,
      totalStaked: '329.13 LP-AVAX',
      stakedInUsd: '11.891 USD',
      startDate: '11 Dec, 2023',
      rewardDate: '29 Mar, 2024',
      poolReward: 1,
      poolRewardValue: 23,
      contract: '0x23423438457238420098123'
    },
    {
      logoUrl: '/assets/logos/kacy-stake.svg',
      chainLogoUrl: '/assets/logos/avalanche.svg',
      name: '$ANOTHAKCY',
      votingPower: '4/',
      withdrawDelay: '69',
      earned: 3,
      apr: 81.12,
      totalStaked: '163 LP-AVAX',
      stakedInUsd: '2.341 USD',
      startDate: '11 Dec, 2023',
      rewardDate: '29 Mar, 2024',
      poolReward: 2,
      poolRewardValue: 55,
      contract: '0x546546456384572389123'
    }
  ]

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem href="/">Invest</BreadcrumbItem>
        <BreadcrumbItem href="/farm" isLastPage>
          Stake/Farm
        </BreadcrumbItem>
      </Breadcrumb>

      <S.StakeFarmHeader>
        <S.TitleContainer>
          <S.MainTitle>Stake and Farm KACY</S.MainTitle>
          <S.SubTitle>
            Earn rewards and voting power by staking KACY and other assets
          </S.SubTitle>

          <S.VotingPowerContainer>
            <VotingPower
              currentVotingPower={Big(votingData?.user?.votingPower ?? '0')}
              totalVotingPower={Big(
                votingData?.governances[0]?.totalVotingPower ?? '0'
              )}
            />
          </S.VotingPowerContainer>
        </S.TitleContainer>
      </S.StakeFarmHeader>

      <S.TabsContainer>
        <ViewOptions
          selectedView={selectedView}
          setSelectedView={setSelectedView}
        />
        <StakeFarmPools numberOfPools={allPoolsNumber} />
      </S.TabsContainer>

      {selectedView === 'list' && (
        <>
          <StakeListViewSection
            data={fakePoolsData}
            sectionName="Power Voting"
          />
          <StakeListViewSection
            data={fakePoolsData}
            sectionName="KACY Liquidity"
          />
          <StakeListViewSection
            data={fakePoolsData}
            sectionName="Investment Pool"
          />
        </>
      )}

      <S.StakeFarm>
        {selectedView === 'grid' && <Stake />}
        {selectedView === 'grid' && <Farm />}
      </S.StakeFarm>
    </>
  )
}

export default StakeFarm
