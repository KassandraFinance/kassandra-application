/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Image from 'next/image'
import useSWR from 'swr'
import request from 'graphql-request'
import Big from 'big.js'

import { useAppSelector } from '../../../store/hooks'

import { GET_PROFILE } from './graphql'
import { SUBGRAPH_URL } from '../../../constants/tokenAddresses'

import { BNtoDecimal } from '../../../utils/numerals'

import Button from '../../../components/Button'
import ExternalLink from '../../../components/ExternalLink'
import ModalWaitingList from '../../../components/Modals/ModalWaitingList'
import CreatePool from '../CreatePool'

import kacyLogoShadow from '../../../../public/assets/images/kacy-logo-shadow.png'

import * as S from './styles'

type UserResponse = {
  user: {
    votingPower: string
  }
}

const GetStarted = () => {
  const [isModalWaitingList, setIsModalWaitingList] =
    React.useState<boolean>(false)
  const [isCreatePool, setIsCreatePool] = React.useState(false)
  const userWalletAddress = useAppSelector(state => state.userWalletAddress)

  const { data } = useSWR<UserResponse>([GET_PROFILE], query =>
    request(SUBGRAPH_URL, query, {
      userVP: userWalletAddress
    })
  )

  return (
    <S.GetStarted>
      <Image src={kacyLogoShadow} />

      <S.Content>
        <S.Title>Ready to create your first pool?</S.Title>

        <S.Text>
          It looks like you don't have any pools to manage. Click on the button
          below to combine tokens to create your first pool to start the journey
          as a manager.
        </S.Text>

        <S.Help>
          To be able to create a fund you need to have at least 10k Voting
          Power.
        </S.Help>

        {data?.user && (
          <S.VotingPowerContainer>
            <S.VotingPowerWrapper>
              YOUR VOTING POWER{' '}
              <span>{BNtoDecimal(Big(data.user.votingPower), 2)}</span>
            </S.VotingPowerWrapper>

            <ExternalLink
              text="Obtain more Voting Power"
              hrefNext="/farm?tab=stake"
            />
          </S.VotingPowerContainer>
        )}

        <Button
          text="Create New Pool"
          backgroundSecondary
          fullWidth
          // onClick={() => setIsModalWaitingList(true)}
          onClick={() => setIsCreatePool(true)}
        />
      </S.Content>

      {/* {isModalWaitingList && (
        <ModalWaitingList setIsModalWaitingList={setIsModalWaitingList} />
      )} */}
      {isCreatePool && <CreatePool setIsCreatePool={setIsCreatePool} />}
    </S.GetStarted>
  )
}

export default GetStarted
