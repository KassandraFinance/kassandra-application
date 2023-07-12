import React from 'react'

import Big from 'big.js'

import { networks } from '@/constants/tokenAddresses'

import useMatomoEcommerce from '@/hooks/useMatomoEcommerce'

import { BNtoDecimal } from '@/utils/numerals'
import { registerToken } from '@/utils/registerToken'

import ExternalLink from '../../ExternalLink'

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
  tokenDecimals: string
}
interface IDetailsProps {
  symbol: string
  poolPrice: Big
  kacyPrice: Big
  link: string
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  chainId: number
  poolInfo: IPoolInfoProps
}

const Details = ({
  symbol,
  poolPrice,
  kacyPrice,
  link,
  setIsOpenModal,
  chainId,
  poolInfo
}: IDetailsProps) => {
  const { trackEventFunction } = useMatomoEcommerce()

  function handleRegisterToken() {
    registerToken(
      poolInfo.stakingToken,
      symbol.toLocaleUpperCase(),
      Number(poolInfo.tokenDecimals)
    )
    trackEventFunction('click-add-metamask', `add-${symbol}`, 'stake-details')
  }

  return (
    <S.Details>
      <S.ValuesKacy>
        <span>Total staked</span>
        <S.KacyUSD>
          {poolInfo.totalStaked.lt(0) ? (
            <LoadingAnimation width={7} />
          ) : (
            <span>
              {BNtoDecimal(poolInfo.totalStaked.div(Big(10).pow(18)), 18)}
              {symbol}
            </span>
          )}
          {poolInfo.totalStaked.lt(0) || poolPrice.lt(0) ? (
            <LoadingAnimation width={7} className="usd" />
          ) : (
            <span className="usd">
              &#8776;{' '}
              {BNtoDecimal(
                Big(`0${poolInfo.totalStaked}`)
                  .mul(poolPrice)
                  .div(Big(10).pow(18)),
                6,
                2,
                2
              )}{' '}
              USD
            </span>
          )}
        </S.KacyUSD>
      </S.ValuesKacy>
      <S.ValuesKacy>
        <span>Pool Reward</span>
        <S.KacyUSD>
          {poolInfo.kacyRewards.lt(0) ? (
            <LoadingAnimation width={7} />
          ) : (
            <span>
              {poolInfo.hasExpired
                ? '0'
                : BNtoDecimal(
                    poolInfo.kacyRewards.div(Big(10).pow(18)),
                    18,
                    2,
                    2
                  )}
              /day
            </span>
          )}
          {poolInfo.kacyRewards.lt(0) || poolPrice.lt(0) ? (
            <LoadingAnimation width={7} className="usd" />
          ) : (
            <span className="usd">
              &#8776;{' '}
              {poolInfo.hasExpired
                ? '0'
                : BNtoDecimal(
                    poolInfo.kacyRewards.mul(kacyPrice).div(Big(10).pow(18)),
                    6,
                    2,
                    2
                  )}{' '}
              USD
            </span>
          )}
        </S.KacyUSD>
      </S.ValuesKacy>
      <S.Info>
        <span>Start date</span>
        {poolInfo.startDate ? (
          <span>{poolInfo.startDate}</span>
        ) : (
          <LoadingAnimation width={7} />
        )}
      </S.Info>
      <S.Info>
        <span>Rewards Update</span>
        {poolInfo.startDate ? (
          <span>{poolInfo.endDate}</span>
        ) : (
          <LoadingAnimation width={7} />
        )}
      </S.Info>
      <S.Info>
        <ExternalLink
          hrefLink={`${networks[chainId].blockExplorer}/address/${poolInfo.stakingToken}`}
          text="See contract"
        />
        {symbol === 'KACY' ? (
          <S.AddToken onClick={() => setIsOpenModal(true)}>
            Buy {symbol}
          </S.AddToken>
        ) : (
          <ExternalLink hrefLink={link} text={`Get ${symbol}`} />
        )}
      </S.Info>
      <S.AddToken type="button" onClick={() => handleRegisterToken()}>
        Add to Metamask <img src="/assets/logos/metamask.svg" alt="" />
      </S.AddToken>
    </S.Details>
  )
}

export default Details
