import React from 'react'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'

import ERC20ABI from '@/constants/abi/ERC20.json'
import web3 from '@/utils/web3'
import { NATIVE_ADDRESS } from '@/constants/tokenAddresses'

type Provider = Web3

export const useBatchRequest = () => {
  return React.useMemo(() => {
    const batchRequestBalance = async (
      provider: Provider,
      tokens: string[],
      userWalltAddress: string
    ): Promise<Record<string, { balance: string }>> => {
      const batchRequest = new provider.BatchRequest()
      const balances = {}
      for (const token of tokens) {
        if (token.toLowerCase() === NATIVE_ADDRESS) continue
        const tokenContract = new provider.eth.Contract(
          ERC20ABI as unknown as AbiItem,
          token
        )
        batchRequest.add(
          tokenContract.methods
            .balanceOf(userWalltAddress)
            .call.request(
              { from: userWalltAddress },
              (_: unknown, balance: string) => {
                Object.assign(balances, {
                  [token.toLowerCase()]: { balance }
                })
              }
            )
        )
      }
      batchRequest.execute()
      const nativeBalance = await web3.eth.getBalance(userWalltAddress)
      Object.assign(balances, {
        balance: nativeBalance
      })
      return balances
    }

    return {
      batchRequestBalance
    }
  }, [])
}
