import { useConnectWallet } from '@web3-onboard/react'
import { BrowserProvider, Contract, ZeroAddress } from 'ethers'

import useTransaction from '@/hooks/useTransaction'
import OFT from '@/constants/abi/OFT.json'
import { networks } from '@/constants/tokenAddresses'

const lzChainIds: Record<number, number> = {
  137: 109,
  43114: 106
}

const useBridge = () => {
  const [{ wallet }] = useConnectWallet()
  const { txNotification, transactionErrors } = useTransaction()

  const bridge = async (id: string, amount: string) => {
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

        const status = await txNotification(tx)
        return status
      } catch (error) {
        transactionErrors(error)
      }
    }
  }

  return { bridge }
}

export default useBridge
