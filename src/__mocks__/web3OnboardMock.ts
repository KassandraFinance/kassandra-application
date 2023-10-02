import { createEIP1193Provider } from '@web3-onboard/common'
import { Eip1193Provider, JsonRpcProvider } from 'ethers'

type ConnectedChain = {
  id: string
  namespace: string
}
interface WalletState {
  label: string
  icon: string
  provider: Eip1193Provider
  accounts: Account[]
  chains: ConnectedChain[]
  instance?: unknown
}
type Account = {
  address: string
  ens: string | null
  uns: string | null
  balance: string | null
  secondaryTokens?: {
    balance: string
    icon: string
    name: string
  }
}

interface IUseConnectWalletProps {
  wallet: {
    accounts: WalletState
    chains: ConnectedChain[]
    icon: string
    instance: undefined
    label: string
    provider: null
  } | null
  connecting: boolean
}

interface SetChainOptions {
  chainId: string
  chainNamespace?: string
}

export interface SecondaryTokens {
  address: string
  icon?: string
}

interface Chain {
  namespace?: string
  id: string
  rpcUrl?: string
  label?: string
  token?: string
  secondaryTokens?: SecondaryTokens[]
  color?: string
  icon?: string
  providerConnectionInfo?: SetChainOptions | null
  publicRpcUrl?: string
  protectedRpcUrl?: string
  blockExplorerUrl?: string
}

interface IUseSetChainProps {
  chains: Chain[]
  connectedChain: ConnectedChain | null
  settingChain: boolean
}

const useConnectWalletDefault = [
  {
    wallet: null,
    connecting: false
  },
  jest.fn(),
  jest.fn(),
  jest.fn(),
  jest.fn(),
  jest.fn()
] as unknown as jest.Mocked<IUseConnectWalletProps>

const useConnectWalletConnected = [
  {
    wallet: {
      accounts: [
        {
          address: '0xD581d597dBc574A458d469A62Fb5a07A625Edf73',
          balance: {
            AVAX: '0.094771323378887428'
          },
          uns: null,
          ens: null,
          secondaryTokens: [
            {
              balance: '41.4796875',
              icon: '',
              name: 'KACY'
            }
          ]
        }
      ],
      chains: [
        {
          id: '0xa86a',
          namespace: 'evm'
        }
      ],
      icon: '',
      instance: undefined,
      label: 'MetaMask',
      provider: createEIP1193Provider(new JsonRpcProvider('EIP1193Provider'))
    },
    connecting: false
  },
  jest.fn(),
  jest.fn(),
  jest.fn(),
  jest.fn(),
  jest.fn()
] as unknown as jest.Mocked<IUseConnectWalletProps>

const useSetChainDefault = [
  {
    settingChain: false,
    chains: [],
    connectedChain: null
  },
  jest.fn()
] as unknown as IUseSetChainProps

const chainInfo = {
  blockExplorerUrl: 'https://snowtrace.io',
  color: '#E84142',
  icon: '<svg width="1503" height="1504" viewBox="0 0 1503 1504" fill="none" xmlns="http://www.w3.org/2000/svg">\n<rect x="287" y="258" width="928" height="844" fill="white"/>\n<path fill-rule="evenodd" clip-rule="evenodd" d="M1502.5 752C1502.5 1166.77 1166.27 1503 751.5 1503C336.734 1503 0.5 1166.77 0.5 752C0.5 337.234 336.734 1 751.5 1C1166.27 1 1502.5 337.234 1502.5 752ZM538.688 1050.86H392.94C362.314 1050.86 347.186 1050.86 337.962 1044.96C327.999 1038.5 321.911 1027.8 321.173 1015.99C320.619 1005.11 328.184 991.822 343.312 965.255L703.182 330.935C718.495 303.999 726.243 290.531 736.021 285.55C746.537 280.2 759.083 280.2 769.599 285.55C779.377 290.531 787.126 303.999 802.438 330.935L876.42 460.079L876.797 460.738C893.336 489.635 901.723 504.289 905.385 519.669C909.443 536.458 909.443 554.169 905.385 570.958C901.695 586.455 893.393 601.215 876.604 630.549L687.573 964.702L687.084 965.558C670.436 994.693 661.999 1009.46 650.306 1020.6C637.576 1032.78 622.263 1041.63 605.474 1046.62C590.161 1050.86 573.004 1050.86 538.688 1050.86ZM906.75 1050.86H1115.59C1146.4 1050.86 1161.9 1050.86 1171.13 1044.78C1181.09 1038.32 1187.36 1027.43 1187.92 1015.63C1188.45 1005.10 1181.05 992.33 1166.55 967.307C1166.05 966.455 1165.55 965.588 1165.04 964.706L1060.43 785.75L1059.24 783.735C1044.54 758.877 1037.12 746.324 1027.59 741.472C1017.08 736.121 1004.71 736.121 994.199 741.472C984.605 746.453 976.857 759.552 961.544 785.934L857.306 964.891L856.949 965.507C841.69 991.847 834.064 1005.01 834.614 1015.81C835.352 1027.62 841.44 1038.5 851.402 1044.96C860.443 1050.86 875.94 1050.86 906.75 1050.86Z" fill="#E84142"/>\n</svg>',
  id: '0xa86a',
  label: 'Avalanche',
  namespace: 'evm',
  rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
  secondaryTokens: [
    {
      address: '0xf32398dae246C5f672B52A54e9B413dFFcAe1A44',
      icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/17587.png'
    }
  ],
  token: 'AVAX'
}

const useSetChainConnected = [
  {
    settingChain: false,
    chains: [chainInfo],
    connectedChain: null
  },
  jest.fn()
] as unknown as IUseSetChainProps

function mockUseConnectWallet(mockConnectWallet = useConnectWalletConnected) {
  return jest.fn().mockReturnValue(mockConnectWallet)
}

function mockUseSetChain(mockSetChain = useSetChainDefault) {
  return jest.fn().mockReturnValue(mockSetChain)
}

export {
  useConnectWalletDefault,
  useConnectWalletConnected,
  useSetChainDefault,
  useSetChainConnected,
  mockUseConnectWallet,
  mockUseSetChain
}
