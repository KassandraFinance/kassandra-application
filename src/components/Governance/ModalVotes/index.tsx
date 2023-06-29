import React from 'react'
import router from 'next/router'
import useSWR from 'swr'
import { request } from 'graphql-request'
import Big from 'big.js'
// import { useInView } from 'react-intersection-observer'

import { SUBGRAPH_URL } from '../../../constants/tokenAddresses'

import { BNtoDecimal } from '../../../utils/numerals'
import { checkVoteButton } from '../../../utils/checkVoteButton'

import { IUserVotedProps } from '../../../templates/Gov/Proposals/Proposal'

import { GET_MODALVOTES } from './graphql'

import Button from '../../Button'
import ImageProfile from '../ImageProfile'
import Loading from '../../Loading'

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

  // const { ref, inView } = useInView({
  //   threshold: 0.1
  // })

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

  const { data } = useSWR(
    [GET_MODALVOTES, checkAllVoterModal],
    (query, checkAllVoterModal) =>
      request(SUBGRAPH_URL, query, {
        number: Number(router.query.proposal),
        support: checkAllVoterModal
      })
  )

  React.useEffect(() => {
    setIsLoading(true)

    if (data) {
      const votes = data.proposals[0]?.votes?.map((prop: IModalVotesList) => {
        return {
          support: prop.support,
          voter: {
            id: prop.voter?.id
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
                    <S.UserData
                      key={index + user.voter.id}
                      // ref={
                      //   index === modalVotesList.length - 1 &&
                      //   modalVotesList.length !== 0
                      //     ? ref
                      //     : null
                      // }
                    >
                      <S.UserName>
                        <ImageProfile
                          address={user.voter.id}
                          diameter={27}
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
                {/* <S.shadow inView={inView} /> */}
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
