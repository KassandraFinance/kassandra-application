import React from 'react'
import { useRouter } from 'next/router'

import { useAppSelector } from '../../store/hooks'

import VotingPower from '@/components/VotingPower'
import Breadcrumb from '@/components/Breadcrumb'
import BreadcrumbItem from '@/components/Breadcrumb/BreadcrumbItem'
import SelectTabs from '@/components/SelectTabs'
import TitleSection from '@/components/TitleSection'
import Farm from './Farm'
import Stake from './Stake'

import productBarIcon from '@assets/iconGradient/product-bar.svg'
import stakingPoolsIcon from '@assets/iconGradient/staking-pools.svg'
import stakeMoneyWithdraw from '@assets/iconGradient/stake-money-withdraw.svg'

import * as S from './styles'

const tabs = [
  {
    asPathText: 'stake',
    text: 'Stake Pools',
    icon: stakingPoolsIcon
  },
  {
    asPathText: 'farm',
    text: 'Farm Pools',
    icon: productBarIcon
  }
]

const StakeFarm = () => {
  const [isSelectTab, setIsSelectTab] = React.useState<
    string | string[] | undefined
  >('farm')

  const { userWalletAddress } = useAppSelector(state => state)
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
      <S.StakeFarm>
        <S.StakeFarmHeader>
          <S.StakeWithPowerVote>
            <TitleSection
              image={stakeMoneyWithdraw}
              title="Stake and Farm KACY"
              text="Earn rewards and voting power by staking KACY and other assets"
            />
            <VotingPower userWalletAddress={userWalletAddress} />
          </S.StakeWithPowerVote>

          <SelectTabs
            tabs={tabs}
            isSelect={isSelectTab}
            setIsSelect={setIsSelectTab}
          />
        </S.StakeFarmHeader>

        {isSelectTab === 'farm' && <Farm />}

        {isSelectTab === 'stake' && <Stake />}
      </S.StakeFarm>
    </>
  )
}

export default StakeFarm
