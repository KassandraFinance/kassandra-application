import React from 'react'

import Big from 'big.js'

import { networks } from '@/constants/tokenAddresses'

import useStaking from '@/hooks/useStaking'
import useMatomoEcommerce from '@/hooks/useMatomoEcommerce'

import { BNtoDecimal } from '@/utils/numerals'
import { registerToken } from '@/utils/registerToken'

import ExternalLink from '../../ExternalLink'

import * as S from './styles'

interface IInfoStakeStaticProps {
  votingMultiplier: string
  startDate: string
  endDate: string
  kacyRewards: Big
  withdrawDelay: string
}

interface IDetailsProps {
  pid: number
  hasExpired: boolean
  infoStakeStatic: IInfoStakeStaticProps
  stakingToken: string
  decimals: string
  symbol: string
  poolPrice: Big
  kacyPrice: Big
  link: string
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  stakingAddress: string
  chainId: number
}

const Details = ({
  pid,
  hasExpired,
  infoStakeStatic,
  stakingToken,
  decimals,
  symbol,
  poolPrice,
  kacyPrice,
  link,
  setIsOpenModal,
  stakingAddress,
  chainId
}: IDetailsProps) => {
  const [depositedAmount, setDepositedAmount] = React.useState<Big>(Big(-1))
  const networkChain = networks[chainId]

  const { trackEventFunction } = useMatomoEcommerce()
  const staking = useStaking(stakingAddress, networkChain.chainId)

  const connect = localStorage.getItem('walletconnect')

  React.useEffect(() => {
    let interval: NodeJS.Timeout
    ;(async () => {
      const poolInfoResponse = await staking.poolInfo(pid)

      interval = setInterval(async () => {
        setDepositedAmount(Big(poolInfoResponse.depositedAmount))
      }, 10000)
      setDepositedAmount(Big(poolInfoResponse.depositedAmount))
    })()

    return () => clearInterval(interval)
  }, [])

  return (
    <S.Details>
      <S.ValuesKacy>
        <span>Total staked</span>
        <S.KacyUSD>
          <span>
            {depositedAmount.lt(Big(0))
              ? '...'
              : BNtoDecimal(depositedAmount.div(Big(10).pow(18)), 18)}{' '}
            {symbol}
          </span>
          <span className="usd">
            &#8776;{' '}
            {depositedAmount.lt(Big(0)) || poolPrice.lt(0)
              ? '...'
              : BNtoDecimal(
                  Big(`0${depositedAmount}`)
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
            {infoStakeStatic.kacyRewards.lt(Big(0))
              ? '...'
              : hasExpired
              ? '0'
              : BNtoDecimal(
                  infoStakeStatic.kacyRewards.div(Big(10).pow(18)),
                  18,
                  2,
                  2
                )}
            /day
          </span>
          <span className="usd">
            &#8776;{' '}
            {infoStakeStatic.kacyRewards.lt(Big(0)) || poolPrice.lt(0)
              ? '...'
              : hasExpired
              ? '0'
              : BNtoDecimal(
                  infoStakeStatic.kacyRewards
                    .mul(kacyPrice)
                    .div(Big(10).pow(18)),
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
        <span>{infoStakeStatic.startDate}</span>
      </S.Info>
      <S.Info>
        <span>Rewards Update</span>
        <span>{infoStakeStatic.endDate}</span>
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
