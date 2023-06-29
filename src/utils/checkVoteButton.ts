import Big from 'big.js'
import { IUserVotedProps } from '../templates/Gov/Proposals/Proposal'

export const checkVoteButton = (
  userVote: IUserVotedProps,
  proposalState: string,
  typeVote: string
): 'against' | 'favor' | 'vote-open' | 'disable' => {
  const { voted, userWalletAddress, yourVotingPowerInProposal } = userVote
  if (voted) {
    if (!userVote.support && typeVote === 'Against') return 'against'
    if (userVote.support && typeVote === 'For') return 'favor'
  } else if (
    (proposalState === 'Active' &&
      userWalletAddress &&
      yourVotingPowerInProposal.gt(Big(0))) ||
    (!userWalletAddress && proposalState === 'Active')
  ) {
    return 'vote-open'
  }
  return 'disable'
}
