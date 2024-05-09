import Head from 'next/head'
import { GetStaticProps } from 'next'
import { dehydrate, QueryClient } from '@tanstack/react-query'

import { fetchFeaturedPools } from '@/hooks/query/useFeaturedPools'

import Explore from '@/templates/Explore'

export default function Index() {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Kassandra</title>
        <meta
          name="title"
          content="Kassandra DAO - Tokenized crypto portfolios"
        />
        <meta
          name="description"
          content="Find a strategy that suits your investment needs."
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dev.kassandra.finance/" />
        <meta
          property="og:title"
          content="Kassandra DAO - Tokenized crypto portfolios"
        />
        <meta
          property="og:description"
          content="Find a strategy that suits your investment needs."
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
          content="Kassandra DAO - Tokenized crypto portfolios"
        />
        <meta
          property="twitter:description"
          content="Find a strategy that suits your investment needs."
        />
        <meta
          property="twitter:image"
          content="https://dev.kassandra.finance/kacy-og.png"
        />
        <meta property="twitter:site" content="@dao_kassandra" />
      </Head>

      <Explore />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  try {
    const dateNow = new Date()
    const params = {
      price_period: 86400,
      period_selected: Math.trunc(dateNow.getTime() / 1000 - 60 * 60 * 24 * 30),
      day: Math.trunc(Date.now() / 1000 - 60 * 60 * 24),
      month: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 30),
      chainIn: ['137', '42161', '43114']
    }
    await queryClient.prefetchQuery({
      queryKey: ['featured-pools'],
      queryFn: () => fetchFeaturedPools(params)
    })

    return {
      props: {
        dehydrateState: dehydrate(queryClient)
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
