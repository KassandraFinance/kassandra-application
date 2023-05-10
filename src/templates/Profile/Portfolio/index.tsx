import React from 'react'
import { useRouter } from 'next/router'
import Big from 'big.js'
import BigNumber from 'bn.js'
import useSWR from 'swr'
import request from 'graphql-request'

import PortfolioHeading from '../../../components/PortfolioHeading'
import AssetsTable from './AssetsTable'
import AnyCard from '../../../components/AnyCard'
import AssetsCard, { IPriceToken } from './AssetsCard'

import { useAppSelector } from '@/store/hooks'

import AssetsIcon from '../../../../public/assets/iconGradient/assets-distribution.svg'
import StakedPoolsIcon from '../../../../public/assets/iconGradient/staking-pools.svg'

import { BNtoDecimal, calcChange } from '@/utils/numerals'

import { BACKEND_KASSANDRA } from '@/constants/tokenAddresses'
import { GET_CHART } from './AssetsTable/graphql'
import { IAssetsValueWalletProps, IKacyLpPool } from '../'

import * as S from './styles'

type IpriceInDolarProps = {
  assetsToken: Big,
  tokenizedFunds: Big
}

interface IProfileProps {
  profileAddress: string;
  assetsValueInWallet: IAssetsValueWalletProps;
  cardstakesPool: IKacyLpPool[];
  priceToken: IPriceToken;
  myFunds: ImyFundsType;
  priceInDolar: IpriceInDolarProps;
  poolsAddresses: string[];
  setPriceInDolar: React.Dispatch<
    React.SetStateAction<{
      assetsToken: Big,
      totalInvestmented: Big,
      tokenizedFunds: Big
    }>
  >;
}

interface ImyFundsType {
  [key: string]: string;
}
export interface IBalanceType {
  [key: string]: BigNumber;
}

type PoolProps = {
  id: string,
  address: string,
  name: string,
  symbol: string,
  logo: string,
  logoChain: string,
  changeDay: string,
  changeMonth: string,
  price: string,
  tvl: string,
  balance: string,
  balanceInUSD: string
}

type PoolResponse = {
  id: string,
  now: { close: number }[],
  day: { close: number }[],
  month: { close: number }[],
  price_usd: string,
  total_value_locked_usd: string,
  address: string,
  name: string,
  symbol: string,
  logo: string,
  investors?: {
    amount: string
  }[],
  chain?: {
    logo: string
  }
}

type Response = {
  pools: Array<PoolResponse>,
  managedPools: Array<PoolResponse>
}

