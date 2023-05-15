import Head from 'next/head'
import { GetStaticProps } from 'next'

import { BACKEND_KASSANDRA } from '../constants/tokenAddresses'

import Explore from '../templates/Explore'

export interface IPoolAddress {
  id: string
}
export interface IIndexProps {
  poolsKassandra: IPoolAddress[]
}

export default function Index({ poolsKassandra }: IIndexProps) {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Kassandra</title>
        <meta name="title" content="Kassandra - Decentralized Funds" />
        <meta
          name="description"
          content="Tokenized data-driven investment funds"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dev.kassandra.finance/" />
        <meta property="og:title" content="Kassandra - Decentralized Funds" />
        <meta
          property="og:description"
          content="Tokenized data-driven investment funds"
        />
        <meta
          property="og:image"
          content="https://dev.kassandra.finance/kacy-og.png"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://dev.kassandra.finance/" />
        <meta
          property="twitter:title"
          content="Kassandra - Decentralized Funds"
        />
        <meta
          property="twitter:description"
          content="Tokenized data-driven investment funds"
        />
        <meta
          property="twitter:image"
          content="https://dev.kassandra.finance/kacy-og.png"
        />
        <meta property="twitter:site" content="@dao_kassandra" />
      </Head>

      <Explore poolsKassandra={poolsKassandra} />
    </>
  )
}

const props = `{
  id
  featured
}`

type Props = {
  id: string
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

    const poolsId = pools.reduce(
      (acc, { featured, id }) => {
        if (featured) {
          acc.poolsKassandra.push({ id })
        }
        return acc
      },
      {
        // eslint-disable-next-line prettier/prettier
        poolsKassandra: [] as Array<{ id: string }>
      }
    )

    return {
      props: {
        poolsKassandra: poolsId.poolsKassandra
      },
      revalidate: 30
    }
  } catch (error) {
    console.log('error ', error)
    return {
      props: {
        poolsKassandra: []
      },
      revalidate: 30
    }
  }
}
