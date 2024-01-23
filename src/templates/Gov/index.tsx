import Link from 'next/link'
import Image from 'next/image'
import { useConnectWallet } from '@web3-onboard/react'

import Button from '@/components/Button'
import TitleSection from '@/components/TitleSection'
import Overview from '@/components/Governance/Overview'
import ProposalTable from '@/components/Governance/ProposalTable'
import VotingPowerTable from '@/components/Governance/VotingPowerTable'
import ExternalLink from '@/components/ExternalLink'
import Breadcrumb from '@/components/Breadcrumb'
import BreadcrumbItem from '@/components/Breadcrumb/BreadcrumbItem'

import overview from '@assets/iconGradient/section-title-eye.svg'
import proposals from '@assets/iconGradient/details.svg'
import votingPower from '@assets/iconGradient/voting-power-rank.svg'
import externalLink from '@assets/utilities/external-link.svg'

import * as S from './styles'

const Gov = () => {
  const [{ wallet }] = useConnectWallet()
  const take = 5

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem href="/">Invest</BreadcrumbItem>
        <BreadcrumbItem href="/gov" isLastPage>
          Governance
        </BreadcrumbItem>
      </Breadcrumb>

      <S.VoteContent>
        <TitleSection image={overview} title="Overview" />
        <Overview />
        <S.OverViewLinks>
          <ExternalLink hrefNext="farm?tab=stake" text="Obtain more" />
          {wallet ? (
            <ExternalLink
              hrefNext={`/profile/${wallet.accounts[0].address}?tab=governance-data`}
              text="Manage Delegation"
            />
          ) : null}
        </S.OverViewLinks>

        <S.TitleAndLinkContent>
          <TitleSection image={proposals} title="Recent Proposals" />
          <S.ButtonWrapper>
            <S.LinkForum
              href="https://gov.kassandra.finance/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Discuss the proposals at the Forum</span>
              <Image src={externalLink} alt="" />
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
        <ProposalTable take={take} />
        <S.ExternalLinkWrapper>
          <ExternalLink hrefNext="/gov/proposals" text="Check more proposals" />
        </S.ExternalLinkWrapper>

        <TitleSection image={votingPower} title="Voting Power Leaderboard" />
        <VotingPowerTable take={take} />
        <S.ExternalLinkWrapper>
          <ExternalLink
            hrefNext="/gov/leaderboard?page=1"
            text="Check leaderboard"
          />
        </S.ExternalLinkWrapper>
      </S.VoteContent>
    </>
  )
}

export default Gov
