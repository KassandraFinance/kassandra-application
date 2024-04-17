import React from 'react'

import { useCommunityPools } from '@/hooks/query/useCommunityPools'
import { useFeaturedPools } from '@/hooks/query/useFeaturedPools'

import TitleSection from '../../components/TitleSection'
import FundCard from '../../components/FundCard'
import Loading from '../../components/Loading'
import CommunityPoolsTable, {
  communityPoolSorting
} from './CommunityPoolsTable'
import ManagersPoolTable from './ManagersPoolTable'
import SelectTabs from '@/components/SelectTabs'
import Pagination from '@/components/Pagination'

import sectionTitleEye from '../../../public/assets/iconGradient/section-title-eye.svg'
import featuredFunds from '../../../public/assets/iconGradient/featured.svg'
import communityFunds from '../../../public/assets/iconGradient/community.svg'
import inexpensiveIcon from '../../../public/assets/iconGradient/inexpensive.svg'
import managerIcon from '../../../public/assets/iconGradient/manager.svg'

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
  const [loading, setLoading] = React.useState(true)
  const [totalPoolsTable, setTotalPoolsTable] = React.useState(0)
  const [skip, setSkip] = React.useState(0)
  const [isSelectTab, setIsSelectTab] = React.useState<
    string | string[] | undefined
  >('pools')
  const [communityPoolSorted, setCommunityPoolSorted] =
    React.useState<communityPoolSorting>(communityPoolSorting.DESC)

  const take = 8

  const { data: poolsKassandra } = useFeaturedPools()
  const { data } = useCommunityPools({
    day: Math.trunc(Date.now() / 1000 - 60 * 60 * 24),
    month: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 30),
    orderDirection: communityPoolSorted,
    first: take,
    skip
  })

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2700)

    return () => clearTimeout(timer)
  }, [])

  React.useEffect(() => {
    if (!data?.pools.length) return

    setTotalPoolsTable(data?.kassandras[0].pool_count - 3)
  }, [data])

  return (
    <>
      <S.Explore>
        <S.TitleContainer>
          <TitleSection
            image={sectionTitleEye}
            title="Explore Pools"
            text="Find a strategy that fits your needs"
          />
        </S.TitleContainer>

        <SelectTabs
          tabs={tabs}
          isSelect={isSelectTab}
          setIsSelect={setIsSelectTab}
        />

        {isSelectTab === 'pools' && (
          <S.ExploreContainer>
            <TitleSection
              image={featuredFunds}
              title="Featured Pools"
              text=""
            />

            {loading && (
              <S.LoadingContainer>
                <Loading marginTop={0} />
              </S.LoadingContainer>
            )}

            <S.CardContainer isLoading={loading}>
              {poolsKassandra?.poolsKassandra
                .sort(function (a, b) {
                  return (
                    addressOrderList.indexOf(a.id) -
                    addressOrderList.indexOf(b.id)
                  )
                })
                .map(pool => (
                  <FundCard
                    key={pool.id}
                    poolAddress={pool.id}
                    link={`/pool/${pool.id}`}
                  />
                ))}
            </S.CardContainer>

            <S.ComunitFundsContainer>
              <S.TitleWrapper>
                <TitleSection
                  image={communityFunds}
                  title="Community Pools"
                  text=""
                />
              </S.TitleWrapper>
              <CommunityPoolsTable
                pools={data?.pools}
                communityPoolSorted={communityPoolSorted}
                setCommunityPoolSorted={setCommunityPoolSorted}
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
            </S.ComunitFundsContainer>
          </S.ExploreContainer>
        )}

        {isSelectTab === 'managers' && (
          <S.ExploreContainer>
            <ManagersPoolTable />
          </S.ExploreContainer>
        )}
      </S.Explore>
    </>
  )
}
