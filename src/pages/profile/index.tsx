import React from 'react'
import Head from 'next/head'
import { getAddress } from 'ethers'
import { useRouter } from 'next/router'
import { useConnectWallet } from '@web3-onboard/react'

import Web3Disabled from '../../components/Web3Disabled'

export default function Index() {
  const router = useRouter()
  const [{ wallet }, connect] = useConnectWallet()

  function handleConnect() {
    connect()
  }

  React.useEffect(() => {
    if (wallet?.provider) {
      router.push(
        {
          pathname: `/profile/${getAddress(wallet.accounts[0].address)}`
        },
        undefined,
        { scroll: false, shallow: false }
      )
    }
  }, [wallet])

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

      <Web3Disabled
        textHeader="Connect Wallet"
        textButton="Connect Wallet"
        bodyText="Please connect to see your profile"
        getFunction={handleConnect}
      />
    </>
  )
}
