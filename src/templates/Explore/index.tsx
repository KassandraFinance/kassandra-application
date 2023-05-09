import React from 'react'
import useSWR from 'swr'
import request from 'graphql-request'

import { IIndexProps } from '../../pages'
import { BACKEND_KASSANDRA, multisig } from '../../constants/tokenAddresses'
import { GET_COMMUNITYPOOLS } from './graphql'

import Breadcrumb from '../../components/Breadcrumb'
import BreadcrumbItem from '../../components/Breadcrumb/BreadcrumbItem'
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
import AnyCard from '@/components/AnyCard'

const tabs = [
  {
    asPathText: 'pools',
    text: 'Managed Pools',
    icon: inexpensiveIcon
  }
  // {
  //   asPathText: 'managers',
  //   text: 'Pool Managers',
  //   icon: managerIcon
  // }
]

type GetCommunityPoolsType = {
  pools: {
    id: string,
    address: string,
    logo: string | null,
    name: string,
    price_usd: string,
    symbol: string,
    total_value_locked_usd: string,
    is_private_pool: boolean,
    factory: {
      pool_count: number
    },
    chain: {
      logo: string
    },
    now: {
      close: string,
      timestamp: number
    }[],
    day: {
      close: string,
      timestamp: number
    }[],
    month: {
      close: string,
      timestamp: number
    }[],
    volumes: {
      volume_usd: string
    }[],
    weight_goals: {
      weights: {
        asset: {
          token: {
            logo: string
          }
        }
      }[]
    }[]
  }[]
}

export default function Explore({ poolsKassandra }: IIndexProps) {
  const [loading, setLoading] = React.useState(true)
  const [totalPoolsTable, setTotalPoolsTable] = React.useState(0)
  const [skip, setSkip] = React.useState(0)
  const [isSelectTab, setIsSelectTab] = React.useState<
    string | string[] | undefined
  >('pools')
  const [communityPoolSorted, setCommunityPoolSorted] =
    React.useState<communityPoolSorting>(communityPoolSorting.DESC)

  const take = 8

  // const { data } = useSWR<GetCommunityPoolsType>(
  //   [GET_COMMUNITYPOOLS, communityPoolSorted, skip],
  //   query =>
  //     request(BACKEND_KASSANDRA, query, {
  //       day: Math.trunc(Date.now() / 1000 - 60 * 60 * 24),
  //       month: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 30),
  //       multisig: multisig,
  //       orderDirection: communityPoolSorted,
  //       first: take,
  //       skip
  //     })
  // )

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2700)

    return () => clearTimeout(timer)
  }, [])

  // React.useEffect(() => {
  //   if (!data?.pools.length) return

  //   setTotalPoolsTable(data?.pools[0].factory.pool_count)
  // }, [data])

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

            <S.CardContainer loading={loading}>
              {poolsKassandra.map(pool => (
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
              <AnyCard text="Coming soon..." />
              {/* <CommunityPoolsTable
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
              </S.PaginationWrapper> */}
            </S.ComunitFundsContainer>
          </S.ExploreContainer>
        )}

        {/* {isSelectTab === 'managers' && (
          <S.ExploreContainer>
            <ManagersPoolTable />
          </S.ExploreContainer>
        )} */}
      </S.Explore>
    </>
  )
}
