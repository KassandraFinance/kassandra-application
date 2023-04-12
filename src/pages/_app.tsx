import React from 'react'
import { AppProps } from 'next/app'
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { useRouter } from 'next/router'
import { SWRConfig } from 'swr'

import { persistor } from '../store'
import { PersistGate } from 'redux-persist/integration/react'

import GlobalStyles from '../styles/global'
import theme from '../styles/theme'

import { ReduxProvider } from '../store/reduxContext'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Toastify from '../components/Toastify'

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

  return (
    <ReduxProvider>
      <PersistGate loading={null} persistor={persistor}>
        <MatomoProvider value={instance}>
          <ThemeProvider theme={theme}>
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
              <meta property="og:url" content="https://kassandra.finance/" />
              <meta
                name="title"
                property="og:title"
                content="Kassandra - Decentralized Funds"
              />
              <meta
                name="description"
                property="og:description"
                content="Tokenized data-driven investment funds"
              />
              <meta
                name="image"
                property="og:image"
                content="https://kassandra.finance/kacy-og.png"
              />
              <meta property="og:image:width" content="1012" />
              <meta property="og:image:height" content="506" />

              {/* Twitter */}
              <meta property="twitter:card" content="summary_large_image" />
              <meta
                property="twitter:url"
                content="https://kassandra.finance/"
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
                content="https://kassandra.finance/kacy-og.png"
              />
              <meta property="twitter:site" content="@dao_kassandra" />

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
              {/* <meta property="og:url" content="https://kassandra.finance/" /> */}

              {/* <meta
            property="og:image:alt"
            content="Welcome to Kassandra DAO - Tokenized data-driven investment funds"
          />
          <meta
            property="og:image"
            content="https://kassandra.finance/favicon.svg"
          />
          <meta property="og:image:width" content="300" />
          <meta property="og:image:height" content="300" />
          <meta property="og:image:alt" content="Kassandra" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@dao_kassandra" />
          <meta name="twitter:title" content="Kassandra" />
          <meta
            name="twitter:image"
            content="https://kassandra.finance/kacy-og.png"
          />
          <meta
            name="twitter:image:alt"
            content="Welcome to Kassandra DAO - Tokenized data-driven investment funds"
          /> */}
            </Head>
            <Toastify />
            <GlobalStyles selectBackground={true} />
            <SWRConfig
              value={{
                refreshInterval: 10000,
                fetcher: url => fetch(url).then(res => res.json())
              }}
            >
              {path[1] !== 'manage' ? <Header /> : null}

              <Component {...pageProps} />
            </SWRConfig>
            {router.pathname === '/404' || path[1] === 'manage' ? null : (
              <Footer />
            )}
          </ThemeProvider>
        </MatomoProvider>
      </PersistGate>
    </ReduxProvider>
  )
}

export default MyApp
