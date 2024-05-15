import React, { useState } from 'react'
import Big from 'big.js'
import { useInView } from 'react-intersection-observer'

import { OrderDirection, Pool_OrderBy } from '@/gql/generated/kassandraApi'

import { addressesForReqFarmPool } from '@/constants/pools'
import {
  KacyPoligon,
  MANAGER_CYRIL_ADDRESS,
  networks
} from '@/constants/tokenAddresses'

import { useExplorePools } from '@/hooks/query/useExplorePools'
import { useFeaturedPools } from '@/hooks/query/useFeaturedPools'
import { useExploreOverviewPools } from '@/hooks/query/useExploreOverviewPools'
import useGetToken from '@/hooks/useGetToken'
import { useTokensData } from '@/hooks/query/useTokensData'
import { useWhiteListTokensCount } from '@/hooks/query/whiteListTokensCount'
import { useFarmPools } from '@/hooks/query/useFarmPools'
import { usePoolsWithFeeJoinBroker } from '@/hooks/query/usePoolsWithJoinBrokerFee'
import { useCommunityPools } from '@/hooks/query/useCommunityPools'

import Pagination from '@/components/Pagination'
import { ExploreSelectTabs } from './SelectTabs'
import { MyPoolsTable } from './MyPoolsTable'
import { ExploreAllPools } from './AllPools'
import SliderPoolList from './SliderPoolList'
import { ExplorePoolsData } from './PoolsData'
import TitleSection from '../../components/TitleSection'
import NewCommunityPoolsTable, {
  communityPoolSorting
} from './NewCommunityPoolsTable'

import featuredFunds from '../../../public/assets/iconGradient/featured.svg'
import ShareEarnIcon from '@assets/icons/handshake.svg'
import farmIcon from '@assets/icons/fire.svg'
// import managerIcon from '../../../public/assets/iconGradient/manager.svg'
// import inexpensiveIcon from '../../../public/assets/iconGradient/inexpensive.svg'

import * as S from './styles'

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
    tabName: 'discover',
    text: 'Discover'
  },
  {
    tabName: 'allPools',
    text: 'All Portfolios'
  },
  {
    tabName: 'myPools',
    text: 'My Investments'
  }
]

