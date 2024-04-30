import React, { useState } from 'react'

import { KacyPoligon, networks } from '@/constants/tokenAddresses'

import { useLargestPools } from '@/hooks/query/useLargestPools'
import { useFeaturedPools } from '@/hooks/query/useFeaturedPools'
import { useExploreOverviewPools } from '@/hooks/query/useExploreOverviewPools'
import { whiteList } from '@/hooks/useWhiteList'
import useGetToken from '@/hooks/useGetToken'
import { useTokensData } from '@/hooks/query/useTokensData'

import { MyPoolsTable } from './MyPoolsTable'
import { ExploreAllPools } from './AllPools'
import SliderPoolList from './SliderPoolList'
import { ExplorePoolsData } from './PoolsData'
import { ExploreSelectTabs } from './NewSelectTabs'
import TitleSection from '../../components/TitleSection'

import featuredFunds from '../../../public/assets/iconGradient/featured.svg'
import managerIcon from '../../../public/assets/iconGradient/manager.svg'
import inexpensiveIcon from '../../../public/assets/iconGradient/inexpensive.svg'

import * as S from './styles'

const tabs = [
  {
    asPathText: 'pools',
    text: 'Managed Pools',
    icon: inexpensiveIcon
  },
  {
    asPathText: 'managers',
    text: 'Pool Managers',
    icon: managerIcon
  }
]

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
  const [selectedChains, setSelectedChains] = useState(
    chainList.map(item => item.chainId)
  )
  const [isSelectTab, setIsSelectTab] = useState<string | string[] | undefined>(
    'pools'
  )
  const [whiteListTokenCount, setWhiteListTokenCount] = useState<number>(0)

  const networkChain = networks[137]
  const { data } = useTokensData({
    chainId: networkChain.chainId,
    tokenAddresses: [KacyPoligon]
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
    day: Math.trunc(Date.now() / 1000 - 60 * 60 * 24),
    month: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 30),
    chainIn: selectedChains
  }

  const { data: poolsKassandra } = useFeaturedPools(params)
  const { data: largestPools } = useLargestPools(params)
  const { data: poolsData } = useExploreOverviewPools()

  async function handleGetWhiteListNumber() {
    const chainIdList = chainList.map(chain => chain.chainId)

    let tokenCount = 0
    for (let i = 0; i < chainIdList.length; i++) {
      const chainId = parseInt(chainIdList[i])
      const { countTokens } = whiteList(chainId)

      try {
        const value = await countTokens()
        tokenCount += Number(value)
      } catch (error) {
        console.log(error)
      }
    }

    setWhiteListTokenCount(tokenCount)
  }

  React.useEffect(() => {
    handleGetWhiteListNumber()
  }, [])

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
      <S.TitleContainer>
        <S.MainTitle>Explore All Pools</S.MainTitle>
        <S.SubTitle>Find a strategy that fits your needs</S.SubTitle>
      </S.TitleContainer>

      <S.ExplorePoolsWrapper>
        <ExplorePoolsData
          numDeposits={poolsData ? poolsData[0].num_deposits : '0'}
          numManagers={poolsData ? poolsData[0].num_managers.toString() : '0'}
          poolCount={poolsData ? poolsData[0].pool_count.toString() : '0'}
          whiteListNumber={whiteListTokenCount.toString()}
        />

        <ExploreAllPools
          numberOfPools={poolsData ? poolsData[0].pool_count.toString() : '0'}
        />
      </S.ExplorePoolsWrapper>

      <ExploreSelectTabs
        chainList={chainList}
        selectedChains={selectedChains}
        setSelectedChains={setSelectedChains}
        isSelect={isSelectTab}
        setIsSelect={setIsSelectTab}
      />

      {isSelectTab === 'pools' && (
        <div>
          <S.ExploreContainer>
            <TitleSection image={featuredFunds} title="Popular Pools" text="" />

            <SliderPoolList
              poolData={poolsKassandra?.poolsKassandra ?? new Array(9).fill({})}
              kacyPrice={kacyPrice}
            />
          </S.ExploreContainer>
          <S.ExploreContainer>
            <TitleSection image={featuredFunds} title="Largest Pools" text="" />

            <SliderPoolList
              poolData={largestPools?.pools ?? new Array(9).fill({})}
              kacyPrice={kacyPrice}
            />
          </S.ExploreContainer>
        </div>
      )}

      {isSelectTab === 'managers' && (
        <MyPoolsTable selectedChains={selectedChains} />
      )}
    </S.Explore>
  )
}
