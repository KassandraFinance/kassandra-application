import React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import request from 'graphql-request'
import Big from 'big.js'
import { getAddress } from 'ethers'
import { useConnectWallet } from '@web3-onboard/react'

import substr from '../../utils/substr'
import { BNtoDecimal } from '../../utils/numerals'

import useStakingContract from '@/hooks/useStaking'
import useVotingPower from '@/hooks/useVotings'
import usePriceLP from '@/hooks/usePriceLPEthers'
import { ERC20 } from '@/hooks/useERC20'
import useCoingecko from '@/hooks/useCoingecko'
import useTransaction from '@/hooks/useTransaction'

import { GET_PROFILE } from './graphql'
import {
  LPDaiAvax,
  Staking,
  networks,
  BACKEND_KASSANDRA,
  KacyPoligon,
  WETH_POLYGON
} from '@/constants/tokenAddresses'
import {
  LP_KACY_AVAX_PNG,
  LP_KACY_AVAX_JOE,
  allPools,
  KACY_WETH
} from '@/constants/pools'

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

import * as S from './styles'

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
  pid: number
  symbol: string
  poolName: string
  address: string
  properties?: {
    logo: {
      src: string
      style: {
        width: string
      }
    }
    title?: string
    link?: string
  }
  amount: Big
  chainLogo: string
}
export interface IAssetsValueWalletProps {
  [key: string]: Big
}

export interface IPriceToken {
  [key: string]: Big
}

interface ImyFundsType {
  [key: string]: string
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
    React.useState<IAssetsValueWalletProps>({ '': Big(-1) })
  const [cardstakesPool, setCardStakesPool] = React.useState<IKacyLpPool[]>([])
  const [myFunds, setMyFunds] = React.useState<ImyFundsType>({})
  const [totalVotingPower, setTotalVotingPower] = React.useState(Big(0))
  const [priceToken, setPriceToken] = React.useState<IPriceToken>({
    'LP-PNG': Big(0),
    'LP-JOE': Big(0),
    'KACY-WETH': Big(0),
    KACY: Big(0),
    aHYPE: Big(0),
    pHYPE: Big(0),
    K3C: Big(0)
  })

  const [isSelectTab, setIsSelectTab] = React.useState<
    string | string[] | undefined
  >('portfolio')
  const [priceInDolar, setPriceInDolar] = React.useState({
    tokenizedFunds: Big(0),
    assetsToken: Big(0),
    totalInvestmented: Big(0)
  })

  const chain = networks[43114]

  const { txNotification, transactionErrors } = useTransaction()
  const router = useRouter()
  const [{ wallet }] = useConnectWallet()
  const votingPower = useVotingPower(Staking)
  const { getUserInfo } = useStakingContract(Staking)
  const { getPriceKacyAndLP, getPriceKacyAndLPBalancer } = usePriceLP(
    chain.chainId
  )

  const profileAddress = router.query.profileAddress
  const isSelectQueryTab = router.query.tab
  const walletUserString = profileAddress
    ? Array.isArray(profileAddress)
      ? profileAddress[0]
      : profileAddress
    : ''

  const { data } = useSWR<Response>([GET_PROFILE], query =>
    request(BACKEND_KASSANDRA, query)
  )

  const { priceToken: getPriceToken } = useCoingecko(
    networks[137].chainId,
    networks[137].nativeCurrency.address,
    [WETH_POLYGON, KacyPoligon]
  )

  async function getTokenAmountInPool(
    pid: number,
    stakingContract: string,
    chain: number
  ) {
    if (!profileAddress) {
      return Big(0)
    }

    const address = Array.isArray(profileAddress)
      ? profileAddress[0]
      : profileAddress

    try {
      const userInfoResponse = await getUserInfo(
        pid,
        address,
        stakingContract,
        chain
      )

      return Big(userInfoResponse.amount.toString())
    } catch (error) {
      return Big(0)
    }
  }

  async function getBalanceInWallet(ids: Array<string>) {
    const valueInWallet: IAssetsValueWalletProps = {}
    for (const id of ids) {
      try {
        const ERC20Contract = await ERC20(id, chain.rpc, {
          transactionErrors,
          txNotification,
          wallet: null
        })
        const balanceToken = await ERC20Contract.balance(walletUserString)

        Object.assign(valueInWallet, {
          [id]: Big(balanceToken)
        })
      } catch (error) {
        Object.assign(valueInWallet, {
          [id]: Big(0)
        })
      }
    }

    setAssetsValueInWallet(valueInWallet)
  }

