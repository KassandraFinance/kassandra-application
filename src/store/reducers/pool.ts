import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TokenInfo {
  id: string;
  name: string;
  symbol: string;
  decimals: number;
  is_wrap_token: number;
  logo?: string;
  price_usd: string;
  wraps: {
    id: string,
    symbol: string,
    name: string,
    decimals: number,
    price_usd: string,
    logo?: string
  };
}

export interface ChainInfo {
  id: number;
  logo?: string;
  chainName: string;
  nativeTokenName: string;
  nativeTokenSymbol: string;
  nativeTokenDecimals: number;
  rpcUrls: [string];
  blockExplorerUrls: [string];
  secondsPerBlock: number;
  addressWrapped: string;
}

export interface IPoolSlice {
  id: string;
  core_pool: string;
  chainId: number;
  chain: ChainInfo;
  name: string;
  symbol: string;
  manager?: string;
  logo: string;
  poolId?: number;
  url: string;
  summary?: string;
  addresses: string[];
  partners?: string[];
  underlying_assets_addresses: string[];
  underlying_assets: {
    balance: string,
    weight_goal_normalized: string,
    weight_normalized: string,
    token: TokenInfo
  }[];
}

const initialState: IPoolSlice = {
  id: '',
  core_pool: '',
  chainId: 0,
  chain: {
    id: 0,
    logo: '',
    chainName: '',
    nativeTokenName: '',
    nativeTokenSymbol: '',
    nativeTokenDecimals: 0,
    rpcUrls: [''],
    blockExplorerUrls: [''],
    secondsPerBlock: 0,
    addressWrapped: ''
  },
  name: '',
  symbol: '',
  manager: '',
  logo: '',
  poolId: 0,
  url: '',
  summary: '',
  addresses: [],
  partners: [],
  underlying_assets_addresses: [],
  underlying_assets: [
    {
      balance: '',
      weight_normalized: '',
      weight_goal_normalized: '',
      token: {
        id: '',
        name: '',
        symbol: '',
        decimals: 0,
        is_wrap_token: 0,
        price_usd: '',
        logo: '',
        wraps: {
          id: '',
          symbol: '',
          name: '',
          logo: '',
          decimals: 0,
          price_usd: ''
        }
      }
    }
  ]
}

export const poolSlice = createSlice({
  name: 'pool',
  initialState,
  reducers: {
    setPool: (state: IPoolSlice, action: PayloadAction<IPoolSlice>) => {
      return action.payload
    }
  }
})

export const { setPool } = poolSlice.actions

export default poolSlice.reducer
