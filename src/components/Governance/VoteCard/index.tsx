import React from 'react'
import BigNumber from 'bn.js'
import Button from '../../Button'
import ExternalLink from '../../ExternalLink'

import { checkVoteButton } from '../../../utils/checkVoteButton'
import { IUserVotedProps } from '../../../templates/Gov/Proposals/Proposal'

import ModalWalletConnect from '../../Modals/ModalWalletConnect'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

import * as S from './styles'

interface IVoteCardProps {
  yourVotingPowerInProposal: BigNumber;
  typeVote: string;
  percentage: string;
  totalVotingPower: string;
  proposalState: string;
  userVote: IUserVotedProps;
  handleVote: (voteType: string) => void;
  onClickLink: React.MouseEventHandler;
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

  const [isModalWalletConnect, setIsModalWalletConnect] =
    React.useState<boolean>(false)

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
            disabled={
              userVote.userWalletAddress === '' ||
              yourVotingPowerInProposal.gt(new BigNumber(0))
            }
          >
            <S.VoteButtonContainer>
              <Button
                text={getTextButton(typeVote)}
                backgroundVote={{
                  voteState: checkVoteButton(userVote, proposalState, typeVote),
                  type: typeVote
                }}
                onClick={() => {
                  if (userVote.userWalletAddress === '') {
                    setIsModalWalletConnect(true)
                    return
                  }

                  handleVote(typeVote)
                }}
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
      {isModalWalletConnect && (
        <ModalWalletConnect setModalOpen={setIsModalWalletConnect} />
      )}
    </>
  )
}
export default VoteCard
