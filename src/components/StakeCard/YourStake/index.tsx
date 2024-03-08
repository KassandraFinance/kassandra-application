import React from 'react'
import Link from 'next/link'
import Big from 'big.js'
import { useConnectWallet } from '@web3-onboard/react'

import { getDate } from '@/utils/date'
import { BNtoDecimal } from '@/utils/numerals'
import substr from '@/utils/substr'

import * as S from './styles'
import { LoadingAnimation } from '../styles'

interface IPoolInfoProps {
  votingMultiplier: string
  startDate: string
  endDate: string
  kacyRewards: Big
  withdrawDelay: number
  totalStaked: Big
  hasExpired: boolean
  apr: Big
  stakingToken: string
  vestingPeriod: string
  lockPeriod: string
}

interface IUserAboutPoolProps {
  currentAvailableWithdraw: Big
  lockPeriod: number
  delegateTo: string
  yourStake: Big
  withdrawable: boolean
  unstake: boolean
}

interface IYourStakeProps {
  stakeWithVotingPower: boolean
  poolPrice: Big
  kacyPrice: Big
  stakeWithLockPeriod: boolean
  userAboutPool: IUserAboutPoolProps
  poolInfo: IPoolInfoProps
}

const YourStake = ({
  stakeWithVotingPower,
  stakeWithLockPeriod,
  poolPrice,
  kacyPrice,
  poolInfo,
  userAboutPool
}: IYourStakeProps) => {
  const [{ wallet }] = useConnectWallet()

  const addressZero = '0x0000000000000000000000000000000000000000'
  const yourDailyKacyReward = poolInfo.kacyRewards
    .mul(userAboutPool?.yourStake ?? Big(0))
    .div(poolInfo?.totalStaked.eq(0) ? 1 : poolInfo?.totalStaked)

  return wallet?.accounts[0].address ? (
    <>
      <S.Info>
        <p>Your stake</p>
        <S.Stake>
          {userAboutPool.yourStake.lt(0) || poolPrice.lt(0) ? (
            <LoadingAnimation className="animationYourStake" width={10} />
          ) : stakeWithVotingPower ? (
            <p>
              {BNtoDecimal(userAboutPool.yourStake.div(Big(10).pow(18)), 18)}
              <S.Symbol>KACY</S.Symbol>
            </p>
          ) : (
            <p>
              {BNtoDecimal(
                userAboutPool.yourStake.mul(poolPrice).div(Big(10).pow(18)),
                2,
                2,
                2
              )}
              <S.Symbol>USD</S.Symbol>
            </p>
          )}
          {stakeWithVotingPower &&
            userAboutPool.yourStake.gt(0) &&
            kacyPrice.gt(0) && (
              <span>
                &#8776;{' '}
                {BNtoDecimal(
                  userAboutPool.yourStake.mul(kacyPrice).div(Big(10).pow(18)),
                  6,
                  2,
                  2
                )}{' '}
                USD
              </span>
            )}
        </S.Stake>
      </S.Info>
      {stakeWithVotingPower && (
        <>
          <S.Info>
            <span>Pool Voting Power</span>
            <span>
              {userAboutPool.yourStake.lt(Big(0)) ? (
                <LoadingAnimation className="animationYourStake" width={6} />
              ) : (
                BNtoDecimal(
                  Big(poolInfo?.votingMultiplier ?? 0)
                    .mul(userAboutPool.yourStake)
                    .div(Big(10).pow(18)),
                  18,
                  2
                )
              )}
            </span>
          </S.Info>
          <S.Info>
            <span>Delegated To</span>
            {userAboutPool.delegateTo == '' ? (
              <LoadingAnimation width={6} />
            ) : userAboutPool.delegateTo.toLowerCase() ===
                wallet?.accounts[0].address ||
              userAboutPool.delegateTo === addressZero ? (
              <span>Self</span>
            ) : (
              <Link
                href={`/profile/${userAboutPool.delegateTo}?tab=governance-data`}
              >
                {substr(userAboutPool.delegateTo)}
              </Link>
            )}
          </S.Info>
        </>
      )}
      <S.Info>
        <span>Your daily KACY reward</span>
        <span>
          {poolInfo.kacyRewards.lt(Big(0)) ? (
            <LoadingAnimation className="animationYourStake" width={6} />
          ) : poolInfo.hasExpired ? (
            '0/day'
          ) : (
            BNtoDecimal(yourDailyKacyReward.div(Big(10).pow(18)), 18, 2) +
            '/day'
          )}
        </span>
      </S.Info>

      {stakeWithLockPeriod && (
        <>
          <S.Info>
            <span>Lock period</span>
            {poolInfo.lockPeriod ? (
              <span>
                {parseInt(poolInfo.lockPeriod) / 60 / 60 / 24 / 30} months
              </span>
            ) : (
              <LoadingAnimation width={6} />
            )}
          </S.Info>
          <S.Info>
            <span>Vesting period</span>
            {poolInfo.vestingPeriod ? (
              <span>
                {parseInt(poolInfo.vestingPeriod) / 60 / 60 / 24 / 30} months
              </span>
            ) : (
              <LoadingAnimation width={6} />
            )}
          </S.Info>
          <S.Info>
            <span>Locked until</span>
            {userAboutPool.lockPeriod ? (
              <span>{getDate(userAboutPool.lockPeriod)}</span>
            ) : (
              <LoadingAnimation width={6} />
            )}
          </S.Info>
          <S.Info>
            <span>Available for withdraw</span>
            {userAboutPool.currentAvailableWithdraw.gt(-1) ? (
              <span>
                {BNtoDecimal(
                  userAboutPool.currentAvailableWithdraw.div(Big(10).pow(18)),
                  18
                )}
                KACY
              </span>
            ) : (
              <LoadingAnimation width={6} />
            )}
          </S.Info>
        </>
      )}
    </>
  ) : null
}

export default YourStake
