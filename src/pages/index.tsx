import Head from 'next/head'
import { GetStaticProps } from 'next'

import { BACKEND_KASSANDRA } from '../constants/tokenAddresses'

import Explore from '../templates/Explore'

export interface IPoolAddress {
  id: string;
}
export interface IIndexProps {
  poolsCommunity: IPoolAddress[];
  poolsKassandra: IPoolAddress[];
}

export default function Index({ poolsKassandra, poolsCommunity }: IIndexProps) {
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
      <Explore poolsCommunity={poolsCommunity} poolsKassandra={poolsKassandra} />
    </>
  )
}

const props = `{
  id
  featured
}`

type Props = {
  id: string,
  featured: null | boolean
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch(BACKEND_KASSANDRA, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `query { pools ${props} }`
      })
    })

    const pools: Props[] = (await res.json())?.data.pools

    if (!pools) throw new Error('pools not found')

    const poolsId = pools.reduce((acc, { featured, id }) => {
      if (featured) {
        acc.poolsKassandra.push({ id })
      } else {
        acc.poolsCommunity.push({ id })
      }
      return acc
    }, {
      // eslint-disable-next-line prettier/prettier
      poolsKassandra: [] as Array<{ id: string }>,
      poolsCommunity: [] as Array<{ id: string }>
    })

    return {
      props: {
        poolsCommunity: poolsId.poolsCommunity,
        poolsKassandra: poolsId.poolsKassandra
      }
    }
  } catch (error) {
    console.log('error ', error)
    return {
      props: {
        poolsCommunity: [],
        poolsKassandra: []
      }
    }
  }
}
