import Head from 'next/head'

import Gov from '@/templates/Gov'

export default function Index() {
  return (
    <>
      <Head>
        <meta property="og:image:width" content="1012" />
        <meta property="og:image:height" content="506" />
        <meta property="og:url" content="https://kassandra.finance/" />
        <meta
          property="og:image"
          content="https://kassandra.finance/kacy-og.png"
        />
        <meta
          name="description"
          content="Create proposals, vote and help the Kassandra community flourish."
        />
      </Head>

      <Gov />
    </>
  )
}
