import React from 'react'
import { useRouter } from 'next/router'

import TitleSection from '@/components/TitleSection'
import Breadcrumb from '@/components/Breadcrumb'
import BreadcrumbItem from '@/components/Breadcrumb/BreadcrumbItem'
import VotingPowerTable from '@/components/Governance/VotingPowerTable'
import Pagination from '@/components/Pagination'

import votingPower from '@assets/iconGradient/voting-power-rank.svg'

import * as S from './styles'

const Leaderboard = () => {
  const [skip, setSkip] = React.useState<number>(0)

  const router = useRouter()

  const take = 10
  const page = typeof router.query.page === 'string' ? router.query.page : '0'

  function handlePageClick(data: { selected: number }) {
    router.push({
      pathname: `${router.pathname}`,
      query: { ...router.query, page: `${data.selected + 1}` }
    })
  }

  React.useEffect(() => {
    setSkip((parseInt(page) - 1) * take)
  }, [page])

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem href="/">Invest</BreadcrumbItem>
        <BreadcrumbItem href="/gov">Governance</BreadcrumbItem>
        <BreadcrumbItem href="/gov/leaderboard" isLastPage>
          Voting Power Leaderboard
        </BreadcrumbItem>
      </Breadcrumb>

      <S.VoteContent>
        <S.VotingPowerLeaderboard>
          <TitleSection image={votingPower} title="Voting Power Leaderboard" />
          {<VotingPowerTable skip={skip} take={take} />}
        </S.VotingPowerLeaderboard>
      </S.VoteContent>

      <Pagination
        take={take}
        skip={skip}
        totalItems={500}
        page={parseInt(page) - 1}
        handlePageClick={handlePageClick}
      />
    </>
  )
}

export default Leaderboard
