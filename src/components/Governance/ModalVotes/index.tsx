import React from 'react'
import router from 'next/router'
import useSWR from 'swr'
import BigNumber from 'bn.js'
import { request } from 'graphql-request'

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
  voteType: string;
  percentage: string;
  totalVotingPower: string;
  checkAllVoterModal: boolean;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userVote: IUserVotedProps;
  proposalState: string;
  handleVote: (voteType: string) => void;
}

interface IModalVotesList {
  support: boolean;
  voter: {
    id: string
  };
  votingPower: BigNumber;
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
  // eslint-disable-next-line prettier/prettier
  const [modalVotesList, setModalVotesList] = React.useState<IModalVotesList[]>([])
  const [showShadow, setShowShadow] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  const handleApplyShadowList = () => {
    const lastItemList = document
      .getElementsByClassName('last-item')[0]
      .getBoundingClientRect().top

    const tBodyHeight = Array.from(
      // eslint-disable-next-line prettier/prettier
      document.getElementsByClassName('tbody-list') as HTMLCollectionOf<HTMLElement>,
    );
    const tableBodyHeight = tBodyHeight[0].offsetHeight

    const tableBodyTopPosition = document
      .getElementsByClassName('tbody-list')[0]
      .getBoundingClientRect().top

    if (tableBodyHeight > lastItemList - tableBodyTopPosition) {
      setShowShadow(false)
    } else {
      setShowShadow(true)
    }
  }

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

  const { data } = useSWR([GET_MODALVOTES, checkAllVoterModal],
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

      votes.length > 6 ? setShowShadow(true) : setShowShadow(false)
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
            <img src="/assets/utilities/close-icon.svg" alt="Close Modal Votes" />{' '}
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
            <S.ProgressBar VotingState={voteType} value={percentage} max="100" />
          </S.VoteBar>
        </S.ModalHeader>
        <S.TableContainer showShadow={showShadow}>
          <S.Thead>
            <S.Tr>
              <S.Th>{modalVotesList.length} addresses</S.Th>
              <S.Th>Votes</S.Th>
            </S.Tr>
          </S.Thead>
          {isLoading ? (
            <S.LoadingContainer>
              <Loading marginTop={0}/>
            </S.LoadingContainer>
          ) : modalVotesList.length > 0 ? (
            <S.Tbody
              onScroll={() => handleApplyShadowList()}
              className="tbody-list"
            >
              {modalVotesList.map((user, index) => {
                const lastItem = index === modalVotesList.length - 1

                return (
                  <S.UserData
                    key={index + user.voter.id}
                    className={lastItem ? `last-item` : ``}
                  >
                    <S.UserName>
                      <ImageProfile
                        address={user.voter.id}
                        diameter={18}
                        hasAddress={true}
                        isLink={true}
                        tab="?tab=governance-data"
                      />
                    </S.UserName>
                    <S.UserVote>{BNtoDecimal(user.votingPower, 0, 2)}</S.UserVote>
                  </S.UserData>
                )
              })}
            </S.Tbody>
          ) : (
            <S.textContainer>
              <p>nobody voted on this proposal yet</p>
            </S.textContainer>
          )}
        </S.TableContainer>
        <S.ButtonWrapper>
          <Button
            text={getTextButton(voteType)}
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
