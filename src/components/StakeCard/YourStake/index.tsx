import React from 'react'
import Link from 'next/link'
import Big from 'big.js'
import { useConnectWallet } from '@web3-onboard/react'

import { getDate } from '@/utils/date'
import { BNtoDecimal } from '@/utils/numerals'
import substr from '@/utils/substr'

import * as S from './styles'

interface IPoolInfoProps {
  votingMultiplier: string
  startDate: string
  endDate: string
  kacyRewards: Big
  withdrawDelay: any
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
  lockPeriod: number
  availableWithdraw: Big
  userAboutPool: IUserAboutPoolProps
  poolInfo: IPoolInfoProps
}

const YourStake = ({
  stakeWithVotingPower,
  stakeWithLockPeriod,
  poolPrice,
  kacyPrice,
  lockPeriod,
  poolInfo,
  userAboutPool,
  availableWithdraw
}: IYourStakeProps) => {
  const [{ wallet }] = useConnectWallet()

  const yourDailyKacyReward = poolInfo.kacyRewards
    .mul(userAboutPool?.yourStake ?? Big(0))
    .div(poolInfo?.totalStaked ?? Big(0))

  return wallet?.accounts[0].address ? (
    <>
      <S.Info>
        <p>Your stake</p>
        <S.Stake>
          {userAboutPool.yourStake.lt(Big(0)) || (poolPrice || Big(0)).lt(0) ? (
            '...'
          ) : stakeWithVotingPower ? (
            <p>
              {BNtoDecimal(userAboutPool.yourStake.div(Big(10).pow(18)), 18)}
              <S.Symbol>KACY</S.Symbol>
            </p>
          ) : (
            <p>
              {BNtoDecimal(
                Big(userAboutPool.yourStake.toString())
                  .mul(poolPrice)
                  .div(Big(10).pow(18)),
                2,
                2,
                2
              )}
              <S.Symbol>USD</S.Symbol>
            </p>
          )}
          {stakeWithVotingPower && (
            <span>
              &#8776;{' '}
              {userAboutPool.yourStake.lt(Big(0)) || kacyPrice.lt(0)
                ? '...'
                : BNtoDecimal(
                    Big(userAboutPool.yourStake.toString())
                      .mul(kacyPrice)
                      .div(Big(10).pow(18)),
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
              {userAboutPool.yourStake.lt(Big(0))
                ? '...'
                : BNtoDecimal(
                    Big(
                      userAboutPool.withdrawable || userAboutPool.unstake
                        ? 1
                        : poolInfo.votingMultiplier
                    )
                      .mul(userAboutPool.yourStake)
                      .div(Big(10).pow(18)),
                    18,
                    2
                  )}
            </span>
          </S.Info>
          <S.Info>
            <span>Delegated To</span>
            {userAboutPool.delegateTo.toLocaleLowerCase() ===
              wallet?.accounts[0].address ||
            userAboutPool.delegateTo ===
              '0x0000000000000000000000000000000000000000' ? (
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
          {yourDailyKacyReward.lt(Big(0))
            ? '...'
            : poolInfo.hasExpired
            ? '0'
            : BNtoDecimal(yourDailyKacyReward.div(Big(10).pow(18)), 18, 2)}
          /day
        </span>
      </S.Info>
      {stakeWithLockPeriod && (
        <>
          <S.Info>
            <span>Lock period</span>
            <span>
              {parseInt(poolInfo.lockPeriod) / 60 / 60 / 24 / 30} months
            </span>
          </S.Info>
          <S.Info>
            <span>Vesting period</span>
            <span>
              {parseInt(poolInfo.vestingPeriod) / 60 / 60 / 24 / 30} months
            </span>
          </S.Info>
          <S.Info>
            <span>Locked until</span>
            <span>{getDate(lockPeriod)}</span>
          </S.Info>
          <S.Info>
            <span>Available for withdraw</span>
            <span>
              {availableWithdraw.gt(-1)
                ? BNtoDecimal(availableWithdraw.div(Big(10).pow(18)), 18)
                : '...'}{' '}
              KACY
            </span>
          </S.Info>
        </>
      )}
    </>
  ) : null
}

export default YourStake
