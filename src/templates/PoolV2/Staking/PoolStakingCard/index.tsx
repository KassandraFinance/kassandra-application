import React from 'react'

import Button from '@/components/Button'
import TokenWithNetworkImage from '@/components/TokenWithNetworkImage'

import * as S from './styles'

const PoolStakingCard = () => {
  return (
    <S.PoolStakingCard>
      <S.StakingCardHeaderWrapper>
        <TokenWithNetworkImage
          tokenImage={{
            url: '/assets/logos/ahype.svg',
            height: 38,
            width: 38,
            withoutBorder: false
          }}
          networkImage={{
            url: '/assets/logos/avalanche.svg',
            height: 18,
            width: 18
          }}
          blockies={{
            size: 8,
            scale: 9,
            seedName: 'pool'
          }}
        />

        <S.AprWrapper>
          <span>APR</span>
          <p>100%</p>
        </S.AprWrapper>
      </S.StakingCardHeaderWrapper>

      <S.StakingCardBodyWrapper>
        <S.StakingUserDataListCard>
          <S.StakingUserData>
            <p>YOUR BALANCE</p>
            <span>
              150 <strong>USD</strong>
            </span>
          </S.StakingUserData>
          <S.StakingUserData>
            <p>STAKED</p>
            <span>
              150 <strong>USD</strong>
            </span>
          </S.StakingUserData>
        </S.StakingUserDataListCard>
        <S.StakingUserDataListCard>
          <S.StakingUserData>
            <p>KACY Reward</p>
            <span>150</span>
          </S.StakingUserData>
          <S.StakingUserData>
            <p />
            <span>
              $250 <strong>USD</strong>
            </span>
          </S.StakingUserData>
        </S.StakingUserDataListCard>

        <Button background="secondary" text="Claim" />

        <S.Line />

        <S.ButtonsWrapper>
          <Button background="transparent" text="Unstake" fullWidth />
          <Button background="secondary" text="stake" fullWidth />
        </S.ButtonsWrapper>
      </S.StakingCardBodyWrapper>
    </S.PoolStakingCard>
  )
}

export default PoolStakingCard
