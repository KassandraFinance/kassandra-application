import React from 'react'
import Image from 'next/image'

import { GovernorAlpha } from '@/constants/tokenAddresses'

import SectionTable from '@/components/SectionTable'

import useGov, { StateProposal } from '@/hooks/useGov'
import { useProposals } from '@/hooks/query/useProposals'

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

const statsPrimaryProposalLibColor: { [key: string]: string } = {
  active: '#E843C4',
  succeeded: '#2CE878',
  failed: '#EA3224'
}

interface IProposalsListProps {
  timeToEndProposal: string
  state: StateProposal
  id: string
  number: number
  targets: []
  values: []
  signatures: []
  startBlock: string
  endBlock: string
  description: string
  created: string
}

interface IProposalTableProps {
  skip?: number
  take: number
}

export const ProposalTable = ({ skip = 0, take }: IProposalTableProps) => {
  const [proposalsList, setProposalsList] = React.useState<
    IProposalsListProps[]
  >([])

  const secondsPerBlock = 2

  const { data } = useProposals({ skip, take })

  const governance = useGov(GovernorAlpha)

  async function handleAddStateOnProposal(
    proposals:
      | IProposalsListProps[]
      | {
          __typename?: 'Proposal' | undefined
          id: string
          number: number
          targets: string[]
          values: string[]
          signatures: string[]
          startBlock: string
          endBlock: string
          description: string
          created: string
        }[]
  ) {
    const listProposals = proposals.map(proposal =>
      governance.stateProposals(proposal.number).then(res => {
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
        return {
          ...proposal,
          timeToEndProposal: timeToEndProposal,
          state: state
        }
      })
    )
    const proposalComplete = await Promise.all(listProposals)
    if (proposalComplete[0].state) {
      setProposalsList(proposalComplete as IProposalsListProps[])
    }
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
      handleAddStateOnProposal(data)
    }
  }, [data])

  const proposalsMemo = React.useMemo(() => {
    return proposalsList.map(proposal => ({
      key: proposal.id,
      href: `/gov/proposals/${proposal.number}`,
      cells: [
        <S.BaseCell>
          <S.TextProposal>
            {proposal.number.toString().padStart(2, '0')}{' '}
            {getTitleProposal(proposal.description.replace('["', ''))}
          </S.TextProposal>

          <S.StatusProposal
            statusColor={
              statsPrimaryProposalLibColor[proposal?.state[0].toLowerCase()]
            }
          >
            {proposal.state[0]}
          </S.StatusProposal>
        </S.BaseCell>,

        <S.BaseCell>
          <S.StateMutability
            statusColor={
              statsSecundaryProposalLibColor[proposal.state[1].toLowerCase()]
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

          <S.TimeFrame>
            {proposal.state[1]} {proposal.state[3] === '1' ? 'until' : 'in'}{' '}
            {proposal.timeToEndProposal}
          </S.TimeFrame>
        </S.BaseCell>
      ]
    }))
  }, [proposalsList.map(proposal => proposal.id).toString()])

  return (
    <SectionTable
      gridTemplate="1fr 250px"
      headers={[
        { key: 'proposal-name', content: 'Proposal' },
        { key: 'proposal-status', content: 'Status/Time frame' }
      ]}
      rows={proposalsMemo}
    />
  )
}

export default ProposalTable
