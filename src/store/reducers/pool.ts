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
  blockExplorerUrl: string;
  secondsPerBlock: number;
  addressWrapped: string;
}

export interface WeightsV2 {
  start_timestamp: number;
  end_timestamp: number;
  weights: {
    weight_normalized: string,
    token: {
      id: string
    }
  }[];
}

export interface underlyingAssetsInfo {
  balance: string;
  weight_goal_normalized: string;
  weight_normalized: string;
  token: TokenInfo;
}

export interface Partners {
  logo: string;
  url: string;
}
export interface IPoolSlice {
  id: string;
  address: string;
  vault: string;
  controller: string;
  chain_id: number;
  chainId: number;
  chain: ChainInfo;
  name: string;
  symbol: string;
  strategy: string;
  manager?: string;
  logo: string;
  pool_version: number;
  poolId?: number;
  url: string;
  summary?: string;
  addresses: string[];
  partners?: Partners[];
  underlying_assets_addresses: string[];
  underlying_assets: underlyingAssetsInfo[];
  weight_goals: WeightsV2[];
}

const initialState: IPoolSlice = {
  id: '',
  address: '',
  vault: '',
  controller: '',
  chain_id: 0,
  chainId: 0,
  strategy: '',
  chain: {
    id: 0,
    logo: '',
    chainName: '',
    nativeTokenName: '',
    nativeTokenSymbol: '',
    nativeTokenDecimals: 0,
    rpcUrls: [''],
    blockExplorerUrl: '',
    secondsPerBlock: 0,
    addressWrapped: ''
  },
  name: '',
  symbol: '',
  manager: '',
  logo: '',
  pool_version: 0,
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
  ],
  weight_goals: [
    {
      start_timestamp: 0,
      end_timestamp: 0,
      weights: [
        {
          weight_normalized: '',
          token: {
            id: ''
          }
        }
      ]
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
