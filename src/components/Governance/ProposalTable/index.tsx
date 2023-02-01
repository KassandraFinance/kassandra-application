import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import useSWR from 'swr'
import { request } from 'graphql-request'

import {
  chains,
  GovernorAlpha,
  SUBGRAPH_URL
} from '../../../constants/tokenAddresses'

import useGovernance from '../../../hooks/useGovernance'

import { GET_PROPOSALS } from './graphql'

import * as S from './styles'
import { Divider } from '../../Footer/styles'
import Loading from '../../Loading'

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

const statsPrimaryProposalLibColor: { [key: string]: string } = {
  active: '#E843C4',
  succeeded: '#2CE878',
  failed: '#EA3224'
}

interface IProposalsListProps {
  id: string;
  number: number;
  targets: [];
  values: [];
  signatures: [];
  startBlock: string;
  endBlock: string;
  description: string;
  created: string;
  state: string[];
  timeToEndProposal: string;
}

interface IProposalTableProps {
  skip?: number;
  take: number;
}

export const ProposalTable = ({ skip = 0, take }: IProposalTableProps) => {
  // eslint-disable-next-line prettier/prettier
  const [proposalsList, setProposalsList] = React.useState<
    Array<IProposalsListProps>
  >([])

  const secondsPerBlock =
    chains[process.env.NEXT_PUBLIC_MASTER === '1' ? 'avalanche' : 'fuji']
      .secondsPerBlock ?? 2

  const { data } = useSWR([GET_PROPOSALS, skip, take], (query, skip, take) =>
    request(SUBGRAPH_URL, query, { skip, take })
  )

  const governance = useGovernance(GovernorAlpha)

  async function handleAddStateOnProposal(proposals: IProposalsListProps[]) {
    const proposal = proposals.map((proposal: IProposalsListProps) =>
      governance.stateProposals(proposal.number).then(res => {
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
    )
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
      handleAddStateOnProposal(data.proposals)
    }
  }, [data])

  return (
    <S.ProposalTable>
      <table>
        <S.Th>
          <tr>
            <td>Proposal</td>
            <td>Status/Time frame</td>
          </tr>
        </S.Th>
        <tbody>
          {proposalsList.length > 0 ? (
            proposalsList?.map(proposal => (
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

                      <S.StatusProposal
                        statusColor={
                          statsPrimaryProposalLibColor[
                            proposal.state[0].toLowerCase()
                          ]
                        }
                      >
                        {proposal.state[0]}
                      </S.StatusProposal>

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
            ))
          ) : (
            <S.LoadingContainer>
              <td colSpan={2}>
                <Loading marginTop={0} />
              </td>
            </S.LoadingContainer>
          )}
        </tbody>
      </table>
    </S.ProposalTable>
  )
}

export default ProposalTable
