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
        <S.Title>
          Want to simply manage pools of digital assets in one place?
        </S.Title>

        <S.Text>
          Get ready to become a digital asset manager using the kassandra
          platform. Easily manage your pools, view investors, earn rewards and
          more in one place.
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
          text="Sign me up for the launch"
          backgroundSecondary
          fullWidth
          onClick={() => setIsModalWaitingList(true)}
        />
      </S.Content>

      {isModalWaitingList && (
        <ModalWaitingList setIsModalWaitingList={setIsModalWaitingList} />
      )}
    </S.GetStarted>
  )
}

export default GetStarted
