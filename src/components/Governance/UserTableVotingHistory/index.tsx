import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getAddress } from 'ethers'

import { useUserVotes } from '@/hooks/query/useUserVotes'
import { GovernorAlpha } from '@/constants/tokenAddresses'

import useGov, { StateProposal } from '@/hooks/useGov'

import AnyCard from '../../AnyCard'

import * as S from './styles'

const statsSecundaryProposalLibColor: { [key: string]: string } = {
  'voting open': '#E843C4',
  succeeded: '#26DBDB',
  queued: '#FFBF00',
  pending: '#FFBF00',
  executed: '#2CE878',
  defeated: '#EA3224',
  expired: '#EA3224',
  canceled: '#BDBDBD'
}

interface IProposalsTableProps {
  timeToEndProposal: string
  state: StateProposal
  support: boolean
  __typename?: 'Proposal' | undefined
  id: string
  number: number
  targets: string[]
  values: string[]
  signatures: string[]
  startBlock: string
  description: string
  endBlock: string
  created: string
}

interface IUserTableProps {
  userAddressUrl: string | string[] | undefined
  userWalletAddress: string | undefined
}

export const UserTableVotingHistory = ({
  userAddressUrl,
  userWalletAddress
}: IUserTableProps) => {
  const [proposalsList, setProposalsList] = React.useState<
    IProposalsTableProps[]
  >([])

  const secondsPerBlock = 2

  const { data } = useUserVotes({
    id: Array.isArray(userAddressUrl) ? '' : userAddressUrl || ''
  })

  const governance = useGov(GovernorAlpha)

  async function handleAddStateOnProposal(
    proposals: {
      __typename?: 'Vote' | undefined
      support: boolean
      proposal: {
        __typename?: 'Proposal' | undefined
        id: string
        number: number
        targets: string[]
        values: string[]
        signatures: string[]
        startBlock: string
        description: string
        endBlock: string
        created: string
      }
    }[]
  ) {
    const proposal = proposals.map(async prop => {
      const proposal = { ...prop.proposal, support: prop.support }
      const res = await governance.stateProposals(proposal.number)
      const createdProposal = new Date(Number(proposal.created) * 1000)
      const secondsToEndProposal =
        (Number(proposal.endBlock) - Number(proposal.startBlock)) *
        secondsPerBlock
      const timeToEndProposal = new Date(
        Number(createdProposal) + secondsToEndProposal * 1000
      )
        .toLocaleString()
        .split(', ')[0]
      const state = res
      return { ...proposal, timeToEndProposal, state }
    })
    const proposalComplete = await Promise.all(proposal)

    setProposalsList(proposalComplete)
  }

  function getTitleProposal(description: string) {
    const [titleDescription] = description.split(/[,.\n]/)
    const formatTitleDescription = titleDescription.replace('#', '')

    if (formatTitleDescription.length > 45) {
      return (
        formatTitleDescription.slice(0, 45).charAt(0).toUpperCase() +
        formatTitleDescription.slice(1, 45) +
        '...'
      )
    }

    return (
      formatTitleDescription.charAt(0).toUpperCase() +
      formatTitleDescription.slice(1)
    )
  }

  React.useEffect(() => {
    if (!data) {
      return
    }

    handleAddStateOnProposal(data.votes)
  }, [data])

  return (
    <>
      {proposalsList.length > 0 ? (
        <S.UserTableVotingHistory>
          <table>
            <S.Th>
              <tr>
                <td>Proposal</td>
                <td>Status/Time frame</td>
              </tr>
            </S.Th>
            <tbody>
              {proposalsList.map(proposal => (
                <tr>
                  <S.Td colSpan={2}>
                    <Link
                      key={proposal.id}
                      href={`/gov/proposals/${proposal.number}`}
                      passHref
                    >
                      <a className="td-container">
                        <S.TextProposal>
                          {proposal.number.toString().padStart(2, '0')}{' '}
                          {getTitleProposal(
                            proposal.description.replace('["', '')
                          )}
                        </S.TextProposal>

                        <S.TypeVote
                          voteColor={proposal.support ? '#2CE878' : '#EA3224'}
                        >
                          {proposal.support ? 'Voted for' : 'Voted against'}
                        </S.TypeVote>

                        {/* <S.TimeFrame>
                          {`${
                            endblockProposal.indexOf(proposal.state[3]) === -1
                              ? `Created in ${dateRequestUnstake(
                                  proposal.timestamp * 1000
                                )}`
                              : `${proposal.state[1]} in ${dateRequestUnstake(
                                  proposal.timestamp * 1000
                                )}`
                          }`}
                        </S.TimeFrame> */}

                        <S.TimeFrame>
                          {proposal.state[1]}{' '}
                          {proposal.state[3] === '1' ? 'until' : 'in'}{' '}
                          {proposal.timeToEndProposal}
                        </S.TimeFrame>

                        <S.StateMutability
                          statusColor={
                            statsSecundaryProposalLibColor[
                              proposal.state[1].toLowerCase()
                            ]
                          }
                        >
                          <span>{proposal.state[1]}</span>
                          {proposal.state[2] && (
                            <div className="status-icon-container">
                              <Image
                                className="status-icon"
                                src={proposal.state[2]}
                                alt=""
                                layout="responsive"
                              />
                            </div>
                          )}
                        </S.StateMutability>
                      </a>
                    </Link>
                  </S.Td>
                </tr>
              ))}
            </tbody>
          </table>
        </S.UserTableVotingHistory>
      ) : (
        <AnyCard
          text={
            userWalletAddress &&
            getAddress(userWalletAddress) === userAddressUrl
              ? 'This address hasn’t voted in any governance proposal yet.'
              : 'This address has not voted on a governance proposal yet '
          }
          button={
            (userWalletAddress ? getAddress(userWalletAddress) : false) ===
            userAddressUrl
          }
          link="/farm"
          buttonText="Stake/Farm"
        />
      )}
    </>
  )
}

export default UserTableVotingHistory
