import React from 'react'
import { Contract, JsonRpcProvider } from 'ethers'
import Big from 'big.js'

import { lpPoolType } from '@/constants/pools'
import PriceLP from '@/constants/abi/PriceLP.json'
import VAULT from '@/constants/abi/VaultBalancer.json'
import { VAULT_POLYGON, networks } from '@/constants/tokenAddresses'

import { ERC20 } from '@/hooks/useERC20'

type IGetPricePoolLPProps = {
  lpType?: lpPoolType
  poolAddress: string
  tokenPoolAddress: string
  tokenPoolPrice: Big
  chainId: number
  balancerPoolId?: string
}

const usePriceLP = () => {
  return React.useMemo(() => {
    const getReservesAvax = async (address: string, chainId: number) => {
      let value
      try {
        const provider = new JsonRpcProvider(networks[chainId].rpc)
        const contract = new Contract(address, PriceLP.abi, provider)
        const response = await contract.getReserves()

        value = response?._reserve0 ?? 0
      } catch (error) {
        value = 0
      }

      return Big(value)
    }

    const getReservesBalancer = async (
      chainId: number,
      tokenPoolAddress: string,
      balancerPoolId?: string
    ) => {
      if (!balancerPoolId) return Big(0)

      let value
      try {
        const provider = new JsonRpcProvider(networks[chainId].rpc)
        const vault = new Contract(VAULT_POLYGON, VAULT, provider)
        const res = await vault.getPoolTokenInfo(
          balancerPoolId,
          tokenPoolAddress
        )

        value = res?.cash ?? 0
      } catch {
        value = 0
      }

      return Big(value)
    }

    const getPricePoolLP = async ({
      lpType,
      chainId,
      poolAddress,
      tokenPoolAddress,
      tokenPoolPrice,
      balancerPoolId
    }: IGetPricePoolLPProps) => {
      const reserveValue =
        lpType === lpPoolType.AVAX
          ? await getReservesAvax(poolAddress, chainId)
          : await getReservesBalancer(chainId, tokenPoolAddress, balancerPoolId)

      const totalReserveValueInDollars = Big(reserveValue).mul(tokenPoolPrice)

      const ERC20Contract = await ERC20(poolAddress, networks[chainId].rpc)
      const supplyLPToken = await ERC20Contract.totalSupply()

      return totalReserveValueInDollars
        .mul(2)
        .div(Big(supplyLPToken.toString()))
        .toFixed()
    }

    return {
      getPricePoolLP
    }
  }, [])
}

export default usePriceLP
