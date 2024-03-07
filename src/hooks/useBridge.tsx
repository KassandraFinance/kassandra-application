import { useConnectWallet } from '@web3-onboard/react'
import { BrowserProvider, Contract, ZeroAddress } from 'ethers'
import Big from 'big.js'

import useTransaction from '@/hooks/useTransaction'
import OFT from '@/constants/abi/OFT.json'
import { networks } from '@/constants/tokenAddresses'
import { KassandraError } from '@/utils/KassandraError'

const lzChainIds: Record<number, number> = {
  137: 109,
  43114: 106,
  42161: 110
}

const nativeToken: Record<string, string> = {
  '0xa86a': 'AVAX',
  '0x89': 'MATIC',
  '0xa4b1': 'ETH'
}

const useBridge = () => {
  const [{ wallet }] = useConnectWallet()
  const { txNotification, transactionErrors } = useTransaction()

  const bridge = async (id: string, amount: string, onSuccess: () => void) => {
    if (wallet?.provider) {
      const provider = new BrowserProvider(wallet.provider)
      const signer = await provider.getSigner()
      const contract = new Contract(
        networks[Number(wallet.chains[0].id)].kacyOFT,
        OFT,
        signer
      )

      try {
        const fee = await contract.estimateSendFee.staticCall(
          lzChainIds[Number(id)],
          wallet.accounts[0].address,
          amount,
          false,
          '0x'
        )
        const balances = wallet.accounts[0].balance
        const feeNative = Big(fee.nativeFee).div(1e18)

        if (
          feeNative.gte(
            Big(
              balances
                ? balances[nativeToken[wallet.chains[0].id.toLowerCase()]]
                : 0
            )
          )
        ) {
          throw new KassandraError('Insufficient gas fee')
        }

        const tx = await contract.sendFrom(
          wallet.accounts[0].address,
          lzChainIds[Number(id)],
          wallet.accounts[0].address,
          amount,
          wallet.accounts[0].address,
          ZeroAddress,
          '0x',
          {
            value: fee.nativeFee
          }
        )

        const status = await txNotification(tx, {}, { onSuccess })
        return status
      } catch (error) {
        const contractInfo = {
          contractName: 'kacyOFT',
          functionName: 'sendFrom'
        }

        transactionErrors(error, contractInfo)
      }
    }
  }

  return { bridge }
}

export default useBridge
