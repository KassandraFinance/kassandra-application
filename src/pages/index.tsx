import Head from 'next/head'
import { GetStaticProps } from 'next'

import { BACKEND_KASSANDRA } from '../constants/tokenAddresses'

import Explore from '../templates/Explore'

export interface IPoolAddress {
  id: string;
}
export interface IIndexProps {
  poolsKassandra: IPoolAddress[];
}

export default function Index({ poolsKassandra }: IIndexProps) {
  return (
    <>
      <Head>
        {
          // Primary Meta Tags
        }
        <title>Meta Tags — Preview, Edit and Generate</title>
        <meta name="title" content="Meta Tags — Preview, Edit and Generate" />
        <meta name="description" content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!" />

        {
        // Open Graph / Facebook
        }
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/" />
        <meta property="og:title" content="Meta Tags — Preview, Edit and Generate" />
        <meta property="og:description" content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!" />
        <meta property="og:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png" />

        {
        // Twitter
        }
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta property="twitter:title" content="Meta Tags — Preview, Edit and Generate" />
        <meta property="twitter:description" content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!"/>
        <meta property="twitter:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png" />
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
      }
      return acc
    }, {
      // eslint-disable-next-line prettier/prettier
      poolsKassandra: [] as Array<{ id: string }>,
    })

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
