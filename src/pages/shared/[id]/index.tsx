import React from 'react'
import Head from 'next/head'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { useRouter } from 'next/router'

type Props = {
  id: string
}

const Page = ({ id }: Props) => {
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
        <meta
          property="og:image"
          key="ogImage"
          content={`https://app.kassandra.finance/api/funds/shared?id=${id}`}
        />
        <meta property="og:url" content={`/shared/${id}`} />
        <meta
          name="twitter:card"
          key="twitterCard"
          content="summary_large_image"
        />
        <meta
          name="twitter:image"
          key="twitterImage"
          content={`https://app.kassandra.finance/api/funds/shared?id=${id}`}
        />
        <meta property="og:image:width" content="1000" />
        <meta property="og:image:height" content="500" />
      </Head>

      <div>
        <img
          src={`https://app.kassandra.fianance/api/funds/shared?id=${id}`}
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
