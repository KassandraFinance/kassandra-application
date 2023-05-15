import React from 'react'
import Head from 'next/head'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { ParsedUrlQuery } from 'querystring'

type Props = {
  id: string
}

const Page = ({ id }: Props) => {
  const fund = id.split('-').pop()

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
        <meta
          property="og:url"
          content={`https://app.kassandra.finance/pool/${id}`}
        />
        <meta property="og:title" content="Kassandra - Decentralized Funds" />
        <meta
          property="og:description"
          content="Tokenized data-driven investment funds"
        />
        <meta
          property="og:image"
          content={`https://app.kassandra.finance/api/funds/shared?id=${id}`}
        />
        <meta property="og:site_name" content="Kassandra" />
        <meta property="og:image:width" content="1000" />
        <meta property="og:image:height" content="500" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`https://app.kassandra.finance/pool/${id}`}
        />
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
          content={`https://app.kassandra.finance/api/funds/shared?id=${id}`}
        />
        <meta property="twitter:site" content="@dao_kassandra" />

        {/* Tag for redirecting of the page */}
        <meta
          httpEquiv="refresh"
          content={`1; url = https://app.kassandra.finance/pool/${fund}`}
        />
      </Head>
      <div>
        <img
          src={`https://app.kassandra.finance/api/funds/shared?id=${id}`}
          alt=""
        />
      </div>
    </>
  )
}

interface Fund extends ParsedUrlQuery {
  id: string
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext<Fund>
): Promise<GetServerSidePropsResult<Props>> => {
  if (typeof context.params?.id === 'string') {
    return {
      props: {
        id: context.params.id
      }
    }
  } else {
    return {
      notFound: true
    }
  }
}

export default Page
