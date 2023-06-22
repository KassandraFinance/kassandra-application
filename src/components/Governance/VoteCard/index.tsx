import React from 'react'
import BigNumber from 'bn.js'
import 'tippy.js/dist/tippy.css'
import Tippy from '@tippyjs/react'
import { useConnectWallet } from '@web3-onboard/react'

import { checkVoteButton } from '@/utils/checkVoteButton'
import { IUserVotedProps } from '@/templates/Gov/Proposals/Proposal'

import Button from '@/components/Button'
import ExternalLink from '@/components/ExternalLink'

import * as S from './styles'

interface IVoteCardProps {
  yourVotingPowerInProposal: BigNumber
  typeVote: string
  percentage: string
  totalVotingPower: string
  proposalState: string
  userVote: IUserVotedProps
  handleVote: (voteType: string) => void
  onClickLink: React.MouseEventHandler
}

const VoteCard = ({
  yourVotingPowerInProposal,
  typeVote,
  percentage,
  totalVotingPower,
  proposalState,
  userVote,
  onClickLink,
  handleVote
}: IVoteCardProps) => {
  userVote.yourVotingPowerInProposal = yourVotingPowerInProposal

  const [{ wallet }, connect] = useConnectWallet()

  function getTextButton(typeVote: string) {
    if (typeVote === 'For') {
      if (userVote.voted && userVote.support) return 'Voted in Favor'
      return 'Vote in Favor'
    }
    if (typeVote !== 'For') {
      if (userVote.voted && !userVote.support) return 'Voted Against'
      return 'Vote Against'
    }
  }
  return (
    <>
      <S.Container>
        <S.TextWrapper>
          <S.TotalPercentage>
            {typeVote} - {percentage}%
          </S.TotalPercentage>
          <S.TotalVotes>{totalVotingPower}</S.TotalVotes>
        </S.TextWrapper>
        <S.VoteBar>
          <S.ProgressBar VotingState={typeVote} value={percentage} max="100" />
        </S.VoteBar>
        <S.ActionWrapper>
          <Tippy
            content="You had no voting power at the time the proposal was created"
            disabled={!wallet || yourVotingPowerInProposal.gt(new BigNumber(0))}
          >
            <S.VoteButtonContainer>
              <Button
                text={getTextButton(typeVote)}
                backgroundVote={{
                  voteState: checkVoteButton(userVote, proposalState, typeVote),
                  type: typeVote
                }}
                onClick={() => {
                  if (!wallet) connect()
                  handleVote(typeVote)
                }}
                disabledNoEvent={!wallet}
              />
            </S.VoteButtonContainer>
          </Tippy>
          <ExternalLink
            text="Check all voters"
            hrefNext="#"
            onClick={onClickLink}
          />
        </S.ActionWrapper>
      </S.Container>
    </>
  )
}
export default VoteCard
