import React from 'react'

import { IIndexProps } from '../../pages'

import Header from '../../components/Header'
import Breadcrumb from '../../components/Breadcrumb'
import BreadcrumbItem from '../../components/Breadcrumb/BreadcrumbItem'
import TitleSection from '../../components/TitleSection'
import FundCard from '../../components/FundCard'
import AnyCard from '../../components/AnyCard'
import Loading from '../../components/Loading'

import sectionTitleEye from '../../../public/assets/iconGradient/section-title-eye.svg'
import featuredFunds from '../../../public/assets/iconGradient/featured.svg'
import communityFunds from '../../../public/assets/iconGradient/community.svg'

import * as S from './styles'

export default function Explore({ pools }: IIndexProps) {
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2200)
  }, [])

  return (
    <>
      <Header />

      <Breadcrumb>
        <BreadcrumbItem href={`/pool`} isLastPage>
          Explore
        </BreadcrumbItem>
      </Breadcrumb>

      <S.Explore>
        <S.TitleContainer>
          <TitleSection
            image={sectionTitleEye}
            title="Explore Funds"
            text="Find a strategy that fits your needs"
          />
        </S.TitleContainer>

        <S.ExploreContainer>
          <TitleSection image={featuredFunds} title="Featured Funds" text="" />

          {loading && (
            <S.LoadingContainer>
              <Loading marginTop={0} />
            </S.LoadingContainer>
          )}

          <S.CardContainer loading={loading}>
            {pools.map(pool => (
              <FundCard key={pool.id} poolAddress={pool.id} />
            ))}
          </S.CardContainer>

          <S.ComunitFundsContainer>
            <TitleSection
              image={communityFunds}
              title="Community Funds"
              text=""
            />

            <AnyCard text="Coming Soon…" />
          </S.ComunitFundsContainer>
        </S.ExploreContainer>
      </S.Explore>
    </>
  )
}
