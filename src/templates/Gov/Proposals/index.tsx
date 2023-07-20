import React from 'react'
import Image from 'next/image'
import { getAddress } from 'ethers'
import { useConnectWallet } from '@web3-onboard/react'

import { useProposals } from '@/hooks/query/useProposals'

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

  const take = 10

  function handlePageClick(data: { selected: number }, take: number) {
    setSkip(data.selected * take)
  }

  const { data } = useProposals({ skip: 0, take: 1 })

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
                userWalletAddress={
                  wallet ? getAddress(wallet.accounts[0].address) : ''
                }
                isMobile={true}
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
            <S.LinkForum
              href="https://gov.kassandra.finance/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Discuss the proposals at the Forum</span>
              <Image src={externalLink} alt="" />
            </S.LinkForum>
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
