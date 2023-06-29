import React from 'react'
import { AppProps } from 'next/app'
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { useRouter } from 'next/router'
import { SWRConfig } from 'swr'
import { Web3OnboardProvider } from '@web3-onboard/react'

import GlobalStyles from '@/styles/global'
import theme from '@/styles/theme'
import web3Onboard from '@/utils/web3Onboard'

import { ReduxProvider } from '@/store/reduxContext'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Toastify from '@/components/Toastify'

const matomoUrl = 'https://stats.kassandra.finance'

const instance = createInstance({
  disabled:
    process.env.NODE_ENV === 'development' ||
    process.env.NEXT_PUBLIC_MASTER !== '1',
  urlBase: matomoUrl,
  siteId: 4,
  trackerUrl: `${matomoUrl}/api.php`,
  srcUrl: `${matomoUrl}/api.js`,
  configurations: {
    setRequestMethod: 'POST'
  }
})

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()
  const path = router.asPath.split('/')
  const pathClearQuestionMark = path[1].split('?')
  const pathClearHashtag = pathClearQuestionMark[0].split('#')

  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <ReduxProvider>
        <MatomoProvider value={instance}>
          <ThemeProvider theme={theme}>
            <Head>
              <title>Kassandra</title>

              <meta
                name="description"
                content="Tokenized data-driven investment funds"
              />

              <link rel="manifest" href="/manifest.json" />
              <link rel="preconnect" href="https://fonts.gstatic.com" />
              <link
                href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500&amp;display=swap"
                rel="stylesheet"
              />
              <link rel="icon" href="/favicon.ico" />
              <link
                rel="icon"
                href="https://kassandra.finance/favicon.svg"
                sizes="any"
              />
              <meta property="og:site_name" content="Kassandra" />
              <meta property="og:type" content="website" />
              <meta
                property="og:title"
                content="Kassandra - Decentralized Funds"
              />
            </Head>
            <Toastify />
            <GlobalStyles selectBackground={true} />
            <SWRConfig
              value={{
                refreshInterval: 10000,
                fetcher: url => fetch(url).then(res => res.json())
              }}
            >
              {pathClearHashtag[0] !== 'manage' ? <Header /> : null}

              <Component {...pageProps} />
            </SWRConfig>
            {router.pathname === '/404' ||
            pathClearHashtag[0] === 'manage' ? null : (
              <Footer />
            )}
          </ThemeProvider>
        </MatomoProvider>
      </ReduxProvider>
    </Web3OnboardProvider>
  )
}

export default MyApp
