import { BrowserProvider } from 'ethers'
import { useConnectWallet } from '@web3-onboard/react'

const useSignMessage = () => {
  const [{ wallet }] = useConnectWallet()

  const signMessage = async (message: string) => {
    if (wallet?.provider) {
      const provider = new BrowserProvider(wallet.provider)
      const signer = await provider.getSigner()
      const value = await signer.signMessage(message)
      return value
    }
  }

  return {
    signMessage
  }
}

export default useSignMessage
