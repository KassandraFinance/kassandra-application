import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import useSWR from 'swr'
import { request } from 'graphql-request'

import { GovernorAlpha, SUBGRAPH_URL } from '@/constants/tokenAddresses'

import useGovernance, { StateProposal } from '@/hooks/useGovernance'

import AnyCard from '../../AnyCard'

import { GET_PROPOSALS } from './graphql'

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

// const statsPrimaryProposalLibColor: { [key: string]: string } = {
//   active: '#E843C4',
//   succeeded: '#2CE878',
//   failed: '#EA3224'
// }

interface IProposalsTableProps {
  id: string
  number: number
  support: boolean
  targets: []
  values: []
  signatures: []
  startBlock: string
  description: string
  timestamp: number
  state: StateProposal
  endBlock: string
  created: string
  timeToEndProposal: string
}

interface IProposalsListProps {
  support: boolean
  proposal: IProposalsTableProps
}

interface IUserTableProps {
  userAddressUrl: string | string[] | undefined
  userWalletAddress: string | string[] | undefined
}

export const UserTableVotingHistory = ({
  userAddressUrl,
  userWalletAddress
}: IUserTableProps) => {
  const [proposalsList, setProposalsList] = React.useState<
    IProposalsTableProps[]
  >([])

  const secondsPerBlock = 2

  const { data } = useSWR([GET_PROPOSALS], query =>
    request(SUBGRAPH_URL, query, {
      id: userAddressUrl
    })
  )

  const governance = useGovernance(GovernorAlpha)

  async function handleAddStateOnProposal(proposals: IProposalsListProps[]) {
    const proposal = proposals.map(prop => {
      const proposal = { ...prop.proposal, support: prop.support }
      return governance.stateProposals(proposal.number).then(res => {
        const createdProposal = new Date(Number(proposal.created) * 1000)
        const secondsToEndProposal =
          (Number(proposal.endBlock) - Number(proposal.startBlock)) *
          secondsPerBlock
        proposal.timeToEndProposal = new Date(
          Number(createdProposal) + secondsToEndProposal * 1000
        )
          .toLocaleString()
          .split(', ')[0]
        proposal.state = res

        return proposal
      })
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
    if (data) {
      data.user === null
        ? setProposalsList([])
        : handleAddStateOnProposal(data.user.votes)
    }
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
                <Link
                  key={proposal.id}
                  href={`/gov/proposals/${proposal.number}`}
                >
                  <tr>
                    <S.Td colSpan={2}>
                      <div className="td-container">
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
                      </div>
                    </S.Td>
                  </tr>
                </Link>
              ))}
            </tbody>
          </table>
        </S.UserTableVotingHistory>
      ) : (
        <AnyCard
          text={
            userWalletAddress === userAddressUrl
              ? 'This address hasn’t voted in any governance proposal yet.'
              : 'This address has not voted on a governance proposal yet '
          }
          button={userWalletAddress === userAddressUrl}
          link="/farm"
          buttonText="Stake/Farm"
        />
      )}
    </>
  )
}

export default UserTableVotingHistory
