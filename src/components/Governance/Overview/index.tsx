import React from 'react'
import Image from 'next/image'
import BigNumber from 'bn.js'
import useSWR from 'swr'
import { request } from 'graphql-request'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

import { SUBGRAPH_URL } from '../../../constants/tokenAddresses'

import { BNtoDecimal } from '../../../utils/numerals'

import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { setModalWalletActive } from '../../../store/reducers/modalWalletActive'

import Button from '../../../components/Button'

import tooltip from '../../../../public/assets/utilities/tooltip.svg'

import { GET_GOVERNANCES } from './graphql'

import * as S from './styles'

interface IGovernancesProps {
  totalVotingPower: BigNumber
  votingAddresses: number
}

export const Overview = () => {
  // eslint-disable-next-line prettier/prettier
  const [yourVotingPower, setYourVotingPower] = React.useState(new BigNumber(0))
  const [governances, setGovernances] = React.useState<IGovernancesProps>({
    totalVotingPower: new BigNumber(0),
    votingAddresses: 0
  })

  const userWalletAddress = useAppSelector(state => state.userWalletAddress)
  const dispatch = useAppDispatch()

  const { data } = useSWR(
    [GET_GOVERNANCES, userWalletAddress],
    (query, userWalletAddress) =>
      request(SUBGRAPH_URL, query, { id: userWalletAddress })
  )

  React.useEffect(() => {
    if (data) {
      data.governances[0] && setGovernances(data.governances[0])

      setYourVotingPower(data.user ? data.user.votingPower : new BigNumber(0))
    }
  }, [data])

  return (
    <>
      <S.Overview>
        <S.VotginCards>
          <S.VotingDataCard>
            <S.TextVoting>
              YOUR VOTING POWER
              <Tippy content="Voting power allows you to create and vote on proposals. To obtain voting power you need to stake your $KACY tokens.">
                <S.Tooltip>
                  <Image
                    src={tooltip}
                    alt="Explanation"
                    width={14}
                    height={14}
                  />
                </S.Tooltip>
              </Tippy>
            </S.TextVoting>
            {userWalletAddress ? (
              <S.ValueVoting>
                {BNtoDecimal(yourVotingPower, 0, 2)}
              </S.ValueVoting>
            ) : (
              <Button
                onClick={() => dispatch(setModalWalletActive(true))}
                size="large"
                text="Connect Wallet"
                backgroundSecondary
              />
            )}
          </S.VotingDataCard>
          <S.VotingDataCard>
            <S.TextVoting>
              TOTAL VOTING POWER
              <Tippy content="This is the total voting power across all participants of the Kassandra Decentralized Autonomous Organization in this blockchain.">
                <S.Tooltip>
                  <Image
                    src={tooltip}
                    alt="Explanation"
                    width={14}
                    height={14}
                  />
                </S.Tooltip>
              </Tippy>
            </S.TextVoting>
            <S.ValueVoting>
              {BNtoDecimal(governances.totalVotingPower, 0, 2)}
            </S.ValueVoting>
          </S.VotingDataCard>
          <S.VotingDataCard>
            <S.TextVoting>
              VOTING ADDRESSES
              <Tippy content="Voting power allows you to create and vote on proposals. To obtain voting power you need to stake your $KACY tokens.">
                <S.Tooltip>
                  <Image
                    src={tooltip}
                    alt="Explanation"
                    width={14}
                    height={14}
                  />
                </S.Tooltip>
              </Tippy>
            </S.TextVoting>
            <S.ValueVoting>{governances.votingAddresses}</S.ValueVoting>
          </S.VotingDataCard>
        </S.VotginCards>
      </S.Overview>
    </>
  )
}

export default Overview
