import React from 'react'
import router from 'next/router'
import Big from 'big.js'

import { useVotes } from '@/hooks/query/useVotes'

import { BNtoDecimal } from '@/utils/numerals'
import { checkVoteButton } from '@/utils/checkVoteButton'

import { IUserVotedProps } from '@/templates/Gov/Proposals/Proposal'

import Button from '../../Button'
import Loading from '../../Loading'
import ImageProfile from '../ImageProfile'

import * as S from './styles'

interface IModalVotes {
  voteType: string
  percentage: string
  totalVotingPower: string
  checkAllVoterModal: boolean
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  userVote: IUserVotedProps
  proposalState: string
  handleVote: (voteType: string) => void
}

interface IModalVotesList {
  support: boolean
  voter: {
    id: string
    nickname?: string | null
    is_nft?: boolean | null
    image?: string | null
  }
  votingPower: string
}

const ModalVotes = ({
  isModalOpen,
  setIsModalOpen,
  voteType,
  percentage,
  totalVotingPower,
  checkAllVoterModal,
  proposalState,
  userVote,
  handleVote
}: IModalVotes) => {
  const [modalVotesList, setModalVotesList] = React.useState<IModalVotesList[]>(
    []
  )
  const [isLoading, setIsLoading] = React.useState(true)

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

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  const { data } = useVotes({
    number: Number(router.query.proposal),
    support: checkAllVoterModal
  })

  React.useEffect(() => {
    setIsLoading(true)

    if (data) {
      const votes = data.proposals[0]?.votes?.map((prop: IModalVotesList) => {
        return {
          support: prop.support,
          voter: {
            id: prop.voter?.id,
            nickname: prop.voter.nickname,
            is_nft: prop.voter.is_nft,
            image: prop.voter.image
          },
          votingPower: prop.votingPower
        }
      })

      setModalVotesList(votes)
      setIsLoading(false)
    }
  }, [data])

  return (
    <>
      <S.Backdrop onClick={handleCloseModal} />

      <S.Container modalOpen={isModalOpen}>
        <S.Close>
          <button type="button" onClick={() => handleCloseModal()}>
            <img
              src="/assets/utilities/close-icon.svg"
              alt="Close Modal Votes"
            />{' '}
          </button>
        </S.Close>
        <S.ModalHeader>
          <S.TotalPercentageAndVotes>
            <S.TotalPercentage>
              {voteType} - {percentage}%
            </S.TotalPercentage>
            <S.TotalVotes>{totalVotingPower}</S.TotalVotes>
          </S.TotalPercentageAndVotes>
          <S.VoteBar>
            <S.ProgressBar
              VotingState={voteType}
              value={percentage}
              max="100"
            />
          </S.VoteBar>
        </S.ModalHeader>
        <S.TableContainer>
          <S.Thead>
            <S.Tr>
              <S.Th>{modalVotesList.length} addresses</S.Th>
              <S.Th>Votes</S.Th>
            </S.Tr>
          </S.Thead>
          {isLoading ? (
            <S.LoadingContainer>
              <Loading marginTop={0} />
            </S.LoadingContainer>
          ) : modalVotesList.length > 0 ? (
            <>
              <S.Tbody>
                {modalVotesList.map((user, index) => {
                  return (
                    <S.UserData key={index + user.voter.id}>
                      <S.UserName>
                        <ImageProfile
                          address={user.voter.id}
                          diameter={27}
                          isNFT={!!user.voter.is_nft}
                          image={user.voter.image}
                          nickname={user.voter.nickname}
                          hasAddress={true}
                          isLink={true}
                          tab="?tab=governance-data"
                        />
                      </S.UserName>
                      <S.UserVote>
                        {BNtoDecimal(Big(user.votingPower), 0, 2)}
                      </S.UserVote>
                    </S.UserData>
                  )
                })}
              </S.Tbody>
            </>
          ) : (
            <S.textContainer>
              <p>nobody voted on this proposal yet</p>
            </S.textContainer>
          )}
        </S.TableContainer>
        <S.ButtonWrapper>
          <Button
            text={getTextButton(voteType)}
            fullWidth
            backgroundVote={{
              voteState: checkVoteButton(userVote, proposalState, voteType),
              type: voteType
            }}
            onClick={() => handleVote(voteType)}
          />
        </S.ButtonWrapper>
      </S.Container>
    </>
  )
}

export default ModalVotes
