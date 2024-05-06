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
import { NewSelectTabs } from '@/components/NewSelectTabs'
import { StakeListView } from './ListView'
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

      {selectedView === 'list' && <StakeListView />}

      <S.StakeFarm>
        {selectedView === 'grid' && <Stake />}
        {selectedView === 'grid' && <Farm />}
      </S.StakeFarm>
    </>
  )
}

export default StakeFarm
