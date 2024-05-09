import { useQuery } from '@tanstack/react-query'
import Big from 'big.js'

import { calcChange } from '@/utils/numerals'
import { kassandraClient } from '@/graphQLClients'

type UseMyPools = {
  day: number
  month: number
  userWallet?: string
  chainIn: string[]
}

export type PoolProps = {
  id: string
  address: string
  name: string
  symbol: string
  logo: string | null | undefined
  changeDay: string
  changeMonth: string
  price: string
  tvl: Big
  balanceInUSD: Big
  balance: Big
  logoChain: string
}

export const fetchMyPools = async ({
  userWallet,
  chainIn,
  day,
  month
}: UseMyPools): Promise<PoolProps[]> => {
  const pools = await kassandraClient
    .MyPools({ day, month, chainIn, userWallet })
    .then(res => res.pools)

  const myPoolsList: PoolProps[] = []
  for (const pool of pools) {
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

  return myPoolsList.sort((a, b) => Number(b.balance) - Number(a.balance))
}

export const useMyPools = ({ userWallet, chainIn, day, month }: UseMyPools) => {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['my-pools', userWallet, chainIn],
    queryFn: async () =>
      fetchMyPools({
        day,
        month,
        chainIn,
        userWallet
      }),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    enabled: !!userWallet
  })
}
