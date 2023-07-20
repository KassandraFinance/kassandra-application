import React from 'react'
import { useRouter } from 'next/router'
import Big from 'big.js'
import { getAddress } from 'ethers'
import { useConnectWallet } from '@web3-onboard/react'

import substr from '../../utils/substr'
import { BNtoDecimal } from '../../utils/numerals'

import { useVotingPower as useVotingPowerApi } from '@/hooks/query/useVotingPower'
import { usePools } from '@/hooks/query/usePools'
import useStakingContract from '@/hooks/useStaking'
import usePriceLP from '@/hooks/usePriceLPEthers'
import { ERC20 } from '@/hooks/useERC20'
import { useTokensData } from '@/hooks/query/useTokensData'
import useGetToken from '@/hooks/useGetToken'

import {
  Staking,
  networks,
  KacyPoligon,
  WETH_POLYGON
} from '@/constants/tokenAddresses'
import {
  allPools,
  poolsFunds,
  PoolType,
  WAVAX_POLYGON,
  poolsKacy
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

const Profile = () => {
  const [assetsValueInWallet, setAssetsValueInWallet] =
    React.useState<IAssetsValueWalletProps>({ '': Big(-1) })
  const [cardstakesPool, setCardStakesPool] = React.useState<IKacyLpPool[]>([])
  const [myFunds, setMyFunds] = React.useState<ImyFundsType>({})
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

  const router = useRouter()
  const [{ wallet }] = useConnectWallet()
  const { getUserInfo } = useStakingContract(Staking)
  const { getPricePoolLP } = usePriceLP()

  const profileAddress = router.query.profileAddress
  const isSelectQueryTab = router.query.tab
  const walletUserString = profileAddress
    ? Array.isArray(profileAddress)
      ? profileAddress[0]
      : profileAddress
    : ''

  const { data: votingPowerData } = useVotingPowerApi({ id: walletUserString })
  const { data } = usePools()

  const { data: tokensList } = useTokensData({
    chainId: networks[137].chainId,
    tokenAddresses: [WETH_POLYGON, WAVAX_POLYGON, KacyPoligon]
  })

  const { priceToken: getPriceToken } = useGetToken({
    nativeTokenAddress: networks[137].nativeCurrency.address,
    tokens: tokensList || {}
  })

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
        const ERC20Contract = await ERC20(id, chain.rpc)
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

  async function poolPriceList() {
    if (!data || !tokensList) return

    const poolPriceList = {}
    for (const pool of [...poolsFunds, ...poolsKacy]) {
      switch (pool.type) {
        case PoolType.STAKE:
          Object.assign(poolPriceList, {
            [pool.symbol]: getPriceToken
              ? getPriceToken(KacyPoligon.toLowerCase())
              : '0'
          })
          break

        case PoolType.FARM:
          Object.assign(poolPriceList, {
            [pool.symbol]:
              data?.find(token => token.address === pool.poolTokenAddress)
                ?.price_usd ?? '0'
          })
          break

        case PoolType.LP:
          Object.assign(poolPriceList, {
            [pool.symbol]: await getPricePoolLP({
              lpType: pool.lpPool?.type,
              chainId: pool.chain.id,
              poolAddress: pool.address,
              tokenPoolAddress: pool.poolTokenAddress,
              balancerPoolId: pool.lpPool?.balancerPoolId,
              tokenPoolPrice: Big(
                getPriceToken
                  ? getPriceToken(pool.poolTokenAddress.toLowerCase())
                  : '0'
              )
            })
          })
          break
      }
    }

    setPriceToken(poolPriceList)
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
    if (data) {
      data.map(pool => {
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
      poolPriceList()
    }
  }, [profileAddress, data, tokensList])

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
              text={BNtoDecimal(
                Big(votingPowerData?.user?.votingPower || 0),
                18,
                2
              )}
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
                poolsAddresses={data.map(pool => pool.address)}
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
