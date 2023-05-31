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

export const KacyPoligon = '0x366e293A5CF90A0458D9fF9f3f92234dA598F62e'

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

// export const ProxyInvestV2 = '0x2CA2CF9624c4b0c5d87a3204780408cDA9EB9BfD' // Goerli
// export const BalancerHelpers = '0xE39B5e3B6D74016b2F6A9673D7d7493B6DF549d5' // Goerli

export const ProxyInvestV2 = '0x77F18A3963796Dd252EbEF15C9eadfE229c7c89a' // Polygon
export const BalancerHelpers = '0xE39B5e3B6D74016b2F6A9673D7d7493B6DF549d5' // Polygon

export const addressNativeToken1Inch =
  '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'

export const VAULT_POLYGON = '0xBA12222222228d8Ba445958a75a0704d566BF2C8'

export const WETH_POLYGON = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619'

export const platform: Record<number, string> = {
  [43114]: 'avalanche',
  [137]: 'polygon-pos'
}

export const linkSnowtrace = 'https://snowtrace.io'

export const YIELDYAK_API = 'https://staging-api.yieldyak.com'
export const COINGECKO_API = 'https://api.coingecko.com/api/v3'

export const SUBGRAPH_URL =
  'https://graph.kassandra.finance/subgraphs/name/KassandraAvalanche'

export const BACKEND_KASSANDRA =
  process.env.NEXT_PUBLIC_BACKEND_KASSANDRA ?? 'http://localhost:3001'

export const URL_1INCH = 'https://api.1inch.io/v5.0/'
export const URL_COINGECKO = 'https://api.coingecko.com/api/v3'
export const URL_1INCH_BALANCE = 'https://balances.1inch.io/v1.1'
export const COINS_METADATA =
  process.env.NEXT_PUBLIC_COINS_METADATA ?? 'http://localhost:3001'

type CurrencyDetails = {
  name: string
  symbol: string
  decimals: number
  address: string
}

type NetworkType = Record<
  number,
  {
    chainName: string
    chainId: number
    kacyAddress?: string
    rpc: string
    coingecko: string
    whiteList: string
    factory: string
    privateInvestor: string
    nativeCurrency: CurrencyDetails
    blockExplorer: string
    kacyOFT: string
  }
>

export const networks: NetworkType = {
  '5': {
    chainName: 'Goerli Test Network',
    chainId: 5,
    rpc: 'https://rpc.ankr.com/eth_goerli',
    blockExplorer: 'https://goerli.etherscan.io',
    coingecko: 'polygon-pos',
    whiteList: '0xe119DE3b0FDab34e9CE490FDAa562e6457126A57',
    factory: '0x9E3feC2E3AEc12572242dd1376BEd5E1F5bb8200',
    privateInvestor: '0xC8d8AeDBeDd1973b383D6f330C66D653F7DF11D6',
    kacyOFT: '',
    nativeCurrency: {
      address: '0xffb99f4a02712c909d8f7cc44e67c87ea1e71e83',
      name: 'Goerli Test Token', //Ether
      symbol: 'ETH',
      decimals: 18
    }
  },
  '137': {
    chainName: 'Polygon',
    chainId: 137,
    rpc: 'https://rpc.ankr.com/polygon',
    kacyAddress: KacyPoligon,
    blockExplorer: 'https://polygonscan.com',
    coingecko: 'polygon-pos',
    whiteList: '0xfe7AeA0E15F34aCa30285E64C529b1B2a074F531',
    factory: '0x290272D39BA3Fa0Fb2a683fC88290A9d55a1023d', // factory test
    // factory: '0x228885c9d0440Ae640B88fBeE31522CC6a59Fd2F',
    privateInvestor: '0xa356Dc5260Ca76b4113CD7251906ffb57629b985',
    kacyOFT: '0x366e293a5cf90a0458d9ff9f3f92234da598f62e',
    nativeCurrency: {
      address: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
      name: 'Matic Token',
      symbol: 'MATIC',
      decimals: 18
    }
  },
  '43114': {
    chainId: 43114,
    chainName: 'Avalanche',
    rpc: 'https://api.avax.network/ext/bc/C/rpc',
    kacyAddress: Kacy,
    blockExplorer: 'https://snowtrace.io',
    coingecko: 'avalanche',
    whiteList: '',
    factory: '',
    privateInvestor: '',
    kacyOFT: '0x366e293a5cf90a0458d9ff9f3f92234da598f62e',
    nativeCurrency: {
      address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18
    }
  },
  '43113': {
    chainId: 43113,
    chainName: 'Avalanche',
    rpc: 'https://api.avax-test.network/ext/C/rpc',
    kacyAddress: Kacy,
    blockExplorer: 'https://testnet.snowtrace.io',
    coingecko: 'avalanche',
    whiteList: '',
    factory: '',
    privateInvestor: '',
    kacyOFT: '0x366e293a5cf90a0458d9ff9f3f92234da598f62e',
    nativeCurrency: {
      address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18
    }
  }
}

export const multisig = '0xFF56b00bDaEEf52C3EBb81B0efA6e28497305175'
export const kassandraManagementFee = '0.5'

export const mockTokens: { [key: string]: string } = {
  '0x841a91e3De1202b7b750f464680068aAa0d0EA35':
    '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063', // dai
  '0xDcfcef36F438ec310d8a699e3D3729398547b2BF':
    '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270', // wmatic
  '0xca813266889e0FD141dF48B85294855616015fA4':
    '0xeeeeeb57642040be42185f49c52f7e9b38f8eeee', // elk
  '0xf22f05168508749fa42eDBddE10CB323D87c201d':
    '0xc2132d05d31c914a87c6611c10748aeb04b58e8f', // tether
  '0x2f52C8ce1e5A064B4202762aD34E075E8826C252':
    '0x3BA4c387f786bFEE076A58914F5Bd38d668B42c3', // bnb
  '0x874a7CE88d933e6Edc24f4867923F1d09568b08B':
    '0xb33eaad8d922b1083446dc23f610c2567fb5180f', // uniswap
  '0xB0C30dDFAF159ce47097E4b08A3436fAE8f43a4d':
    '0xd6df932a45c0f255f85145f286ea0b292b21c90b', // aave
  '0xBA1C32241Ac77b97C8573c3dbFDe4e1e2A8fc0DF':
    '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6' // wbiticoin
}

export const mockTokensReverse: { [key: string]: string } = {
  // dai
  '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063':
    '0x841a91e3De1202b7b750f464680068aAa0d0EA35',
  // wmatic
  '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270':
    '0xDcfcef36F438ec310d8a699e3D3729398547b2BF',
  // elk
  '0xeeeeeb57642040be42185f49c52f7e9b38f8eeee':
    '0xca813266889e0FD141dF48B85294855616015fA4',
  // tether
  '0xc2132d05d31c914a87c6611c10748aeb04b58e8f':
    '0xf22f05168508749fa42eDBddE10CB323D87c201d',
  // bnb
  '0x3BA4c387f786bFEE076A58914F5Bd38d668B42c3':
    '0x2f52C8ce1e5A064B4202762aD34E075E8826C252',
  // uniswap
  '0xb33eaad8d922b1083446dc23f610c2567fb5180f':
    '0x874a7CE88d933e6Edc24f4867923F1d09568b08B',
  // aave
  '0xd6df932a45c0f255f85145f286ea0b292b21c90b':
    '0xB0C30dDFAF159ce47097E4b08A3436fAE8f43a4d',
  // wbiticoin
  '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6':
    '0xBA1C32241Ac77b97C8573c3dbFDe4e1e2A8fc0DF'
}
