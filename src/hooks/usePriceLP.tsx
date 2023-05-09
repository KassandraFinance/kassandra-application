import React from "react"
import { AbiItem } from "web3-utils"
import Web3 from "web3"
import Big from "big.js"
import BigNumber from 'bn.js'

import { VAULT_POLYGON, networks } from "@/constants/tokenAddresses"
import PriceLP from "../constants/abi/PriceLP.json"
import VAULT from "../constants/abi/VaultBalancer.json"

import { ERC20 } from "./useERC20Contract"

import { useAppSelector } from "../store/hooks"

const usePriceLP = (chainId: number) => {
  const web3 = new Web3(networks[chainId].rpc)
  const userWalletAddress = useAppSelector(state => state.userWalletAddress)

  return React.useMemo(() => {
    const getContract = (address: string) => {
      // eslint-disable-next-line prettier/prettier
      const contract = new web3.eth.Contract((PriceLP.abi as unknown) as AbiItem, address)
      return contract
    }

    //maxPriorityFeePerGas: null, maxFeePerGas: null 1,500000031  [0] some((element: string) => element === 'PurchaseExecuted')  gas: 270804, gasPrice: 1500000031
    const getReserves = async (addressPriceLP: string) => {
      const contract = getContract(addressPriceLP)
      const value = await contract.methods.getReserves().call({ from: userWalletAddress })
      return value
    }


    const getPriceKacyAndLPBalancer = async (priceWETH: number, poolAddress: string) => {
      const vault = new web3.eth.Contract((VAULT as unknown) as AbiItem, VAULT_POLYGON)
      const res = await vault.methods.getPoolTokenInfo("0xfaf3bc722d34146be83a2aac40b43148a51a9126000200000000000000000b4c", "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619").call()

      const wethReserve = Big(res.cash).mul(priceWETH)

      const ERC20Contract = ERC20(poolAddress, web3)
      const supplyLPToken = await ERC20Contract.totalSupply()
      if (supplyLPToken.lte(new BigNumber('0'))) {
        return Big('0')
      }
      return wethReserve.mul(2).div(supplyLPToken.toString())
    }

    const getPriceKacyAndLP = async (addressKacyAvax: string, addressDaiAvax: string, getPriceLP: boolean) => {
      const reservesKacyAvax = await getReserves(addressKacyAvax)

      const reservesDaiAvax = await getReserves(addressDaiAvax)

      let daiReserve = reservesDaiAvax._reserve1
      let avaxReserve = reservesDaiAvax._reserve0
      let kacyReserve = reservesKacyAvax._reserve1
      let avaxKacyReserve = reservesKacyAvax._reserve0

      if (process.env.NEXT_PUBLIC_MASTER !== '1') {
        daiReserve = reservesDaiAvax._reserve0
        avaxReserve = reservesDaiAvax._reserve1
        kacyReserve = reservesKacyAvax._reserve0
        avaxKacyReserve = reservesKacyAvax._reserve1
      }

      const avaxInDollar = Big(daiReserve).div(Big(avaxReserve))
      const kacyPriceInDollar = avaxInDollar.mul(Big(avaxKacyReserve).div(kacyReserve))

      if (getPriceLP) {
        const ERC20Contract = ERC20(addressKacyAvax, web3)

        const totalAvaxInDollars = Big(avaxKacyReserve).mul(avaxInDollar)

        const supplyLPToken = await ERC20Contract.totalSupply()

        if (supplyLPToken.toString() !== '0') {
          const priceLP = totalAvaxInDollars.mul(2).div(Big(supplyLPToken.toString()))
          return { kacyPriceInDollar, priceLP }
        }
      }

      return { kacyPriceInDollar }
    }

    return {
      getContract,
      getReserves,
      getPriceKacyAndLP,
      getPriceKacyAndLPBalancer
    }
  }, [userWalletAddress])
}

export default usePriceLP
