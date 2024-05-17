import { useConnectWallet } from '@web3-onboard/react'
import Big from 'big.js'
import { getAddress } from 'ethers'
import React, { useEffect, useState } from 'react'

import {
  PoolDetails,
  addressesForReqFarmPool,
  addressesForReqStakePool
} from '@/constants/pools'
import { KacyPoligon, networks } from '@/constants/tokenAddresses'

import { useInvestmentPools } from '@/hooks/query/useInvestmentPools'
import { useLiquidityPool } from '@/hooks/query/useLiquidityPool'
import { usePoolsPriceList } from '@/hooks/query/usePoolsPriceList'
import { useStakePoolPowerVoting } from '@/hooks/query/useSkatePoolPowerVoting'
import { useTokensData } from '@/hooks/query/useTokensData'
import { useVotingPower } from '@/hooks/query/useVotingPower'
import useGetToken from '@/hooks/useGetToken'

import { ViewOptions } from '@/components/NewSelectTabs/ViewOptions'
import { PoolMetrics, UserInfo } from '@/templates/StakeFarm/utils'
import { ExploreSelectTabs } from '../Explore/SelectTabs'
import { StakeListCard } from './StakeListCard'
import { StakeSectionView } from './StakeSectionView'

import Breadcrumb from '@/components/Breadcrumb'
import BreadcrumbItem from '@/components/Breadcrumb/BreadcrumbItem'
import StakeCard from '@/components/StakeCard'
import VotingPower from '@/components/VotingPower'

import * as S from './styles'

type PoolInfo = {
  pool: PoolDetails
  userInfo: UserInfo
  poolDataMetrics: PoolMetrics
}

const chainList = [
  {
    name: 'polygon',
    icon: <img src="/assets/icons/polygon.svg" />,
    chainId: '137'
  },
  {
    name: 'avalanche',
    icon: <img src="/assets/icons/avalanche.svg" />,
    chainId: '43114'
  },
  {
    name: 'arbitrum',
    icon: <img src="/assets/icons/arbitrum.svg" />,
    chainId: '42161'
  }
]

const tabs = [
  {
    tabName: 'active-rewards',
    text: 'Active Rewards'
  },
  {
    tabName: 'allPools',
    text: 'All Pools'
  }
]

const userInfoDefault = {
  currentAvailableWithdraw: Big(-1),
  delegateTo: '',
  lockPeriod: -1,
  yourStake: Big(-1),
  unstake: false,
  withdrawable: false,
  kacyEarned: Big(-1)
}

const poolDataMetricsDefault = {
  votingMultiplier: '-1',
  startDate: '',
  endDate: '',
  kacyRewards: Big(-1),
  withdrawDelay: -1,
  totalStaked: Big(-1),
  hasExpired: false,
  apr: Big(-1),
  stakingToken: '',
  vestingPeriod: '',
  lockPeriod: '',
  tokenDecimals: '18'
}

