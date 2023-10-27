import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { animateScroll } from 'react-scroll'

import BreadcrumbItem from '@/components/Breadcrumb/BreadcrumbItem'
import SelectTabs from '@/components/SelectTabs'
import Breadcrumb from '@/components/Breadcrumb'
import Contracts from './Contracts'
import Hero from './Hero'
import Allocations from './Allocations'
import Faqs from './Faqs'
import Staking from './Staking'
import Overview from './Overview'
import ShareAndEarn from './ShareAndEarn'

import { setTokensSwapProvider } from '@/store/reducers/tokenListSwapProvider'
import useMatomoEcommerce from '@/hooks/useMatomoEcommerce'
import { usePoolData } from '@/hooks/query/usePoolData'
import { useAppDispatch } from '@/store/hooks'

import { NATIVE_ADDRESS, SUBGRAPH_URL } from '@/constants/tokenAddresses'
import Activity from './Activity'

import {
  ContractsIcon,
  ActivityIcon,
  OverviewIcon,
  ShareAndEarnIcon,
  allocationsIcon,
  FaqIcon,
  StakingIcon
} from './icons'

import * as S from './styles'

type ListTokensRes = {
  id: string
  decimals: number
  logo: string
  network: number
  symbol: string
}

type Asset = {
  balance: string
  weight_normalized: string
  weight_goal_normalized: string
  token: {
    id: string
    name: string
    logo?: string | null | undefined
    symbol: string
    decimals: number
    is_wrap_token: number
    wraps?:
      | {
          id: string
          decimals: number
          symbol: string
          name: string
          logo?: string | null | undefined
        }
      | null
      | undefined
  }
}

const tabs = [
  {
    asPathText: 'overview',
    text: 'Overview',
    svg: OverviewIcon
  },
  {
    asPathText: 'allocations',
    text: 'Allocations',
    svg: allocationsIcon
  },
  {
    asPathText: 'activity',
    text: 'Activity',
    svg: ActivityIcon
  },
  {
    asPathText: 'staking',
    text: 'Staking',
    svg: StakingIcon
  },
  {
    asPathText: 'contracts',
    text: 'Contracts',
    svg: ContractsIcon
  },
  {
    asPathText: 'faqs',
    text: 'FAQs',
    svg: FaqIcon
  }
]

const shareAndEarnTab = {
  asPathText: 'shareAndEarn',
  text: 'Share and earn',
  svg: ShareAndEarnIcon
}

const Pool = () => {
  const [isSelectTab, setIsSelectTab] = React.useState<
    string | string[] | undefined
  >('overview')

  const router = useRouter()
  const { data: pool } = usePoolData({ id: router.query.address as string })
  const { trackProductPageView } = useMatomoEcommerce()
  const dispatch = useAppDispatch()

  const updatedTabs = handleCheckTabs(tabs)

  function handleCheckTabs(tabsList: typeof tabs) {
    const totalTabs = 7

    if (
      parseFloat(pool?.fee_join_broker ?? '0') > 0 &&
      tabsList.length !== totalTabs
    ) {
      const newTabsList = tabsList.slice()
      newTabsList.splice(5, 0, shareAndEarnTab)

      return newTabsList
    } else {
      return tabsList
    }
  }

  function handleClickStakeButton() {
    router.push(
      {
        pathname: `${router.pathname}`,
        query: { ...router.query, tab: 'staking' }
      },
      undefined,
      { scroll: false }
    )

    animateScroll.scrollTo(320)
    setIsSelectTab('staking')
  }

  const PoolComponents: Record<string, ReactElement> = {
    overview: (
      <Overview pool={pool} handleClickStakeButton={handleClickStakeButton} />
    ),
    allocations: <Allocations />,
    activity: <Activity />,
    staking: <Staking />,
    contracts: <Contracts />,
    shareAndEarn: (
      <ShareAndEarn
        feeJoinBroker={pool?.fee_join_broker ?? '0'}
        poolId={pool?.id ?? ''}
      />
    ),
    faqs: <Faqs />
  }

  async function getTokensForOperations() {
    const resJson = await fetch(`${SUBGRAPH_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
          query($chainId: Int) {
            tokens(where: {chain_ids_contains: [$chainId] coingecko_id_not: null} first: 1000) {
              id
              decimals
              logo
              name
              symbol
            }
        }
        `,
        variables: { chainId: pool?.chain_id }
      })
    })
    const response = await resJson.json()

    const tokensSwapProvider = response.data.tokens as ListTokensRes[]
    const tokenAddressesSwapProvider = tokensSwapProvider.map(token => token.id)
    let poolAssets: Asset[] = []
    if (pool?.underlying_assets) {
      poolAssets = [...pool.underlying_assets].sort(
        (a, b) => Number(b.weight_normalized) - Number(a.weight_normalized)
      )
    }
    const formatTokensSwapProvider = [
      {
        address: NATIVE_ADDRESS,
        decimals: pool?.chain?.token_decimals,
        logoURI: pool?.chain?.logo ?? '',
        name: pool?.chain?.token_name,
        symbol: pool?.chain?.token_symbol
      }
    ]

    for (const token of tokensSwapProvider) {
      formatTokensSwapProvider.push({
        address: token.id,
        decimals: token.decimals,
        logoURI: token.logo,
        name: token.symbol,
        symbol: token.symbol
      })
    }

    for (const asset of poolAssets) {
      const address = asset.token.wraps?.id ?? asset.token.id

      if (!tokenAddressesSwapProvider.includes(address)) {
        formatTokensSwapProvider.push({
          address: address.toLowerCase(),
          decimals: asset.token.wraps?.decimals ?? asset.token.decimals,
          logoURI: asset.token.wraps?.logo ?? asset.token.logo ?? '',
          name: asset.token.wraps?.name ?? asset.token.name,
          symbol: asset.token.wraps?.symbol ?? asset.token.symbol
        })
      }
    }

    dispatch(setTokensSwapProvider(formatTokensSwapProvider))
  }

  React.useEffect(() => {
    if (pool) {
      try {
        getTokensForOperations()
        trackProductPageView(pool.id, pool.symbol, pool.name)
      } catch (error) {
        console.error(error)
      }
    }
  }, [pool])

  return (
    <S.Pool>
      <S.Hero>
        <Breadcrumb>
          <BreadcrumbItem href="/">Invest</BreadcrumbItem>
          <BreadcrumbItem
            href={`/pool/${pool?.symbol?.toLowerCase()}`}
            isLastPage
          >
            ${pool?.symbol}
          </BreadcrumbItem>
        </Breadcrumb>
        <Hero />
      </S.Hero>
      <S.SelectTabsContainer>
        <SelectTabs
          isSelect={isSelectTab}
          tabs={updatedTabs}
          setIsSelect={setIsSelectTab}
        />

        {PoolComponents[isSelectTab?.toString() ?? '']}
      </S.SelectTabsContainer>
    </S.Pool>
  )
}

export default Pool
