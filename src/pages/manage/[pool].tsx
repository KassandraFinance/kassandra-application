import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'

import { BACKEND_KASSANDRA } from '../../constants/tokenAddresses'
import { IPoolSlice } from '../../store/reducers/pool'

import PoolManager from '../../templates/PoolManager'

interface IParams extends ParsedUrlQuery {
  address: string;
}

const queryPool = `{
  id
  address
  vault
  chain_id
  chainId
  logo
  pool_version
  strategy
  chain {
    id
    logo
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
  partners {
    logo
    url
  }
  total_value_locked_usd
  underlying_assets_addresses
  underlying_assets(orderBy: weight_normalized, orderDirection: desc) {
    balance
    weight_normalized
    weight_goal_normalized
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
        decimals
        price_usd
        symbol
        name
        logo
      }
    }
  }
  weight_goals(orderBy: end_timestamp orderDirection: desc first: 2) {
    start_timestamp
    end_timestamp
    weights(orderBy: weight_normalized orderDirection: desc) {
      token {
        id
      }
      weight_normalized
    }
  }
}`

interface IPoolProps {
  pool: IPoolSlice;
}

const Index = ({ pool }: IPoolProps) => {
  return (
    <>
      <Head>
        <meta
          property="og:image"
          content="https://kassandra.finance/kacy-og.png"
        />
        <meta property="og:image:width" content="1012" />
        <meta property="og:image:height" content="506" />
        <meta property="og:url" content="https://kassandra.finance/" />
      </Head>

      <PoolManager pool={pool} />
    </>
  )
}


export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(BACKEND_KASSANDRA, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: `query { pools { id }}` })
  })

  const pools: { id: string }[] = (await res.json()).data?.pools

  const paths = pools?.map(pool => ({
    params: { pool: pool.id }
  }))
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async (context) => {
  // eslint-disable-next-line prettier/prettier
  const { pool } = context.params as IParams

  try {
    const res = await fetch(BACKEND_KASSANDRA, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `query ($id: ID!) { pool (id: $id) ${queryPool}}`,
        variables: {
          id: pool
        }
      })
    })

    const poolData = (await res.json()).data?.pool

    if (!poolData) throw new Error('pool not found')

    return { props: { pool: poolData }, revalidate:  300 }
  } catch (error) {
    console.log(error)
    return { notFound: true, revalidate:  60 }
  }
}


export default Index
