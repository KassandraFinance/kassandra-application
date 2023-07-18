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

    setTotalPoolsTable(data?.kassandras[1].pool_count - 1)
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
              {poolsKassandra?.poolsKassandra.map(pool => (
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
