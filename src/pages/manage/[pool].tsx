import Head from 'next/head'

// import PoolManager from '../../templates/PoolManager'
import PageNotFound from '@/templates/404'

const Index = () => {
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

      <PageNotFound />
    </>
  )
}

export default Index