export default function Explore() {
  const [selectedChains, setSelectedChains] = useState(
    chainList.map(item => item.chainId)
  )
  const [isSelectTab, setIsSelectTab] = useState<string>('discover')
  const [orderedBy, setOrderedBy] = React.useState<Pool_OrderBy>(
    'total_value_locked_usd'
  )
  const [communityPoolSorted, setCommunityPoolSorted] =
    React.useState<communityPoolSorting>(communityPoolSorting.DESC)
  const [totalPoolsTable, setTotalPoolsTable] = React.useState(0)
  const [skip, setSkip] = React.useState(0)

  const take = 10

  const networkChain = networks[137]
  const { data } = useTokensData({
    chainId: networkChain.chainId,
    tokenAddresses: [KacyPoligon]
  })

  const { ref, inView } = useInView({
    threshold: 0
  })

  const { priceToken } = useGetToken({
    nativeTokenAddress: networkChain.nativeCurrency.address,
    tokens: data || {}
  })
  const kacyPrice = priceToken(KacyPoligon.toLowerCase())

  const dateNow = new Date()
  const params = {
    price_period: 86400,
    period_selected: Math.trunc(dateNow.getTime() / 1000 - 60 * 60 * 24 * 30),
    month: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 30),
    chainIn: selectedChains,
    orderDirection: 'desc' as OrderDirection
  }

  function onClickChainResetPagination() {
    setSkip(0)
  }

  const { data: poolsKassandra } = useFeaturedPools(params)
  const { data: poolsData } = useExploreOverviewPools()
  const { data: poolWithFeeJoinBroker } = usePoolsWithFeeJoinBroker({
    ...params,
    enabled: inView
  })
  const { data: whiteListTokenCount } = useWhiteListTokensCount({
    chainIdList: chainList.map(item => item.chainId)
  })
  const { data: largestPools } = useExplorePools({
    ...params,
    orderBy: 'total_value_locked_usd',
    queryKey: 'largest'
  })
  const { data: changePools } = useExplorePools({
    ...params,
    orderBy: 'change',
    queryKey: 'change',
    totalValueLockedUsdGt: '150',
    enabled: inView
  })
  const { data: createdAtPools } = useExplorePools({
    ...params,
    orderBy: 'created_at',
    queryKey: 'createdAt',
    enabled: inView
  })
  const { data: farmPools } = useFarmPools({
    ...params,
    kacyPrice,
    poolIdList: addressesForReqFarmPool
  })

  const { data: communityPools } = useCommunityPools({
    orderBy: orderedBy,
    orderDirection: communityPoolSorted,
    first: take,
    skip,
    chainIn: selectedChains,
    enabled: isSelectTab === 'allPools'
  })

  React.useEffect(() => {
    if (!communityPools?.pools.length) return
    setTotalPoolsTable(
      communityPools?.chains
        .flatMap(chain => chain.pool_count)
        .reduce((acc, cv) => acc + cv, 0)
    )
  }, [communityPools])

  return (
    <S.Explore>
      <S.ExploreHeader>
        <S.TitleContainer>
          <S.MainTitle>Explore All Portfolios</S.MainTitle>
          <S.SubTitle>Find a strategy that fits your needs</S.SubTitle>
        </S.TitleContainer>

        <S.ExplorePoolsWrapper>
          <ExplorePoolsData
            numDeposits={poolsData ? poolsData[0].num_deposits : '0'}
            numManagers={poolsData ? poolsData[0].num_managers.toString() : '0'}
            poolCount={poolsData ? poolsData[0].pool_count.toString() : '0'}
            whiteListNumber={
              whiteListTokenCount ? whiteListTokenCount.toString() : '0'
            }
          />
        </S.ExplorePoolsWrapper>

        <ExploreSelectTabs
          tabsList={tabs}
          chainList={chainList}
          selectedChains={selectedChains}
          setSelectedChains={setSelectedChains}
          isSelect={isSelectTab}
          setIsSelect={setIsSelectTab}
          onFilterClick={onClickChainResetPagination}
        />
      </S.ExploreHeader>

      {isSelectTab === 'discover' && (
        <S.SliderWrapper>
          <S.ExploreContainer>
            <TitleSection
              image={featuredFunds}
              title="Popular Portfolios"
              text=""
            />

            <SliderPoolList
              poolData={poolsKassandra?.pools ?? new Array(9).fill({})}
              kacyPrice={kacyPrice}
            />
          </S.ExploreContainer>

          <S.ExploreContainer>
            <TitleSection image={farmIcon} title="Boosted Portfolios" text="" />

            <SliderPoolList
              poolData={farmPools ?? new Array(9).fill({})}
              kacyPrice={kacyPrice}
            />
          </S.ExploreContainer>

          <S.ExploreContainer>
            <TitleSection
              image={featuredFunds}
              title="Largest Portfolios"
              text=""
            />

            <SliderPoolList
              poolData={largestPools?.pools ?? new Array(9).fill({})}
              kacyPrice={kacyPrice}
            />
          </S.ExploreContainer>

          <ExploreAllPools />

          <S.ExploreContainer ref={ref}>
            <TitleSection
              image={featuredFunds}
              title="Portfolios by Cyril"
              text=""
            />

            <SliderPoolList
              poolData={
                poolWithFeeJoinBroker?.pools.filter(
                  item => item.manager.id === MANAGER_CYRIL_ADDRESS
                ) ?? new Array(3).fill({})
              }
              kacyPrice={kacyPrice}
            />
          </S.ExploreContainer>

          <S.ExploreContainer>
            <TitleSection
              image={featuredFunds}
              title="Today’s Top Gainers"
              text=""
            />

            <SliderPoolList
              poolData={changePools?.pools ?? new Array(9).fill({})}
              kacyPrice={kacyPrice}
            />
          </S.ExploreContainer>

          <S.ExploreContainer>
            <TitleSection image={ShareEarnIcon} title="Share & Earn" text="" />

            <SliderPoolList
              poolData={poolWithFeeJoinBroker?.pools ?? new Array(9).fill({})}
              kacyPrice={kacyPrice}
            />
          </S.ExploreContainer>

          <S.ExploreContainer>
            <TitleSection
              image={featuredFunds}
              title="New Portfolios"
              text=""
            />

            <SliderPoolList
              poolData={createdAtPools?.pools ?? new Array(9).fill({})}
              kacyPrice={kacyPrice}
            />
          </S.ExploreContainer>
        </S.SliderWrapper>
      )}

      {isSelectTab === 'myPools' && (
        <MyPoolsTable selectedChains={selectedChains} />
      )}

      {isSelectTab === 'allPools' && (
        <>
          <NewCommunityPoolsTable
            pools={communityPools?.pools}
            communityPoolSorted={communityPoolSorted}
            setCommunityPoolSorted={setCommunityPoolSorted}
            orderedBy={orderedBy}
            setOrderedBy={setOrderedBy}
            kacyPrice={Big(kacyPrice)}
          />
          <S.PaginationWrapper>
            <Pagination
              skip={skip}
              take={take}
              totalItems={totalPoolsTable}
              handlePageClick={({ selected }) => {
                setSkip(selected * take)
              }}
            />
          </S.PaginationWrapper>
        </>
      )}
    </S.Explore>
  )
}
