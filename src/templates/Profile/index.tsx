import React from 'react'
import { useRouter } from 'next/router'
import detectEthereumProvider from '@metamask/detect-provider'
import BigNumber from 'bn.js'
import useSWR from 'swr'
import request from 'graphql-request'
import Big from 'big.js'
import { toChecksumAddress } from 'web3-utils'
import Web3 from 'web3'

import { useAppSelector } from '../../store/hooks'

import { ERC20 } from '../../hooks/useERC20Contract'
import useStakingContract from '../../hooks/useStakingContract'
import usePriceLP from '../../hooks/usePriceLP'
import useVotingPower from '../../hooks/useVotingPower'

import { GET_PROFILE } from './graphql'
import {
  LPDaiAvax,
  Staking,
  SUBGRAPH_URL,
  networks
} from '../../constants/tokenAddresses'
import { LP_KACY_AVAX_PNG, LP_KACY_AVAX_JOE, allPools } from '../../constants/pools'

import Breadcrumb from '../../components/Breadcrumb'
import BreadcrumbItem from '../../components/Breadcrumb/BreadcrumbItem'
import UserDescription from '../../components/Governance/UserDescription'
import Portfolio from './Portfolio'
import GovernanceData from './GovernanceData'
import SelectTabs from '../../components/SelectTabs'
import Loading from '../../components/Loading'
import AnyCardTotal from '../../components/Governance/AnyCardTotal'
import ManagedFunds from './ManagedFunds'

import profileIcon from '../../../public/assets/iconGradient/profile.svg'
import walletIcon from '../../../public/assets/iconGradient/wallet-gradient.svg'
import governanceIcon from '../../../public/assets/iconGradient/vote.svg'

import substr from '../../utils/substr'
import { BNtoDecimal } from '../../utils/numerals'

import * as S from './styles'
import AnyCard from '@/components/AnyCard'

// eslint-disable-next-line prettier/prettier
declare let window: {
  ethereum: any
  location: {
    reload: (noCache?: boolean) => void
  }
}

const tabs = [
  {
    asPathText: 'portfolio',
    text: 'Portfolio',
    icon: walletIcon
  },
  {
    asPathText: 'managed-pools',
    text: 'Managed Pools',
    icon: profileIcon
  },
  {
    asPathText: 'governance-data',
    text: 'Governance Data',
    icon: governanceIcon
  }
]

export interface IKacyLpPool {
  pid: number;
  symbol: string;
  poolName: string;
  address: string;
  properties?: {
    logo: {
      src: string,
      style: {
        width: string
      }
    },
    title?: string,
    link?: string
  };
  amount: BigNumber;
}
export interface IAssetsValueWalletProps {
  [key: string]: BigNumber;
}

export interface IPriceToken {
  [key: string]: Big;
}

interface ImyFundsType {
  [key: string]: string;
}

type Response = {
  pools: {
    id: string
    address: string
    symbol: string
    price_usd: string
  }[]
}

