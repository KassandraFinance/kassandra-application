import React from 'react'
import { JsonRpcProvider, BrowserProvider, Contract, ethers } from 'ethers'
import { useConnectWallet } from '@web3-onboard/react'
import KassandraManagedControllerFactoryAbi from '@/constants/abi/KassandraManagedControllerFactory.json'

import useTransaction, {
  CallbacksType,
  MessageType
} from '@/hooks/useTransaction'
import { networks } from '@/constants/tokenAddresses'

type PoolCreationType = {
  poolParams: {
    name: string | undefined
    symbol: string | undefined
    isPrivatePool: boolean
    whitelist: string
    amountsIn: string[]
  }
  settingsParams: {
    tokens: string[]
    normalizedWeights: string[]
    swapFeePercentage: string
    swapEnabledOnStart: boolean
    mustAllowlistLPs: boolean
    managementAumFeePercentage: string
    aumFeeId: number
  }
  feesSettings: {
    feesToManager: string
    feesToReferral: string
  }
  joinParams: {
    tokenIn: string
    amountIn: string
    datas: string[]
  }
}

const useCreatePool = (address: string) => {
  const [{ wallet }] = useConnectWallet()
  const { txNotification, transactionErrors } = useTransaction()

  const rpcURL = networks[43114].rpc
  const readProvider = new JsonRpcProvider(rpcURL)

  const [contract, setContract] = React.useState({
    send: new Contract(
      address,
      KassandraManagedControllerFactoryAbi,
      readProvider
    ),
    read: new Contract(
      address,
      KassandraManagedControllerFactoryAbi,
      readProvider
    )
  })

  async function create(
    pool: PoolCreationType,
    message?: MessageType,
    callbacks?: CallbacksType
  ) {
    try {
      const response = await contract.send.create.staticCall(
        pool.poolParams,
        pool.settingsParams,
        pool.feesSettings,
        pool.joinParams,
        ethers.ZeroHash,
        {
          from: wallet?.accounts[0].address
        }
      )

      const tx = await contract.send.create(
        pool.poolParams,
        pool.settingsParams,
        pool.feesSettings,
        pool.joinParams,
        ethers.ZeroHash
      )

      const receipt = await txNotification(tx, message, callbacks)

      return {
        response,
        receipt
      }
    } catch (error) {
      transactionErrors(error, callbacks?.onFail)

      return { res: 0 }
    }
  }

  React.useEffect(() => {
    if (!wallet) return

    const sendProvider = new BrowserProvider(wallet.provider)
    async function signContranct() {
      const signer = await sendProvider.getSigner()

      setContract({
        send: new Contract(
          address,
          KassandraManagedControllerFactoryAbi,
          signer
        ),
        read: new Contract(
          address,
          KassandraManagedControllerFactoryAbi,
          readProvider
        )
      })
    }

    signContranct()
  }, [wallet])

  return {
    create
  }
}

export default useCreatePool
