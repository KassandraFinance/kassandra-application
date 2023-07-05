import React from 'react'

import Big from 'big.js'

import { networks } from '@/constants/tokenAddresses'

// import useStaking from '@/hooks/useStaking'
import useMatomoEcommerce from '@/hooks/useMatomoEcommerce'

import { BNtoDecimal } from '@/utils/numerals'
import { registerToken } from '@/utils/registerToken'

import ExternalLink from '../../ExternalLink'

import * as S from './styles'

// interface IInfoStakeStaticProps {
//   votingMultiplier: string
//   startDate: string
//   endDate: string
//   kacyRewards: Big
//   withdrawDelay: any
// }

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
interface IDetailsProps {
  // pid: number
  hasExpired: boolean
  // infoStakeStatic: IInfoStakeStaticProps
  stakingToken: string
  decimals: string
  symbol: string
  poolPrice: Big
  kacyPrice: Big
  link: string
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  // stakingAddress: string
  chainId: number
  poolInfo: IPoolInfoProps
}

const Details = ({
  // pid,
  hasExpired,
  // infoStakeStatic,
  stakingToken,
  decimals,
  symbol,
  poolPrice,
  kacyPrice,
  link,
  setIsOpenModal,
  // stakingAddress,
  chainId,
  poolInfo
}: IDetailsProps) => {
  const { trackEventFunction } = useMatomoEcommerce()
  const connect = localStorage.getItem('walletconnect')

  return (
    <S.Details>
      <S.ValuesKacy>
        <span>Total staked</span>
        <S.KacyUSD>
          <span>
            {poolInfo.totalStaked.lt(Big(0))
              ? '...'
              : BNtoDecimal(poolInfo.totalStaked.div(Big(10).pow(18)), 18)}{' '}
            {symbol}
          </span>
          <span className="usd">
            &#8776;{' '}
            {poolInfo.totalStaked.lt(Big(0)) || poolPrice.lt(0)
              ? '...'
              : BNtoDecimal(
                  Big(`0${poolInfo.totalStaked}`)
                    .mul(poolPrice)
                    .div(Big(10).pow(18)),
                  6,
                  2,
                  2
                )}{' '}
            USD
          </span>
        </S.KacyUSD>
      </S.ValuesKacy>
      <S.ValuesKacy>
        <span>Pool Reward</span>
        <S.KacyUSD>
          <span>
            {poolInfo.kacyRewards.lt(Big(0))
              ? '...'
              : hasExpired
              ? '0'
              : BNtoDecimal(
                  poolInfo.kacyRewards.div(Big(10).pow(18)),
                  18,
                  2,
                  2
                )}
            /day
          </span>
          <span className="usd">
            &#8776;{' '}
            {poolInfo.kacyRewards.lt(Big(0)) || poolPrice.lt(0)
              ? '...'
              : hasExpired
              ? '0'
              : BNtoDecimal(
                  poolInfo.kacyRewards.mul(kacyPrice).div(Big(10).pow(18)),
                  6,
                  2,
                  2
                )}{' '}
            USD
          </span>
        </S.KacyUSD>
      </S.ValuesKacy>
      <S.Info>
        <span>Start date</span>
        <span>{poolInfo.startDate}</span>
      </S.Info>
      <S.Info>
        <span>Rewards Update</span>
        <span>{poolInfo.endDate}</span>
      </S.Info>
      <S.Info>
        <ExternalLink
          hrefLink={`${networks[chainId].blockExplorer}/address/${stakingToken}`}
          text="See contract"
        />
        {symbol === 'KACY' ? (
          connect ? (
            <ExternalLink
              hrefLink="https://app.pangolin.exchange/#/swap?outputCurrency=0xf32398dae246C5f672B52A54e9B413dFFcAe1A44"
              text={`Buy ${symbol}`}
            />
          ) : (
            <S.AddToken onClick={() => setIsOpenModal(true)}>
              Buy {symbol}
            </S.AddToken>
          )
        ) : (
          <ExternalLink hrefLink={link} text={`Get ${symbol}`} />
        )}
      </S.Info>
      <S.AddToken
        type="button"
        onClick={() => {
          registerToken(
            stakingToken,
            symbol.toLocaleUpperCase(),
            Number(decimals)
          )
          trackEventFunction(
            'click-add-metamask',
            `add-${symbol}`,
            'stake-details'
          )
        }}
      >
        Add to Metamask <img src="/assets/logos/metamask.svg" alt="" />
      </S.AddToken>
    </S.Details>
  )
}

export default Details
