import Head from 'next/head'
import { GetStaticProps } from 'next'

import Explore from '../templates/Explore'

export interface IPoolAddress {
  id: string;
}
export interface IIndexProps {
  pools: IPoolAddress[];
}

export default function Index({ pools }: IIndexProps) {
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
      <Explore pools={pools} />
    </>
  )
}

const poolAddresses = `{
  id
}`

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch('https://backend.kassandra.finance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `query { pools ${poolAddresses}}`
      })
    })

    const pools = (await res.json())?.data.pools
    if (!pools) throw new Error('pools not found')

    return { props: { pools } }
  } catch (error) {
    console.log(error)
    return { notFound: true }
  }
}