const Portfolio = ({
  profileAddress,
  assetsValueInWallet,
  cardstakesPool,
  priceToken,
  myFunds,
  priceInDolar,
  poolsAddresses,
  setPriceInDolar
}: IProfileProps) => {
  const router = useRouter()
  const userWalletAddress = useAppSelector(state => state.userWalletAddress)

  const [pools, setPools] = React.useState<Array<PoolProps>>([])
  const [tokenizedFunds, setTokenizedFunds] = React.useState<string[]>([])
  const [balanceFunds, setBalanceFunds] = React.useState<IBalanceType>({})
  const [amountProdInPool, setAmountProdInPool] =
    React.useState<IAssetsValueWalletProps>({ '': new BigNumber(0) })
  const [cardstakesPoolNew, setCardStakesPoolNew] = React.useState<
    IKacyLpPool[]
  >([])

  const { data } = useSWR<Response>(
    [GET_CHART, profileAddress, tokenizedFunds],
    (query, profileAddress, assets) =>
      request(BACKEND_KASSANDRA, query, {
        id: assets,
        day: Math.trunc(Date.now() / 1000 - 60 * 60 * 24),
        month: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 30),
        wallet: profileAddress
      })
  )

  React.useEffect(() => {
    setCardStakesPoolNew([])

    cardstakesPool.forEach(pool => {
      const tokenAmount = pool.amount.add(
        assetsValueInWallet[pool.address]
          ? assetsValueInWallet[pool.address]
          : new BigNumber(0)
      )

      if (pool.address === myFunds[pool.address]) {
        setAmountProdInPool(prevState => ({
          ...prevState,
          [pool.address]: pool.amount
        }))
      } else {
        if (tokenAmount.gt(new BigNumber(0))) {
          setCardStakesPoolNew(prevState => [
            ...prevState,
            {
              address: pool.address,
              amount: tokenAmount,
              pid: pool.pid,
              poolName: pool.poolName,
              symbol: pool.symbol,
              properties: pool.properties,
              chainLogo: pool.chainLogo
            }
          ])
        }
      }
    })
  }, [cardstakesPool, router, assetsValueInWallet])

  React.useEffect(() => {
    setTokenizedFunds([])

    poolsAddresses.forEach(address => {
      const balanceInWallet = assetsValueInWallet[address]
      const balanceInPool = amountProdInPool[address]
      const balanceProductAll = balanceInWallet
        ? balanceInWallet.add(balanceInPool ? balanceInPool : new BigNumber(0))
        : new BigNumber(0)

      if (balanceProductAll.gt(new BigNumber(0))) {
        setTokenizedFunds(prevState => [...prevState, address])
      }

      setBalanceFunds(prevState => ({
        ...prevState,
        [address]: balanceProductAll
      }))
    })
  }, [profileAddress, assetsValueInWallet, router, userWalletAddress])

  React.useEffect(() => {
    if (!data?.pools) {
      return
    }

    const pools: PoolProps[] = [
      ...data.pools.map(pool => {
        const balance = Big(balanceFunds[pool.address].toString()).div(
          Big(10).pow(18)
        )
        return {
          id: pool.id,
          address: pool.address,
          name: pool.name,
          symbol: pool.symbol,
          logo: pool.logo,
          changeDay: calcChange(pool.now[0]?.close, pool.day[0]?.close),
          changeMonth: calcChange(pool.now[0]?.close, pool.month[0]?.close),
          price: pool.price_usd,
          tvl: pool.total_value_locked_usd,
          balanceInUSD: balance.mul(pool.price_usd).toFixed(),
          balance: balance.toFixed(),
          logoChain: pool.chain?.logo ?? '/assets/logos/avalanche.svg'
        }
      })
    ]

    if (data.managedPools.length > 0) {
      pools.push(
        ...data.managedPools.map(pool => {
          const balance =
            pool.investors && pool.investors.length > 0
              ? Big(pool.investors[0].amount)
              : Big('0')
          return {
            id: pool.id,
            address: pool.address,
            name: pool.name,
            symbol: pool.symbol,
            logo: pool.logo,
            changeDay: calcChange(pool.now[0]?.close, pool.day[0]?.close),
            changeMonth: calcChange(pool.now[0]?.close, pool.month[0]?.close),
            price: pool.price_usd,
            tvl: pool.total_value_locked_usd,
            balanceInUSD: balance.mul(pool.price_usd).toFixed(),
            balance: balance.toFixed(),
            logoChain: pool.chain?.logo ?? '/assets/icons/coming-soon.svg'
          }
        })
      )
    }

    setPools(pools.sort((a, b) => Number(b.balance) - Number(a.balance)))
    const total = pools.reduce(
      (total, pool) => total + Number(pool.balanceInUSD),
      0
    )
    setPriceInDolar(prev => ({
      ...prev,
      totalInvestmented: Big(total).add(priceInDolar.assetsToken),
      tokenizedFunds: Big(total)
    }))
  }, [data, balanceFunds])

  return (
    <>
      <S.paddingWrapper>
        <PortfolioHeading
          image={AssetsIcon}
          title="Indexes"
          usd={BNtoDecimal(Big(priceInDolar.tokenizedFunds), 6, 2, 2)}
          tippy="The amount in US Dollars that this address holds in tokenized funds."
        />
      </S.paddingWrapper>

      {pools.length > 0 ? (
        <S.paddingLeftWrapper>
          <AssetsTable pools={pools} />
        </S.paddingLeftWrapper>
      ) : (
        <S.paddingWrapper>
          {profileAddress === userWalletAddress ? (
            <AnyCard
              text="Looks like you have not invested in anything yet"
              button={true}
              link="/"
              buttonText="I Want To Invest"
            />
          ) : (
            <AnyCard text="This address has not yet invested in anything" />
          )}
        </S.paddingWrapper>
      )}

      <S.paddingWrapper>
        <PortfolioHeading
          image={StakedPoolsIcon}
          title="Assets"
          usd={BNtoDecimal(priceInDolar.assetsToken, 6, 2, 2)}
          tippy="The amount in US Dollars that this address holds in KACY and liquidity tokens."
        />
      </S.paddingWrapper>

      <S.AssetsCardContainer>
        <AssetsCard
          profileAddress={profileAddress}
          cardstakesPoolNew={cardstakesPoolNew}
          priceToken={priceToken}
        />
      </S.AssetsCardContainer>
    </>
  )
}

export default Portfolio
