import { GetStaticPaths, GetStaticProps } from 'next'
import { SWRConfig } from 'swr'
import { ParsedUrlQuery } from 'querystring'

import { useAppDispatch } from '../../store/hooks'
import { IPoolSlice, setPool } from '../../store/reducers/pool'

import { PoolTokensProvider } from '../../context/PoolTokensContext'

import Pool from '../../templates/Pool'

interface IParams extends ParsedUrlQuery {
  address: string;
}

interface IPoolProps {
  pool: IPoolSlice;
}

const Index = ({ pool }: IPoolProps) => {
  const dispatch = useAppDispatch()
  dispatch(setPool(pool))

  return (
    <SWRConfig
      value={{
        refreshInterval: 10000,
        fetcher: url => fetch(url).then(res => res.json())
      }}
    >
      <PoolTokensProvider>
        <Pool />
      </PoolTokensProvider>
    </SWRConfig>
  )
}

const queryPool = `{
  id
  core_pool
  chainId
  logo
  chain {
    id
    chainName
    nativeTokenName
    nativeTokenSymbol
    nativeTokenDecimals
    rpcUrls
    blockExplorerUrl
    secondsPerBlock
    addressWrapped
  }
  name
  foundedBy
  symbol
  poolId
  url
  summary
  partners
  underlying_assets_addresses
  underlying_assets {
    token {
      id
      name
      logo
      symbol
      decimals
      price_usd
      is_wrap_token
      wraps {
        id
        symbol
        name
        logo
      }
    }
  }
}`

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://backend.kassandra.finance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: `query { pools { id }}` })
  })

  const pools: { id: string }[] = (await res.json()).data?.pools

  const paths = pools.map(pool => ({
    params: { address: pool.id }
  }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  // eslint-disable-next-line prettier/prettier
  const { address } = context.params as IParams

  try {
    const res = await fetch('https://backend.kassandra.finance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `query ($id: ID!) { pool (id: $id) ${queryPool}}`,
        variables: {
          id: address
        }
      })
    })

    const pool = (await res.json()).data?.pool

    if (!pool) throw new Error('pool not found')

    return { props: { pool } }
  } catch (error) {
    console.log(error)
    return { notFound: true }
  }
}

export default Index
