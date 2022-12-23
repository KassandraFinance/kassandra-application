import React from 'react'
import Image from 'next/image'

import Button from '../../../components/Button'
import ExternalLink from '../../../components/ExternalLink'
import ModalWaitingList from '../../../components/Modals/ModalWaitingList'

import kacyLogoShadow from '../../../../public/assets/images/kacy-logo-shadow.png'

import * as S from './styles'

const GetStarted = () => {
  const [isModalWaitingList, setIsModalWaitingList] =
    React.useState<boolean>(false)

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

        <S.VotingPowerContainer>
          <S.VotingPowerWrapper>
            YOUR VOTING POWER <span>1000</span>
          </S.VotingPowerWrapper>

          <ExternalLink
            text="Obtain more Voting Power"
            hrefNext="/farm?tab=stake"
          />
        </S.VotingPowerContainer>

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
