import React from 'react'
import Big from 'big.js'
import { getAddress } from 'ethers'
import { useConnectWallet } from '@web3-onboard/react'

import { useMyPools } from '@/hooks/query/useMyPools'

import AssetsTable, {
  PoolProps
} from '@/templates/Profile/Portfolio/AssetsTable'
import AnyCard from '@/components/AnyCard'

import { calcChange } from '@/utils/numerals'

import * as S from './styles'

type Candlestick = {
  close: string
  timestamp: number
}

type Investor = {
  wallet: string
  amount: string
}

type Chain = {
  id: string
  icon?: string | null
}

type Pool = {
  id: string
  name: string
  symbol: string
  price_usd: string
  total_value_locked_usd: string
  address: string
  pool_id?: number | null
  logo?: string | null
  chain: Chain
  investors: Investor[]
  now: Candlestick[]
  day: Candlestick[]
  month: Candlestick[]
}

interface IMyPoolsTableprops {
  selectedChains: string[]
}

export function MyPoolsTable({ selectedChains }: IMyPoolsTableprops) {
  const [myPools, setMyPools] = React.useState(new Array(6).fill({}))

  const [{ wallet }, conect] = useConnectWallet()

  const params = {
    day: Math.trunc(Date.now() / 1000 - 60 * 60 * 24),
    month: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 30),
    chainIn: selectedChains,
    userWallet: wallet ? getAddress(wallet.accounts[0].address) : undefined
  }

  const { data } = useMyPools(params)

  async function handleGetMyPools(poolData: Pool[]) {
    const myPoolsList: PoolProps[] = []
    for (const pool of poolData) {
      const price = pool.price_usd
      const tvl = Big(pool.total_value_locked_usd ?? 0)
      const changeDay = calcChange(pool?.now[0]?.close, pool?.day[0]?.close)
      const changeMonth = calcChange(pool.now[0]?.close, pool.month[0]?.close)
      const balance = pool.investors[0].amount

      myPoolsList.push({
        id: pool.id,
        address: pool.address,
        name: pool.name,
        symbol: pool.symbol,
        logo: pool.logo,
        changeDay,
        changeMonth,
        price,
        tvl,
        balance: Big(balance),
        balanceInUSD: Big(balance).mul(price),
        logoChain: pool?.chain?.icon ?? ''
      })
    }

    setMyPools(
      myPoolsList.sort((a, b) => Number(b.balance) - Number(a.balance))
    )
  }

  React.useEffect(() => {
    if (!data || !wallet) return setMyPools(new Array(6).fill({}))

    handleGetMyPools(data)
  }, [data, wallet])

  return (
    <S.MyPoolTable>
      {wallet?.provider ? (
        <AssetsTable pools={myPools} />
      ) : (
        <AnyCard
          text="Please connect your wallet to view the pools you have invested in."
          button2
          buttonText="Connect Wallet"
          onClick={() => conect()}
        />
      )}
    </S.MyPoolTable>
  )
}
