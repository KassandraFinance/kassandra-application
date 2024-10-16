import React from 'react'
import {
  JsonRpcProvider,
  BrowserProvider,
  Contract,
  ethers,
  Network
} from 'ethers'
import Big from 'big.js'
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

const useCreatePool = (chainId: number) => {
  const [{ wallet }] = useConnectWallet()
  const { txNotification, transactionErrors } = useTransaction()

  const network = networks[chainId]
  const rpcURL = network.rpc
  const factoryAddress = network.factory
  const networkInfo = new Network(network.chainName, network.chainId)
  const readProvider = new JsonRpcProvider(rpcURL, networkInfo, {
    staticNetwork: networkInfo
  })

  const [contract, setContract] = React.useState({
    send: new Contract(
      factoryAddress,
      KassandraManagedControllerFactoryAbi,
      readProvider
    ),
    read: new Contract(
      factoryAddress,
      KassandraManagedControllerFactoryAbi,
      readProvider
    )
  })

  React.useEffect(() => {
    if (!wallet) return

    const sendProvider = new BrowserProvider(wallet.provider)
    async function signContranct() {
      const signer = await sendProvider.getSigner()

      setContract({
        send: new Contract(
          factoryAddress,
          KassandraManagedControllerFactoryAbi,
          signer
        ),
        read: new Contract(
          factoryAddress,
          KassandraManagedControllerFactoryAbi,
          readProvider
        )
      })
    }

    signContranct()
  }, [wallet, chainId])

  function gasMargin(estimateGas: string) {
    const twentyPercentOfValue = 1.2
    const calculateGas = Big(estimateGas).mul(twentyPercentOfValue).toNumber()
    return BigInt(Math.round(calculateGas))
  }

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

      const estimateGas = await contract.send.create.estimateGas(
        pool.poolParams,
        pool.settingsParams,
        pool.feesSettings,
        pool.joinParams,
        ethers.ZeroHash
      )

      const gasLimit = gasMargin(estimateGas.toString())

      const tx = await contract.send.create(
        pool.poolParams,
        pool.settingsParams,
        pool.feesSettings,
        pool.joinParams,
        ethers.ZeroHash,
        {
          gasLimit
        }
      )

      const receipt = await txNotification(tx, message, callbacks)

      return {
        response,
        receipt
      }
    } catch (error) {
      const contractInfo = {
        contractName: 'KassandraManagedControllerFactory',
        functionName: 'create'
      }
      transactionErrors(error, contractInfo, callbacks?.onFail)

      return { res: 0 }
    }
  }

  return {
    create
  }
}

export default useCreatePool
