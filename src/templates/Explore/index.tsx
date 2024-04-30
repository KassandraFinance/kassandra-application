import React from 'react'

import { useLargestPools } from '@/hooks/query/useLargestPools'
import { useFeaturedPools } from '@/hooks/query/useFeaturedPools'
import { useExploreOverviewPools } from '@/hooks/query/useExploreOverviewPools'

import { ExploreAllPools } from './AllPools'
import SliderPoolList from './SliderPoolList'
import { ExplorePoolsData } from './PoolsData'
import TitleSection from '../../components/TitleSection'

import featuredFunds from '../../../public/assets/iconGradient/featured.svg'
import managerIcon from '../../../public/assets/iconGradient/manager.svg'
import inexpensiveIcon from '../../../public/assets/iconGradient/inexpensive.svg'

import * as S from './styles'
import { NewSelectTabs } from '@/components/NewSelectTabs'

const tabs = [
  {
    tabName: 'pools',
    text: 'All Pools'
  },
  {
    tabName: 'managers',
    text: 'My Pools'
  }
]

const chainList = ['137', '42161', '43114']

const addressOrderList = [
  '1370xc22bb237a5b8b7260190cb9e4998a9901a68af6f000100000000000000000d8d',
  '421610x2ae2baeec8ccd16075d821832ffee9172bae36760001000000000000000004f1',
  '431140x856561c3b21efca7e483b1ad197e4ab5fb56ccdb000100000000000000000048',
  '1370x416101d98df2187ddc0ff29b787ded19dd8c9740000100000000000000000e57',
  '421610xc3f47f3627305213adaa021ccccb61d5987eaa97000100000000000000000532',
  '1370x107cb7c6d67ad745c50d7d4627335c1c6a684003000100000000000000000c37',
  '421610x69a670bcbf82e8099bbd70bb2cdb16e05a928f6c0001000000000000000004ae',
  '1370xa1ecb0981d74bd9e31fcd7a38fa3fdebcc7ccff4000100000000000000000c39',
  '421610xf69d5e7c0eb43127d5874121867fb763f2967dbb0001000000000000000004b0'
]

export default function Explore() {
  const dateNow = new Date()
  const params = {
    price_period: 86400,
    period_selected: Math.trunc(dateNow.getTime() / 1000 - 60 * 60 * 24 * 30),
    day: Math.trunc(Date.now() / 1000 - 60 * 60 * 24),
    month: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 30),
    chainIn: chainList
  }
  const { data: poolsKassandra } = useFeaturedPools(params)
  const { data: largestPools } = useLargestPools(params)
  const [isSelectTab, setIsSelectTab] = React.useState<
    string | string[] | undefined
  >('pools')

  // const { data } = useCommunityPools({
  //   day: Math.trunc(Date.now() / 1000 - 60 * 60 * 24),
  //   month: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 30),
  //   orderDirection: communityPoolSorted,
  //   first: take,
  //   skip
  // })

  // React.useEffect(() => {
  //   if (!data?.pools.length) return
  //   setTotalPoolsTable(data?.kassandras[0].pool_count - 3)
  // }, [data])

  const { data: poolsData } = useExploreOverviewPools()

  return (
    <S.Explore>
      <S.TitleContainer>
        <S.MainTitle>Explore All Pools</S.MainTitle>
        <S.SubTitle>Find a strategy that fits your needs</S.SubTitle>
      </S.TitleContainer>

      <S.ExplorePoolsWrapper>
        <ExplorePoolsData
          numDeposits={poolsData ? poolsData[0].num_deposits : '0'}
          numManagers={poolsData ? poolsData[0].num_managers.toString() : '0'}
          poolCount={poolsData ? poolsData[0].pool_count.toString() : '0'}
          whiteListNumber="30"
        />
      </S.ExplorePoolsWrapper>

      <S.TabsContainer>
        <ExploreAllPools
          numberOfPools={poolsData ? poolsData[0].pool_count.toString() : '0'}
        />

        <NewSelectTabs
          tabs={tabs}
          isSelect={isSelectTab}
          setIsSelect={setIsSelectTab}
        />
      </S.TabsContainer>

      {isSelectTab === 'pools' && (
        <div>
          <S.ExploreContainer>
            <TitleSection image={featuredFunds} title="Popular Pools" text="" />

            <SliderPoolList
              poolData={poolsKassandra?.poolsKassandra ?? new Array(9).fill({})}
            />
          </S.ExploreContainer>
          <S.ExploreContainer>
            <TitleSection image={featuredFunds} title="Largest Pools" text="" />

            <SliderPoolList
              poolData={largestPools?.pools ?? new Array(9).fill({})}
            />
          </S.ExploreContainer>
        </div>
      )}
    </S.Explore>
  )
}
