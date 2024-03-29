import React from 'react'

import { GovernorAlpha } from '@/constants/tokenAddresses'

import useGov from '@/hooks/useGov'

import Loading from '@/components/Loading'
import PieChart from './PieChart'

import * as S from './styles'

export interface IStateProposalListProps {
  stateProposal: string
  proposalVote: number
}

const ProposalOverview = () => {
  const proposalArray = [
    { stateProposal: 'Succeeded', proposalVote: 0 },
    { stateProposal: 'Active', proposalVote: 0 },
    { stateProposal: 'Failed', proposalVote: 0 }
  ]

  const [stateProposalsList, setStateProposalsList] =
    React.useState<IStateProposalListProps[]>(proposalArray)
  const [proposalTotal, setProposalTotal] = React.useState<string>('0')
  const [isLoadingProposal, setIsLoadingProposal] = React.useState(true)

  const governance = useGov(GovernorAlpha)

  async function handleStateProposals() {
    const proposalAmount = await governance.proposalCount()
    setProposalTotal(proposalAmount.toString())

    await Promise.all(
      Array(Number(proposalAmount))
        .fill(0)
        .map(async (_, index) => {
          const proposal = await governance.stateProposals(index + 1)
          const proposalState = proposal[0]

          switch (proposalState) {
            case 'Succeeded':
              proposalArray[0].proposalVote += 1
              break
            case 'Active':
              proposalArray[1].proposalVote += 1
              break
            case 'Failed':
              proposalArray[2].proposalVote += 1
              break
            default:
              break
          }
        })
    )
    setStateProposalsList(proposalArray)
    setIsLoadingProposal(false)
  }

  const handleCheckProposalName = (value: string) => {
    if (value === 'Active') {
      return (value = 'Voting Open')
    } else {
      return value
    }
  }

  React.useEffect(() => {
    handleStateProposals()
    setStateProposalsList([])
  }, [])

  return (
    <S.ProposalOverview>
      {isLoadingProposal ? (
        <S.ProposalOverviewIsLoading>
          <Loading marginTop={0} />
        </S.ProposalOverviewIsLoading>
      ) : (
        <>
          <S.Status>
            <h3>Proposals Overview</h3>
            {stateProposalsList.map((ProposalState, index) => (
              <S.ProposalStateList
                key={ProposalState.stateProposal + index}
                ProposalState={ProposalState.stateProposal}
              >
                <span>
                  {handleCheckProposalName(ProposalState.stateProposal)}
                </span>
                <span>{ProposalState.proposalVote}</span>
              </S.ProposalStateList>
            ))}
          </S.Status>
          <S.ProposalOverviewGraphic>
            <PieChart
              proposalData={stateProposalsList}
              proposalTotal={proposalTotal}
            />
          </S.ProposalOverviewGraphic>
        </>
      )}
    </S.ProposalOverview>
  )
}

export default ProposalOverview
