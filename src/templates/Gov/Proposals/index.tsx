import React from 'react'
import Big from 'big.js'
import Link from 'next/link'
import Image from 'next/image'
import { useConnectWallet } from '@web3-onboard/react'

import { useProposals } from '@/hooks/query/useProposals'
import { useVotingPower } from '@/hooks/query/useVotingPower'

import Button from '@/components/Button'
import TitleSection from '@/components/TitleSection'
import Breadcrumb from '@/components/Breadcrumb'
import BreadcrumbItem from '@/components/Breadcrumb/BreadcrumbItem'
import VotingPower from '@/components/VotingPower'
import ExternalLink from '@/components/ExternalLink'
import ProposalTable from '@/components/Governance/ProposalTable'
import ProposalOverview from '@/components/Governance/ProposalOverview'
import Pagination from '@/components/Pagination'

import proposals from '@assets/iconGradient/details.svg'
import externalLink from '@assets/utilities/external-link.svg'

import * as S from './styles'

const Proposals = () => {
  const [skip, setSkip] = React.useState<number>(0)

  const [{ wallet }] = useConnectWallet()
  const { data } = useProposals({ skip: 0, take: 1 })
  const { data: votingPowerData } = useVotingPower({
    id: wallet?.accounts[0].address ?? ''
  })

  const take = 10

  function handlePageClick(data: { selected: number }, take: number) {
    setSkip(data.selected * take)
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem href="/">Invest</BreadcrumbItem>
        <BreadcrumbItem href="/gov">Governance</BreadcrumbItem>
        <BreadcrumbItem href="/gov/proposals" isLastPage>
          Governance Proposals
        </BreadcrumbItem>
      </Breadcrumb>
      <S.VoteContent>
        <S.GovernanceProposalsContent>
          <S.Title>
            <TitleSection image={proposals} title="Governance Proposals" />
            <S.VotingPowerContent>
              <VotingPower
                currentVotingPower={Big(
                  votingPowerData?.user?.votingPower ?? '0'
                )}
                totalVotingPower={Big(
                  votingPowerData?.governances[0]?.totalVotingPower ?? '0'
                )}
              />
            </S.VotingPowerContent>
            {wallet ? (
              <ExternalLink
                hrefNext={`/profile/${wallet.accounts[0].address}?tab=governance-data`}
                text="Manage Delegation"
              />
            ) : null}
          </S.Title>
          <ProposalOverview />
        </S.GovernanceProposalsContent>
        <S.AllProposalsContent>
          <S.TitleAndLinkContent>
            <TitleSection image={proposals} title="All Proposals" />

            <S.ButtonWrapper>
              <S.LinkForum
                href="https://gov.kassandra.finance/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Discuss the proposals at the Forum</span>
                <Image src={externalLink} alt="" aria-hidden="true" />
              </S.LinkForum>

              <Link href="/gov/create-proposal" passHref>
                <Button
                  as="a"
                  text="Create Your Proposals"
                  background="primary"
                />
              </Link>
            </S.ButtonWrapper>
          </S.TitleAndLinkContent>
          <ProposalTable skip={skip} take={take} />
        </S.AllProposalsContent>
        <Pagination
          take={take}
          skip={skip}
          totalItems={(data && data[0].number) || 0}
          handlePageClick={handlePageClick}
        />
      </S.VoteContent>
    </>
  )
}

export default Proposals
