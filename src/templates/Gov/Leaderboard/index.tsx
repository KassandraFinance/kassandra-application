import React from 'react'
import { useRouter } from 'next/router'
import { chains } from '../../../constants/tokenAddresses'

import { useAppSelector } from '../../../store/hooks'
import useConnect from '../../../hooks/useConnect'

import Header from '../../../components/Header'
import TitleSection from '../../../components/TitleSection'
import Breadcrumb from '../../../components/Breadcrumb'
import BreadcrumbItem from '../../../components/Breadcrumb/BreadcrumbItem'
import VotingPowerTable from '../../../components/Governance/VotingPowerTable'
import Web3Disabled from '../../../components/Web3Disabled'
import Pagination from '../../../components/Pagination'

import votingPower from '../../../../public/assets/iconGradient/voting-power-rank.svg'

import * as S from './styles'

const Leaderboard = () => {
  const [skip, setSkip] = React.useState<number>(0)

  const { chainId, userWalletAddress } = useAppSelector(state => state)
  const { metamaskInstalled } = useConnect()
  const router = useRouter()

  const take = 10

  const chain =
    process.env.NEXT_PUBLIC_MASTER === '1' ? chains.avalanche : chains.fuji

  function handlePageClick(data: { selected: number }) {
    router.push({
      pathname: `${router.pathname}`,
      query: { ...router.query, page: `${data.selected + 1}` }
    })
  }

  const page = typeof router.query.page === 'string' ? router.query.page : '0'

  React.useEffect(() => {
    setSkip((parseInt(page) - 1) * take)
  }, [page])

  return (
    <>
      <Header />
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/gov">Governance</BreadcrumbItem>
        <BreadcrumbItem href="/gov/leaderboard" isLastPage>
          Voting Power Leaderboard
        </BreadcrumbItem>
      </Breadcrumb>
      {(metamaskInstalled && Number(chainId) !== chain.id) ||
      (userWalletAddress.length > 0 && Number(chainId) !== chain.id) ? (
        <Web3Disabled
          textButton={`Connect to ${chain.chainName}`}
          textHeader="Your wallet is set to the wrong network."
          bodyText={`Please switch to the ${chain.chainName} network to have access to governance`}
          type="changeChain"
        />
      ) : (
        <>
          <S.VoteContent>
            <S.VotingPowerLeaderboard>
              <TitleSection
                image={votingPower}
                title="Voting Power Leaderboard"
              />
              {<VotingPowerTable skip={skip} take={take} />}
            </S.VotingPowerLeaderboard>
          </S.VoteContent>
        </>
      )}
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
