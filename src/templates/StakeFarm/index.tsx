import React from 'react'
import { useRouter } from 'next/router'
import { getAddress } from 'ethers'
import { useConnectWallet } from '@web3-onboard/react'

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
  >('stake')

  const [{ wallet }] = useConnectWallet()

  const walletAddress = wallet ? getAddress(wallet.accounts[0].address) : ''

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
            <VotingPower userWalletAddress={walletAddress} />
          </S.StakeWithPowerVote>

          <SelectTabs
            tabs={tabs}
            isSelect={isSelectTab}
            setIsSelect={setIsSelectTab}
          />
        </S.StakeFarmHeader>

        {isSelectTab === 'stake' && <Stake />}
        {isSelectTab === 'farm' && <Farm />}
      </S.StakeFarm>
    </>
  )
}

export default StakeFarm
