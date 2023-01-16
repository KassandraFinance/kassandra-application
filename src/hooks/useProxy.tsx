/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import BigNumber from 'bn.js'
import { AbiItem } from "web3-utils"

import HermesProxy from "../constants/abi/HermesProxy.json"
import { addressNativeToken1Inch } from "../constants/tokenAddresses"

import web3 from '../utils/web3'
import { TransactionCallback } from '../utils/txWait'

import { useAppSelector } from '../store/hooks'
import usePoolContract from '../hooks/usePoolContract'

const referral = "0x0000000000000000000000000000000000000000"

const useProxy = (address: string, crpPool: string, coreAddress: string) => {
  const [contract, setContract] = React.useState(new web3.eth.Contract((HermesProxy as unknown) as AbiItem, address))

  const { pool } = useAppSelector(state => state)
  const corePool = usePoolContract(pool.core_pool)

  const checkTokenInThePool = async (address: string) => {
    const tokens = pool.underlying_assets

    const tokensChecked = tokens.map(item => {
      if (item.token.is_wrap_token === 1) {
        return {
          address: item.token.wraps.id.toLowerCase(),
          is_wraps: 1,
          yrt: item.token.id
        }
      }
      return {
        address: item.token.id.toLowerCase(),
        is_wraps: 0,
        yrt: ""
      }
    })

    return tokensChecked.find(token => {
      if (token.address === address.toLowerCase()) {
        return token
      }
    })
  }

  React.useEffect(() => {
    setContract(new web3.eth.Contract((HermesProxy as unknown) as AbiItem, address))
  }, [address])

  return React.useMemo(() => {

    const joinswapExternAmountIn = async (
      tokenIn: string,
      tokenAmountIn: BigNumber,
      minPoolAmountOut: BigNumber,
      walletAddress: string,
      data: any,
      callback: TransactionCallback
    ) => {
      const tokensChecked = await checkTokenInThePool(tokenIn)
      // const wrapped = await contract.methods.wNativeToken().call()
      const avaxValue = tokenIn === addressNativeToken1Inch ? tokenAmountIn : new BigNumber(0)

      if (tokensChecked) {
        const res = await contract.methods
          .joinswapExternAmountIn(
            crpPool,
            tokenIn,
            tokenAmountIn,
            minPoolAmountOut,
            referral
          )
          .send({ from: walletAddress, value: avaxValue }, callback)

        return res
      }

      const { address: tokenExchange } = await corePool.checkTokenWithHigherLiquidityPool()

      const res = await contract.methods
        .joinswapExternAmountInWithSwap(
          crpPool,
          tokenIn,
          tokenAmountIn,
          tokenExchange,
          minPoolAmountOut,
          referral,
          data
        )
        .send({ from: walletAddress, value: avaxValue }, callback)

      return res
    }

    const exitswapPoolAmountIn = async (
      tokenOut: string,
      tokenAmountIn: BigNumber,
      minPoolAmountOut: BigNumber,
      walletAddress: string,
      callback: TransactionCallback
    ) => {

      const res = await contract.methods
        .exitswapPoolAmountIn(crpPool, tokenOut, tokenAmountIn, minPoolAmountOut)
        .send({ from: walletAddress }, callback)

        return res
    }

    const exitPool = async (
      poolAmountIn: BigNumber,
      tokensOut: Array<string>,
      minAmountsOut: Array<BigNumber>,
      walletAddress: string,
      callback: TransactionCallback
    ) => {
      const res = await contract.methods
        .exitPool(crpPool, poolAmountIn, tokensOut, minAmountsOut)
        .send({ from: walletAddress }, callback)

      return res
    }

    const swapExactAmountIn = async (
      tokenIn: string,
      tokenAmountIn: BigNumber,
      tokenOut: string,
      minAmountOut: BigNumber,
      walletAddress: string,
      callback: TransactionCallback
    ) => {
      const wrapped = await contract.methods.wNativeToken().call()

      const avaxValue = tokenIn === wrapped ? tokenAmountIn : new BigNumber(0)
      const res = await contract.methods
        .swapExactAmountIn(
          coreAddress,
          tokenIn,
          tokenAmountIn,
          tokenOut,
          minAmountOut,
          new BigNumber('10').pow(new BigNumber(36))
        )
        .send({ from: walletAddress, value: avaxValue }, callback)
      return res
    }

    /* CALL */

    const spotPrice = async (corePoolAddress: string, swapOutAddress: string, swapInAddress: string) => {
      const res = await contract.methods.getSpotPrice(corePoolAddress, swapOutAddress, swapInAddress).call()

      return new BigNumber(res)
    }

    const exchangeRate = async (corePoolAddress: string, swapOutAddress: string) => {
      const res = await contract.methods.exchangeRate(corePoolAddress, swapOutAddress).call()

      return new BigNumber(res)
    }

    const tryJoinswapExternAmountIn = async (
      tokenIn: string,
      tokenAmountIn: BigNumber,
      minPoolAmountOut: BigNumber,
      walletAddress: string
      ) => {
        // const wrapped = await contract.methods.wNativeToken().call()
        // const avaxValue = tokenIn !== wrapped ? tokenAmountIn : new BigNumber(0)

        const res = await contract.methods
        .joinswapExternAmountIn(crpPool, tokenIn, tokenAmountIn, minPoolAmountOut, referral)
        .call({ from: walletAddress, value: new BigNumber(0) })

      return res
    }

    const tryJoinswapPoolAmountOut = async (
      tokenIn: string,
      tokenAmountOut: BigNumber,
      maxAmountIn: BigNumber,
      walletAddress: string
    ) => {
      const wrapped = await contract.methods.wNativeToken().call()

      const avaxValue = tokenIn === wrapped ? tokenAmountOut : new BigNumber(0)

      const res = await contract.methods
        .joinswapPoolAmountOut(crpPool, tokenIn, tokenAmountOut, maxAmountIn)
        .call({ from: walletAddress, value: avaxValue })

      return res
    }

    const tryExitswapPoolAmountIn = async (
      tokenOut: string,
      poolAmountIn: BigNumber,
      minAmountOut: BigNumber,
      walletAddress: string
    ) => {

      const res = contract.methods
        .exitswapPoolAmountIn(crpPool, tokenOut, poolAmountIn, minAmountOut)
        .call({ from: walletAddress })

      return res
    }

    const tryExitPool = async (
      poolAmountIn: BigNumber,
      tokensOut: Array<string>,
      minAmountsOut: Array<BigNumber>,
      walletAddress: string,
    ) => {
      const res = await contract.methods
        .exitPool(crpPool, poolAmountIn, tokensOut, minAmountsOut)
        .call({ from: walletAddress })

      return res
    }

    const trySwapExactAmountIn = async (
      tokenIn: string,
      tokenAmountIn: BigNumber,
      tokenOut: string,
      walletAddress: string,
    ) => {
      const wrapped = await contract.methods.wNativeToken().call()

      const avaxValue = tokenIn === wrapped ? tokenAmountIn : new BigNumber(0)
      const res = await contract.methods
        .swapExactAmountIn(
          coreAddress,
          tokenIn,
          tokenAmountIn,
          tokenOut,
          new BigNumber(0),
          new BigNumber('10').pow(new BigNumber(36))
        )
        .call({ from: walletAddress, value: avaxValue })

      return res
    }

    const estimatedGas = async (userWalletAddress: string, tokenIn: string, minPoolAmountOut: BigNumber, amountTokenIn: BigNumber, data: any) => {
      const tokensChecked = await checkTokenInThePool(tokenIn)
      const avaxValue = tokenIn === addressNativeToken1Inch ? amountTokenIn : new BigNumber(0)
      const { address: tokenExchange } = await corePool.checkTokenWithHigherLiquidityPool()

      const estimateGas = await web3.eth.estimateGas({
        // "value": '0x0', // Only tokens
        "data": tokensChecked ?
          contract.methods.joinswapExternAmountIn(crpPool, tokenIn, amountTokenIn, minPoolAmountOut, referral).encodeABI() :
          contract.methods.joinswapExternAmountInWithSwap(crpPool, tokenIn, amountTokenIn, tokenExchange, minPoolAmountOut, referral, data).encodeABI(),
        "from": userWalletAddress,
        "to": address,
        "value": avaxValue
      });
      const gasPrice = await web3.eth.getGasPrice()

      const fee = (Number(gasPrice) * estimateGas)  * 1.3
      const finalGasInEther = web3.utils.fromWei(fee.toString(), 'ether');

      return {
        feeNumber: fee,
        feeString: finalGasInEther
      }
    }

    return {
      joinswapExternAmountIn,
      exitswapPoolAmountIn,
      exitPool,
      swapExactAmountIn,

      spotPrice,
      exchangeRate,
      tryJoinswapExternAmountIn,
      tryJoinswapPoolAmountOut,
      tryExitswapPoolAmountIn,
      tryExitPool,
      trySwapExactAmountIn,

      estimatedGas
    }
  }, [contract])
}

export default useProxy
