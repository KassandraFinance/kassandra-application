import { networks } from '@/constants/tokenAddresses'
import { FallbackProvider, JsonRpcProvider, Network } from 'ethers'

export async function handleInstaceProvider(chainId: number) {
  const networkInfo = networks[chainId]
  const network = new Network(networkInfo.chainName, networkInfo.chainId)
  const provider = new JsonRpcProvider(networkInfo.rpc, network, {
    staticNetwork: network
  })

  return provider
}

export function handleInstanceFallbackProvider(chainId: number) {
  const networkInfo = networks[chainId]
  const network = new Network(networkInfo.chainName, networkInfo.chainId)

  const providers = []
  for (const rpcUrl of networkInfo.rpcs) {
    const provider = new JsonRpcProvider(rpcUrl, network, {
      staticNetwork: network
    })

    providers.push(provider)
  }

  const fallbackProvider = new FallbackProvider(providers)

  return fallbackProvider
}
