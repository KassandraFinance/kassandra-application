import React from 'react'
import useSWR from 'swr'
import request from 'graphql-request'

import { IIndexProps } from '../../pages'
import { BACKEND_KASSANDRA } from '../../constants/tokenAddresses'
import { GET_COMMUNITYPOOLS } from './graphql'

import Breadcrumb from '../../components/Breadcrumb'
import BreadcrumbItem from '../../components/Breadcrumb/BreadcrumbItem'
import TitleSection from '../../components/TitleSection'
import FundCard from '../../components/FundCard'
import Loading from '../../components/Loading'
import CommunityPoolsTable from './CommunityPoolsTable'

import sectionTitleEye from '../../../public/assets/iconGradient/section-title-eye.svg'
import featuredFunds from '../../../public/assets/iconGradient/featured.svg'
import communityFunds from '../../../public/assets/iconGradient/community.svg'

import * as S from './styles'

type GetCommunityPoolsType = {
  pools: {
    address: string,
    chainId: number,
    logo: string | null,
    name: string,
    price_usd: string,
    symbol: string,
    total_value_locked_usd: string,
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
        token: {
          logo: string
        }
      }[]
    }[]
  }[]
}

export default function Explore({
  poolsKassandra,
  poolsCommunity
}: IIndexProps) {
  const [loading, setLoading] = React.useState(true)

  const params = {
    day: Math.trunc(Date.now() / 1000 - 60 * 60 * 24),
    month: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 30)
  }

  const { data } = useSWR<GetCommunityPoolsType>(
    [GET_COMMUNITYPOOLS, params],
    (query, { day, month }) =>
      request(BACKEND_KASSANDRA, query, {
        day,
        month
      })
  )

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2700)
  }, [])

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem href={`/`} isLastPage>
          Invest
        </BreadcrumbItem>
      </Breadcrumb>

      <S.Explore>
        <S.TitleContainer>
          <TitleSection
            image={sectionTitleEye}
            title="Explore Pools"
            text="Find a strategy that fits your needs"
          />
        </S.TitleContainer>

        <S.ExploreContainer>
          <TitleSection image={featuredFunds} title="Featured Pools" text="" />

          {loading && (
            <S.LoadingContainer>
              <Loading marginTop={0} />
            </S.LoadingContainer>
          )}

          <S.CardContainer loading={loading}>
            {poolsKassandra.map(pool => (
              <FundCard key={pool.id} poolAddress={pool.id} />
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
            {data && <CommunityPoolsTable pools={data?.pools} />}
          </S.ComunitFundsContainer>
        </S.ExploreContainer>
      </S.Explore>
    </>
  )
}
