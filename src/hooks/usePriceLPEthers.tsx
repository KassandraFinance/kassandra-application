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

const usePriceLP = (chainId: number) => {
  const provider = new JsonRpcProvider(networks[chainId].rpc)

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

    const getContract = (address: string) => {
      const contract = new Contract(address, PriceLP.abi, provider)

      return contract
    }

    const getReserves = async (addressPriceLP: string) => {
      const contract = getContract(addressPriceLP)
      const value = await contract.getReserves()
      return value
    }

    const getPriceKacyAndLPBalancer = async (
      priceWETH: string,
      poolAddress: string
    ) => {
      const provider = new JsonRpcProvider(networks[137].rpc)
      const vault = new Contract(VAULT_POLYGON, VAULT, provider)
      const res = await vault.getPoolTokenInfo(
        '0xfaf3bc722d34146be83a2aac40b43148a51a9126000200000000000000000b4c',
        '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619'
      )

      const wethReserve = Big(res.cash).mul(priceWETH)

      const ERC20Contract = await ERC20(poolAddress, networks[137].rpc)
      const supplyLPToken = await ERC20Contract.totalSupply()
      if (Big(supplyLPToken).lte(0)) {
        return Big('0')
      }
      return wethReserve.mul(2).div(supplyLPToken.toString())
    }

    const getPriceKacyAndLP = async (
      addressKacyAvax: string,
      addressDaiAvax: string,
      getPriceLP: boolean
    ) => {
      const reservesKacyAvax = await getReserves(addressKacyAvax) //
      const reservesDaiAvax = await getReserves(addressDaiAvax)

      let daiReserve = reservesDaiAvax._reserve1
      let avaxReserve = reservesDaiAvax._reserve0
      let kacyReserve = reservesKacyAvax._reserve1
      let avaxKacyReserve = reservesKacyAvax._reserve0 //

      if (process.env.NEXT_PUBLIC_MASTER !== '1') {
        daiReserve = reservesDaiAvax._reserve0
        avaxReserve = reservesDaiAvax._reserve1
        kacyReserve = reservesKacyAvax._reserve0
        avaxKacyReserve = reservesKacyAvax._reserve1 //
      }

      const avaxInDollar = Big(daiReserve).div(Big(avaxReserve))
      const kacyPriceInDollar = avaxInDollar.mul(
        Big(avaxKacyReserve).div(kacyReserve)
      )

      if (getPriceLP) {
        const ERC20Contract = await ERC20(
          addressKacyAvax,
          networks[chainId].rpc
        )

        console.log('avaxInDollar', avaxInDollar.toFixed())
        const totalAvaxInDollars = Big(avaxKacyReserve).mul(avaxInDollar)

        const supplyLPToken = await ERC20Contract.totalSupply()

        if (supplyLPToken.toString() !== '0') {
          const priceLP = totalAvaxInDollars
            .mul(2)
            .div(Big(supplyLPToken.toString()))
          return { kacyPriceInDollar, priceLP }
        }
      }

      return { kacyPriceInDollar }
    }

    return {
      getContract,
      getReserves,
      getPriceKacyAndLP,
      getPriceKacyAndLPBalancer,
      getPricePoolLP
    }
  }, [])
}

export default usePriceLP
