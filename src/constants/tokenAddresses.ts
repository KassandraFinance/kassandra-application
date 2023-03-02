import { ChainDetails } from '../utils/changeChain'

export const LPDaiAvax =
  process.env.NEXT_PUBLIC_MASTER === '1'
    ? '0xbA09679Ab223C6bdaf44D45Ba2d7279959289AB0'
    : '0xe64b1772a9e28E694FEc27Bc7901f88855252E9F'

export const LPKacyAvaxPNG =
  process.env.NEXT_PUBLIC_MASTER === '1'
    ? '0x1938cE0E14dD71caab96F52dF3F49b1D1DAF8861'
    : '0xbaa8b0d2AA6415d5b4077C1FA06b3507577FBCd7'

export const LPKacyAvaxJOE =
  process.env.NEXT_PUBLIC_MASTER === '1'
    ? '0xc45893e0ee426a643e54829ee8c697995e5980ed'
    : ''

export const Kacy =
  process.env.NEXT_PUBLIC_MASTER === '1'
    ? '0xf32398dae246C5f672B52A54e9B413dFFcAe1A44'
    : '0x1d7C6846F033e593b4f3f21C39573bb1b41D43Cb'

export const Staking =
  process.env.NEXT_PUBLIC_MASTER === '1'
    ? '0xfddc1956d88a34fcB0671508Fa3d5aaC73b2a031'
    : '0xe08eD1e470160AF3dF917be221a6aed6284c1D2F'

export const Timelock =
  process.env.NEXT_PUBLIC_MASTER === '1'
    ? ''
    : '0xB8897C7f08D085Ded52A938785Df63C79BBE9c25'

export const GovernorAlpha =
  process.env.NEXT_PUBLIC_MASTER === '1'
    ? '0x87E60617738F4F9Fb3Db3B61C7A34b9fF82412a4'
    : '0x2B6C46b9552B6Fa36DD097b6527ba20fdDB3FfD5'

export const ProxyContract =
  process.env.NEXT_PUBLIC_MASTER === '1'
    ? '0xCf734790E7D25f4E366b7d2F9710D3Eb1DB62036'
    : '0x97e33051B09092C1301A90b964a74cA51C0b068B'

export const ProxyInvestV2 = '0xFADd38F6DFa4057c62C2e92C4FaFB4c3AC198e06' // Goerli
export const BalancerHelpers = '0xE39B5e3B6D74016b2F6A9673D7d7493B6DF549d5' // Goerli

export const addressNativeToken1Inch =
  '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'

export const platform: Record<number, string> = {
  [43114]: 'avalanche',
  [137]: 'polygon-pos'
}

export const linkSnowtrace = 'https://snowtrace.io'

export const YIELDYAK_API = 'https://staging-api.yieldyak.com'
export const COINGECKO_API = 'https://api.coingecko.com/api/v3'

export const KASSANDRA_BACKEND = 'https://backend.kassandra.finance'
export const SUBGRAPH_URL =
  'https://graph.kassandra.finance/subgraphs/name/KassandraAvalanche'

export const BACKEND_KASSANDRA =
  process.env.NEXT_PUBLIC_BACKEND_KASSANDRA ?? 'http://localhost:3001'

export const URL_1INCH = 'https://api.1inch.io/v5.0/'
export const URL_COINGECKO = 'https://api.coingecko.com/api/v3'
export const URL_1INCH_BALANCE = 'https://balances.1inch.io/v1.1'

export const chains: { [key: string]: ChainDetails } = {
  avalanche: {
    chainId: 43114,
    chainIdHex: '0xa86a',
    chainName: 'Avalanche Mainnet',
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrl: 'https://snowtrace.io/',
    secondsPerBlock: 2,
    wrapped: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'
  },
  fuji: {
    chainId: 43113,
    chainIdHex: '0xa869',
    chainName: 'Avalanche Fuji Testnet',
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18
    },
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    blockExplorerUrl: 'https://testnet.snowtrace.io/',
    secondsPerBlock: 2,
    wrapped: '0xd00ae08403B9bbb9124bB305C09058E32C39A48c'
  },
  polygon: {
    chainId: 137,
    chainIdHex: '0x89',
    chainName: 'Polygon',
    nativeCurrency: {
      name: 'Polygon',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: ['https://polygon-rpc.com'],
    blockExplorerUrl: 'https://polygonscan.com',
    secondsPerBlock: 2,
    wrapped: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270'
  }
}
