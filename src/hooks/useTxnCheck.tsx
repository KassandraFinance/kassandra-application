import { useConnectWallet } from '@web3-onboard/react'
import { BrowserProvider } from 'ethers'
import { ToastInfo, ToastSuccess } from '@/components/Toastify/toast'

const useTxnCheck = () => {
  const [{ wallet }] = useConnectWallet()
  async function transactionCheck(txHash: string) {
    if (wallet) {
      const txnCheck = async (txnHash: string) => {
        const txn_test = await provider.getTransaction(txnHash)
        console.log('pending', txn_test)
        ToastInfo('Transaction is Pending')
        if (txn_test) {
          if (txn_test.blockNumber) {
            console.log('txn_test: ')
            console.log(txn_test)
            ToastSuccess('Transaction concluded')
            provider.removeAllListeners()
            return txn_test
          }
        }
      }

      const provider = new BrowserProvider(wallet.provider)
      provider.on('block', async () => {
        await txnCheck(txHash)
      })
    }
  }

  return transactionCheck
}

export default useTxnCheck
