import React from 'react'
import Head from 'next/head'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { useRouter } from 'next/router'

type Props = {
  id: string
}

const Page = ({ id }: Props) => {
  console.log(
    'teste',
    `https://app.kassandra.finance/api/funds/shared?id=${id}`
  )
  const router = useRouter()
  const fund = id.split('-').pop()

  //   React.useEffect(() => {
  //     document
  //       // eslint-disable-next-line prettier/prettier
  //       .querySelector("meta[property='og:image']")!
  //       .setAttribute('content', `${URL_API[process.env.NEXT_PUBLIC_URL_API || 4]}/api/funds/shared?id=${id}`)
  //   }, [id])

  React.useEffect(() => {
    // router.push(`/pool/${fund}`)
  }, [])

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
  id: string;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext<Fund>
): Promise<GetServerSidePropsResult<Props>> => {
  if (typeof context.params?.id === 'string') {
    return {
      props: {
        id: context.params?.id
      }
    }
  } else {
    return {
      notFound: true
    }
  }
}

export default Page