const Profile = () => {
  const [assetsValueInWallet, setAssetsValueInWallet] =
    React.useState<IAssetsValueWalletProps>({ '': new BigNumber(-1) })
  const [cardstakesPool, setCardStakesPool] = React.useState<IKacyLpPool[]>([])
  const [myFunds, setMyFunds] = React.useState<ImyFundsType>({})
  const [hasEthereumProvider, setHasEthereumProvider] = React.useState(false)
  const [totalVotingPower, setTotalVotingPower] = React.useState(
    new BigNumber(0)
  )
  const [priceToken, setPriceToken] = React.useState<IPriceToken>({
    'LP-PNG': Big(0),
    'LP-JOE': Big(0),
    KACY: Big(0),
    aHYPE: Big(0),
    K3C: Big(0)
  })

  const [isSelectTab, setIsSelectTab] = React.useState<
    string | string[] | undefined
  >('portfolio')
  const [priceInDolar, setPriceInDolar] = React.useState({
    tokenizedFunds: new Big(0),
    assetsToken: new Big(0),
    totalInvestmented: new Big(0)
  })

  const router = useRouter()
  const { chainId, userWalletAddress } = useAppSelector(state => state)
  const chain = networks[43114]

  const votingPower = useVotingPower(Staking)
  const { userInfo } = useStakingContract(Staking)
  const { getPriceKacyAndLP } = usePriceLP()

  const profileAddress = router.query.profileAddress
  const isSelectQueryTab = router.query.tab
  const walletUserString = profileAddress
    ? Array.isArray(profileAddress)
      ? profileAddress[0]
      : profileAddress
    : ''

  const { data } = useSWR<Response>([GET_PROFILE], query => request(SUBGRAPH_URL, query))

  async function getTokenAmountInPool(pid: number) {
    try {
      const userInfoResponse = await userInfo(pid, profileAddress)

      return new BigNumber(userInfoResponse.amount)
    } catch (error) {
      return new BigNumber(0)
    }
  }

  async function getBalanceInWallet(ids: Array<string>) {
    const valueInWallet: IAssetsValueWalletProps = {}
    for (const id of ids) {
      try {
        const ERC20Contract = ERC20(id, new Web3(chain.rpc))
        const balanceToken = await ERC20Contract.balance(walletUserString)

        Object.assign(valueInWallet, {
          [id]: balanceToken
        })
      } catch (error) {
        Object.assign(valueInWallet, {
          [id]: new BigNumber(0)
        })
      }
    }

    setAssetsValueInWallet(valueInWallet)
  }

  async function getLiquidityPoolPriceInDollar() {
    const { kacyPriceInDollar, priceLP } = await getPriceKacyAndLP(LP_KACY_AVAX_PNG, LPDaiAvax, true)
    if (priceLP) {
      setPriceToken(prevState => ({
        ...prevState,
        'LP-PNG': priceLP,
        KACY: kacyPriceInDollar
      }))
    }

    if (priceLP) {
      const priceLPJoe = await getPriceKacyAndLP(LP_KACY_AVAX_JOE, LPDaiAvax, true)
      if (priceLPJoe.priceLP) {
        setPriceToken(prevState => ({
          ...prevState,
          'LP-JOE': priceLPJoe.priceLP,
        }))
      }
    }
  }

  async function getAmountToken() {
    let kacyObject: IKacyLpPool = {
      pid: 0,
      address: '',
      symbol: '',
      poolName: '',
      amount: new BigNumber(0)
    }

    const stakeObject: Array<IKacyLpPool> = []

    const ids: Array<string> = []
    await Promise.all(
      allPools.map(async pool => {
        const tokenAmountInPool = await getTokenAmountInPool(pool.pid)
        ids.push(pool.address)

        if (pool.symbol === 'KACY') {
          const kacyAmount = kacyObject.amount

          kacyObject = {
            pid: pool.pid,
            address: pool.address,
            poolName: pool.symbol,
            symbol: pool.symbol,
            properties: pool.properties,
            amount: kacyAmount.add(tokenAmountInPool)
          }
        } else {
          stakeObject.push({
            amount: tokenAmountInPool,
            address: pool.address,
            pid: pool.pid,
            poolName: pool.properties.title
              ? pool.properties.title
              : pool.symbol,
            properties: pool.properties,
            symbol: pool.symbol
          })
        }
      })
    )

    setCardStakesPool([...stakeObject, kacyObject])
    getBalanceInWallet(ids)
  }

  const handleAccountChange = ((account: string[]) => {
    const tabSelect = isSelectQueryTab ? isSelectQueryTab : 'portfolio'

    router.push(
      {
        pathname: `/profile/${toChecksumAddress(account[0])}`,
        query: { tab: `${tabSelect}` }
      },
      undefined,
      { scroll: false, shallow: false }
    )
  })

  React.useEffect(() => {
    if (hasEthereumProvider) {
      window.ethereum.on('accountsChanged', handleAccountChange)
    }
  }, [])

  React.useEffect(() => {
    if (data?.pools) {
      data.pools.map(pool => {
        const prodPrice = new Big(pool.price_usd)

        setPriceToken(prevState => ({
          ...prevState,
          [pool.symbol]: prodPrice
        }))

        setMyFunds(prevState => ({
          ...prevState,
          [pool.address]: pool.address
        }))
      }
      )
    }
  }, [data, walletUserString])

  React.useEffect(() => {
    const checkEthereumProvider = async () => {
      const provider = await detectEthereumProvider()

      if (!provider && !chainId) {
        setHasEthereumProvider(false)
      } else {
        setHasEthereumProvider(true)
      }
    }

    checkEthereumProvider()
  }, [chainId])

  React.useEffect(() => {
    if (isSelectQueryTab) {
      setIsSelectTab(isSelectQueryTab)
    } else {
      setIsSelectTab('portfolio')
    }
  }, [router])

  React.useEffect(() => {
    if (profileAddress) {
      getAmountToken()
      getLiquidityPoolPriceInDollar()
    }
  }, [profileAddress, chainId])

  React.useEffect(() => {
    let tokenAmountInTokenizedFunds = new Big(0)
    let tokenAmountInAssetsToken = new Big(0)

    if (profileAddress && cardstakesPool.length > 0 && assetsValueInWallet) {
      cardstakesPool.forEach(pool => {
        const tokenAmount = Big(
          (assetsValueInWallet[pool.address]
            ? pool.amount.add(assetsValueInWallet[pool.address])
            : pool.amount
          ).toString()
        ).mul(priceToken[pool.symbol]).div(Big(10).pow(18))

        if (pool.address === myFunds[pool.address]) {
          tokenAmountInAssetsToken = tokenAmountInAssetsToken.add(tokenAmount)
        } else {
          tokenAmountInTokenizedFunds = tokenAmountInTokenizedFunds.add(tokenAmount)
        }
      })
    }

    setPriceInDolar(prev => ({
      ...prev,
      assetsToken: tokenAmountInTokenizedFunds
    }))
  }, [profileAddress, priceToken, assetsValueInWallet, chainId])

  React.useEffect(() => {

    async function getVotingPower() {
      const currentVotes = await votingPower.currentVotes(profileAddress)

      setTotalVotingPower(currentVotes || new BigNumber(0))
    }

    getVotingPower()
  }, [profileAddress, chainId])

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem href="/">Invest</BreadcrumbItem>
        <BreadcrumbItem
          href={`/profile/${userWalletAddress}`}
          isLastPage={userWalletAddress === profileAddress}
        >
          Profile
        </BreadcrumbItem>
        {userWalletAddress !== profileAddress && (
          <BreadcrumbItem href={`/Profile/${profileAddress}`} isLastPage>
            {substr(String(profileAddress))}
          </BreadcrumbItem>
        )}
      </Breadcrumb>

      <S.ProfileContainer>
        <UserDescription userWalletUrl={profileAddress} />

        <>
          <S.TotalValuesCardsContainer>
            <AnyCardTotal
                text={String(BNtoDecimal(priceInDolar.totalInvestmented, 6, 2, 2) || 0)}
              TooltipText="The amount in US Dollars that this address has in investments with Kassandra. This considers tokens, funds, LP, and staked assets."
              textTitle="HOLDINGS"
              isDolar={true}
            />
            <AnyCardTotal
              text={`$ ${0}`}
              TooltipText="The amount in US Dollars that this address manages in tokenized funds with Kassandra."
              textTitle="TOTAL MANAGED"
            />
            <AnyCardTotal
              text={String(BNtoDecimal(totalVotingPower, 18, 2) || 0)}
              TooltipText="The voting power of this address. Voting power is used to vote on governance proposals, and it can be earned by staking KACY."
              textTitle="VOTING POWER"
            />
          </S.TotalValuesCardsContainer>
          <SelectTabs
            tabs={tabs}
            isSelect={isSelectTab}
            setIsSelect={setIsSelectTab}
          />
          {isSelectTab === tabs[0].asPathText ? (
            data && <Portfolio
              profileAddress={
                typeof profileAddress === 'undefined'
                  ? ''
                  : typeof profileAddress === 'string'
                    ? profileAddress
                    : ''
              }
              assetsValueInWallet={assetsValueInWallet}
              cardstakesPool={cardstakesPool}
              priceToken={priceToken}
              myFunds={myFunds}
              priceInDolar={priceInDolar}
              poolsAddresses={data.pools.map(pool => pool.address)}
              setPriceInDolar={setPriceInDolar}
            />
          ) : isSelectTab === tabs[1].asPathText ? (
            <AnyCard text='Coming soon' />
            // <ManagedFunds />
          ) : isSelectTab === tabs[2].asPathText ? (
            <>
              <GovernanceData address={profileAddress} />
            </>
          ) : (
            <Loading marginTop={4} />
          )}
        </>
      </S.ProfileContainer>
    </>
  )
}

export default Profile