const StakeFarm = () => {
  const [selectedView, setSelectedView] = React.useState('grid')
  const [selectedChains, setSelectedChains] = useState(
    chainList.map(item => item.chainId)
  )
  const [isSelectTab, setIsSelectTab] = useState<string>(tabs[0].tabName)
  const [isLoading, setIsloading] = useState<boolean>(false)

  const [{ wallet }] = useConnectWallet()

  const walletAddress = wallet ? getAddress(wallet.accounts[0].address) : ''
  const { data: votingData } = useVotingPower({ id: walletAddress })

  const polygonChainId = 137 // choose chain to get token price
  const networkChain = networks[polygonChainId]
  const { data: farmPoolPriceList } = usePoolsPriceList({
    addresses: addressesForReqFarmPool
  })

  const { data: tokensData } = useTokensData({
    chainId: networkChain.chainId,
    tokenAddresses: addressesForReqStakePool
  })

  const { priceToken } = useGetToken({
    nativeTokenAddress: networkChain.nativeCurrency.address,
    tokens: tokensData || {}
  })

  const kacyPrice = priceToken(KacyPoligon.toLowerCase())

  const { data: StakePoolPowerVoting } = useStakePoolPowerVoting({
    kacyPrice: Big(kacyPrice),
    poolPrice: Big(kacyPrice),
    walletAddress: wallet?.accounts[0].address
  })

  const { data: investmentPools } = useInvestmentPools({
    kacyPrice: Big(kacyPrice),
    poolsPrice: farmPoolPriceList,
    walletAddress: wallet?.accounts[0].address
  })

  const { data: LiquidityPool } = useLiquidityPool({
    kacyPrice: Big(kacyPrice),
    coinsData: tokensData,
    walletAddress: wallet?.accounts[0].address
  })

  function handleFilteredPools(poolList: PoolInfo[]) {
    const isALLPools = isSelectTab === 'allPools'

    const poolListFiltered = poolList.filter(
      item =>
        selectedChains.includes(item.pool.chain.id.toString()) &&
        (isALLPools || !item.poolDataMetrics.hasExpired)
    )

    if (isLoading) {
      return poolListFiltered.map(item => ({
        pool: item.pool,
        userInfo: userInfoDefault,
        poolDataMetrics: poolDataMetricsDefault
      }))
    }

    return poolListFiltered
  }

  useEffect(() => {
    setIsloading(true)

    setTimeout(() => {
      setIsloading(false)
    }, 1500)
  }, [selectedChains, isSelectTab])

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

      <S.FilterWrapper>
        <ViewOptions
          selectedView={selectedView}
          setSelectedView={setSelectedView}
        />

        <S.TabsWrapper>
          <ExploreSelectTabs
            tabsList={tabs}
            chainList={chainList}
            selectedChains={selectedChains}
            setSelectedChains={setSelectedChains}
            isSelect={isSelectTab}
            setIsSelect={setIsSelectTab}
          />
        </S.TabsWrapper>
      </S.FilterWrapper>

      {selectedView === 'list' && (
        <>
          <StakeSectionView sectionName="Power Voting">
            <>
              {StakePoolPowerVoting &&
              handleFilteredPools(StakePoolPowerVoting).length > 0 ? (
                handleFilteredPools(StakePoolPowerVoting).map(item => {
                  return (
                    <StakeListCard
                      key={item?.pool?.pid + item?.pool?.symbol}
                      pool={item?.pool}
                      poolDataMetrics={item?.poolDataMetrics}
                      userInfo={item?.userInfo}
                      kacyPrice={Big(kacyPrice)}
                      poolPrice={Big(kacyPrice)}
                    />
                  )
                })
              ) : (
                <S.textContainer>
                  <p>The selected chains have no pools yet.</p>
                </S.textContainer>
              )}
            </>
          </StakeSectionView>
          <StakeSectionView sectionName="KACY Liquidity">
            <>
              {LiquidityPool &&
              handleFilteredPools(LiquidityPool).length > 0 ? (
                handleFilteredPools(LiquidityPool).map(item => {
                  return (
                    <StakeListCard
                      key={item?.pool?.pid + item?.pool?.symbol}
                      pool={item?.pool}
                      poolDataMetrics={item?.poolDataMetrics}
                      userInfo={item?.userInfo}
                      kacyPrice={Big(kacyPrice)}
                      poolPrice={Big(kacyPrice)}
                    />
                  )
                })
              ) : (
                <S.textContainer>
                  <p>The selected chains have no pools yet.</p>
                </S.textContainer>
              )}
            </>
          </StakeSectionView>
          <StakeSectionView sectionName="Investment Pool">
            <>
              {investmentPools &&
              handleFilteredPools(investmentPools).length > 0 ? (
                handleFilteredPools(investmentPools).map(item => {
                  return (
                    <StakeListCard
                      key={item?.pool?.pid + item?.pool?.symbol}
                      pool={item?.pool}
                      poolDataMetrics={item?.poolDataMetrics}
                      userInfo={item?.userInfo}
                      kacyPrice={Big(kacyPrice)}
                      poolPrice={Big(kacyPrice)}
                    />
                  )
                })
              ) : (
                <S.textContainer>
                  <p>The selected chains have no pools yet.</p>
                </S.textContainer>
              )}
            </>
          </StakeSectionView>
        </>
      )}

      {selectedView === 'grid' && (
        <S.StakeFarm>
          <StakeSectionView sectionName="Power Voting">
            <S.StakeFarmContent>
              {StakePoolPowerVoting &&
              handleFilteredPools(StakePoolPowerVoting).length > 0 ? (
                handleFilteredPools(StakePoolPowerVoting).map(item => {
                  return (
                    <StakeCard
                      key={item?.pool.symbol + item?.pool.pid}
                      kacyPrice={Big(kacyPrice)}
                      poolPrice={Big(kacyPrice)}
                      pool={item.pool}
                      poolInfo={item.poolDataMetrics}
                      userAboutPool={item.userInfo}
                    />
                  )
                })
              ) : (
                <S.textContainer>
                  <p>The selected chains have no pools yet.</p>
                </S.textContainer>
              )}
            </S.StakeFarmContent>
          </StakeSectionView>

          <StakeSectionView sectionName="KACY Liquidity">
            <S.StakeFarmContent>
              {LiquidityPool &&
              handleFilteredPools(LiquidityPool).length > 0 ? (
                handleFilteredPools(LiquidityPool).map(item => {
                  return (
                    <StakeCard
                      key={item.pool.symbol + item.pool.pid}
                      kacyPrice={Big(kacyPrice)}
                      poolPrice={Big(kacyPrice)}
                      pool={item.pool}
                      poolInfo={item.poolDataMetrics}
                      userAboutPool={item.userInfo}
                    />
                  )
                })
              ) : (
                <S.textContainer>
                  <p>The selected chains have no pools yet.</p>
                </S.textContainer>
              )}
            </S.StakeFarmContent>
          </StakeSectionView>

          <StakeSectionView sectionName="Investment Pool">
            <S.StakeFarmContent>
              {investmentPools &&
              handleFilteredPools(investmentPools).length > 0 ? (
                handleFilteredPools(investmentPools).map(item => {
                  return (
                    <StakeCard
                      key={item.pool.symbol + item.pool.pid}
                      kacyPrice={Big(kacyPrice)}
                      poolPrice={Big(kacyPrice)}
                      pool={item.pool}
                      poolInfo={item.poolDataMetrics}
                      userAboutPool={item.userInfo}
                    />
                  )
                })
              ) : (
                <S.textContainer>
                  <p>The selected chains have no pools yet.</p>
                </S.textContainer>
              )}
            </S.StakeFarmContent>
          </StakeSectionView>
        </S.StakeFarm>
      )}
    </>
  )
}

export default StakeFarm