  async function getLiquidityPoolPriceInDollar() {
    const { kacyPriceInDollar, priceLP } = await getPriceKacyAndLP(
      LP_KACY_AVAX_PNG,
      LPDaiAvax,
      true
    )
    if (priceLP) {
      setPriceToken(prevState => ({
        ...prevState,
        'LP-PNG': priceLP,
        KACY: kacyPriceInDollar
      }))
    }

    if (priceLP) {
      const priceLPJoe = await getPriceKacyAndLP(
        LP_KACY_AVAX_JOE,
        LPDaiAvax,
        true
      )
      if (priceLPJoe.priceLP) {
        setPriceToken(prevState => ({
          ...prevState,
          'LP-JOE': priceLPJoe.priceLP
        }))
      }
    }

    const wethPrice = getPriceToken(WETH_POLYGON.toLocaleLowerCase())
    if (wethPrice) {
      const priceLPbal = await getPriceKacyAndLPBalancer(wethPrice, KACY_WETH)
      if (priceLPbal) {
        setPriceToken(prevState => ({
          ...prevState,
          'KACY-WETH': priceLPbal
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
      amount: Big(0),
      chainLogo: ''
    }

    const stakeObject: Array<IKacyLpPool> = []

    const ids: Array<string> = []
    await Promise.all(
      allPools.map(async pool => {
        const tokenAmountInPool = await getTokenAmountInPool(
          pool.pid,
          pool.stakingContract,
          pool.chain.id
        )
        ids.push(pool.address)

        if (pool.symbol === 'KACY') {
          const kacyAmount = kacyObject.amount

          kacyObject = {
            pid: pool.pid,
            address: pool.address,
            poolName: pool.symbol,
            symbol: pool.symbol,
            properties: pool.properties,
            amount: kacyAmount.add(tokenAmountInPool),
            chainLogo: pool.chain.logo
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
            symbol: pool.symbol,
            chainLogo: pool.chain.logo
          })
        }
      })
    )

    setCardStakesPool([...stakeObject, kacyObject])
    getBalanceInWallet(ids)
  }

  const handleAccountChange = (account: string[]) => {
    if (!account[0]) return

    const tabSelect = isSelectQueryTab ? isSelectQueryTab : 'portfolio'

    router.push(
      {
        pathname: `/profile/${getAddress(account[0])}`,
        query: { tab: `${tabSelect}` }
      },
      undefined,
      { scroll: false, shallow: false }
    )
  }

  React.useEffect(() => {
    if (!wallet) return

    wallet.provider.on('accountsChanged', handleAccountChange)
    return () => {
      wallet?.provider.removeListener('accountsChanged', handleAccountChange)
    }
  }, [wallet])

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
      })
    }
  }, [data, walletUserString])

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
  }, [profileAddress])

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
        )
          .mul(priceToken[pool.symbol])
          .div(Big(10).pow(18))

        if (pool.address === myFunds[pool.address]) {
          tokenAmountInAssetsToken = tokenAmountInAssetsToken.add(tokenAmount)
        } else {
          tokenAmountInTokenizedFunds =
            tokenAmountInTokenizedFunds.add(tokenAmount)
        }
      })
    }

    setPriceInDolar(prev => ({
      ...prev,
      assetsToken: tokenAmountInTokenizedFunds
    }))
  }, [profileAddress, priceToken, assetsValueInWallet])

  React.useEffect(() => {
    async function getVotingPower() {
      const currentVotes = await votingPower.currentVotes(profileAddress)

      setTotalVotingPower(Big(currentVotes?.toString() ?? 0))
    }

    getVotingPower()
  }, [profileAddress])

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem href="/">Invest</BreadcrumbItem>
        <BreadcrumbItem
          href={`/profile/${wallet?.accounts[0].address}`}
          isLastPage={
            wallet?.accounts[0].address === walletUserString.toLowerCase()
          }
        >
          Profile
        </BreadcrumbItem>
        {wallet?.accounts[0].address !== walletUserString.toLowerCase() && (
          <BreadcrumbItem href={`/Profile/${walletUserString}`} isLastPage>
            {substr(String(walletUserString))}
          </BreadcrumbItem>
        )}
      </Breadcrumb>

      <S.ProfileContainer>
        <UserDescription userWalletUrl={profileAddress} />

        <>
          <S.TotalValuesCardsContainer>
            <AnyCardTotal
              text={String(
                BNtoDecimal(priceInDolar.totalInvestmented, 6, 2, 2) || 0
              )}
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
              text={BNtoDecimal(totalVotingPower.div(Big(10).pow(18)), 18, 2)}
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
            data && (
              <Portfolio
                profileAddress={walletUserString}
                assetsValueInWallet={assetsValueInWallet}
                cardstakesPool={cardstakesPool}
                priceToken={priceToken}
                myFunds={myFunds}
                priceInDolar={priceInDolar}
                poolsAddresses={data.pools.map(pool => pool.address)}
                setPriceInDolar={setPriceInDolar}
              />
            )
          ) : isSelectTab === tabs[1].asPathText ? (
            <ManagedFunds />
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
