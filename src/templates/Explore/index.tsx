import React from 'react'

import { useFeaturedPools } from '@/hooks/query/useFeaturedPools'
import { useLargestPools } from '@/hooks/query/useLargestPools'

import TitleSection from '../../components/TitleSection'
import SliderPoolList from './SliderPoolList'

import featuredFunds from '../../../public/assets/iconGradient/featured.svg'

import * as S from './styles'

const chainList = ['137', '42161', '43114']

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

  return (
    <S.Explore>
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
    </S.Explore>
  )
}
