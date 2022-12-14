import { ChainInfo } from "../store/reducers/pool";

interface CurrencyDetails {
  name: string;
  symbol: string;
  decimals: number;
}

export interface ChainDetails {
  chainId: number;
  chainIdHex: string;
  chainName: string;
  nativeCurrency: CurrencyDetails;
  rpcUrls: [string];
  blockExplorerUrls: [string];
  secondsPerBlock: number;
  wrapped: string;
}

// eslint-disable-next-line prettier/prettier
declare let window: {
  ethereum: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    request: (input: { method: string, params: [any] }) => void
  }
}

export default async (chain: ChainInfo) => {
  const hexString = Number(chain.id).toString(16);

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${hexString}` }]
    })
  } catch (error: any) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (error.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [chain]
        })
      } catch (addError) {
        // handle "add" error
      }
    }
    // handle other "switch" errors
    console.log(error)
  }
}
