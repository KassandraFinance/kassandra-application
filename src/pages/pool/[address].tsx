import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { dehydrate, QueryClient } from '@tanstack/react-query'

import { isAddress, getAddress } from 'ethers'

import { SUBGRAPH_URL } from '../../constants/tokenAddresses'

import { fetchPoolData } from '@/hooks/query/usePoolData'

import Pool from '../../templates/PoolV2'

interface IParams extends ParsedUrlQuery {
  address: string
}

const Index = () => {
  return <Pool />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(SUBGRAPH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: `query { pools { id }}` })
  })

  const pools: { id: string }[] = (await res.json()).data?.pools

  const paths = pools?.map(pool => ({
    params: { address: pool.id }
  }))
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async context => {
  const queryClient = new QueryClient()

  const { address } = context.params as IParams

  let poolId = address

  if (isAddress(address)) {
    poolId = getAddress(address)
  }

  try {
    await queryClient.prefetchQuery({
      queryKey: ['pool-data', poolId],
      queryFn: () => fetchPoolData({ id: poolId })
    })

    const res = dehydrate(queryClient)

    if (!res.queries[0].state.data) throw new Error('pool not found')

    return {
      props: { dehydrateState: res },
      revalidate: 300
    }
  } catch (error) {
    console.log(error)
    return { notFound: true, revalidate: 60 }
  }
}

export default Index
