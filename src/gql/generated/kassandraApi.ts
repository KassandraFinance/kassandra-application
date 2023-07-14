import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  BigDecimal: { input: any; output: any }
  BigInt: { input: any; output: any }
  Bytes: { input: any; output: any }
}

/**
 * Actions on the pool like a join, exit or swap. This keeps track of how much of each token was transfered
 *
 */
export type Activity = {
  __typename?: 'Activity'
  /**
   * Wallet address
   *
   */
  address: Scalars['String']['output']
  amount: Array<Scalars['BigDecimal']['output']>
  /**
   * Pool ID + pool.num_tx
   *
   */
  id: Scalars['ID']['output']
  pool: Pool
  price_btc: Array<Scalars['BigDecimal']['output']>
  price_usd: Array<Scalars['BigDecimal']['output']>
  symbol: Array<Scalars['String']['output']>
  timestamp: Scalars['Int']['output']
  txHash: Scalars['String']['output']
  /**
   * One of 'join', 'exit', 'swap', 'token-add', 'token-remove' or 'public'
   *
   */
  type: Scalars['String']['output']
}

export type Activity_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  address?: InputMaybe<Scalars['String']['input']>
  address_contains?: InputMaybe<Scalars['String']['input']>
  address_contains_nocase?: InputMaybe<Scalars['String']['input']>
  address_ends_with?: InputMaybe<Scalars['String']['input']>
  address_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  address_gt?: InputMaybe<Scalars['String']['input']>
  address_gte?: InputMaybe<Scalars['String']['input']>
  address_in?: InputMaybe<Array<Scalars['String']['input']>>
  address_lt?: InputMaybe<Scalars['String']['input']>
  address_lte?: InputMaybe<Scalars['String']['input']>
  address_not?: InputMaybe<Scalars['String']['input']>
  address_not_contains?: InputMaybe<Scalars['String']['input']>
  address_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  address_not_ends_with?: InputMaybe<Scalars['String']['input']>
  address_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  address_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  address_not_starts_with?: InputMaybe<Scalars['String']['input']>
  address_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  address_starts_with?: InputMaybe<Scalars['String']['input']>
  address_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  amount?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  amount_contains?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  amount_contains_nocase?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  amount_not?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  amount_not_contains?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  amount_not_contains_nocase?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  pool?: InputMaybe<Scalars['String']['input']>
  pool_?: InputMaybe<Pool_Filter>
  pool_contains?: InputMaybe<Scalars['String']['input']>
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>
  pool_ends_with?: InputMaybe<Scalars['String']['input']>
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_gt?: InputMaybe<Scalars['String']['input']>
  pool_gte?: InputMaybe<Scalars['String']['input']>
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>
  pool_lt?: InputMaybe<Scalars['String']['input']>
  pool_lte?: InputMaybe<Scalars['String']['input']>
  pool_not?: InputMaybe<Scalars['String']['input']>
  pool_not_contains?: InputMaybe<Scalars['String']['input']>
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_starts_with?: InputMaybe<Scalars['String']['input']>
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  price_btc?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  price_btc_contains?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  price_btc_contains_nocase?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  price_btc_not?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  price_btc_not_contains?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  price_btc_not_contains_nocase?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  price_usd?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  price_usd_contains?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  price_usd_contains_nocase?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  price_usd_not?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  price_usd_not_contains?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  price_usd_not_contains_nocase?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  symbol?: InputMaybe<Array<Scalars['String']['input']>>
  symbol_contains?: InputMaybe<Array<Scalars['String']['input']>>
  symbol_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>
  symbol_not?: InputMaybe<Array<Scalars['String']['input']>>
  symbol_not_contains?: InputMaybe<Array<Scalars['String']['input']>>
  symbol_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>
  timestamp?: InputMaybe<Scalars['Int']['input']>
  timestamp_gt?: InputMaybe<Scalars['Int']['input']>
  timestamp_gte?: InputMaybe<Scalars['Int']['input']>
  timestamp_in?: InputMaybe<Array<Scalars['Int']['input']>>
  timestamp_lt?: InputMaybe<Scalars['Int']['input']>
  timestamp_lte?: InputMaybe<Scalars['Int']['input']>
  timestamp_not?: InputMaybe<Scalars['Int']['input']>
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  txHash?: InputMaybe<Scalars['String']['input']>
  txHash_contains?: InputMaybe<Scalars['String']['input']>
  txHash_contains_nocase?: InputMaybe<Scalars['String']['input']>
  txHash_ends_with?: InputMaybe<Scalars['String']['input']>
  txHash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  txHash_gt?: InputMaybe<Scalars['String']['input']>
  txHash_gte?: InputMaybe<Scalars['String']['input']>
  txHash_in?: InputMaybe<Array<Scalars['String']['input']>>
  txHash_lt?: InputMaybe<Scalars['String']['input']>
  txHash_lte?: InputMaybe<Scalars['String']['input']>
  txHash_not?: InputMaybe<Scalars['String']['input']>
  txHash_not_contains?: InputMaybe<Scalars['String']['input']>
  txHash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  txHash_not_ends_with?: InputMaybe<Scalars['String']['input']>
  txHash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  txHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  txHash_not_starts_with?: InputMaybe<Scalars['String']['input']>
  txHash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  txHash_starts_with?: InputMaybe<Scalars['String']['input']>
  txHash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<Scalars['String']['input']>
  type_contains?: InputMaybe<Scalars['String']['input']>
  type_contains_nocase?: InputMaybe<Scalars['String']['input']>
  type_ends_with?: InputMaybe<Scalars['String']['input']>
  type_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  type_gt?: InputMaybe<Scalars['String']['input']>
  type_gte?: InputMaybe<Scalars['String']['input']>
  type_in?: InputMaybe<Array<Scalars['String']['input']>>
  type_lt?: InputMaybe<Scalars['String']['input']>
  type_lte?: InputMaybe<Scalars['String']['input']>
  type_not?: InputMaybe<Scalars['String']['input']>
  type_not_contains?: InputMaybe<Scalars['String']['input']>
  type_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  type_not_ends_with?: InputMaybe<Scalars['String']['input']>
  type_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  type_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  type_not_starts_with?: InputMaybe<Scalars['String']['input']>
  type_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  type_starts_with?: InputMaybe<Scalars['String']['input']>
  type_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
}

export type Activity_OrderBy =
  | 'address'
  | 'amount'
  | 'id'
  | 'pool'
  | 'price_btc'
  | 'price_usd'
  | 'symbol'
  | 'timestamp'
  | 'txHash'
  | 'type'

/**
 * Information about an asset in a specific pool
 *
 */
export type Asset = {
  __typename?: 'Asset'
  balance: Scalars['BigDecimal']['output']
  balances: Array<Balance>
  /**
   * Pool ID + Token Address
   *
   */
  id: Scalars['ID']['output']
  pool: Pool
  token: Token
  weight: Scalars['BigInt']['output']
  weight_goal: Scalars['BigInt']['output']
  weight_goal_normalized: Scalars['BigDecimal']['output']
  weight_normalized: Scalars['BigDecimal']['output']
}

/**
 * Information about an asset in a specific pool
 *
 */
export type AssetBalancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Balance_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<Balance_Filter>
}

export type Asset_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  balance?: InputMaybe<Scalars['BigDecimal']['input']>
  balance_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  balance_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  balance_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  balance_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  balance_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  balance_not?: InputMaybe<Scalars['BigDecimal']['input']>
  balance_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  balances_?: InputMaybe<Balance_Filter>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  pool?: InputMaybe<Scalars['String']['input']>
  pool_?: InputMaybe<Pool_Filter>
  pool_contains?: InputMaybe<Scalars['String']['input']>
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>
  pool_ends_with?: InputMaybe<Scalars['String']['input']>
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_gt?: InputMaybe<Scalars['String']['input']>
  pool_gte?: InputMaybe<Scalars['String']['input']>
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>
  pool_lt?: InputMaybe<Scalars['String']['input']>
  pool_lte?: InputMaybe<Scalars['String']['input']>
  pool_not?: InputMaybe<Scalars['String']['input']>
  pool_not_contains?: InputMaybe<Scalars['String']['input']>
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_starts_with?: InputMaybe<Scalars['String']['input']>
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  token?: InputMaybe<Scalars['String']['input']>
  token_?: InputMaybe<Token_Filter>
  token_contains?: InputMaybe<Scalars['String']['input']>
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>
  token_ends_with?: InputMaybe<Scalars['String']['input']>
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  token_gt?: InputMaybe<Scalars['String']['input']>
  token_gte?: InputMaybe<Scalars['String']['input']>
  token_in?: InputMaybe<Array<Scalars['String']['input']>>
  token_lt?: InputMaybe<Scalars['String']['input']>
  token_lte?: InputMaybe<Scalars['String']['input']>
  token_not?: InputMaybe<Scalars['String']['input']>
  token_not_contains?: InputMaybe<Scalars['String']['input']>
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  token_starts_with?: InputMaybe<Scalars['String']['input']>
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  weight?: InputMaybe<Scalars['BigInt']['input']>
  weight_goal?: InputMaybe<Scalars['BigInt']['input']>
  weight_goal_gt?: InputMaybe<Scalars['BigInt']['input']>
  weight_goal_gte?: InputMaybe<Scalars['BigInt']['input']>
  weight_goal_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  weight_goal_lt?: InputMaybe<Scalars['BigInt']['input']>
  weight_goal_lte?: InputMaybe<Scalars['BigInt']['input']>
  weight_goal_normalized?: InputMaybe<Scalars['BigDecimal']['input']>
  weight_goal_normalized_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  weight_goal_normalized_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  weight_goal_normalized_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  weight_goal_normalized_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  weight_goal_normalized_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  weight_goal_normalized_not?: InputMaybe<Scalars['BigDecimal']['input']>
  weight_goal_normalized_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  weight_goal_not?: InputMaybe<Scalars['BigInt']['input']>
  weight_goal_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  weight_gt?: InputMaybe<Scalars['BigInt']['input']>
  weight_gte?: InputMaybe<Scalars['BigInt']['input']>
  weight_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  weight_lt?: InputMaybe<Scalars['BigInt']['input']>
  weight_lte?: InputMaybe<Scalars['BigInt']['input']>
  weight_normalized?: InputMaybe<Scalars['BigDecimal']['input']>
  weight_normalized_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  weight_normalized_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  weight_normalized_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  weight_normalized_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  weight_normalized_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  weight_normalized_not?: InputMaybe<Scalars['BigDecimal']['input']>
  weight_normalized_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  weight_not?: InputMaybe<Scalars['BigInt']['input']>
  weight_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
}

export type Asset_OrderBy =
  | 'balance'
  | 'balances'
  | 'id'
  | 'pool'
  | 'token'
  | 'weight'
  | 'weight_goal'
  | 'weight_goal_normalized'
  | 'weight_normalized'

/**
 * Balance of a single token raw points graph
 *
 */
export type Balance = {
  __typename?: 'Balance'
  asset: Asset
  /**
   * Pool ID + Token address + Timestamp
   *
   */
  id: Scalars['ID']['output']
  timestamp: Scalars['Int']['output']
  value: Scalars['BigDecimal']['output']
}

export type Balance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  asset?: InputMaybe<Scalars['String']['input']>
  asset_?: InputMaybe<Asset_Filter>
  asset_contains?: InputMaybe<Scalars['String']['input']>
  asset_contains_nocase?: InputMaybe<Scalars['String']['input']>
  asset_ends_with?: InputMaybe<Scalars['String']['input']>
  asset_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  asset_gt?: InputMaybe<Scalars['String']['input']>
  asset_gte?: InputMaybe<Scalars['String']['input']>
  asset_in?: InputMaybe<Array<Scalars['String']['input']>>
  asset_lt?: InputMaybe<Scalars['String']['input']>
  asset_lte?: InputMaybe<Scalars['String']['input']>
  asset_not?: InputMaybe<Scalars['String']['input']>
  asset_not_contains?: InputMaybe<Scalars['String']['input']>
  asset_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  asset_not_ends_with?: InputMaybe<Scalars['String']['input']>
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  asset_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  asset_not_starts_with?: InputMaybe<Scalars['String']['input']>
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  asset_starts_with?: InputMaybe<Scalars['String']['input']>
  asset_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  timestamp?: InputMaybe<Scalars['Int']['input']>
  timestamp_gt?: InputMaybe<Scalars['Int']['input']>
  timestamp_gte?: InputMaybe<Scalars['Int']['input']>
  timestamp_in?: InputMaybe<Array<Scalars['Int']['input']>>
  timestamp_lt?: InputMaybe<Scalars['Int']['input']>
  timestamp_lte?: InputMaybe<Scalars['Int']['input']>
  timestamp_not?: InputMaybe<Scalars['Int']['input']>
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  value?: InputMaybe<Scalars['BigDecimal']['input']>
  value_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  value_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  value_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  value_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  value_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  value_not?: InputMaybe<Scalars['BigDecimal']['input']>
  value_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
}

export type Balance_OrderBy = 'asset' | 'id' | 'timestamp' | 'value'

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input']
}

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>
  number?: InputMaybe<Scalars['Int']['input']>
  number_gte?: InputMaybe<Scalars['Int']['input']>
}

/**
 * Brokers for each pool
 *
 */
export type Broker = {
  __typename?: 'Broker'
  deposits_btc: Scalars['BigDecimal']['output']
  deposits_usd: Scalars['BigDecimal']['output']
  /**
   * Fees in pool tokens
   *
   */
  fees: Scalars['BigDecimal']['output']
  fees_btc: Scalars['BigDecimal']['output']
  fees_usd: Scalars['BigDecimal']['output']
  /**
   * Pool ID + Broker address
   *
   */
  id: Scalars['ID']['output']
  num_deposits: Scalars['Int']['output']
  pool: Pool
  unique_investors: Scalars['Int']['output']
  wallet: Scalars['String']['output']
}

export type Broker_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  deposits_btc?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_btc_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_btc_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_btc_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  deposits_btc_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_btc_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_btc_not?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_btc_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  deposits_usd?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_usd_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_usd_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_usd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  deposits_usd_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_usd_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_usd_not?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_usd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  fees?: InputMaybe<Scalars['BigDecimal']['input']>
  fees_btc?: InputMaybe<Scalars['BigDecimal']['input']>
  fees_btc_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  fees_btc_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  fees_btc_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  fees_btc_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  fees_btc_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  fees_btc_not?: InputMaybe<Scalars['BigDecimal']['input']>
  fees_btc_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  fees_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  fees_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  fees_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  fees_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  fees_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  fees_not?: InputMaybe<Scalars['BigDecimal']['input']>
  fees_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  fees_usd?: InputMaybe<Scalars['BigDecimal']['input']>
  fees_usd_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  fees_usd_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  fees_usd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  fees_usd_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  fees_usd_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  fees_usd_not?: InputMaybe<Scalars['BigDecimal']['input']>
  fees_usd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  num_deposits?: InputMaybe<Scalars['Int']['input']>
  num_deposits_gt?: InputMaybe<Scalars['Int']['input']>
  num_deposits_gte?: InputMaybe<Scalars['Int']['input']>
  num_deposits_in?: InputMaybe<Array<Scalars['Int']['input']>>
  num_deposits_lt?: InputMaybe<Scalars['Int']['input']>
  num_deposits_lte?: InputMaybe<Scalars['Int']['input']>
  num_deposits_not?: InputMaybe<Scalars['Int']['input']>
  num_deposits_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  pool?: InputMaybe<Scalars['String']['input']>
  pool_?: InputMaybe<Pool_Filter>
  pool_contains?: InputMaybe<Scalars['String']['input']>
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>
  pool_ends_with?: InputMaybe<Scalars['String']['input']>
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_gt?: InputMaybe<Scalars['String']['input']>
  pool_gte?: InputMaybe<Scalars['String']['input']>
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>
  pool_lt?: InputMaybe<Scalars['String']['input']>
  pool_lte?: InputMaybe<Scalars['String']['input']>
  pool_not?: InputMaybe<Scalars['String']['input']>
  pool_not_contains?: InputMaybe<Scalars['String']['input']>
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_starts_with?: InputMaybe<Scalars['String']['input']>
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  unique_investors?: InputMaybe<Scalars['Int']['input']>
  unique_investors_gt?: InputMaybe<Scalars['Int']['input']>
  unique_investors_gte?: InputMaybe<Scalars['Int']['input']>
  unique_investors_in?: InputMaybe<Array<Scalars['Int']['input']>>
  unique_investors_lt?: InputMaybe<Scalars['Int']['input']>
  unique_investors_lte?: InputMaybe<Scalars['Int']['input']>
  unique_investors_not?: InputMaybe<Scalars['Int']['input']>
  unique_investors_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  wallet?: InputMaybe<Scalars['String']['input']>
  wallet_contains?: InputMaybe<Scalars['String']['input']>
  wallet_contains_nocase?: InputMaybe<Scalars['String']['input']>
  wallet_ends_with?: InputMaybe<Scalars['String']['input']>
  wallet_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  wallet_gt?: InputMaybe<Scalars['String']['input']>
  wallet_gte?: InputMaybe<Scalars['String']['input']>
  wallet_in?: InputMaybe<Array<Scalars['String']['input']>>
  wallet_lt?: InputMaybe<Scalars['String']['input']>
  wallet_lte?: InputMaybe<Scalars['String']['input']>
  wallet_not?: InputMaybe<Scalars['String']['input']>
  wallet_not_contains?: InputMaybe<Scalars['String']['input']>
  wallet_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  wallet_not_ends_with?: InputMaybe<Scalars['String']['input']>
  wallet_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  wallet_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  wallet_not_starts_with?: InputMaybe<Scalars['String']['input']>
  wallet_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  wallet_starts_with?: InputMaybe<Scalars['String']['input']>
  wallet_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
}

export type Broker_OrderBy =
  | 'deposits_btc'
  | 'deposits_usd'
  | 'fees'
  | 'fees_btc'
  | 'fees_usd'
  | 'id'
  | 'num_deposits'
  | 'pool'
  | 'unique_investors'
  | 'wallet'

/**
 * OHLC price candles for periods 5m, 15m, 1h, 4h, 24h, 7d
 *
 */
export type Candle = {
  __typename?: 'Candle'
  /**
   * 'btc' or 'usd'
   *
   */
  base: Scalars['String']['output']
  /**
   * Last value in that hour
   *
   */
  close: Scalars['BigDecimal']['output']
  /**
   * Highest value in that hour
   *
   */
  high: Scalars['BigDecimal']['output']
  /**
   * Pool ID + Period in seconds + Base currrency + Timestamp at start of the period
   *
   */
  id: Scalars['ID']['output']
  /**
   * Lowest value in that hour
   *
   */
  low: Scalars['BigDecimal']['output']
  num_tx: Scalars['Int']['output']
  /**
   * First value in that hour
   *
   */
  open: Scalars['BigDecimal']['output']
  /**
   * Period in seconds, available in 5m, 15m, 1h, 4h, 24h, 7d
   *
   */
  period: Scalars['Int']['output']
  pool: Pool
  timestamp: Scalars['Int']['output']
}

export type Candle_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  base?: InputMaybe<Scalars['String']['input']>
  base_contains?: InputMaybe<Scalars['String']['input']>
  base_contains_nocase?: InputMaybe<Scalars['String']['input']>
  base_ends_with?: InputMaybe<Scalars['String']['input']>
  base_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  base_gt?: InputMaybe<Scalars['String']['input']>
  base_gte?: InputMaybe<Scalars['String']['input']>
  base_in?: InputMaybe<Array<Scalars['String']['input']>>
  base_lt?: InputMaybe<Scalars['String']['input']>
  base_lte?: InputMaybe<Scalars['String']['input']>
  base_not?: InputMaybe<Scalars['String']['input']>
  base_not_contains?: InputMaybe<Scalars['String']['input']>
  base_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  base_not_ends_with?: InputMaybe<Scalars['String']['input']>
  base_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  base_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  base_not_starts_with?: InputMaybe<Scalars['String']['input']>
  base_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  base_starts_with?: InputMaybe<Scalars['String']['input']>
  base_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  close?: InputMaybe<Scalars['BigDecimal']['input']>
  close_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  close_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  close_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  close_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  close_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  close_not?: InputMaybe<Scalars['BigDecimal']['input']>
  close_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  high?: InputMaybe<Scalars['BigDecimal']['input']>
  high_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  high_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  high_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  high_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  high_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  high_not?: InputMaybe<Scalars['BigDecimal']['input']>
  high_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  low?: InputMaybe<Scalars['BigDecimal']['input']>
  low_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  low_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  low_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  low_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  low_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  low_not?: InputMaybe<Scalars['BigDecimal']['input']>
  low_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  num_tx?: InputMaybe<Scalars['Int']['input']>
  num_tx_gt?: InputMaybe<Scalars['Int']['input']>
  num_tx_gte?: InputMaybe<Scalars['Int']['input']>
  num_tx_in?: InputMaybe<Array<Scalars['Int']['input']>>
  num_tx_lt?: InputMaybe<Scalars['Int']['input']>
  num_tx_lte?: InputMaybe<Scalars['Int']['input']>
  num_tx_not?: InputMaybe<Scalars['Int']['input']>
  num_tx_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  open?: InputMaybe<Scalars['BigDecimal']['input']>
  open_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  open_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  open_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  open_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  open_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  open_not?: InputMaybe<Scalars['BigDecimal']['input']>
  open_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  period?: InputMaybe<Scalars['Int']['input']>
  period_gt?: InputMaybe<Scalars['Int']['input']>
  period_gte?: InputMaybe<Scalars['Int']['input']>
  period_in?: InputMaybe<Array<Scalars['Int']['input']>>
  period_lt?: InputMaybe<Scalars['Int']['input']>
  period_lte?: InputMaybe<Scalars['Int']['input']>
  period_not?: InputMaybe<Scalars['Int']['input']>
  period_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  pool?: InputMaybe<Scalars['String']['input']>
  pool_?: InputMaybe<Pool_Filter>
  pool_contains?: InputMaybe<Scalars['String']['input']>
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>
  pool_ends_with?: InputMaybe<Scalars['String']['input']>
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_gt?: InputMaybe<Scalars['String']['input']>
  pool_gte?: InputMaybe<Scalars['String']['input']>
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>
  pool_lt?: InputMaybe<Scalars['String']['input']>
  pool_lte?: InputMaybe<Scalars['String']['input']>
  pool_not?: InputMaybe<Scalars['String']['input']>
  pool_not_contains?: InputMaybe<Scalars['String']['input']>
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_starts_with?: InputMaybe<Scalars['String']['input']>
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  timestamp?: InputMaybe<Scalars['Int']['input']>
  timestamp_gt?: InputMaybe<Scalars['Int']['input']>
  timestamp_gte?: InputMaybe<Scalars['Int']['input']>
  timestamp_in?: InputMaybe<Array<Scalars['Int']['input']>>
  timestamp_lt?: InputMaybe<Scalars['Int']['input']>
  timestamp_lte?: InputMaybe<Scalars['Int']['input']>
  timestamp_not?: InputMaybe<Scalars['Int']['input']>
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
}

export type Candle_OrderBy =
  | 'base'
  | 'close'
  | 'high'
  | 'id'
  | 'low'
  | 'num_tx'
  | 'open'
  | 'period'
  | 'pool'
  | 'timestamp'

export type Chain = {
  __typename?: 'Chain'
  addressWrapped?: Maybe<Scalars['String']['output']>
  blockExplorerUrl?: Maybe<Scalars['String']['output']>
  chainName?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  logo?: Maybe<Scalars['String']['output']>
  nativeTokenDecimals?: Maybe<Scalars['Int']['output']>
  nativeTokenName?: Maybe<Scalars['String']['output']>
  nativeTokenSymbol?: Maybe<Scalars['String']['output']>
  rpcUrls?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  secondsPerBlock?: Maybe<Scalars['Int']['output']>
}

export type Chain_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
}

export type Chain_OrderBy = 'id'

/**
 * Fee volume per type for 1h, 1d and 7d periods (1d periods are not 24h volume as they are based from 00:00 UTC)
 *
 */
export type Fee = {
  __typename?: 'Fee'
  /**
   * Pool ID + Period + Operation type + Timestamp at start of period
   *
   */
  id: Scalars['ID']['output']
  kassandra?: Maybe<Kassandra>
  /**
   * Period in seconds, available in 1h, 24h, 7d
   *
   */
  period: Scalars['Int']['output']
  pool: Pool
  timestamp: Scalars['Int']['output']
  /**
   * One of 'join', 'exit', 'swap' or 'aum'
   *
   */
  type: Scalars['String']['output']
  /**
   * This value is not null only when **type** is **join**
   *
   */
  volume_broker_btc?: Maybe<Scalars['BigDecimal']['output']>
  /**
   * This value is not null only when **type** is **join**
   *
   */
  volume_broker_usd?: Maybe<Scalars['BigDecimal']['output']>
  volume_btc: Scalars['BigDecimal']['output']
  volume_usd: Scalars['BigDecimal']['output']
}

export type Fee_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  kassandra?: InputMaybe<Scalars['String']['input']>
  kassandra_?: InputMaybe<Kassandra_Filter>
  kassandra_contains?: InputMaybe<Scalars['String']['input']>
  kassandra_contains_nocase?: InputMaybe<Scalars['String']['input']>
  kassandra_ends_with?: InputMaybe<Scalars['String']['input']>
  kassandra_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  kassandra_gt?: InputMaybe<Scalars['String']['input']>
  kassandra_gte?: InputMaybe<Scalars['String']['input']>
  kassandra_in?: InputMaybe<Array<Scalars['String']['input']>>
  kassandra_lt?: InputMaybe<Scalars['String']['input']>
  kassandra_lte?: InputMaybe<Scalars['String']['input']>
  kassandra_not?: InputMaybe<Scalars['String']['input']>
  kassandra_not_contains?: InputMaybe<Scalars['String']['input']>
  kassandra_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  kassandra_not_ends_with?: InputMaybe<Scalars['String']['input']>
  kassandra_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  kassandra_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  kassandra_not_starts_with?: InputMaybe<Scalars['String']['input']>
  kassandra_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  kassandra_starts_with?: InputMaybe<Scalars['String']['input']>
  kassandra_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  period?: InputMaybe<Scalars['Int']['input']>
  period_gt?: InputMaybe<Scalars['Int']['input']>
  period_gte?: InputMaybe<Scalars['Int']['input']>
  period_in?: InputMaybe<Array<Scalars['Int']['input']>>
  period_lt?: InputMaybe<Scalars['Int']['input']>
  period_lte?: InputMaybe<Scalars['Int']['input']>
  period_not?: InputMaybe<Scalars['Int']['input']>
  period_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  pool?: InputMaybe<Scalars['String']['input']>
  pool_?: InputMaybe<Pool_Filter>
  pool_contains?: InputMaybe<Scalars['String']['input']>
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>
  pool_ends_with?: InputMaybe<Scalars['String']['input']>
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_gt?: InputMaybe<Scalars['String']['input']>
  pool_gte?: InputMaybe<Scalars['String']['input']>
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>
  pool_lt?: InputMaybe<Scalars['String']['input']>
  pool_lte?: InputMaybe<Scalars['String']['input']>
  pool_not?: InputMaybe<Scalars['String']['input']>
  pool_not_contains?: InputMaybe<Scalars['String']['input']>
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_starts_with?: InputMaybe<Scalars['String']['input']>
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  timestamp?: InputMaybe<Scalars['Int']['input']>
  timestamp_gt?: InputMaybe<Scalars['Int']['input']>
  timestamp_gte?: InputMaybe<Scalars['Int']['input']>
  timestamp_in?: InputMaybe<Array<Scalars['Int']['input']>>
  timestamp_lt?: InputMaybe<Scalars['Int']['input']>
  timestamp_lte?: InputMaybe<Scalars['Int']['input']>
  timestamp_not?: InputMaybe<Scalars['Int']['input']>
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  type?: InputMaybe<Scalars['String']['input']>
  type_contains?: InputMaybe<Scalars['String']['input']>
  type_contains_nocase?: InputMaybe<Scalars['String']['input']>
  type_ends_with?: InputMaybe<Scalars['String']['input']>
  type_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  type_gt?: InputMaybe<Scalars['String']['input']>
  type_gte?: InputMaybe<Scalars['String']['input']>
  type_in?: InputMaybe<Array<Scalars['String']['input']>>
  type_lt?: InputMaybe<Scalars['String']['input']>
  type_lte?: InputMaybe<Scalars['String']['input']>
  type_not?: InputMaybe<Scalars['String']['input']>
  type_not_contains?: InputMaybe<Scalars['String']['input']>
  type_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  type_not_ends_with?: InputMaybe<Scalars['String']['input']>
  type_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  type_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  type_not_starts_with?: InputMaybe<Scalars['String']['input']>
  type_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  type_starts_with?: InputMaybe<Scalars['String']['input']>
  type_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  volume_broker_btc?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_broker_btc_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_broker_btc_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_broker_btc_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  volume_broker_btc_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_broker_btc_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_broker_btc_not?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_broker_btc_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  volume_broker_usd?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_broker_usd_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_broker_usd_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_broker_usd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  volume_broker_usd_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_broker_usd_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_broker_usd_not?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_broker_usd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  volume_btc?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_btc_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_btc_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_btc_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  volume_btc_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_btc_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_btc_not?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_btc_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  volume_usd?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_usd_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_usd_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_usd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  volume_usd_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_usd_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_usd_not?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_usd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
}

export type Fee_OrderBy =
  | 'id'
  | 'kassandra'
  | 'period'
  | 'pool'
  | 'timestamp'
  | 'type'
  | 'volume_broker_btc'
  | 'volume_broker_usd'
  | 'volume_btc'
  | 'volume_usd'

export type Filter_Pool = {
  chainId?: InputMaybe<Scalars['Int']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
}

/**
 * Holds a common array for activities and weight_goals
 *
 */
export type History = {
  __typename?: 'History'
  activity?: Maybe<Activity>
  /**
   * ID of underlying item
   *
   */
  id: Scalars['ID']['output']
  pool: Pool
  timestamp: Scalars['BigInt']['output']
  weight_goal?: Maybe<WeightGoalPoint>
}

export type History_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  activity?: InputMaybe<Scalars['String']['input']>
  activity_?: InputMaybe<Activity_Filter>
  activity_contains?: InputMaybe<Scalars['String']['input']>
  activity_contains_nocase?: InputMaybe<Scalars['String']['input']>
  activity_ends_with?: InputMaybe<Scalars['String']['input']>
  activity_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  activity_gt?: InputMaybe<Scalars['String']['input']>
  activity_gte?: InputMaybe<Scalars['String']['input']>
  activity_in?: InputMaybe<Array<Scalars['String']['input']>>
  activity_lt?: InputMaybe<Scalars['String']['input']>
  activity_lte?: InputMaybe<Scalars['String']['input']>
  activity_not?: InputMaybe<Scalars['String']['input']>
  activity_not_contains?: InputMaybe<Scalars['String']['input']>
  activity_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  activity_not_ends_with?: InputMaybe<Scalars['String']['input']>
  activity_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  activity_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  activity_not_starts_with?: InputMaybe<Scalars['String']['input']>
  activity_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  activity_starts_with?: InputMaybe<Scalars['String']['input']>
  activity_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  pool?: InputMaybe<Scalars['String']['input']>
  pool_?: InputMaybe<Pool_Filter>
  pool_contains?: InputMaybe<Scalars['String']['input']>
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>
  pool_ends_with?: InputMaybe<Scalars['String']['input']>
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_gt?: InputMaybe<Scalars['String']['input']>
  pool_gte?: InputMaybe<Scalars['String']['input']>
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>
  pool_lt?: InputMaybe<Scalars['String']['input']>
  pool_lte?: InputMaybe<Scalars['String']['input']>
  pool_not?: InputMaybe<Scalars['String']['input']>
  pool_not_contains?: InputMaybe<Scalars['String']['input']>
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_starts_with?: InputMaybe<Scalars['String']['input']>
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  timestamp?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  weight_goal?: InputMaybe<Scalars['String']['input']>
  weight_goal_?: InputMaybe<WeightGoalPoint_Filter>
  weight_goal_contains?: InputMaybe<Scalars['String']['input']>
  weight_goal_contains_nocase?: InputMaybe<Scalars['String']['input']>
  weight_goal_ends_with?: InputMaybe<Scalars['String']['input']>
  weight_goal_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  weight_goal_gt?: InputMaybe<Scalars['String']['input']>
  weight_goal_gte?: InputMaybe<Scalars['String']['input']>
  weight_goal_in?: InputMaybe<Array<Scalars['String']['input']>>
  weight_goal_lt?: InputMaybe<Scalars['String']['input']>
  weight_goal_lte?: InputMaybe<Scalars['String']['input']>
  weight_goal_not?: InputMaybe<Scalars['String']['input']>
  weight_goal_not_contains?: InputMaybe<Scalars['String']['input']>
  weight_goal_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  weight_goal_not_ends_with?: InputMaybe<Scalars['String']['input']>
  weight_goal_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  weight_goal_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  weight_goal_not_starts_with?: InputMaybe<Scalars['String']['input']>
  weight_goal_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  weight_goal_starts_with?: InputMaybe<Scalars['String']['input']>
  weight_goal_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
}

export type History_OrderBy =
  | 'activity'
  | 'id'
  | 'pool'
  | 'timestamp'
  | 'weight_goal'

/**
 * Investors in a pool
 *
 */
export type Investor = {
  __typename?: 'Investor'
  /**
   * Current amount of pool tokens
   *
   */
  amount: Scalars['BigDecimal']['output']
  /**
   * Amount of pool tokens the user ever received
   *
   */
  amount_alltime: Scalars['BigDecimal']['output']
  /**
   * Largest amount of pool tokens the user ever had
   *
   */
  amount_largest: Scalars['BigDecimal']['output']
  /**
   * If the first deposit was from a broker this won't be null
   *
   */
  broker?: Maybe<Broker>
  first_deposit_timestamp: Scalars['Int']['output']
  /**
   * Pool ID + Wallet address
   *
   */
  id: Scalars['ID']['output']
  last_deposit_timestamp: Scalars['Int']['output']
  pool: Pool
  wallet: Scalars['String']['output']
}

export type Investor_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  amount?: InputMaybe<Scalars['BigDecimal']['input']>
  amount_alltime?: InputMaybe<Scalars['BigDecimal']['input']>
  amount_alltime_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  amount_alltime_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  amount_alltime_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  amount_alltime_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  amount_alltime_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  amount_alltime_not?: InputMaybe<Scalars['BigDecimal']['input']>
  amount_alltime_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  amount_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  amount_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  amount_largest?: InputMaybe<Scalars['BigDecimal']['input']>
  amount_largest_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  amount_largest_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  amount_largest_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  amount_largest_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  amount_largest_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  amount_largest_not?: InputMaybe<Scalars['BigDecimal']['input']>
  amount_largest_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  amount_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  amount_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  amount_not?: InputMaybe<Scalars['BigDecimal']['input']>
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  broker?: InputMaybe<Scalars['String']['input']>
  broker_?: InputMaybe<Broker_Filter>
  broker_contains?: InputMaybe<Scalars['String']['input']>
  broker_contains_nocase?: InputMaybe<Scalars['String']['input']>
  broker_ends_with?: InputMaybe<Scalars['String']['input']>
  broker_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  broker_gt?: InputMaybe<Scalars['String']['input']>
  broker_gte?: InputMaybe<Scalars['String']['input']>
  broker_in?: InputMaybe<Array<Scalars['String']['input']>>
  broker_lt?: InputMaybe<Scalars['String']['input']>
  broker_lte?: InputMaybe<Scalars['String']['input']>
  broker_not?: InputMaybe<Scalars['String']['input']>
  broker_not_contains?: InputMaybe<Scalars['String']['input']>
  broker_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  broker_not_ends_with?: InputMaybe<Scalars['String']['input']>
  broker_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  broker_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  broker_not_starts_with?: InputMaybe<Scalars['String']['input']>
  broker_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  broker_starts_with?: InputMaybe<Scalars['String']['input']>
  broker_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  first_deposit_timestamp?: InputMaybe<Scalars['Int']['input']>
  first_deposit_timestamp_gt?: InputMaybe<Scalars['Int']['input']>
  first_deposit_timestamp_gte?: InputMaybe<Scalars['Int']['input']>
  first_deposit_timestamp_in?: InputMaybe<Array<Scalars['Int']['input']>>
  first_deposit_timestamp_lt?: InputMaybe<Scalars['Int']['input']>
  first_deposit_timestamp_lte?: InputMaybe<Scalars['Int']['input']>
  first_deposit_timestamp_not?: InputMaybe<Scalars['Int']['input']>
  first_deposit_timestamp_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  last_deposit_timestamp?: InputMaybe<Scalars['Int']['input']>
  last_deposit_timestamp_gt?: InputMaybe<Scalars['Int']['input']>
  last_deposit_timestamp_gte?: InputMaybe<Scalars['Int']['input']>
  last_deposit_timestamp_in?: InputMaybe<Array<Scalars['Int']['input']>>
  last_deposit_timestamp_lt?: InputMaybe<Scalars['Int']['input']>
  last_deposit_timestamp_lte?: InputMaybe<Scalars['Int']['input']>
  last_deposit_timestamp_not?: InputMaybe<Scalars['Int']['input']>
  last_deposit_timestamp_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  pool?: InputMaybe<Scalars['String']['input']>
  pool_?: InputMaybe<Pool_Filter>
  pool_contains?: InputMaybe<Scalars['String']['input']>
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>
  pool_ends_with?: InputMaybe<Scalars['String']['input']>
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_gt?: InputMaybe<Scalars['String']['input']>
  pool_gte?: InputMaybe<Scalars['String']['input']>
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>
  pool_lt?: InputMaybe<Scalars['String']['input']>
  pool_lte?: InputMaybe<Scalars['String']['input']>
  pool_not?: InputMaybe<Scalars['String']['input']>
  pool_not_contains?: InputMaybe<Scalars['String']['input']>
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_starts_with?: InputMaybe<Scalars['String']['input']>
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  wallet?: InputMaybe<Scalars['String']['input']>
  wallet_contains?: InputMaybe<Scalars['String']['input']>
  wallet_contains_nocase?: InputMaybe<Scalars['String']['input']>
  wallet_ends_with?: InputMaybe<Scalars['String']['input']>
  wallet_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  wallet_gt?: InputMaybe<Scalars['String']['input']>
  wallet_gte?: InputMaybe<Scalars['String']['input']>
  wallet_in?: InputMaybe<Array<Scalars['String']['input']>>
  wallet_lt?: InputMaybe<Scalars['String']['input']>
  wallet_lte?: InputMaybe<Scalars['String']['input']>
  wallet_not?: InputMaybe<Scalars['String']['input']>
  wallet_not_contains?: InputMaybe<Scalars['String']['input']>
  wallet_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  wallet_not_ends_with?: InputMaybe<Scalars['String']['input']>
  wallet_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  wallet_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  wallet_not_starts_with?: InputMaybe<Scalars['String']['input']>
  wallet_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  wallet_starts_with?: InputMaybe<Scalars['String']['input']>
  wallet_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
}

export type Investor_OrderBy =
  | 'amount'
  | 'amount_alltime'
  | 'amount_largest'
  | 'broker'
  | 'first_deposit_timestamp'
  | 'id'
  | 'last_deposit_timestamp'
  | 'pool'
  | 'wallet'

/**
 * Helper object to keep track of the AUM fee that goes to Kassandra
 *
 */
export type Kassandra = {
  __typename?: 'Kassandra'
  deposits_btc: Scalars['BigDecimal']['output']
  deposits_usd: Scalars['BigDecimal']['output']
  fee_aum_kassandra: Scalars['BigDecimal']['output']
  fees: Array<Fee>
  id: Scalars['ID']['output']
  num_deposits: Scalars['BigInt']['output']
  num_managers: Scalars['Int']['output']
  num_tx: Scalars['BigInt']['output']
  pool_count: Scalars['Int']['output']
  total_fees_aum_kassandra_btc: Scalars['BigDecimal']['output']
  total_fees_aum_kassandra_usd: Scalars['BigDecimal']['output']
  total_fees_aum_manager_btc: Scalars['BigDecimal']['output']
  total_fees_aum_manager_usd: Scalars['BigDecimal']['output']
  total_fees_exit_btc: Scalars['BigDecimal']['output']
  total_fees_exit_usd: Scalars['BigDecimal']['output']
  total_fees_join_broker_btc: Scalars['BigDecimal']['output']
  total_fees_join_broker_usd: Scalars['BigDecimal']['output']
  total_fees_join_manager_btc: Scalars['BigDecimal']['output']
  total_fees_join_manager_usd: Scalars['BigDecimal']['output']
  total_fees_swap_btc: Scalars['BigDecimal']['output']
  total_fees_swap_usd: Scalars['BigDecimal']['output']
  total_value_locked_btc: Scalars['BigDecimal']['output']
  total_value_locked_usd: Scalars['BigDecimal']['output']
  total_volume_btc: Scalars['BigDecimal']['output']
  total_volume_usd: Scalars['BigDecimal']['output']
  volumes: Array<Volume>
}

/**
 * Helper object to keep track of the AUM fee that goes to Kassandra
 *
 */
export type KassandraFeesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Fee_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<Fee_Filter>
}

/**
 * Helper object to keep track of the AUM fee that goes to Kassandra
 *
 */
export type KassandraVolumesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Volume_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<Volume_Filter>
}

export type Kassandra_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  deposits_btc?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_btc_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_btc_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_btc_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  deposits_btc_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_btc_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_btc_not?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_btc_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  deposits_usd?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_usd_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_usd_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_usd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  deposits_usd_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_usd_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_usd_not?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_usd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  fee_aum_kassandra?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_aum_kassandra_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_aum_kassandra_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_aum_kassandra_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  fee_aum_kassandra_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_aum_kassandra_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_aum_kassandra_not?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_aum_kassandra_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  fees_?: InputMaybe<Fee_Filter>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  num_deposits?: InputMaybe<Scalars['BigInt']['input']>
  num_deposits_gt?: InputMaybe<Scalars['BigInt']['input']>
  num_deposits_gte?: InputMaybe<Scalars['BigInt']['input']>
  num_deposits_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  num_deposits_lt?: InputMaybe<Scalars['BigInt']['input']>
  num_deposits_lte?: InputMaybe<Scalars['BigInt']['input']>
  num_deposits_not?: InputMaybe<Scalars['BigInt']['input']>
  num_deposits_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  num_managers?: InputMaybe<Scalars['Int']['input']>
  num_managers_gt?: InputMaybe<Scalars['Int']['input']>
  num_managers_gte?: InputMaybe<Scalars['Int']['input']>
  num_managers_in?: InputMaybe<Array<Scalars['Int']['input']>>
  num_managers_lt?: InputMaybe<Scalars['Int']['input']>
  num_managers_lte?: InputMaybe<Scalars['Int']['input']>
  num_managers_not?: InputMaybe<Scalars['Int']['input']>
  num_managers_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  num_tx?: InputMaybe<Scalars['BigInt']['input']>
  num_tx_gt?: InputMaybe<Scalars['BigInt']['input']>
  num_tx_gte?: InputMaybe<Scalars['BigInt']['input']>
  num_tx_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  num_tx_lt?: InputMaybe<Scalars['BigInt']['input']>
  num_tx_lte?: InputMaybe<Scalars['BigInt']['input']>
  num_tx_not?: InputMaybe<Scalars['BigInt']['input']>
  num_tx_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  pool_count?: InputMaybe<Scalars['Int']['input']>
  pool_count_gt?: InputMaybe<Scalars['Int']['input']>
  pool_count_gte?: InputMaybe<Scalars['Int']['input']>
  pool_count_in?: InputMaybe<Array<Scalars['Int']['input']>>
  pool_count_lt?: InputMaybe<Scalars['Int']['input']>
  pool_count_lte?: InputMaybe<Scalars['Int']['input']>
  pool_count_not?: InputMaybe<Scalars['Int']['input']>
  pool_count_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  total_fees_aum_kassandra_btc?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_kassandra_btc_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_kassandra_btc_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_kassandra_btc_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_aum_kassandra_btc_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_kassandra_btc_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_kassandra_btc_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_kassandra_btc_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_aum_kassandra_usd?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_kassandra_usd_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_kassandra_usd_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_kassandra_usd_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_aum_kassandra_usd_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_kassandra_usd_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_kassandra_usd_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_kassandra_usd_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_aum_manager_btc?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_manager_btc_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_manager_btc_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_manager_btc_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_aum_manager_btc_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_manager_btc_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_manager_btc_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_manager_btc_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_aum_manager_usd?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_manager_usd_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_manager_usd_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_manager_usd_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_aum_manager_usd_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_manager_usd_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_manager_usd_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_manager_usd_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_exit_btc?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_exit_btc_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_exit_btc_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_exit_btc_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_fees_exit_btc_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_exit_btc_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_exit_btc_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_exit_btc_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_fees_exit_usd?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_exit_usd_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_exit_usd_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_exit_usd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_fees_exit_usd_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_exit_usd_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_exit_usd_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_exit_usd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_fees_join_broker_btc?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_broker_btc_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_broker_btc_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_broker_btc_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_join_broker_btc_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_broker_btc_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_broker_btc_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_broker_btc_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_join_broker_usd?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_broker_usd_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_broker_usd_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_broker_usd_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_join_broker_usd_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_broker_usd_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_broker_usd_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_broker_usd_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_join_manager_btc?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_manager_btc_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_manager_btc_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_manager_btc_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_join_manager_btc_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_manager_btc_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_manager_btc_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_manager_btc_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_join_manager_usd?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_manager_usd_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_manager_usd_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_manager_usd_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_join_manager_usd_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_manager_usd_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_manager_usd_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_manager_usd_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_swap_btc?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_swap_btc_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_swap_btc_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_swap_btc_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_fees_swap_btc_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_swap_btc_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_swap_btc_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_swap_btc_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_fees_swap_usd?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_swap_usd_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_swap_usd_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_swap_usd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_fees_swap_usd_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_swap_usd_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_swap_usd_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_swap_usd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_value_locked_btc?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_btc_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_btc_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_btc_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_value_locked_btc_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_btc_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_btc_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_btc_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_value_locked_usd?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_usd_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_usd_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_usd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_value_locked_usd_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_usd_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_usd_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_usd_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_volume_btc?: InputMaybe<Scalars['BigDecimal']['input']>
  total_volume_btc_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_volume_btc_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_volume_btc_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_volume_btc_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_volume_btc_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_volume_btc_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_volume_btc_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_volume_usd?: InputMaybe<Scalars['BigDecimal']['input']>
  total_volume_usd_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_volume_usd_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_volume_usd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_volume_usd_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_volume_usd_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_volume_usd_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_volume_usd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  volumes_?: InputMaybe<Volume_Filter>
}

export type Kassandra_OrderBy =
  | 'deposits_btc'
  | 'deposits_usd'
  | 'fee_aum_kassandra'
  | 'fees'
  | 'id'
  | 'num_deposits'
  | 'num_managers'
  | 'num_tx'
  | 'pool_count'
  | 'total_fees_aum_kassandra_btc'
  | 'total_fees_aum_kassandra_usd'
  | 'total_fees_aum_manager_btc'
  | 'total_fees_aum_manager_usd'
  | 'total_fees_exit_btc'
  | 'total_fees_exit_usd'
  | 'total_fees_join_broker_btc'
  | 'total_fees_join_broker_usd'
  | 'total_fees_join_manager_btc'
  | 'total_fees_join_manager_usd'
  | 'total_fees_swap_btc'
  | 'total_fees_swap_usd'
  | 'total_value_locked_btc'
  | 'total_value_locked_usd'
  | 'total_volume_btc'
  | 'total_volume_usd'
  | 'volumes'

/**
 * Every manager of a pool in Kassandra
 *
 */
export type Manager = {
  __typename?: 'Manager'
  /**
   * Wallet address
   *
   */
  id: Scalars['ID']['output']
  pool_count: Scalars['Int']['output']
  pools: Array<Pool>
  total_value_locked: Array<TotalValueLocked>
  total_value_locked_btc: Scalars['BigDecimal']['output']
  total_value_locked_usd: Scalars['BigDecimal']['output']
  unique_investors: Scalars['Int']['output']
  volumes: Array<Volume>
}

/**
 * Every manager of a pool in Kassandra
 *
 */
export type ManagerPoolsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Pool_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<Pool_Filter>
}

/**
 * Every manager of a pool in Kassandra
 *
 */
export type ManagerTotal_Value_LockedArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<TotalValueLocked_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<TotalValueLocked_Filter>
}

/**
 * Every manager of a pool in Kassandra
 *
 */
export type ManagerVolumesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Volume_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<Volume_Filter>
}

export type Manager_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  pool_count?: InputMaybe<Scalars['Int']['input']>
  pool_count_gt?: InputMaybe<Scalars['Int']['input']>
  pool_count_gte?: InputMaybe<Scalars['Int']['input']>
  pool_count_in?: InputMaybe<Array<Scalars['Int']['input']>>
  pool_count_lt?: InputMaybe<Scalars['Int']['input']>
  pool_count_lte?: InputMaybe<Scalars['Int']['input']>
  pool_count_not?: InputMaybe<Scalars['Int']['input']>
  pool_count_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  pools_?: InputMaybe<Pool_Filter>
  total_value_locked_?: InputMaybe<TotalValueLocked_Filter>
  total_value_locked_btc?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_btc_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_btc_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_btc_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_value_locked_btc_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_btc_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_btc_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_btc_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_value_locked_usd?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_usd_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_usd_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_usd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_value_locked_usd_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_usd_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_usd_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_usd_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  unique_investors?: InputMaybe<Scalars['Int']['input']>
  unique_investors_gt?: InputMaybe<Scalars['Int']['input']>
  unique_investors_gte?: InputMaybe<Scalars['Int']['input']>
  unique_investors_in?: InputMaybe<Array<Scalars['Int']['input']>>
  unique_investors_lt?: InputMaybe<Scalars['Int']['input']>
  unique_investors_lte?: InputMaybe<Scalars['Int']['input']>
  unique_investors_not?: InputMaybe<Scalars['Int']['input']>
  unique_investors_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  volumes_?: InputMaybe<Volume_Filter>
}

export type Manager_OrderBy =
  | 'id'
  | 'pool_count'
  | 'pools'
  | 'total_value_locked'
  | 'total_value_locked_btc'
  | 'total_value_locked_usd'
  | 'unique_investors'
  | 'volumes'

export type Mutation = {
  __typename?: 'Mutation'
  savePool?: Maybe<Result>
}

export type MutationSavePoolArgs = {
  chainId: Scalars['Int']['input']
  controller: Scalars['String']['input']
  logo?: InputMaybe<Scalars['String']['input']>
  signature: Scalars['String']['input']
  summary?: InputMaybe<Scalars['String']['input']>
}

/** Defines the order direction, either ascending or descending */
export type OrderDirection = 'asc' | 'desc'

export type Partner = {
  __typename?: 'Partner'
  logo?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
}

export type Pool = {
  __typename?: 'Pool'
  _investors: Array<Scalars['String']['output']>
  activities: Array<Activity>
  /**
   * Address of the ERC20 token
   *
   */
  address: Scalars['String']['output']
  brokers: Array<Broker>
  chain?: Maybe<Chain>
  chainId?: Maybe<Scalars['Int']['output']>
  chain_id: Scalars['Int']['output']
  /**
   * Controller contract that controls the vault
   *
   */
  controller: Scalars['String']['output']
  decimals: Scalars['Int']['output']
  deposits_broker_btc: Scalars['BigDecimal']['output']
  deposits_broker_usd: Scalars['BigDecimal']['output']
  deposits_btc: Scalars['BigDecimal']['output']
  deposits_usd: Scalars['BigDecimal']['output']
  /**
   * Factory that created this pool
   *
   */
  factory: Scalars['String']['output']
  featured?: Maybe<Scalars['Boolean']['output']>
  fee_aum: Scalars['BigDecimal']['output']
  fee_aum_kassandra: Scalars['BigDecimal']['output']
  fee_exit: Scalars['BigDecimal']['output']
  fee_join_broker: Scalars['BigDecimal']['output']
  fee_join_manager: Scalars['BigDecimal']['output']
  fee_swap: Scalars['BigDecimal']['output']
  fees: Array<Fee>
  foundedBy?: Maybe<Scalars['String']['output']>
  history: Array<History>
  id: Scalars['ID']['output']
  investors: Array<Investor>
  is_private_pool: Scalars['Boolean']['output']
  last_harvest?: Maybe<Scalars['BigInt']['output']>
  logo?: Maybe<Scalars['String']['output']>
  /**
   * Address that controls the controlller
   *
   */
  manager: Manager
  name: Scalars['String']['output']
  num_activities: Scalars['Int']['output']
  num_brokers: Scalars['Int']['output']
  num_deposits: Scalars['BigInt']['output']
  num_deposits_broker: Scalars['BigInt']['output']
  num_exit: Scalars['BigInt']['output']
  num_join: Scalars['BigInt']['output']
  num_swap: Scalars['BigInt']['output']
  num_token_add: Scalars['Int']['output']
  num_token_remove: Scalars['Int']['output']
  num_tx: Scalars['BigInt']['output']
  num_weight_goals: Scalars['Int']['output']
  partners?: Maybe<Array<Maybe<Partner>>>
  poolId?: Maybe<Scalars['Int']['output']>
  pool_version: Scalars['Int']['output']
  price_btc: Scalars['BigDecimal']['output']
  price_candles: Array<Candle>
  price_usd: Scalars['BigDecimal']['output']
  /**
   * Address that can manage the assets in the pool
   *
   */
  strategy: Scalars['String']['output']
  summary?: Maybe<Scalars['String']['output']>
  supply: Scalars['BigDecimal']['output']
  supply_changes: Array<PoolSupply>
  symbol: Scalars['String']['output']
  total_fees_aum_kassandra: Scalars['BigDecimal']['output']
  total_fees_aum_kassandra_btc: Scalars['BigDecimal']['output']
  total_fees_aum_kassandra_usd: Scalars['BigDecimal']['output']
  total_fees_aum_manager: Scalars['BigDecimal']['output']
  total_fees_aum_manager_btc: Scalars['BigDecimal']['output']
  total_fees_aum_manager_usd: Scalars['BigDecimal']['output']
  total_fees_exit: Scalars['BigDecimal']['output']
  total_fees_exit_btc: Scalars['BigDecimal']['output']
  total_fees_exit_usd: Scalars['BigDecimal']['output']
  total_fees_join_broker: Scalars['BigDecimal']['output']
  total_fees_join_broker_btc: Scalars['BigDecimal']['output']
  total_fees_join_broker_usd: Scalars['BigDecimal']['output']
  total_fees_join_manager: Scalars['BigDecimal']['output']
  total_fees_join_manager_btc: Scalars['BigDecimal']['output']
  total_fees_join_manager_usd: Scalars['BigDecimal']['output']
  total_fees_swap_btc: Scalars['BigDecimal']['output']
  total_fees_swap_usd: Scalars['BigDecimal']['output']
  total_value_locked: Array<TotalValueLocked>
  total_value_locked_btc: Scalars['BigDecimal']['output']
  total_value_locked_usd: Scalars['BigDecimal']['output']
  total_volume_btc: Scalars['BigDecimal']['output']
  total_volume_usd: Scalars['BigDecimal']['output']
  underlying_assets: Array<Asset>
  underlying_assets_addresses: Array<Scalars['String']['output']>
  /**
   * Current amount of unique investors in the pool
   *
   */
  unique_investors: Scalars['Int']['output']
  /**
   * Current amount of unique investors in the pool that made their first investment through a broker
   *
   */
  unique_investors_broker: Scalars['Int']['output']
  url?: Maybe<Scalars['String']['output']>
  /**
   * Contract that holds the tokens
   *
   */
  vault: Scalars['String']['output']
  /**
   * ID of pool inside the vault
   *
   */
  vault_id: Scalars['String']['output']
  volumes: Array<Volume>
  weight_goals: Array<WeightGoalPoint>
  weights: Array<WeightPoint>
  /**
   * Contract that contains a list of tokens the manager can add to the pool
   *
   */
  whitelist: Scalars['String']['output']
}

export type PoolActivitiesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Activity_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<Activity_Filter>
}

export type PoolBrokersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Broker_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<Broker_Filter>
}

export type PoolFeesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Fee_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<Fee_Filter>
}

export type PoolHistoryArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<History_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<History_Filter>
}

export type PoolInvestorsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Investor_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<Investor_Filter>
}

export type PoolPrice_CandlesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Candle_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<Candle_Filter>
}

export type PoolSupply_ChangesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<PoolSupply_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<PoolSupply_Filter>
}

export type PoolTotal_Value_LockedArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<TotalValueLocked_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<TotalValueLocked_Filter>
}

export type PoolUnderlying_AssetsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Asset_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<Asset_Filter>
}

export type PoolVolumesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Volume_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<Volume_Filter>
}

export type PoolWeight_GoalsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<WeightGoalPoint_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<WeightGoalPoint_Filter>
}

export type PoolWeightsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<WeightPoint_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<WeightPoint_Filter>
}

/**
 * Pool supply raw points graph
 *
 */
export type PoolSupply = {
  __typename?: 'PoolSupply'
  block: Scalars['BigInt']['output']
  block_hash: Scalars['Bytes']['output']
  /**
   * Transaction hash
   *
   */
  id: Scalars['ID']['output']
  pool: Pool
  timestamp: Scalars['Int']['output']
  value: Scalars['BigDecimal']['output']
}

export type PoolSupply_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  block?: InputMaybe<Scalars['BigInt']['input']>
  block_gt?: InputMaybe<Scalars['BigInt']['input']>
  block_gte?: InputMaybe<Scalars['BigInt']['input']>
  block_hash?: InputMaybe<Scalars['Bytes']['input']>
  block_hash_contains?: InputMaybe<Scalars['Bytes']['input']>
  block_hash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>
  block_hash_not?: InputMaybe<Scalars['Bytes']['input']>
  block_hash_not_contains?: InputMaybe<Scalars['Bytes']['input']>
  block_hash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>
  block_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  block_lt?: InputMaybe<Scalars['BigInt']['input']>
  block_lte?: InputMaybe<Scalars['BigInt']['input']>
  block_not?: InputMaybe<Scalars['BigInt']['input']>
  block_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  pool?: InputMaybe<Scalars['String']['input']>
  pool_?: InputMaybe<Pool_Filter>
  pool_contains?: InputMaybe<Scalars['String']['input']>
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>
  pool_ends_with?: InputMaybe<Scalars['String']['input']>
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_gt?: InputMaybe<Scalars['String']['input']>
  pool_gte?: InputMaybe<Scalars['String']['input']>
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>
  pool_lt?: InputMaybe<Scalars['String']['input']>
  pool_lte?: InputMaybe<Scalars['String']['input']>
  pool_not?: InputMaybe<Scalars['String']['input']>
  pool_not_contains?: InputMaybe<Scalars['String']['input']>
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_starts_with?: InputMaybe<Scalars['String']['input']>
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  timestamp?: InputMaybe<Scalars['Int']['input']>
  timestamp_gt?: InputMaybe<Scalars['Int']['input']>
  timestamp_gte?: InputMaybe<Scalars['Int']['input']>
  timestamp_in?: InputMaybe<Array<Scalars['Int']['input']>>
  timestamp_lt?: InputMaybe<Scalars['Int']['input']>
  timestamp_lte?: InputMaybe<Scalars['Int']['input']>
  timestamp_not?: InputMaybe<Scalars['Int']['input']>
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  value?: InputMaybe<Scalars['BigDecimal']['input']>
  value_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  value_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  value_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  value_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  value_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  value_not?: InputMaybe<Scalars['BigDecimal']['input']>
  value_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
}

export type PoolSupply_OrderBy =
  | 'block'
  | 'block_hash'
  | 'id'
  | 'pool'
  | 'timestamp'
  | 'value'

export type Pool_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  _investors?: InputMaybe<Array<Scalars['String']['input']>>
  _investors_contains?: InputMaybe<Array<Scalars['String']['input']>>
  _investors_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>
  _investors_not?: InputMaybe<Array<Scalars['String']['input']>>
  _investors_not_contains?: InputMaybe<Array<Scalars['String']['input']>>
  _investors_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>
  activities_?: InputMaybe<Activity_Filter>
  address?: InputMaybe<Scalars['String']['input']>
  address_contains?: InputMaybe<Scalars['String']['input']>
  address_contains_nocase?: InputMaybe<Scalars['String']['input']>
  address_ends_with?: InputMaybe<Scalars['String']['input']>
  address_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  address_gt?: InputMaybe<Scalars['String']['input']>
  address_gte?: InputMaybe<Scalars['String']['input']>
  address_in?: InputMaybe<Array<Scalars['String']['input']>>
  address_lt?: InputMaybe<Scalars['String']['input']>
  address_lte?: InputMaybe<Scalars['String']['input']>
  address_not?: InputMaybe<Scalars['String']['input']>
  address_not_contains?: InputMaybe<Scalars['String']['input']>
  address_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  address_not_ends_with?: InputMaybe<Scalars['String']['input']>
  address_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  address_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  address_not_starts_with?: InputMaybe<Scalars['String']['input']>
  address_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  address_starts_with?: InputMaybe<Scalars['String']['input']>
  address_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  brokers_?: InputMaybe<Broker_Filter>
  chain?: InputMaybe<Scalars['String']['input']>
  chain_?: InputMaybe<Chain_Filter>
  chain_contains?: InputMaybe<Scalars['String']['input']>
  chain_contains_nocase?: InputMaybe<Scalars['String']['input']>
  chain_ends_with?: InputMaybe<Scalars['String']['input']>
  chain_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  chain_gt?: InputMaybe<Scalars['String']['input']>
  chain_gte?: InputMaybe<Scalars['String']['input']>
  chain_id?: InputMaybe<Scalars['Int']['input']>
  chain_id_gt?: InputMaybe<Scalars['Int']['input']>
  chain_id_gte?: InputMaybe<Scalars['Int']['input']>
  chain_id_in?: InputMaybe<Array<Scalars['Int']['input']>>
  chain_id_lt?: InputMaybe<Scalars['Int']['input']>
  chain_id_lte?: InputMaybe<Scalars['Int']['input']>
  chain_id_not?: InputMaybe<Scalars['Int']['input']>
  chain_id_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  chain_in?: InputMaybe<Array<Scalars['String']['input']>>
  chain_lt?: InputMaybe<Scalars['String']['input']>
  chain_lte?: InputMaybe<Scalars['String']['input']>
  chain_not?: InputMaybe<Scalars['String']['input']>
  chain_not_contains?: InputMaybe<Scalars['String']['input']>
  chain_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  chain_not_ends_with?: InputMaybe<Scalars['String']['input']>
  chain_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  chain_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  chain_not_starts_with?: InputMaybe<Scalars['String']['input']>
  chain_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  chain_starts_with?: InputMaybe<Scalars['String']['input']>
  chain_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  controller?: InputMaybe<Scalars['String']['input']>
  controller_contains?: InputMaybe<Scalars['String']['input']>
  controller_contains_nocase?: InputMaybe<Scalars['String']['input']>
  controller_ends_with?: InputMaybe<Scalars['String']['input']>
  controller_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  controller_gt?: InputMaybe<Scalars['String']['input']>
  controller_gte?: InputMaybe<Scalars['String']['input']>
  controller_in?: InputMaybe<Array<Scalars['String']['input']>>
  controller_lt?: InputMaybe<Scalars['String']['input']>
  controller_lte?: InputMaybe<Scalars['String']['input']>
  controller_not?: InputMaybe<Scalars['String']['input']>
  controller_not_contains?: InputMaybe<Scalars['String']['input']>
  controller_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  controller_not_ends_with?: InputMaybe<Scalars['String']['input']>
  controller_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  controller_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  controller_not_starts_with?: InputMaybe<Scalars['String']['input']>
  controller_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  controller_starts_with?: InputMaybe<Scalars['String']['input']>
  controller_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  decimals?: InputMaybe<Scalars['Int']['input']>
  decimals_gt?: InputMaybe<Scalars['Int']['input']>
  decimals_gte?: InputMaybe<Scalars['Int']['input']>
  decimals_in?: InputMaybe<Array<Scalars['Int']['input']>>
  decimals_lt?: InputMaybe<Scalars['Int']['input']>
  decimals_lte?: InputMaybe<Scalars['Int']['input']>
  decimals_not?: InputMaybe<Scalars['Int']['input']>
  decimals_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  deposits_broker_btc?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_broker_btc_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_broker_btc_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_broker_btc_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  deposits_broker_btc_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_broker_btc_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_broker_btc_not?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_broker_btc_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  deposits_broker_usd?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_broker_usd_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_broker_usd_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_broker_usd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  deposits_broker_usd_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_broker_usd_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_broker_usd_not?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_broker_usd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  deposits_btc?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_btc_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_btc_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_btc_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  deposits_btc_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_btc_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_btc_not?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_btc_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  deposits_usd?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_usd_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_usd_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_usd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  deposits_usd_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_usd_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_usd_not?: InputMaybe<Scalars['BigDecimal']['input']>
  deposits_usd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  factory?: InputMaybe<Scalars['String']['input']>
  factory_contains?: InputMaybe<Scalars['String']['input']>
  factory_contains_nocase?: InputMaybe<Scalars['String']['input']>
  factory_ends_with?: InputMaybe<Scalars['String']['input']>
  factory_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  factory_gt?: InputMaybe<Scalars['String']['input']>
  factory_gte?: InputMaybe<Scalars['String']['input']>
  factory_in?: InputMaybe<Array<Scalars['String']['input']>>
  factory_lt?: InputMaybe<Scalars['String']['input']>
  factory_lte?: InputMaybe<Scalars['String']['input']>
  factory_not?: InputMaybe<Scalars['String']['input']>
  factory_not_contains?: InputMaybe<Scalars['String']['input']>
  factory_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  factory_not_ends_with?: InputMaybe<Scalars['String']['input']>
  factory_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  factory_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  factory_not_starts_with?: InputMaybe<Scalars['String']['input']>
  factory_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  factory_starts_with?: InputMaybe<Scalars['String']['input']>
  factory_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  fee_aum?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_aum_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_aum_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_aum_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  fee_aum_kassandra?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_aum_kassandra_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_aum_kassandra_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_aum_kassandra_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  fee_aum_kassandra_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_aum_kassandra_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_aum_kassandra_not?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_aum_kassandra_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  fee_aum_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_aum_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_aum_not?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_aum_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  fee_exit?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_exit_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_exit_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_exit_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  fee_exit_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_exit_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_exit_not?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_exit_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  fee_join_broker?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_join_broker_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_join_broker_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_join_broker_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  fee_join_broker_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_join_broker_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_join_broker_not?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_join_broker_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  fee_join_manager?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_join_manager_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_join_manager_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_join_manager_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  fee_join_manager_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_join_manager_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_join_manager_not?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_join_manager_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  fee_swap?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_swap_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_swap_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_swap_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  fee_swap_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_swap_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_swap_not?: InputMaybe<Scalars['BigDecimal']['input']>
  fee_swap_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  fees_?: InputMaybe<Fee_Filter>
  history_?: InputMaybe<History_Filter>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  investors_?: InputMaybe<Investor_Filter>
  is_private_pool?: InputMaybe<Scalars['Boolean']['input']>
  is_private_pool_in?: InputMaybe<Array<Scalars['Boolean']['input']>>
  is_private_pool_not?: InputMaybe<Scalars['Boolean']['input']>
  is_private_pool_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>
  last_harvest?: InputMaybe<Scalars['BigInt']['input']>
  last_harvest_gt?: InputMaybe<Scalars['BigInt']['input']>
  last_harvest_gte?: InputMaybe<Scalars['BigInt']['input']>
  last_harvest_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  last_harvest_lt?: InputMaybe<Scalars['BigInt']['input']>
  last_harvest_lte?: InputMaybe<Scalars['BigInt']['input']>
  last_harvest_not?: InputMaybe<Scalars['BigInt']['input']>
  last_harvest_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  manager?: InputMaybe<Scalars['String']['input']>
  manager_?: InputMaybe<Manager_Filter>
  manager_contains?: InputMaybe<Scalars['String']['input']>
  manager_contains_nocase?: InputMaybe<Scalars['String']['input']>
  manager_ends_with?: InputMaybe<Scalars['String']['input']>
  manager_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  manager_gt?: InputMaybe<Scalars['String']['input']>
  manager_gte?: InputMaybe<Scalars['String']['input']>
  manager_in?: InputMaybe<Array<Scalars['String']['input']>>
  manager_lt?: InputMaybe<Scalars['String']['input']>
  manager_lte?: InputMaybe<Scalars['String']['input']>
  manager_not?: InputMaybe<Scalars['String']['input']>
  manager_not_contains?: InputMaybe<Scalars['String']['input']>
  manager_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  manager_not_ends_with?: InputMaybe<Scalars['String']['input']>
  manager_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  manager_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  manager_not_starts_with?: InputMaybe<Scalars['String']['input']>
  manager_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  manager_starts_with?: InputMaybe<Scalars['String']['input']>
  manager_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  name_contains?: InputMaybe<Scalars['String']['input']>
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>
  name_ends_with?: InputMaybe<Scalars['String']['input']>
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  name_gt?: InputMaybe<Scalars['String']['input']>
  name_gte?: InputMaybe<Scalars['String']['input']>
  name_in?: InputMaybe<Array<Scalars['String']['input']>>
  name_lt?: InputMaybe<Scalars['String']['input']>
  name_lte?: InputMaybe<Scalars['String']['input']>
  name_not?: InputMaybe<Scalars['String']['input']>
  name_not_contains?: InputMaybe<Scalars['String']['input']>
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  name_starts_with?: InputMaybe<Scalars['String']['input']>
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  num_activities?: InputMaybe<Scalars['Int']['input']>
  num_activities_gt?: InputMaybe<Scalars['Int']['input']>
  num_activities_gte?: InputMaybe<Scalars['Int']['input']>
  num_activities_in?: InputMaybe<Array<Scalars['Int']['input']>>
  num_activities_lt?: InputMaybe<Scalars['Int']['input']>
  num_activities_lte?: InputMaybe<Scalars['Int']['input']>
  num_activities_not?: InputMaybe<Scalars['Int']['input']>
  num_activities_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  num_brokers?: InputMaybe<Scalars['Int']['input']>
  num_brokers_gt?: InputMaybe<Scalars['Int']['input']>
  num_brokers_gte?: InputMaybe<Scalars['Int']['input']>
  num_brokers_in?: InputMaybe<Array<Scalars['Int']['input']>>
  num_brokers_lt?: InputMaybe<Scalars['Int']['input']>
  num_brokers_lte?: InputMaybe<Scalars['Int']['input']>
  num_brokers_not?: InputMaybe<Scalars['Int']['input']>
  num_brokers_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  num_deposits?: InputMaybe<Scalars['BigInt']['input']>
  num_deposits_broker?: InputMaybe<Scalars['BigInt']['input']>
  num_deposits_broker_gt?: InputMaybe<Scalars['BigInt']['input']>
  num_deposits_broker_gte?: InputMaybe<Scalars['BigInt']['input']>
  num_deposits_broker_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  num_deposits_broker_lt?: InputMaybe<Scalars['BigInt']['input']>
  num_deposits_broker_lte?: InputMaybe<Scalars['BigInt']['input']>
  num_deposits_broker_not?: InputMaybe<Scalars['BigInt']['input']>
  num_deposits_broker_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  num_deposits_gt?: InputMaybe<Scalars['BigInt']['input']>
  num_deposits_gte?: InputMaybe<Scalars['BigInt']['input']>
  num_deposits_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  num_deposits_lt?: InputMaybe<Scalars['BigInt']['input']>
  num_deposits_lte?: InputMaybe<Scalars['BigInt']['input']>
  num_deposits_not?: InputMaybe<Scalars['BigInt']['input']>
  num_deposits_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  num_exit?: InputMaybe<Scalars['BigInt']['input']>
  num_exit_gt?: InputMaybe<Scalars['BigInt']['input']>
  num_exit_gte?: InputMaybe<Scalars['BigInt']['input']>
  num_exit_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  num_exit_lt?: InputMaybe<Scalars['BigInt']['input']>
  num_exit_lte?: InputMaybe<Scalars['BigInt']['input']>
  num_exit_not?: InputMaybe<Scalars['BigInt']['input']>
  num_exit_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  num_join?: InputMaybe<Scalars['BigInt']['input']>
  num_join_gt?: InputMaybe<Scalars['BigInt']['input']>
  num_join_gte?: InputMaybe<Scalars['BigInt']['input']>
  num_join_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  num_join_lt?: InputMaybe<Scalars['BigInt']['input']>
  num_join_lte?: InputMaybe<Scalars['BigInt']['input']>
  num_join_not?: InputMaybe<Scalars['BigInt']['input']>
  num_join_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  num_swap?: InputMaybe<Scalars['BigInt']['input']>
  num_swap_gt?: InputMaybe<Scalars['BigInt']['input']>
  num_swap_gte?: InputMaybe<Scalars['BigInt']['input']>
  num_swap_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  num_swap_lt?: InputMaybe<Scalars['BigInt']['input']>
  num_swap_lte?: InputMaybe<Scalars['BigInt']['input']>
  num_swap_not?: InputMaybe<Scalars['BigInt']['input']>
  num_swap_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  num_token_add?: InputMaybe<Scalars['Int']['input']>
  num_token_add_gt?: InputMaybe<Scalars['Int']['input']>
  num_token_add_gte?: InputMaybe<Scalars['Int']['input']>
  num_token_add_in?: InputMaybe<Array<Scalars['Int']['input']>>
  num_token_add_lt?: InputMaybe<Scalars['Int']['input']>
  num_token_add_lte?: InputMaybe<Scalars['Int']['input']>
  num_token_add_not?: InputMaybe<Scalars['Int']['input']>
  num_token_add_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  num_token_remove?: InputMaybe<Scalars['Int']['input']>
  num_token_remove_gt?: InputMaybe<Scalars['Int']['input']>
  num_token_remove_gte?: InputMaybe<Scalars['Int']['input']>
  num_token_remove_in?: InputMaybe<Array<Scalars['Int']['input']>>
  num_token_remove_lt?: InputMaybe<Scalars['Int']['input']>
  num_token_remove_lte?: InputMaybe<Scalars['Int']['input']>
  num_token_remove_not?: InputMaybe<Scalars['Int']['input']>
  num_token_remove_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  num_tx?: InputMaybe<Scalars['BigInt']['input']>
  num_tx_gt?: InputMaybe<Scalars['BigInt']['input']>
  num_tx_gte?: InputMaybe<Scalars['BigInt']['input']>
  num_tx_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  num_tx_lt?: InputMaybe<Scalars['BigInt']['input']>
  num_tx_lte?: InputMaybe<Scalars['BigInt']['input']>
  num_tx_not?: InputMaybe<Scalars['BigInt']['input']>
  num_tx_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  num_weight_goals?: InputMaybe<Scalars['Int']['input']>
  num_weight_goals_gt?: InputMaybe<Scalars['Int']['input']>
  num_weight_goals_gte?: InputMaybe<Scalars['Int']['input']>
  num_weight_goals_in?: InputMaybe<Array<Scalars['Int']['input']>>
  num_weight_goals_lt?: InputMaybe<Scalars['Int']['input']>
  num_weight_goals_lte?: InputMaybe<Scalars['Int']['input']>
  num_weight_goals_not?: InputMaybe<Scalars['Int']['input']>
  num_weight_goals_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  pool_version?: InputMaybe<Scalars['Int']['input']>
  pool_version_gt?: InputMaybe<Scalars['Int']['input']>
  pool_version_gte?: InputMaybe<Scalars['Int']['input']>
  pool_version_in?: InputMaybe<Array<Scalars['Int']['input']>>
  pool_version_lt?: InputMaybe<Scalars['Int']['input']>
  pool_version_lte?: InputMaybe<Scalars['Int']['input']>
  pool_version_not?: InputMaybe<Scalars['Int']['input']>
  pool_version_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  price_btc?: InputMaybe<Scalars['BigDecimal']['input']>
  price_btc_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  price_btc_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  price_btc_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  price_btc_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  price_btc_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  price_btc_not?: InputMaybe<Scalars['BigDecimal']['input']>
  price_btc_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  price_candles_?: InputMaybe<Candle_Filter>
  price_usd?: InputMaybe<Scalars['BigDecimal']['input']>
  price_usd_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  price_usd_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  price_usd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  price_usd_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  price_usd_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  price_usd_not?: InputMaybe<Scalars['BigDecimal']['input']>
  price_usd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  strategy?: InputMaybe<Scalars['String']['input']>
  strategy_contains?: InputMaybe<Scalars['String']['input']>
  strategy_contains_nocase?: InputMaybe<Scalars['String']['input']>
  strategy_ends_with?: InputMaybe<Scalars['String']['input']>
  strategy_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  strategy_gt?: InputMaybe<Scalars['String']['input']>
  strategy_gte?: InputMaybe<Scalars['String']['input']>
  strategy_in?: InputMaybe<Array<Scalars['String']['input']>>
  strategy_lt?: InputMaybe<Scalars['String']['input']>
  strategy_lte?: InputMaybe<Scalars['String']['input']>
  strategy_not?: InputMaybe<Scalars['String']['input']>
  strategy_not_contains?: InputMaybe<Scalars['String']['input']>
  strategy_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  strategy_not_ends_with?: InputMaybe<Scalars['String']['input']>
  strategy_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  strategy_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  strategy_not_starts_with?: InputMaybe<Scalars['String']['input']>
  strategy_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  strategy_starts_with?: InputMaybe<Scalars['String']['input']>
  strategy_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  supply?: InputMaybe<Scalars['BigDecimal']['input']>
  supply_changes_?: InputMaybe<PoolSupply_Filter>
  supply_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  supply_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  supply_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  supply_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  supply_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  supply_not?: InputMaybe<Scalars['BigDecimal']['input']>
  supply_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  symbol?: InputMaybe<Scalars['String']['input']>
  symbol_contains?: InputMaybe<Scalars['String']['input']>
  symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>
  symbol_ends_with?: InputMaybe<Scalars['String']['input']>
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  symbol_gt?: InputMaybe<Scalars['String']['input']>
  symbol_gte?: InputMaybe<Scalars['String']['input']>
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>
  symbol_lt?: InputMaybe<Scalars['String']['input']>
  symbol_lte?: InputMaybe<Scalars['String']['input']>
  symbol_not?: InputMaybe<Scalars['String']['input']>
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  symbol_not_ends_with?: InputMaybe<Scalars['String']['input']>
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  symbol_not_starts_with?: InputMaybe<Scalars['String']['input']>
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  symbol_starts_with?: InputMaybe<Scalars['String']['input']>
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  total_fees_aum_kassandra?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_kassandra_btc?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_kassandra_btc_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_kassandra_btc_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_kassandra_btc_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_aum_kassandra_btc_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_kassandra_btc_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_kassandra_btc_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_kassandra_btc_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_aum_kassandra_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_kassandra_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_kassandra_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_aum_kassandra_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_kassandra_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_kassandra_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_kassandra_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_aum_kassandra_usd?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_kassandra_usd_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_kassandra_usd_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_kassandra_usd_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_aum_kassandra_usd_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_kassandra_usd_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_kassandra_usd_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_kassandra_usd_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_aum_manager?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_manager_btc?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_manager_btc_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_manager_btc_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_manager_btc_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_aum_manager_btc_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_manager_btc_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_manager_btc_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_manager_btc_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_aum_manager_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_manager_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_manager_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_fees_aum_manager_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_manager_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_manager_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_manager_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_aum_manager_usd?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_manager_usd_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_manager_usd_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_manager_usd_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_aum_manager_usd_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_manager_usd_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_manager_usd_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_aum_manager_usd_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_exit?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_exit_btc?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_exit_btc_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_exit_btc_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_exit_btc_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_fees_exit_btc_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_exit_btc_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_exit_btc_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_exit_btc_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_fees_exit_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_exit_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_exit_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_fees_exit_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_exit_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_exit_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_exit_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_fees_exit_usd?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_exit_usd_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_exit_usd_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_exit_usd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_fees_exit_usd_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_exit_usd_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_exit_usd_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_exit_usd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_fees_join_broker?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_broker_btc?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_broker_btc_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_broker_btc_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_broker_btc_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_join_broker_btc_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_broker_btc_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_broker_btc_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_broker_btc_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_join_broker_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_broker_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_broker_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_fees_join_broker_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_broker_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_broker_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_broker_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_join_broker_usd?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_broker_usd_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_broker_usd_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_broker_usd_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_join_broker_usd_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_broker_usd_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_broker_usd_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_broker_usd_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_join_manager?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_manager_btc?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_manager_btc_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_manager_btc_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_manager_btc_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_join_manager_btc_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_manager_btc_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_manager_btc_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_manager_btc_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_join_manager_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_manager_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_manager_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_fees_join_manager_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_manager_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_manager_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_manager_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_join_manager_usd?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_manager_usd_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_manager_usd_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_manager_usd_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_join_manager_usd_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_manager_usd_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_manager_usd_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_join_manager_usd_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_fees_swap_btc?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_swap_btc_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_swap_btc_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_swap_btc_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_fees_swap_btc_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_swap_btc_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_swap_btc_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_swap_btc_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_fees_swap_usd?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_swap_usd_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_swap_usd_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_swap_usd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_fees_swap_usd_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_swap_usd_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_swap_usd_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_fees_swap_usd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_value_locked_?: InputMaybe<TotalValueLocked_Filter>
  total_value_locked_btc?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_btc_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_btc_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_btc_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_value_locked_btc_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_btc_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_btc_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_btc_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_value_locked_usd?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_usd_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_usd_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_usd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_value_locked_usd_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_usd_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_usd_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_value_locked_usd_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  total_volume_btc?: InputMaybe<Scalars['BigDecimal']['input']>
  total_volume_btc_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_volume_btc_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_volume_btc_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_volume_btc_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_volume_btc_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_volume_btc_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_volume_btc_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_volume_usd?: InputMaybe<Scalars['BigDecimal']['input']>
  total_volume_usd_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_volume_usd_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_volume_usd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  total_volume_usd_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  total_volume_usd_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  total_volume_usd_not?: InputMaybe<Scalars['BigDecimal']['input']>
  total_volume_usd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  underlying_assets_?: InputMaybe<Asset_Filter>
  underlying_assets_addresses?: InputMaybe<Array<Scalars['String']['input']>>
  underlying_assets_addresses_contains?: InputMaybe<
    Array<Scalars['String']['input']>
  >
  underlying_assets_addresses_contains_nocase?: InputMaybe<
    Array<Scalars['String']['input']>
  >
  underlying_assets_addresses_not?: InputMaybe<
    Array<Scalars['String']['input']>
  >
  underlying_assets_addresses_not_contains?: InputMaybe<
    Array<Scalars['String']['input']>
  >
  underlying_assets_addresses_not_contains_nocase?: InputMaybe<
    Array<Scalars['String']['input']>
  >
  unique_investors?: InputMaybe<Scalars['Int']['input']>
  unique_investors_broker?: InputMaybe<Scalars['Int']['input']>
  unique_investors_broker_gt?: InputMaybe<Scalars['Int']['input']>
  unique_investors_broker_gte?: InputMaybe<Scalars['Int']['input']>
  unique_investors_broker_in?: InputMaybe<Array<Scalars['Int']['input']>>
  unique_investors_broker_lt?: InputMaybe<Scalars['Int']['input']>
  unique_investors_broker_lte?: InputMaybe<Scalars['Int']['input']>
  unique_investors_broker_not?: InputMaybe<Scalars['Int']['input']>
  unique_investors_broker_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  unique_investors_gt?: InputMaybe<Scalars['Int']['input']>
  unique_investors_gte?: InputMaybe<Scalars['Int']['input']>
  unique_investors_in?: InputMaybe<Array<Scalars['Int']['input']>>
  unique_investors_lt?: InputMaybe<Scalars['Int']['input']>
  unique_investors_lte?: InputMaybe<Scalars['Int']['input']>
  unique_investors_not?: InputMaybe<Scalars['Int']['input']>
  unique_investors_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  vault?: InputMaybe<Scalars['String']['input']>
  vault_contains?: InputMaybe<Scalars['String']['input']>
  vault_contains_nocase?: InputMaybe<Scalars['String']['input']>
  vault_ends_with?: InputMaybe<Scalars['String']['input']>
  vault_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  vault_gt?: InputMaybe<Scalars['String']['input']>
  vault_gte?: InputMaybe<Scalars['String']['input']>
  vault_id?: InputMaybe<Scalars['String']['input']>
  vault_id_contains?: InputMaybe<Scalars['String']['input']>
  vault_id_contains_nocase?: InputMaybe<Scalars['String']['input']>
  vault_id_ends_with?: InputMaybe<Scalars['String']['input']>
  vault_id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  vault_id_gt?: InputMaybe<Scalars['String']['input']>
  vault_id_gte?: InputMaybe<Scalars['String']['input']>
  vault_id_in?: InputMaybe<Array<Scalars['String']['input']>>
  vault_id_lt?: InputMaybe<Scalars['String']['input']>
  vault_id_lte?: InputMaybe<Scalars['String']['input']>
  vault_id_not?: InputMaybe<Scalars['String']['input']>
  vault_id_not_contains?: InputMaybe<Scalars['String']['input']>
  vault_id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  vault_id_not_ends_with?: InputMaybe<Scalars['String']['input']>
  vault_id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  vault_id_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  vault_id_not_starts_with?: InputMaybe<Scalars['String']['input']>
  vault_id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  vault_id_starts_with?: InputMaybe<Scalars['String']['input']>
  vault_id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  vault_in?: InputMaybe<Array<Scalars['String']['input']>>
  vault_lt?: InputMaybe<Scalars['String']['input']>
  vault_lte?: InputMaybe<Scalars['String']['input']>
  vault_not?: InputMaybe<Scalars['String']['input']>
  vault_not_contains?: InputMaybe<Scalars['String']['input']>
  vault_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  vault_not_ends_with?: InputMaybe<Scalars['String']['input']>
  vault_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  vault_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  vault_not_starts_with?: InputMaybe<Scalars['String']['input']>
  vault_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  vault_starts_with?: InputMaybe<Scalars['String']['input']>
  vault_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  volumes_?: InputMaybe<Volume_Filter>
  weight_goals_?: InputMaybe<WeightGoalPoint_Filter>
  weights_?: InputMaybe<WeightPoint_Filter>
  whitelist?: InputMaybe<Scalars['String']['input']>
  whitelist_contains?: InputMaybe<Scalars['String']['input']>
  whitelist_contains_nocase?: InputMaybe<Scalars['String']['input']>
  whitelist_ends_with?: InputMaybe<Scalars['String']['input']>
  whitelist_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  whitelist_gt?: InputMaybe<Scalars['String']['input']>
  whitelist_gte?: InputMaybe<Scalars['String']['input']>
  whitelist_in?: InputMaybe<Array<Scalars['String']['input']>>
  whitelist_lt?: InputMaybe<Scalars['String']['input']>
  whitelist_lte?: InputMaybe<Scalars['String']['input']>
  whitelist_not?: InputMaybe<Scalars['String']['input']>
  whitelist_not_contains?: InputMaybe<Scalars['String']['input']>
  whitelist_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  whitelist_not_ends_with?: InputMaybe<Scalars['String']['input']>
  whitelist_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  whitelist_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  whitelist_not_starts_with?: InputMaybe<Scalars['String']['input']>
  whitelist_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  whitelist_starts_with?: InputMaybe<Scalars['String']['input']>
  whitelist_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
}

export type Pool_OrderBy =
  | '_investors'
  | 'activities'
  | 'address'
  | 'brokers'
  | 'chain'
  | 'chain_id'
  | 'controller'
  | 'decimals'
  | 'deposits_broker_btc'
  | 'deposits_broker_usd'
  | 'deposits_btc'
  | 'deposits_usd'
  | 'factory'
  | 'fee_aum'
  | 'fee_aum_kassandra'
  | 'fee_exit'
  | 'fee_join_broker'
  | 'fee_join_manager'
  | 'fee_swap'
  | 'fees'
  | 'history'
  | 'id'
  | 'investors'
  | 'is_private_pool'
  | 'last_harvest'
  | 'manager'
  | 'name'
  | 'num_activities'
  | 'num_brokers'
  | 'num_deposits'
  | 'num_deposits_broker'
  | 'num_exit'
  | 'num_join'
  | 'num_swap'
  | 'num_token_add'
  | 'num_token_remove'
  | 'num_tx'
  | 'num_weight_goals'
  | 'pool_version'
  | 'price_btc'
  | 'price_candles'
  | 'price_usd'
  | 'strategy'
  | 'supply'
  | 'supply_changes'
  | 'symbol'
  | 'total_fees_aum_kassandra'
  | 'total_fees_aum_kassandra_btc'
  | 'total_fees_aum_kassandra_usd'
  | 'total_fees_aum_manager'
  | 'total_fees_aum_manager_btc'
  | 'total_fees_aum_manager_usd'
  | 'total_fees_exit'
  | 'total_fees_exit_btc'
  | 'total_fees_exit_usd'
  | 'total_fees_join_broker'
  | 'total_fees_join_broker_btc'
  | 'total_fees_join_broker_usd'
  | 'total_fees_join_manager'
  | 'total_fees_join_manager_btc'
  | 'total_fees_join_manager_usd'
  | 'total_fees_swap_btc'
  | 'total_fees_swap_usd'
  | 'total_value_locked'
  | 'total_value_locked_btc'
  | 'total_value_locked_usd'
  | 'total_volume_btc'
  | 'total_volume_usd'
  | 'underlying_assets'
  | 'underlying_assets_addresses'
  | 'unique_investors'
  | 'unique_investors_broker'
  | 'vault'
  | 'vault_id'
  | 'volumes'
  | 'weight_goals'
  | 'weights'
  | 'whitelist'

export type Query = {
  __typename?: 'Query'
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>
  activities: Array<Activity>
  activity?: Maybe<Activity>
  asset?: Maybe<Asset>
  assets: Array<Asset>
  balance?: Maybe<Balance>
  balances: Array<Balance>
  broker?: Maybe<Broker>
  brokers: Array<Broker>
  candle?: Maybe<Candle>
  candles: Array<Candle>
  chain?: Maybe<Chain>
  chainById?: Maybe<Chain>
  chains: Array<Chain>
  chainsByIds: Array<Maybe<Chain>>
  fee?: Maybe<Fee>
  fees: Array<Fee>
  histories: Array<History>
  history?: Maybe<History>
  investor?: Maybe<Investor>
  investors: Array<Investor>
  kassandra?: Maybe<Kassandra>
  kassandras: Array<Kassandra>
  manager?: Maybe<Manager>
  managers: Array<Manager>
  pool?: Maybe<Pool>
  poolSupplies: Array<PoolSupply>
  poolSupply?: Maybe<PoolSupply>
  pools: Array<Pool>
  poolsFilter: Array<Maybe<Pool>>
  token?: Maybe<Token>
  tokens: Array<Token>
  tokensByIds: Array<Maybe<Token>>
  totalValueLocked?: Maybe<TotalValueLocked>
  totalValueLockeds: Array<TotalValueLocked>
  volume?: Maybe<Volume>
  volumes: Array<Volume>
  weight?: Maybe<Weight>
  weightGoal?: Maybe<WeightGoal>
  weightGoalPoint?: Maybe<WeightGoalPoint>
  weightGoalPoints: Array<WeightGoalPoint>
  weightGoals: Array<WeightGoal>
  weightPoint?: Maybe<WeightPoint>
  weightPoints: Array<WeightPoint>
  weights: Array<Weight>
}

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>
}

export type QueryActivitiesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Activity_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Activity_Filter>
}

export type QueryActivityArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryAssetArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryAssetsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Asset_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Asset_Filter>
}

export type QueryBalanceArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryBalancesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Balance_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Balance_Filter>
}

export type QueryBrokerArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryBrokersArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Broker_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Broker_Filter>
}

export type QueryCandleArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryCandlesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Candle_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Candle_Filter>
}

export type QueryChainArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryChainByIdArgs = {
  id: Scalars['ID']['input']
}

export type QueryChainsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Chain_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Chain_Filter>
}

export type QueryChainsByIdsArgs = {
  ids: Array<Scalars['ID']['input']>
}

export type QueryFeeArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryFeesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Fee_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Fee_Filter>
}

export type QueryHistoriesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<History_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<History_Filter>
}

export type QueryHistoryArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryInvestorArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryInvestorsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Investor_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Investor_Filter>
}

export type QueryKassandraArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryKassandrasArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Kassandra_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Kassandra_Filter>
}

export type QueryManagerArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryManagersArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Manager_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Manager_Filter>
}

export type QueryPoolArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryPoolSuppliesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<PoolSupply_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<PoolSupply_Filter>
}

export type QueryPoolSupplyArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryPoolsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Pool_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Pool_Filter>
}

export type QueryPoolsFilterArgs = {
  where?: InputMaybe<Filter_Pool>
}

export type QueryTokenArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTokensArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Token_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Token_Filter>
}

export type QueryTokensByIdsArgs = {
  chainId?: InputMaybe<Scalars['Int']['input']>
  ids?: InputMaybe<Array<Scalars['ID']['input']>>
}

export type QueryTotalValueLockedArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTotalValueLockedsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<TotalValueLocked_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<TotalValueLocked_Filter>
}

export type QueryVolumeArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryVolumesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Volume_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Volume_Filter>
}

export type QueryWeightArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryWeightGoalArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryWeightGoalPointArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryWeightGoalPointsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<WeightGoalPoint_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<WeightGoalPoint_Filter>
}

export type QueryWeightGoalsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<WeightGoal_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<WeightGoal_Filter>
}

export type QueryWeightPointArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryWeightPointsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<WeightPoint_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<WeightPoint_Filter>
}

export type QueryWeightsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Weight_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Weight_Filter>
}

export type Result = {
  __typename?: 'Result'
  message?: Maybe<Scalars['String']['output']>
  ok?: Maybe<Scalars['Boolean']['output']>
}

export type SavePoolParams = {
  chainId: Scalars['Int']['input']
  controller: Scalars['String']['input']
  logo?: InputMaybe<Scalars['String']['input']>
  signature: Scalars['String']['input']
  summary?: InputMaybe<Scalars['String']['input']>
}

export type Subscription = {
  __typename?: 'Subscription'
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>
  activities: Array<Activity>
  activity?: Maybe<Activity>
  asset?: Maybe<Asset>
  assets: Array<Asset>
  balance?: Maybe<Balance>
  balances: Array<Balance>
  broker?: Maybe<Broker>
  brokers: Array<Broker>
  candle?: Maybe<Candle>
  candles: Array<Candle>
  chain?: Maybe<Chain>
  chains: Array<Chain>
  fee?: Maybe<Fee>
  fees: Array<Fee>
  histories: Array<History>
  history?: Maybe<History>
  investor?: Maybe<Investor>
  investors: Array<Investor>
  kassandra?: Maybe<Kassandra>
  kassandras: Array<Kassandra>
  manager?: Maybe<Manager>
  managers: Array<Manager>
  pool?: Maybe<Pool>
  poolSupplies: Array<PoolSupply>
  poolSupply?: Maybe<PoolSupply>
  pools: Array<Pool>
  token?: Maybe<Token>
  tokens: Array<Token>
  totalValueLocked?: Maybe<TotalValueLocked>
  totalValueLockeds: Array<TotalValueLocked>
  volume?: Maybe<Volume>
  volumes: Array<Volume>
  weight?: Maybe<Weight>
  weightGoal?: Maybe<WeightGoal>
  weightGoalPoint?: Maybe<WeightGoalPoint>
  weightGoalPoints: Array<WeightGoalPoint>
  weightGoals: Array<WeightGoal>
  weightPoint?: Maybe<WeightPoint>
  weightPoints: Array<WeightPoint>
  weights: Array<Weight>
}

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>
}

export type SubscriptionActivitiesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Activity_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Activity_Filter>
}

export type SubscriptionActivityArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionAssetArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionAssetsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Asset_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Asset_Filter>
}

export type SubscriptionBalanceArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionBalancesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Balance_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Balance_Filter>
}

export type SubscriptionBrokerArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionBrokersArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Broker_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Broker_Filter>
}

export type SubscriptionCandleArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionCandlesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Candle_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Candle_Filter>
}

export type SubscriptionChainArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionChainsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Chain_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Chain_Filter>
}

export type SubscriptionFeeArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionFeesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Fee_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Fee_Filter>
}

export type SubscriptionHistoriesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<History_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<History_Filter>
}

export type SubscriptionHistoryArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionInvestorArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionInvestorsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Investor_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Investor_Filter>
}

export type SubscriptionKassandraArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionKassandrasArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Kassandra_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Kassandra_Filter>
}

export type SubscriptionManagerArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionManagersArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Manager_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Manager_Filter>
}

export type SubscriptionPoolArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionPoolSuppliesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<PoolSupply_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<PoolSupply_Filter>
}

export type SubscriptionPoolSupplyArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionPoolsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Pool_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Pool_Filter>
}

export type SubscriptionTokenArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTokensArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Token_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Token_Filter>
}

export type SubscriptionTotalValueLockedArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTotalValueLockedsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<TotalValueLocked_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<TotalValueLocked_Filter>
}

export type SubscriptionVolumeArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionVolumesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Volume_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Volume_Filter>
}

export type SubscriptionWeightArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionWeightGoalArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionWeightGoalPointArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionWeightGoalPointsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<WeightGoalPoint_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<WeightGoalPoint_Filter>
}

export type SubscriptionWeightGoalsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<WeightGoal_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<WeightGoal_Filter>
}

export type SubscriptionWeightPointArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionWeightPointsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<WeightPoint_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<WeightPoint_Filter>
}

export type SubscriptionWeightsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Weight_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Weight_Filter>
}

export type Token = {
  __typename?: 'Token'
  coingecko_id?: Maybe<Scalars['String']['output']>
  decimals?: Maybe<Scalars['Int']['output']>
  id: Scalars['ID']['output']
  is_wrap_token: Scalars['Int']['output']
  logo?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  pools: Array<Asset>
  price_block: Scalars['BigInt']['output']
  price_btc: Scalars['BigDecimal']['output']
  price_timestamp: Scalars['BigInt']['output']
  price_usd: Scalars['BigDecimal']['output']
  symbol?: Maybe<Scalars['String']['output']>
  wraps?: Maybe<Token>
}

export type TokenPoolsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Asset_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<Asset_Filter>
}

export type Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  decimals?: InputMaybe<Scalars['Int']['input']>
  decimals_gt?: InputMaybe<Scalars['Int']['input']>
  decimals_gte?: InputMaybe<Scalars['Int']['input']>
  decimals_in?: InputMaybe<Array<Scalars['Int']['input']>>
  decimals_lt?: InputMaybe<Scalars['Int']['input']>
  decimals_lte?: InputMaybe<Scalars['Int']['input']>
  decimals_not?: InputMaybe<Scalars['Int']['input']>
  decimals_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  is_wrap_token?: InputMaybe<Scalars['Int']['input']>
  is_wrap_token_gt?: InputMaybe<Scalars['Int']['input']>
  is_wrap_token_gte?: InputMaybe<Scalars['Int']['input']>
  is_wrap_token_in?: InputMaybe<Array<Scalars['Int']['input']>>
  is_wrap_token_lt?: InputMaybe<Scalars['Int']['input']>
  is_wrap_token_lte?: InputMaybe<Scalars['Int']['input']>
  is_wrap_token_not?: InputMaybe<Scalars['Int']['input']>
  is_wrap_token_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  name?: InputMaybe<Scalars['String']['input']>
  name_contains?: InputMaybe<Scalars['String']['input']>
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>
  name_ends_with?: InputMaybe<Scalars['String']['input']>
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  name_gt?: InputMaybe<Scalars['String']['input']>
  name_gte?: InputMaybe<Scalars['String']['input']>
  name_in?: InputMaybe<Array<Scalars['String']['input']>>
  name_lt?: InputMaybe<Scalars['String']['input']>
  name_lte?: InputMaybe<Scalars['String']['input']>
  name_not?: InputMaybe<Scalars['String']['input']>
  name_not_contains?: InputMaybe<Scalars['String']['input']>
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  name_starts_with?: InputMaybe<Scalars['String']['input']>
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  pools_?: InputMaybe<Asset_Filter>
  price_block?: InputMaybe<Scalars['BigInt']['input']>
  price_block_gt?: InputMaybe<Scalars['BigInt']['input']>
  price_block_gte?: InputMaybe<Scalars['BigInt']['input']>
  price_block_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  price_block_lt?: InputMaybe<Scalars['BigInt']['input']>
  price_block_lte?: InputMaybe<Scalars['BigInt']['input']>
  price_block_not?: InputMaybe<Scalars['BigInt']['input']>
  price_block_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  price_btc?: InputMaybe<Scalars['BigDecimal']['input']>
  price_btc_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  price_btc_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  price_btc_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  price_btc_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  price_btc_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  price_btc_not?: InputMaybe<Scalars['BigDecimal']['input']>
  price_btc_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  price_timestamp?: InputMaybe<Scalars['BigInt']['input']>
  price_timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>
  price_timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>
  price_timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  price_timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>
  price_timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>
  price_timestamp_not?: InputMaybe<Scalars['BigInt']['input']>
  price_timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  price_usd?: InputMaybe<Scalars['BigDecimal']['input']>
  price_usd_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  price_usd_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  price_usd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  price_usd_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  price_usd_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  price_usd_not?: InputMaybe<Scalars['BigDecimal']['input']>
  price_usd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  symbol?: InputMaybe<Scalars['String']['input']>
  symbol_contains?: InputMaybe<Scalars['String']['input']>
  symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>
  symbol_ends_with?: InputMaybe<Scalars['String']['input']>
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  symbol_gt?: InputMaybe<Scalars['String']['input']>
  symbol_gte?: InputMaybe<Scalars['String']['input']>
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>
  symbol_lt?: InputMaybe<Scalars['String']['input']>
  symbol_lte?: InputMaybe<Scalars['String']['input']>
  symbol_not?: InputMaybe<Scalars['String']['input']>
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  symbol_not_ends_with?: InputMaybe<Scalars['String']['input']>
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  symbol_not_starts_with?: InputMaybe<Scalars['String']['input']>
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  symbol_starts_with?: InputMaybe<Scalars['String']['input']>
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  wraps?: InputMaybe<Scalars['String']['input']>
  wraps_?: InputMaybe<Token_Filter>
  wraps_contains?: InputMaybe<Scalars['String']['input']>
  wraps_contains_nocase?: InputMaybe<Scalars['String']['input']>
  wraps_ends_with?: InputMaybe<Scalars['String']['input']>
  wraps_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  wraps_gt?: InputMaybe<Scalars['String']['input']>
  wraps_gte?: InputMaybe<Scalars['String']['input']>
  wraps_in?: InputMaybe<Array<Scalars['String']['input']>>
  wraps_lt?: InputMaybe<Scalars['String']['input']>
  wraps_lte?: InputMaybe<Scalars['String']['input']>
  wraps_not?: InputMaybe<Scalars['String']['input']>
  wraps_not_contains?: InputMaybe<Scalars['String']['input']>
  wraps_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  wraps_not_ends_with?: InputMaybe<Scalars['String']['input']>
  wraps_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  wraps_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  wraps_not_starts_with?: InputMaybe<Scalars['String']['input']>
  wraps_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  wraps_starts_with?: InputMaybe<Scalars['String']['input']>
  wraps_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
}

export type Token_OrderBy =
  | 'decimals'
  | 'id'
  | 'is_wrap_token'
  | 'name'
  | 'pools'
  | 'price_block'
  | 'price_btc'
  | 'price_timestamp'
  | 'price_usd'
  | 'symbol'
  | 'wraps'

/**
 * Total Value Locked OHLC hourly candle graph
 *
 */
export type TotalValueLocked = {
  __typename?: 'TotalValueLocked'
  /**
   * 'btc' or 'usd'
   *
   */
  base: Scalars['String']['output']
  /**
   * Last value in that hour
   *
   */
  close: Scalars['BigDecimal']['output']
  /**
   * Highest value in that hour
   *
   */
  high: Scalars['BigDecimal']['output']
  /**
   * Base currency + Pool ID + Timestamp at starting hour
   *
   */
  id: Scalars['ID']['output']
  /**
   * Lowest value in that hour
   *
   */
  low: Scalars['BigDecimal']['output']
  manager?: Maybe<Manager>
  /**
   * First value in that hour
   *
   */
  open: Scalars['BigDecimal']['output']
  pool?: Maybe<Pool>
  timestamp: Scalars['Int']['output']
}

export type TotalValueLocked_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  base?: InputMaybe<Scalars['String']['input']>
  base_contains?: InputMaybe<Scalars['String']['input']>
  base_contains_nocase?: InputMaybe<Scalars['String']['input']>
  base_ends_with?: InputMaybe<Scalars['String']['input']>
  base_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  base_gt?: InputMaybe<Scalars['String']['input']>
  base_gte?: InputMaybe<Scalars['String']['input']>
  base_in?: InputMaybe<Array<Scalars['String']['input']>>
  base_lt?: InputMaybe<Scalars['String']['input']>
  base_lte?: InputMaybe<Scalars['String']['input']>
  base_not?: InputMaybe<Scalars['String']['input']>
  base_not_contains?: InputMaybe<Scalars['String']['input']>
  base_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  base_not_ends_with?: InputMaybe<Scalars['String']['input']>
  base_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  base_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  base_not_starts_with?: InputMaybe<Scalars['String']['input']>
  base_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  base_starts_with?: InputMaybe<Scalars['String']['input']>
  base_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  close?: InputMaybe<Scalars['BigDecimal']['input']>
  close_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  close_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  close_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  close_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  close_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  close_not?: InputMaybe<Scalars['BigDecimal']['input']>
  close_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  high?: InputMaybe<Scalars['BigDecimal']['input']>
  high_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  high_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  high_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  high_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  high_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  high_not?: InputMaybe<Scalars['BigDecimal']['input']>
  high_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  low?: InputMaybe<Scalars['BigDecimal']['input']>
  low_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  low_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  low_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  low_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  low_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  low_not?: InputMaybe<Scalars['BigDecimal']['input']>
  low_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  manager?: InputMaybe<Scalars['String']['input']>
  manager_?: InputMaybe<Manager_Filter>
  manager_contains?: InputMaybe<Scalars['String']['input']>
  manager_contains_nocase?: InputMaybe<Scalars['String']['input']>
  manager_ends_with?: InputMaybe<Scalars['String']['input']>
  manager_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  manager_gt?: InputMaybe<Scalars['String']['input']>
  manager_gte?: InputMaybe<Scalars['String']['input']>
  manager_in?: InputMaybe<Array<Scalars['String']['input']>>
  manager_lt?: InputMaybe<Scalars['String']['input']>
  manager_lte?: InputMaybe<Scalars['String']['input']>
  manager_not?: InputMaybe<Scalars['String']['input']>
  manager_not_contains?: InputMaybe<Scalars['String']['input']>
  manager_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  manager_not_ends_with?: InputMaybe<Scalars['String']['input']>
  manager_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  manager_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  manager_not_starts_with?: InputMaybe<Scalars['String']['input']>
  manager_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  manager_starts_with?: InputMaybe<Scalars['String']['input']>
  manager_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  open?: InputMaybe<Scalars['BigDecimal']['input']>
  open_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  open_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  open_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  open_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  open_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  open_not?: InputMaybe<Scalars['BigDecimal']['input']>
  open_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  pool?: InputMaybe<Scalars['String']['input']>
  pool_?: InputMaybe<Pool_Filter>
  pool_contains?: InputMaybe<Scalars['String']['input']>
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>
  pool_ends_with?: InputMaybe<Scalars['String']['input']>
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_gt?: InputMaybe<Scalars['String']['input']>
  pool_gte?: InputMaybe<Scalars['String']['input']>
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>
  pool_lt?: InputMaybe<Scalars['String']['input']>
  pool_lte?: InputMaybe<Scalars['String']['input']>
  pool_not?: InputMaybe<Scalars['String']['input']>
  pool_not_contains?: InputMaybe<Scalars['String']['input']>
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_starts_with?: InputMaybe<Scalars['String']['input']>
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  timestamp?: InputMaybe<Scalars['Int']['input']>
  timestamp_gt?: InputMaybe<Scalars['Int']['input']>
  timestamp_gte?: InputMaybe<Scalars['Int']['input']>
  timestamp_in?: InputMaybe<Array<Scalars['Int']['input']>>
  timestamp_lt?: InputMaybe<Scalars['Int']['input']>
  timestamp_lte?: InputMaybe<Scalars['Int']['input']>
  timestamp_not?: InputMaybe<Scalars['Int']['input']>
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
}

export type TotalValueLocked_OrderBy =
  | 'base'
  | 'close'
  | 'high'
  | 'id'
  | 'low'
  | 'manager'
  | 'open'
  | 'pool'
  | 'timestamp'

/**
 * Transaction volume per type of operation for 1h, 1d and 7d periods (1d periods are not 24h volume as they are based from 00:00 UTC)
 *
 */
export type Volume = {
  __typename?: 'Volume'
  /**
   * Pool ID + Operation type + Period + Swap pair + Timestamp at period start
   *
   */
  id: Scalars['ID']['output']
  kassandra?: Maybe<Kassandra>
  manager?: Maybe<Manager>
  num_tx: Scalars['Int']['output']
  /**
   * Period in seconds, available in 1h, 24h, 7d
   *
   */
  period: Scalars['Int']['output']
  pool: Pool
  /**
   * 'tokensIn-tokenOut' for swaps (BTC-ETH != ETH-BTC);
   * 'tokenIn' for joins
   * 'tokenOut' for exits
   * 'pool.symbol' for transfers
   * 'broker' for deposits with a broker
   * 'manager' for deposits without a broker
   *
   */
  swap_pair: Scalars['String']['output']
  timestamp: Scalars['Int']['output']
  /**
   * One of 'join', 'exit', 'transfer' or 'swap'
   *
   */
  type: Scalars['String']['output']
  volume_btc: Scalars['BigDecimal']['output']
  volume_usd: Scalars['BigDecimal']['output']
}

export type Volume_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  kassandra?: InputMaybe<Scalars['String']['input']>
  kassandra_?: InputMaybe<Kassandra_Filter>
  kassandra_contains?: InputMaybe<Scalars['String']['input']>
  kassandra_contains_nocase?: InputMaybe<Scalars['String']['input']>
  kassandra_ends_with?: InputMaybe<Scalars['String']['input']>
  kassandra_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  kassandra_gt?: InputMaybe<Scalars['String']['input']>
  kassandra_gte?: InputMaybe<Scalars['String']['input']>
  kassandra_in?: InputMaybe<Array<Scalars['String']['input']>>
  kassandra_lt?: InputMaybe<Scalars['String']['input']>
  kassandra_lte?: InputMaybe<Scalars['String']['input']>
  kassandra_not?: InputMaybe<Scalars['String']['input']>
  kassandra_not_contains?: InputMaybe<Scalars['String']['input']>
  kassandra_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  kassandra_not_ends_with?: InputMaybe<Scalars['String']['input']>
  kassandra_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  kassandra_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  kassandra_not_starts_with?: InputMaybe<Scalars['String']['input']>
  kassandra_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  kassandra_starts_with?: InputMaybe<Scalars['String']['input']>
  kassandra_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  manager?: InputMaybe<Scalars['String']['input']>
  manager_?: InputMaybe<Manager_Filter>
  manager_contains?: InputMaybe<Scalars['String']['input']>
  manager_contains_nocase?: InputMaybe<Scalars['String']['input']>
  manager_ends_with?: InputMaybe<Scalars['String']['input']>
  manager_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  manager_gt?: InputMaybe<Scalars['String']['input']>
  manager_gte?: InputMaybe<Scalars['String']['input']>
  manager_in?: InputMaybe<Array<Scalars['String']['input']>>
  manager_lt?: InputMaybe<Scalars['String']['input']>
  manager_lte?: InputMaybe<Scalars['String']['input']>
  manager_not?: InputMaybe<Scalars['String']['input']>
  manager_not_contains?: InputMaybe<Scalars['String']['input']>
  manager_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  manager_not_ends_with?: InputMaybe<Scalars['String']['input']>
  manager_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  manager_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  manager_not_starts_with?: InputMaybe<Scalars['String']['input']>
  manager_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  manager_starts_with?: InputMaybe<Scalars['String']['input']>
  manager_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  num_tx?: InputMaybe<Scalars['Int']['input']>
  num_tx_gt?: InputMaybe<Scalars['Int']['input']>
  num_tx_gte?: InputMaybe<Scalars['Int']['input']>
  num_tx_in?: InputMaybe<Array<Scalars['Int']['input']>>
  num_tx_lt?: InputMaybe<Scalars['Int']['input']>
  num_tx_lte?: InputMaybe<Scalars['Int']['input']>
  num_tx_not?: InputMaybe<Scalars['Int']['input']>
  num_tx_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  period?: InputMaybe<Scalars['Int']['input']>
  period_gt?: InputMaybe<Scalars['Int']['input']>
  period_gte?: InputMaybe<Scalars['Int']['input']>
  period_in?: InputMaybe<Array<Scalars['Int']['input']>>
  period_lt?: InputMaybe<Scalars['Int']['input']>
  period_lte?: InputMaybe<Scalars['Int']['input']>
  period_not?: InputMaybe<Scalars['Int']['input']>
  period_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  pool?: InputMaybe<Scalars['String']['input']>
  pool_?: InputMaybe<Pool_Filter>
  pool_contains?: InputMaybe<Scalars['String']['input']>
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>
  pool_ends_with?: InputMaybe<Scalars['String']['input']>
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_gt?: InputMaybe<Scalars['String']['input']>
  pool_gte?: InputMaybe<Scalars['String']['input']>
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>
  pool_lt?: InputMaybe<Scalars['String']['input']>
  pool_lte?: InputMaybe<Scalars['String']['input']>
  pool_not?: InputMaybe<Scalars['String']['input']>
  pool_not_contains?: InputMaybe<Scalars['String']['input']>
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_starts_with?: InputMaybe<Scalars['String']['input']>
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  swap_pair?: InputMaybe<Scalars['String']['input']>
  swap_pair_contains?: InputMaybe<Scalars['String']['input']>
  swap_pair_contains_nocase?: InputMaybe<Scalars['String']['input']>
  swap_pair_ends_with?: InputMaybe<Scalars['String']['input']>
  swap_pair_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  swap_pair_gt?: InputMaybe<Scalars['String']['input']>
  swap_pair_gte?: InputMaybe<Scalars['String']['input']>
  swap_pair_in?: InputMaybe<Array<Scalars['String']['input']>>
  swap_pair_lt?: InputMaybe<Scalars['String']['input']>
  swap_pair_lte?: InputMaybe<Scalars['String']['input']>
  swap_pair_not?: InputMaybe<Scalars['String']['input']>
  swap_pair_not_contains?: InputMaybe<Scalars['String']['input']>
  swap_pair_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  swap_pair_not_ends_with?: InputMaybe<Scalars['String']['input']>
  swap_pair_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  swap_pair_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  swap_pair_not_starts_with?: InputMaybe<Scalars['String']['input']>
  swap_pair_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  swap_pair_starts_with?: InputMaybe<Scalars['String']['input']>
  swap_pair_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  timestamp?: InputMaybe<Scalars['Int']['input']>
  timestamp_gt?: InputMaybe<Scalars['Int']['input']>
  timestamp_gte?: InputMaybe<Scalars['Int']['input']>
  timestamp_in?: InputMaybe<Array<Scalars['Int']['input']>>
  timestamp_lt?: InputMaybe<Scalars['Int']['input']>
  timestamp_lte?: InputMaybe<Scalars['Int']['input']>
  timestamp_not?: InputMaybe<Scalars['Int']['input']>
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  type?: InputMaybe<Scalars['String']['input']>
  type_contains?: InputMaybe<Scalars['String']['input']>
  type_contains_nocase?: InputMaybe<Scalars['String']['input']>
  type_ends_with?: InputMaybe<Scalars['String']['input']>
  type_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  type_gt?: InputMaybe<Scalars['String']['input']>
  type_gte?: InputMaybe<Scalars['String']['input']>
  type_in?: InputMaybe<Array<Scalars['String']['input']>>
  type_lt?: InputMaybe<Scalars['String']['input']>
  type_lte?: InputMaybe<Scalars['String']['input']>
  type_not?: InputMaybe<Scalars['String']['input']>
  type_not_contains?: InputMaybe<Scalars['String']['input']>
  type_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  type_not_ends_with?: InputMaybe<Scalars['String']['input']>
  type_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  type_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  type_not_starts_with?: InputMaybe<Scalars['String']['input']>
  type_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  type_starts_with?: InputMaybe<Scalars['String']['input']>
  type_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  volume_btc?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_btc_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_btc_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_btc_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  volume_btc_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_btc_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_btc_not?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_btc_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  volume_usd?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_usd_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_usd_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_usd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  volume_usd_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_usd_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_usd_not?: InputMaybe<Scalars['BigDecimal']['input']>
  volume_usd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
}

export type Volume_OrderBy =
  | 'id'
  | 'kassandra'
  | 'manager'
  | 'num_tx'
  | 'period'
  | 'pool'
  | 'swap_pair'
  | 'timestamp'
  | 'type'
  | 'volume_btc'
  | 'volume_usd'

/**
 * DEPRECATED - Weight of a single token at a WeightPoint
 *
 */
export type Weight = {
  __typename?: 'Weight'
  /**
   * Weight Point ID + Token Address
   *
   */
  id: Scalars['ID']['output']
  point: WeightPoint
  token: Token
  weight: Scalars['BigInt']['output']
  weight_normalized: Scalars['BigDecimal']['output']
}

/**
 * Weight of a single token the pool is moving to at a WeightGoalPoint
 *
 */
export type WeightGoal = {
  __typename?: 'WeightGoal'
  asset: Asset
  /**
   * WeightGoalPoint ID + Token index in the pool
   *
   */
  id: Scalars['ID']['output']
  point: WeightGoalPoint
  weight: Scalars['BigInt']['output']
  weight_normalized: Scalars['BigDecimal']['output']
}

/**
 * Weights the pool is moving to
 *
 */
export type WeightGoalPoint = {
  __typename?: 'WeightGoalPoint'
  end_timestamp: Scalars['Int']['output']
  /**
   * Pool ID + End timestamp
   *
   */
  id: Scalars['ID']['output']
  pool: Pool
  previous?: Maybe<WeightGoalPoint>
  start_timestamp: Scalars['Int']['output']
  token?: Maybe<Token>
  txHash: Scalars['String']['output']
  /**
   * One of: 'add', 'remove', 'rebalance'
   *
   */
  type: Scalars['String']['output']
  weights: Array<WeightGoal>
}

/**
 * Weights the pool is moving to
 *
 */
export type WeightGoalPointWeightsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<WeightGoal_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<WeightGoal_Filter>
}

export type WeightGoalPoint_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  end_timestamp?: InputMaybe<Scalars['Int']['input']>
  end_timestamp_gt?: InputMaybe<Scalars['Int']['input']>
  end_timestamp_gte?: InputMaybe<Scalars['Int']['input']>
  end_timestamp_in?: InputMaybe<Array<Scalars['Int']['input']>>
  end_timestamp_lt?: InputMaybe<Scalars['Int']['input']>
  end_timestamp_lte?: InputMaybe<Scalars['Int']['input']>
  end_timestamp_not?: InputMaybe<Scalars['Int']['input']>
  end_timestamp_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  pool?: InputMaybe<Scalars['String']['input']>
  pool_?: InputMaybe<Pool_Filter>
  pool_contains?: InputMaybe<Scalars['String']['input']>
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>
  pool_ends_with?: InputMaybe<Scalars['String']['input']>
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_gt?: InputMaybe<Scalars['String']['input']>
  pool_gte?: InputMaybe<Scalars['String']['input']>
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>
  pool_lt?: InputMaybe<Scalars['String']['input']>
  pool_lte?: InputMaybe<Scalars['String']['input']>
  pool_not?: InputMaybe<Scalars['String']['input']>
  pool_not_contains?: InputMaybe<Scalars['String']['input']>
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_starts_with?: InputMaybe<Scalars['String']['input']>
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  previous?: InputMaybe<Scalars['String']['input']>
  previous_?: InputMaybe<WeightGoalPoint_Filter>
  previous_contains?: InputMaybe<Scalars['String']['input']>
  previous_contains_nocase?: InputMaybe<Scalars['String']['input']>
  previous_ends_with?: InputMaybe<Scalars['String']['input']>
  previous_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  previous_gt?: InputMaybe<Scalars['String']['input']>
  previous_gte?: InputMaybe<Scalars['String']['input']>
  previous_in?: InputMaybe<Array<Scalars['String']['input']>>
  previous_lt?: InputMaybe<Scalars['String']['input']>
  previous_lte?: InputMaybe<Scalars['String']['input']>
  previous_not?: InputMaybe<Scalars['String']['input']>
  previous_not_contains?: InputMaybe<Scalars['String']['input']>
  previous_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  previous_not_ends_with?: InputMaybe<Scalars['String']['input']>
  previous_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  previous_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  previous_not_starts_with?: InputMaybe<Scalars['String']['input']>
  previous_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  previous_starts_with?: InputMaybe<Scalars['String']['input']>
  previous_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  start_timestamp?: InputMaybe<Scalars['Int']['input']>
  start_timestamp_gt?: InputMaybe<Scalars['Int']['input']>
  start_timestamp_gte?: InputMaybe<Scalars['Int']['input']>
  start_timestamp_in?: InputMaybe<Array<Scalars['Int']['input']>>
  start_timestamp_lt?: InputMaybe<Scalars['Int']['input']>
  start_timestamp_lte?: InputMaybe<Scalars['Int']['input']>
  start_timestamp_not?: InputMaybe<Scalars['Int']['input']>
  start_timestamp_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  token?: InputMaybe<Scalars['String']['input']>
  token_?: InputMaybe<Token_Filter>
  token_contains?: InputMaybe<Scalars['String']['input']>
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>
  token_ends_with?: InputMaybe<Scalars['String']['input']>
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  token_gt?: InputMaybe<Scalars['String']['input']>
  token_gte?: InputMaybe<Scalars['String']['input']>
  token_in?: InputMaybe<Array<Scalars['String']['input']>>
  token_lt?: InputMaybe<Scalars['String']['input']>
  token_lte?: InputMaybe<Scalars['String']['input']>
  token_not?: InputMaybe<Scalars['String']['input']>
  token_not_contains?: InputMaybe<Scalars['String']['input']>
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  token_starts_with?: InputMaybe<Scalars['String']['input']>
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  txHash?: InputMaybe<Scalars['String']['input']>
  txHash_contains?: InputMaybe<Scalars['String']['input']>
  txHash_contains_nocase?: InputMaybe<Scalars['String']['input']>
  txHash_ends_with?: InputMaybe<Scalars['String']['input']>
  txHash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  txHash_gt?: InputMaybe<Scalars['String']['input']>
  txHash_gte?: InputMaybe<Scalars['String']['input']>
  txHash_in?: InputMaybe<Array<Scalars['String']['input']>>
  txHash_lt?: InputMaybe<Scalars['String']['input']>
  txHash_lte?: InputMaybe<Scalars['String']['input']>
  txHash_not?: InputMaybe<Scalars['String']['input']>
  txHash_not_contains?: InputMaybe<Scalars['String']['input']>
  txHash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  txHash_not_ends_with?: InputMaybe<Scalars['String']['input']>
  txHash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  txHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  txHash_not_starts_with?: InputMaybe<Scalars['String']['input']>
  txHash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  txHash_starts_with?: InputMaybe<Scalars['String']['input']>
  txHash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<Scalars['String']['input']>
  type_contains?: InputMaybe<Scalars['String']['input']>
  type_contains_nocase?: InputMaybe<Scalars['String']['input']>
  type_ends_with?: InputMaybe<Scalars['String']['input']>
  type_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  type_gt?: InputMaybe<Scalars['String']['input']>
  type_gte?: InputMaybe<Scalars['String']['input']>
  type_in?: InputMaybe<Array<Scalars['String']['input']>>
  type_lt?: InputMaybe<Scalars['String']['input']>
  type_lte?: InputMaybe<Scalars['String']['input']>
  type_not?: InputMaybe<Scalars['String']['input']>
  type_not_contains?: InputMaybe<Scalars['String']['input']>
  type_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  type_not_ends_with?: InputMaybe<Scalars['String']['input']>
  type_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  type_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  type_not_starts_with?: InputMaybe<Scalars['String']['input']>
  type_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  type_starts_with?: InputMaybe<Scalars['String']['input']>
  type_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  weights_?: InputMaybe<WeightGoal_Filter>
}

export type WeightGoalPoint_OrderBy =
  | 'end_timestamp'
  | 'id'
  | 'pool'
  | 'previous'
  | 'start_timestamp'
  | 'token'
  | 'txHash'
  | 'type'
  | 'weights'

export type WeightGoal_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  asset?: InputMaybe<Scalars['String']['input']>
  asset_?: InputMaybe<Asset_Filter>
  asset_contains?: InputMaybe<Scalars['String']['input']>
  asset_contains_nocase?: InputMaybe<Scalars['String']['input']>
  asset_ends_with?: InputMaybe<Scalars['String']['input']>
  asset_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  asset_gt?: InputMaybe<Scalars['String']['input']>
  asset_gte?: InputMaybe<Scalars['String']['input']>
  asset_in?: InputMaybe<Array<Scalars['String']['input']>>
  asset_lt?: InputMaybe<Scalars['String']['input']>
  asset_lte?: InputMaybe<Scalars['String']['input']>
  asset_not?: InputMaybe<Scalars['String']['input']>
  asset_not_contains?: InputMaybe<Scalars['String']['input']>
  asset_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  asset_not_ends_with?: InputMaybe<Scalars['String']['input']>
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  asset_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  asset_not_starts_with?: InputMaybe<Scalars['String']['input']>
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  asset_starts_with?: InputMaybe<Scalars['String']['input']>
  asset_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  point?: InputMaybe<Scalars['String']['input']>
  point_?: InputMaybe<WeightGoalPoint_Filter>
  point_contains?: InputMaybe<Scalars['String']['input']>
  point_contains_nocase?: InputMaybe<Scalars['String']['input']>
  point_ends_with?: InputMaybe<Scalars['String']['input']>
  point_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  point_gt?: InputMaybe<Scalars['String']['input']>
  point_gte?: InputMaybe<Scalars['String']['input']>
  point_in?: InputMaybe<Array<Scalars['String']['input']>>
  point_lt?: InputMaybe<Scalars['String']['input']>
  point_lte?: InputMaybe<Scalars['String']['input']>
  point_not?: InputMaybe<Scalars['String']['input']>
  point_not_contains?: InputMaybe<Scalars['String']['input']>
  point_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  point_not_ends_with?: InputMaybe<Scalars['String']['input']>
  point_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  point_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  point_not_starts_with?: InputMaybe<Scalars['String']['input']>
  point_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  point_starts_with?: InputMaybe<Scalars['String']['input']>
  point_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  weight?: InputMaybe<Scalars['BigInt']['input']>
  weight_gt?: InputMaybe<Scalars['BigInt']['input']>
  weight_gte?: InputMaybe<Scalars['BigInt']['input']>
  weight_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  weight_lt?: InputMaybe<Scalars['BigInt']['input']>
  weight_lte?: InputMaybe<Scalars['BigInt']['input']>
  weight_normalized?: InputMaybe<Scalars['BigDecimal']['input']>
  weight_normalized_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  weight_normalized_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  weight_normalized_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  weight_normalized_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  weight_normalized_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  weight_normalized_not?: InputMaybe<Scalars['BigDecimal']['input']>
  weight_normalized_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  weight_not?: InputMaybe<Scalars['BigInt']['input']>
  weight_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
}

export type WeightGoal_OrderBy =
  | 'asset'
  | 'id'
  | 'point'
  | 'weight'
  | 'weight_normalized'

/**
 * DEPRECATED - Weights per hour at close time
 *
 */
export type WeightPoint = {
  __typename?: 'WeightPoint'
  /**
   * Pool ID + Timestamp at start of the hour
   *
   */
  id: Scalars['ID']['output']
  pool: Pool
  timestamp: Scalars['Int']['output']
  weights: Array<Weight>
}

/**
 * DEPRECATED - Weights per hour at close time
 *
 */
export type WeightPointWeightsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Weight_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<Weight_Filter>
}

export type WeightPoint_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  pool?: InputMaybe<Scalars['String']['input']>
  pool_?: InputMaybe<Pool_Filter>
  pool_contains?: InputMaybe<Scalars['String']['input']>
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>
  pool_ends_with?: InputMaybe<Scalars['String']['input']>
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_gt?: InputMaybe<Scalars['String']['input']>
  pool_gte?: InputMaybe<Scalars['String']['input']>
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>
  pool_lt?: InputMaybe<Scalars['String']['input']>
  pool_lte?: InputMaybe<Scalars['String']['input']>
  pool_not?: InputMaybe<Scalars['String']['input']>
  pool_not_contains?: InputMaybe<Scalars['String']['input']>
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  pool_starts_with?: InputMaybe<Scalars['String']['input']>
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  timestamp?: InputMaybe<Scalars['Int']['input']>
  timestamp_gt?: InputMaybe<Scalars['Int']['input']>
  timestamp_gte?: InputMaybe<Scalars['Int']['input']>
  timestamp_in?: InputMaybe<Array<Scalars['Int']['input']>>
  timestamp_lt?: InputMaybe<Scalars['Int']['input']>
  timestamp_lte?: InputMaybe<Scalars['Int']['input']>
  timestamp_not?: InputMaybe<Scalars['Int']['input']>
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  weights_?: InputMaybe<Weight_Filter>
}

export type WeightPoint_OrderBy = 'id' | 'pool' | 'timestamp' | 'weights'

export type Weight_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  point?: InputMaybe<Scalars['String']['input']>
  point_?: InputMaybe<WeightPoint_Filter>
  point_contains?: InputMaybe<Scalars['String']['input']>
  point_contains_nocase?: InputMaybe<Scalars['String']['input']>
  point_ends_with?: InputMaybe<Scalars['String']['input']>
  point_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  point_gt?: InputMaybe<Scalars['String']['input']>
  point_gte?: InputMaybe<Scalars['String']['input']>
  point_in?: InputMaybe<Array<Scalars['String']['input']>>
  point_lt?: InputMaybe<Scalars['String']['input']>
  point_lte?: InputMaybe<Scalars['String']['input']>
  point_not?: InputMaybe<Scalars['String']['input']>
  point_not_contains?: InputMaybe<Scalars['String']['input']>
  point_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  point_not_ends_with?: InputMaybe<Scalars['String']['input']>
  point_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  point_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  point_not_starts_with?: InputMaybe<Scalars['String']['input']>
  point_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  point_starts_with?: InputMaybe<Scalars['String']['input']>
  point_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  token?: InputMaybe<Scalars['String']['input']>
  token_?: InputMaybe<Token_Filter>
  token_contains?: InputMaybe<Scalars['String']['input']>
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>
  token_ends_with?: InputMaybe<Scalars['String']['input']>
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  token_gt?: InputMaybe<Scalars['String']['input']>
  token_gte?: InputMaybe<Scalars['String']['input']>
  token_in?: InputMaybe<Array<Scalars['String']['input']>>
  token_lt?: InputMaybe<Scalars['String']['input']>
  token_lte?: InputMaybe<Scalars['String']['input']>
  token_not?: InputMaybe<Scalars['String']['input']>
  token_not_contains?: InputMaybe<Scalars['String']['input']>
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  token_starts_with?: InputMaybe<Scalars['String']['input']>
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  weight?: InputMaybe<Scalars['BigInt']['input']>
  weight_gt?: InputMaybe<Scalars['BigInt']['input']>
  weight_gte?: InputMaybe<Scalars['BigInt']['input']>
  weight_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  weight_lt?: InputMaybe<Scalars['BigInt']['input']>
  weight_lte?: InputMaybe<Scalars['BigInt']['input']>
  weight_normalized?: InputMaybe<Scalars['BigDecimal']['input']>
  weight_normalized_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  weight_normalized_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  weight_normalized_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  weight_normalized_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  weight_normalized_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  weight_normalized_not?: InputMaybe<Scalars['BigDecimal']['input']>
  weight_normalized_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  weight_not?: InputMaybe<Scalars['BigInt']['input']>
  weight_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
}

export type Weight_OrderBy =
  | 'id'
  | 'point'
  | 'token'
  | 'weight'
  | 'weight_normalized'

export type _Block_ = {
  __typename?: '_Block_'
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>
  /** The block number */
  number: Scalars['Int']['output']
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>
}

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_'
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_
  /** The deployment ID */
  deployment: Scalars['String']['output']
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output']
}

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny'

export type ActivitiesQueryVariables = Exact<{
  skip: Scalars['Int']['input']
  take: Scalars['Int']['input']
  id: Scalars['ID']['input']
}>

export type ActivitiesQuery = {
  __typename?: 'Query'
  pool?: {
    __typename?: 'Pool'
    num_activities: number
    name: string
    symbol: string
    price_usd: any
    chain_id: number
    activities: Array<{
      __typename?: 'Activity'
      id: string
      address: string
      type: string
      txHash: string
      timestamp: number
      symbol: Array<string>
      amount: Array<any>
      price_usd: Array<any>
    }>
  } | null
}

export type FundCardQueryVariables = Exact<{
  id: Scalars['ID']['input']
  price_period: Scalars['Int']['input']
  period_selected: Scalars['Int']['input']
  day: Scalars['Int']['input']
  month: Scalars['Int']['input']
}>

export type FundCardQuery = {
  __typename?: 'Query'
  pool?: {
    __typename?: 'Pool'
    name: string
    symbol: string
    logo?: string | null
    address: string
    foundedBy?: string | null
    price_usd: any
    pool_version: number
    total_value_locked_usd: any
    strategy: string
    chain?: { __typename?: 'Chain'; logo?: string | null } | null
    price_candles: Array<{
      __typename?: 'Candle'
      timestamp: number
      close: any
    }>
    total_value_locked: Array<{
      __typename?: 'TotalValueLocked'
      close: any
      timestamp: number
    }>
    weights: Array<{
      __typename?: 'WeightPoint'
      timestamp: number
      weights: Array<{
        __typename?: 'Weight'
        weight_normalized: any
        token: { __typename?: 'Token'; id: string; symbol?: string | null }
      }>
    }>
    underlying_assets: Array<{
      __typename?: 'Asset'
      balance: any
      weight_normalized: any
      weight_goal_normalized: any
      token: {
        __typename?: 'Token'
        id: string
        name?: string | null
        logo?: string | null
        symbol?: string | null
        decimals?: number | null
        price_usd: any
        is_wrap_token: number
        wraps?: {
          __typename?: 'Token'
          id: string
          decimals?: number | null
          price_usd: any
          symbol?: string | null
          name?: string | null
          logo?: string | null
        } | null
      }
    }>
    now: Array<{ __typename?: 'Candle'; timestamp: number; close: any }>
    day: Array<{ __typename?: 'Candle'; timestamp: number; close: any }>
    month: Array<{ __typename?: 'Candle'; timestamp: number; close: any }>
    weight_goals: Array<{
      __typename?: 'WeightGoalPoint'
      start_timestamp: number
      end_timestamp: number
      weights: Array<{
        __typename?: 'WeightGoal'
        weight_normalized: any
        asset: {
          __typename?: 'Asset'
          token: { __typename?: 'Token'; id: string }
        }
      }>
    }>
  } | null
}

export type ManagerChangeTvlQueryVariables = Exact<{
  manager: Scalars['ID']['input']
  day: Scalars['Int']['input']
  week: Scalars['Int']['input']
  month: Scalars['Int']['input']
  year: Scalars['Int']['input']
}>

export type ManagerChangeTvlQuery = {
  __typename?: 'Query'
  manager?: {
    __typename?: 'Manager'
    now: Array<{
      __typename?: 'TotalValueLocked'
      timestamp: number
      close: any
    }>
    day: Array<{
      __typename?: 'TotalValueLocked'
      timestamp: number
      close: any
    }>
    week: Array<{
      __typename?: 'TotalValueLocked'
      timestamp: number
      close: any
    }>
    month: Array<{
      __typename?: 'TotalValueLocked'
      timestamp: number
      close: any
    }>
    year: Array<{
      __typename?: 'TotalValueLocked'
      timestamp: number
      close: any
    }>
    max: Array<{
      __typename?: 'TotalValueLocked'
      timestamp: number
      close: any
    }>
  } | null
}

export type ManagerDepositsQueryVariables = Exact<{
  manager: Scalars['ID']['input']
  timestamp?: InputMaybe<Scalars['Int']['input']>
}>

export type ManagerDepositsQuery = {
  __typename?: 'Query'
  manager?: {
    __typename?: 'Manager'
    deposits: Array<{
      __typename?: 'Volume'
      volume_usd: any
      timestamp: number
    }>
  } | null
}

export type ManagerPoolActivitiesQueryVariables = Exact<{
  id: Scalars['ID']['input']
  first: Scalars['Int']['input']
  skip: Scalars['Int']['input']
  options: Array<Scalars['String']['input']> | Scalars['String']['input']
}>

export type ManagerPoolActivitiesQuery = {
  __typename?: 'Query'
  pool?: {
    __typename?: 'Pool'
    name: string
    symbol: string
    logo?: string | null
    num_activities: number
    manager: { __typename?: 'Manager'; id: string }
    underlying_assets: Array<{
      __typename?: 'Asset'
      token: {
        __typename?: 'Token'
        logo?: string | null
        symbol?: string | null
        wraps?: {
          __typename?: 'Token'
          symbol?: string | null
          logo?: string | null
        } | null
      }
    }>
    chain?: { __typename?: 'Chain'; blockExplorerUrl?: string | null } | null
    activities: Array<{
      __typename?: 'Activity'
      id: string
      type: string
      timestamp: number
      price_usd: Array<any>
      txHash: string
      address: string
      symbol: Array<string>
      amount: Array<any>
    }>
    weight_goals: Array<{
      __typename?: 'WeightGoalPoint'
      id: string
      type: string
      txHash: string
      end_timestamp: number
      previous?: {
        __typename?: 'WeightGoalPoint'
        weights: Array<{
          __typename?: 'WeightGoal'
          weight_normalized: any
          asset: {
            __typename?: 'Asset'
            token: { __typename?: 'Token'; symbol?: string | null }
          }
        }>
      } | null
      token?: {
        __typename?: 'Token'
        symbol?: string | null
        price_usd: any
        logo?: string | null
      } | null
      weights: Array<{
        __typename?: 'WeightGoal'
        weight_normalized: any
        asset: {
          __typename?: 'Asset'
          balance: any
          token: {
            __typename?: 'Token'
            symbol?: string | null
            logo?: string | null
          }
        }
      }>
    }>
  } | null
}

export type ManagerPoolInfoQueryVariables = Exact<{
  manager?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
}>

export type ManagerPoolInfoQuery = {
  __typename?: 'Query'
  pools: Array<{
    __typename?: 'Pool'
    id: string
    address: string
    vault: string
    chain_id: number
    logo?: string | null
    pool_version: number
    is_private_pool: boolean
    decimals: number
    name: string
    symbol: string
    poolId?: number | null
    total_value_locked_usd: any
    underlying_assets_addresses: Array<string>
    controller: string
    price_usd: any
    chain?: {
      __typename?: 'Chain'
      id: string
      logo?: string | null
      chainName?: string | null
      nativeTokenName?: string | null
      nativeTokenSymbol?: string | null
      nativeTokenDecimals?: number | null
      rpcUrls?: Array<string | null> | null
      blockExplorerUrl?: string | null
      secondsPerBlock?: number | null
      addressWrapped?: string | null
    } | null
  }>
}

export type ManagerPoolsQueryVariables = Exact<{
  manager?: InputMaybe<Scalars['String']['input']>
}>

export type ManagerPoolsQuery = {
  __typename?: 'Query'
  pools: Array<{
    __typename?: 'Pool'
    id: string
    name: string
    logo?: string | null
    chain?: { __typename?: 'Chain'; logo?: string | null } | null
  }>
}

export type ManagerTvmChartQueryVariables = Exact<{
  manager: Scalars['ID']['input']
  timestamp?: InputMaybe<Scalars['Int']['input']>
}>

export type ManagerTvmChartQuery = {
  __typename?: 'Query'
  manager?: {
    __typename?: 'Manager'
    total_value_locked: Array<{
      __typename?: 'TotalValueLocked'
      close: any
      timestamp: number
    }>
  } | null
}

export type ManagerUniqueInvestorsQueryVariables = Exact<{
  manager: Scalars['ID']['input']
}>

export type ManagerUniqueInvestorsQuery = {
  __typename?: 'Query'
  manager?: { __typename?: 'Manager'; unique_investors: number } | null
}

export type ManagerWithdrawsQueryVariables = Exact<{
  manager: Scalars['ID']['input']
  timestamp?: InputMaybe<Scalars['Int']['input']>
}>

export type ManagerWithdrawsQuery = {
  __typename?: 'Query'
  manager?: {
    __typename?: 'Manager'
    withdraws: Array<{
      __typename?: 'Volume'
      volume_usd: any
      timestamp: number
    }>
  } | null
}

export type PoolAllocationQueryVariables = Exact<{
  id: Scalars['ID']['input']
  skip?: InputMaybe<Scalars['Int']['input']>
}>

export type PoolAllocationQuery = {
  __typename?: 'Query'
  pool?: {
    __typename?: 'Pool'
    num_token_add: number
    num_token_remove: number
    num_weight_goals: number
    num_join: any
    num_exit: any
    manager: { __typename?: 'Manager'; id: string }
    weight_goals: Array<{
      __typename?: 'WeightGoalPoint'
      id: string
      type: string
      end_timestamp: number
      start_timestamp: number
      txHash: string
      previous?: {
        __typename?: 'WeightGoalPoint'
        weights: Array<{
          __typename?: 'WeightGoal'
          weight_normalized: any
          asset: {
            __typename?: 'Asset'
            token: { __typename?: 'Token'; symbol?: string | null }
          }
        }>
      } | null
      token?: {
        __typename?: 'Token'
        symbol?: string | null
        logo?: string | null
        price_usd: any
      } | null
      weights: Array<{
        __typename?: 'WeightGoal'
        weight_normalized: any
        asset: {
          __typename?: 'Asset'
          balance: any
          token: {
            __typename?: 'Token'
            symbol?: string | null
            logo?: string | null
          }
        }
      }>
    }>
  } | null
}

export type PoolAssetsQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type PoolAssetsQuery = {
  __typename?: 'Query'
  pool?: {
    __typename?: 'Pool'
    pool_version: number
    underlying_assets: Array<{
      __typename?: 'Asset'
      balance: any
      weight_normalized: any
      weight_goal_normalized: any
      token: {
        __typename?: 'Token'
        id: string
        name?: string | null
        logo?: string | null
        symbol?: string | null
        decimals?: number | null
        price_usd: any
        is_wrap_token: number
        wraps?: {
          __typename?: 'Token'
          id: string
          decimals?: number | null
          price_usd: any
          symbol?: string | null
          name?: string | null
          logo?: string | null
        } | null
      }
    }>
    weight_goals: Array<{
      __typename?: 'WeightGoalPoint'
      start_timestamp: number
      end_timestamp: number
      weights: Array<{
        __typename?: 'WeightGoal'
        weight_normalized: any
        asset: {
          __typename?: 'Asset'
          token: {
            __typename?: 'Token'
            id: string
            name?: string | null
            symbol?: string | null
            decimals?: number | null
            price_usd: any
          }
        }
      }>
    }>
  } | null
}

export type PoolChainIdQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type PoolChainIdQuery = {
  __typename?: 'Query'
  pool?: {
    __typename?: 'Pool'
    chain_id: number
    unique_investors: number
  } | null
}

export type PoolChangePriceQueryVariables = Exact<{
  id: Scalars['ID']['input']
  week: Scalars['Int']['input']
  month: Scalars['Int']['input']
  year: Scalars['Int']['input']
}>

export type PoolChangePriceQuery = {
  __typename?: 'Query'
  pool?: {
    __typename?: 'Pool'
    now: Array<{ __typename?: 'Candle'; timestamp: number; close: any }>
    week: Array<{ __typename?: 'Candle'; timestamp: number; close: any }>
    month: Array<{ __typename?: 'Candle'; timestamp: number; close: any }>
    year: Array<{ __typename?: 'Candle'; timestamp: number; close: any }>
    max: Array<{ __typename?: 'Candle'; timestamp: number; close: any }>
  } | null
}

export type PoolChangeTvlQueryVariables = Exact<{
  id: Scalars['ID']['input']
  week: Scalars['Int']['input']
  month: Scalars['Int']['input']
  year: Scalars['Int']['input']
}>

export type PoolChangeTvlQuery = {
  __typename?: 'Query'
  pool?: {
    __typename?: 'Pool'
    now: Array<{
      __typename?: 'TotalValueLocked'
      timestamp: number
      close: any
    }>
    week: Array<{
      __typename?: 'TotalValueLocked'
      timestamp: number
      close: any
    }>
    month: Array<{
      __typename?: 'TotalValueLocked'
      timestamp: number
      close: any
    }>
    year: Array<{
      __typename?: 'TotalValueLocked'
      timestamp: number
      close: any
    }>
    max: Array<{
      __typename?: 'TotalValueLocked'
      timestamp: number
      close: any
    }>
  } | null
}

export type PoolChartsQueryVariables = Exact<{
  id: Scalars['ID']['input']
  price_period: Scalars['Int']['input']
  period_selected: Scalars['Int']['input']
}>

export type PoolChartsQuery = {
  __typename?: 'Query'
  pool?: {
    __typename?: 'Pool'
    price_usd: any
    price_candles: Array<{
      __typename?: 'Candle'
      timestamp: number
      close: any
    }>
    total_value_locked: Array<{
      __typename?: 'TotalValueLocked'
      close: any
      timestamp: number
    }>
    weights: Array<{
      __typename?: 'WeightPoint'
      timestamp: number
      weights: Array<{
        __typename?: 'Weight'
        weight_normalized: any
        token: { __typename?: 'Token'; id: string; symbol?: string | null }
      }>
    }>
  } | null
}

export type PoolDataQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type PoolDataQuery = {
  __typename?: 'Query'
  pool?: {
    __typename?: 'Pool'
    id: string
    address: string
    vault: string
    vault_id: string
    controller: string
    chain_id: number
    logo?: string | null
    pool_version: number
    strategy: string
    is_private_pool: boolean
    supply: any
    name: string
    foundedBy?: string | null
    symbol: string
    poolId?: number | null
    url?: string | null
    summary?: string | null
    underlying_assets_addresses: Array<string>
    manager: { __typename?: 'Manager'; id: string }
    chain?: {
      __typename?: 'Chain'
      id: string
      logo?: string | null
      chainName?: string | null
      nativeTokenName?: string | null
      nativeTokenSymbol?: string | null
      nativeTokenDecimals?: number | null
      rpcUrls?: Array<string | null> | null
      blockExplorerUrl?: string | null
      secondsPerBlock?: number | null
      addressWrapped?: string | null
    } | null
    partners?: Array<{
      __typename?: 'Partner'
      logo?: string | null
      url?: string | null
    } | null> | null
    underlying_assets: Array<{
      __typename?: 'Asset'
      balance: any
      weight_normalized: any
      weight_goal_normalized: any
      token: {
        __typename?: 'Token'
        id: string
        name?: string | null
        logo?: string | null
        symbol?: string | null
        decimals?: number | null
        price_usd: any
        is_wrap_token: number
        wraps?: {
          __typename?: 'Token'
          id: string
          decimals?: number | null
          price_usd: any
          symbol?: string | null
          name?: string | null
          logo?: string | null
        } | null
      }
    }>
    weight_goals: Array<{
      __typename?: 'WeightGoalPoint'
      start_timestamp: number
      end_timestamp: number
      weights: Array<{
        __typename?: 'WeightGoal'
        weight_normalized: any
        asset: {
          __typename?: 'Asset'
          token: { __typename?: 'Token'; id: string }
        }
      }>
    }>
  } | null
}

export type PoolInfoQueryVariables = Exact<{
  id: Scalars['ID']['input']
  day: Scalars['Int']['input']
}>

export type PoolInfoQuery = {
  __typename?: 'Query'
  pool?: {
    __typename?: 'Pool'
    decimals: number
    price_usd: any
    total_value_locked_usd: any
    fee_exit: any
    fee_swap: any
    fee_join_manager: any
    fee_join_broker: any
    fee_aum_kassandra: any
    fee_aum: any
    withdraw: Array<{ __typename?: 'Fee'; volume_usd: any }>
    swap: Array<{ __typename?: 'Fee'; volume_usd: any }>
    volumes: Array<{ __typename?: 'Volume'; volume_usd: any }>
  } | null
}

export type PoolInvestorsTableQueryVariables = Exact<{
  poolId: Scalars['ID']['input']
  skip?: InputMaybe<Scalars['Int']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
}>

export type PoolInvestorsTableQuery = {
  __typename?: 'Query'
  pools: Array<{
    __typename?: 'Pool'
    id: string
    supply: any
    price_usd: any
    unique_investors: number
    investors: Array<{
      __typename?: 'Investor'
      id: string
      wallet: string
      first_deposit_timestamp: number
      last_deposit_timestamp: number
      amount: any
    }>
  }>
}

export type PoolJoinsQueryVariables = Exact<{
  id: Scalars['ID']['input']
  timestamp: Scalars['Int']['input']
}>

export type PoolJoinsQuery = {
  __typename?: 'Query'
  pool?: {
    __typename?: 'Pool'
    volumes: Array<{ __typename?: 'Volume'; volume_usd: any }>
  } | null
}

export type PoolPriceQueryVariables = Exact<{
  id: Scalars['ID']['input']
  day: Scalars['Int']['input']
  week: Scalars['Int']['input']
  month: Scalars['Int']['input']
  quarterly: Scalars['Int']['input']
  year: Scalars['Int']['input']
}>

export type PoolPriceQuery = {
  __typename?: 'Query'
  pool?: {
    __typename?: 'Pool'
    price_usd: any
    now: Array<{ __typename?: 'Candle'; timestamp: number; close: any }>
    day: Array<{ __typename?: 'Candle'; timestamp: number; close: any }>
    week: Array<{ __typename?: 'Candle'; timestamp: number; close: any }>
    month: Array<{ __typename?: 'Candle'; timestamp: number; close: any }>
    quarterly: Array<{ __typename?: 'Candle'; timestamp: number; close: any }>
    year: Array<{ __typename?: 'Candle'; timestamp: number; close: any }>
  } | null
}

export type PoolPriceChartQueryVariables = Exact<{
  id: Scalars['ID']['input']
  timestamp: Scalars['Int']['input']
}>

export type PoolPriceChartQuery = {
  __typename?: 'Query'
  pool?: {
    __typename?: 'Pool'
    value: Array<{ __typename?: 'Candle'; close: any; timestamp: number }>
  } | null
}

export type PoolRebalanceTimeQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type PoolRebalanceTimeQuery = {
  __typename?: 'Query'
  pool?: {
    __typename?: 'Pool'
    weight_goals: Array<{
      __typename?: 'WeightGoalPoint'
      end_timestamp: number
    }>
  } | null
}

export type PoolTvmChartQueryVariables = Exact<{
  id: Scalars['ID']['input']
  timestamp: Scalars['Int']['input']
}>

export type PoolTvmChartQuery = {
  __typename?: 'Query'
  pool?: {
    __typename?: 'Pool'
    value: Array<{
      __typename?: 'TotalValueLocked'
      close: any
      timestamp: number
    }>
  } | null
}

export type PoolWithdrawsQueryVariables = Exact<{
  id: Scalars['ID']['input']
  timestamp: Scalars['Int']['input']
}>

export type PoolWithdrawsQuery = {
  __typename?: 'Query'
  pool?: {
    __typename?: 'Pool'
    volumes: Array<{ __typename?: 'Volume'; volume_usd: any }>
  } | null
}

export type PoolsQueryVariables = Exact<{ [key: string]: never }>

export type PoolsQuery = {
  __typename?: 'Query'
  pools: Array<{
    __typename?: 'Pool'
    id: string
    address: string
    symbol: string
    price_usd: any
  }>
}

export type TokensQueryVariables = Exact<{
  tokensList: Array<Scalars['ID']['input']> | Scalars['ID']['input']
}>

export type TokensQuery = {
  __typename?: 'Query'
  tokensByIds: Array<{
    __typename?: 'Token'
    id: string
    decimals?: number | null
    logo?: string | null
    name?: string | null
    symbol?: string | null
  } | null>
}

export type TokensPoolQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type TokensPoolQuery = {
  __typename?: 'Query'
  pool?: {
    __typename?: 'Pool'
    name: string
    symbol: string
    logo?: string | null
    price_usd: any
    chain_id: number
    num_token_add: number
    num_token_remove: number
    num_weight_goals: number
    chain?: {
      __typename?: 'Chain'
      blockExplorerUrl?: string | null
      addressWrapped?: string | null
    } | null
    weight_goals: Array<{
      __typename?: 'WeightGoalPoint'
      id: string
      type: string
      end_timestamp: number
      start_timestamp: number
      token?: {
        __typename?: 'Token'
        symbol?: string | null
        logo?: string | null
        price_usd: any
      } | null
      weights: Array<{
        __typename?: 'WeightGoal'
        weight_normalized: any
        asset: {
          __typename?: 'Asset'
          balance: any
          token: {
            __typename?: 'Token'
            symbol?: string | null
            logo?: string | null
          }
        }
      }>
    }>
  } | null
}

export type UserPoolDataQueryVariables = Exact<{
  id: Array<Scalars['ID']['input']> | Scalars['ID']['input']
  day: Scalars['Int']['input']
  month: Scalars['Int']['input']
  wallet: Scalars['String']['input']
}>

export type UserPoolDataQuery = {
  __typename?: 'Query'
  pools: Array<{
    __typename?: 'Pool'
    id: string
    address: string
    name: string
    symbol: string
    logo?: string | null
    price_usd: any
    total_value_locked_usd: any
    now: Array<{ __typename?: 'Candle'; timestamp: number; close: any }>
    day: Array<{ __typename?: 'Candle'; timestamp: number; close: any }>
    month: Array<{ __typename?: 'Candle'; timestamp: number; close: any }>
  }>
  managedPools: Array<{
    __typename?: 'Pool'
    id: string
    address: string
    name: string
    symbol: string
    logo?: string | null
    price_usd: any
    total_value_locked_usd: any
    investors: Array<{ __typename?: 'Investor'; amount: any }>
    chain?: { __typename?: 'Chain'; logo?: string | null } | null
    now: Array<{ __typename?: 'Candle'; timestamp: number; close: any }>
    day: Array<{ __typename?: 'Candle'; timestamp: number; close: any }>
    month: Array<{ __typename?: 'Candle'; timestamp: number; close: any }>
  }>
}

export const ActivitiesDocument = gql`
  query Activities($skip: Int!, $take: Int!, $id: ID!) {
    pool(id: $id) {
      num_activities
      name
      symbol
      price_usd
      chain_id
      activities(
        orderBy: timestamp
        orderDirection: desc
        skip: $skip
        first: $take
      ) {
        id
        address
        type
        txHash
        timestamp
        symbol
        amount
        price_usd
      }
    }
  }
`
export const FundCardDocument = gql`
  query FundCard(
    $id: ID!
    $price_period: Int!
    $period_selected: Int!
    $day: Int!
    $month: Int!
  ) {
    pool(id: $id) {
      name
      symbol
      name
      logo
      address
      foundedBy
      price_usd
      pool_version
      chain {
        logo
      }
      price_candles(
        where: {
          base: "usd"
          period: $price_period
          timestamp_gt: $period_selected
        }
        orderBy: timestamp
        first: 365
      ) {
        timestamp
        close
      }
      total_value_locked(
        where: { base: "usd", timestamp_gt: $period_selected }
        orderBy: timestamp
      ) {
        close
        timestamp
      }
      weights(where: { timestamp_gt: $period_selected }, orderBy: timestamp) {
        timestamp
        weights {
          token {
            id
            symbol
          }
          weight_normalized
        }
      }
      total_value_locked_usd
      strategy
      underlying_assets(orderBy: weight_normalized, orderDirection: desc) {
        balance
        weight_normalized
        weight_goal_normalized
        token {
          id
          name
          logo
          symbol
          decimals
          price_usd
          is_wrap_token
          wraps {
            id
            decimals
            price_usd
            symbol
            name
            logo
          }
        }
      }
      now: price_candles(
        where: { base: "usd", period: 3600 }
        orderBy: timestamp
        orderDirection: desc
        first: 1
      ) {
        timestamp
        close
      }
      day: price_candles(
        where: { base: "usd", period: 3600, timestamp_gt: $day }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
      month: price_candles(
        where: { base: "usd", period: 3600, timestamp_gt: $month }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
      weight_goals(orderBy: end_timestamp, orderDirection: desc, first: 2) {
        start_timestamp
        end_timestamp
        weights(orderBy: weight_normalized, orderDirection: desc) {
          weight_normalized
          asset {
            token {
              id
            }
          }
        }
      }
    }
  }
`
export const ManagerChangeTvlDocument = gql`
  query ManagerChangeTVL(
    $manager: ID!
    $day: Int!
    $week: Int!
    $month: Int!
    $year: Int!
  ) {
    manager(id: $manager) {
      now: total_value_locked(
        where: { base: "usd" }
        orderBy: timestamp
        orderDirection: desc
        first: 1
      ) {
        timestamp
        close
      }
      day: total_value_locked(
        where: { base: "usd", timestamp_gt: $day }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
      week: total_value_locked(
        where: { base: "usd", timestamp_gt: $week }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
      month: total_value_locked(
        where: { base: "usd", timestamp_gt: $month }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
      year: total_value_locked(
        where: { base: "usd", timestamp_gt: $year }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
      max: total_value_locked(
        where: { base: "usd", timestamp_gt: 0 }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
    }
  }
`
export const ManagerDepositsDocument = gql`
  query ManagerDeposits($manager: ID!, $timestamp: Int) {
    manager(id: $manager) {
      deposits: volumes(
        where: {
          period: 86400
          type: "join"
          swap_pair_in: ["manager", "broker"]
          timestamp_gt: $timestamp
        }
      ) {
        volume_usd
        timestamp
      }
    }
  }
`
export const ManagerPoolActivitiesDocument = gql`
  query ManagerPoolActivities(
    $id: ID!
    $first: Int!
    $skip: Int!
    $options: [String!]!
  ) {
    pool(id: $id) {
      name
      symbol
      logo
      num_activities
      manager {
        id
      }
      underlying_assets {
        token {
          logo
          symbol
          wraps {
            symbol
            logo
          }
        }
      }
      chain {
        blockExplorerUrl
      }
      activities(
        where: {
          type_in: $options
          address_not: "0x0000000000000000000000000000000000000000"
        }
        orderBy: timestamp
        orderDirection: desc
        skip: $skip
        first: $first
      ) {
        id
        type
        timestamp
        price_usd
        txHash
        address
        symbol
        amount
      }
      weight_goals(
        orderBy: end_timestamp
        orderDirection: desc
        skip: $skip
        first: $first
        where: { previous_not: null, type_in: $options }
      ) {
        id
        type
        txHash
        end_timestamp
        previous {
          weights {
            weight_normalized
            asset {
              token {
                symbol
              }
            }
          }
        }
        token {
          symbol
          price_usd
          logo
        }
        weights {
          weight_normalized
          asset {
            balance
            token {
              symbol
              logo
            }
          }
        }
      }
    }
  }
`
export const ManagerPoolInfoDocument = gql`
  query ManagerPoolInfo($manager: String, $id: ID) {
    pools(where: { manager: $manager, id: $id }) {
      id
      address
      vault
      chain_id
      logo
      pool_version
      is_private_pool
      decimals
      chain {
        id
        logo
        chainName
        nativeTokenName
        nativeTokenSymbol
        nativeTokenDecimals
        rpcUrls
        blockExplorerUrl
        secondsPerBlock
        addressWrapped
      }
      name
      symbol
      poolId
      total_value_locked_usd
      underlying_assets_addresses
      controller
      price_usd
    }
  }
`
export const ManagerPoolsDocument = gql`
  query ManagerPools($manager: String) {
    pools(where: { manager: $manager }) {
      id
      name
      logo
      chain {
        logo
      }
    }
  }
`
export const ManagerTvmChartDocument = gql`
  query ManagerTVMChart($manager: ID!, $timestamp: Int) {
    manager(id: $manager) {
      total_value_locked(
        where: { base: "usd", timestamp_gt: $timestamp }
        orderBy: timestamp
        orderDirection: asc
        first: 1000
      ) {
        close
        timestamp
      }
    }
  }
`
export const ManagerUniqueInvestorsDocument = gql`
  query ManagerUniqueInvestors($manager: ID!) {
    manager(id: $manager) {
      unique_investors
    }
  }
`
export const ManagerWithdrawsDocument = gql`
  query ManagerWithdraws($manager: ID!, $timestamp: Int) {
    manager(id: $manager) {
      withdraws: volumes(
        where: { period: 86400, type: "exit", timestamp_gt: $timestamp }
      ) {
        volume_usd
        timestamp
      }
    }
  }
`
export const PoolAllocationDocument = gql`
  query PoolAllocation($id: ID!, $skip: Int) {
    pool(id: $id) {
      num_token_add
      num_token_remove
      num_weight_goals
      num_join
      num_exit
      manager {
        id
      }
      weight_goals(
        orderBy: end_timestamp
        orderDirection: desc
        first: 4
        skip: $skip
        where: { previous_not: null }
      ) {
        id
        type
        end_timestamp
        start_timestamp
        txHash
        previous {
          weights {
            weight_normalized
            asset {
              token {
                symbol
              }
            }
          }
        }
        token {
          symbol
          logo
          price_usd
        }
        weights {
          weight_normalized
          asset {
            balance
            token {
              symbol
              logo
            }
          }
        }
      }
    }
  }
`
export const PoolAssetsDocument = gql`
  query PoolAssets($id: ID!) {
    pool(id: $id) {
      pool_version
      underlying_assets(orderBy: weight_normalized, orderDirection: desc) {
        balance
        weight_normalized
        weight_goal_normalized
        token {
          id
          name
          logo
          symbol
          decimals
          price_usd
          is_wrap_token
          wraps {
            id
            decimals
            price_usd
            symbol
            name
            logo
          }
        }
      }
      weight_goals(orderBy: end_timestamp, orderDirection: desc, first: 2) {
        start_timestamp
        end_timestamp
        weights(orderBy: weight_normalized, orderDirection: desc) {
          asset {
            token {
              id
              name
              symbol
              decimals
              price_usd
            }
          }
          weight_normalized
        }
      }
    }
  }
`
export const PoolChainIdDocument = gql`
  query PoolChainId($id: ID!) {
    pool(id: $id) {
      chain_id
      unique_investors
    }
  }
`
export const PoolChangePriceDocument = gql`
  query PoolChangePrice($id: ID!, $week: Int!, $month: Int!, $year: Int!) {
    pool(id: $id) {
      now: price_candles(
        where: { base: "usd", period: 3600 }
        orderBy: timestamp
        orderDirection: desc
        first: 1
      ) {
        timestamp
        close
      }
      week: price_candles(
        where: { base: "usd", period: 3600, timestamp_gt: $week }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
      month: price_candles(
        where: { base: "usd", period: 3600, timestamp_gt: $month }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
      year: price_candles(
        where: { base: "usd", period: 3600, timestamp_gt: $year }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
      max: price_candles(
        where: { base: "usd", period: 3600, timestamp_gt: 0 }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
    }
  }
`
export const PoolChangeTvlDocument = gql`
  query PoolChangeTvl($id: ID!, $week: Int!, $month: Int!, $year: Int!) {
    pool(id: $id) {
      now: total_value_locked(
        where: { base: "usd" }
        orderBy: timestamp
        orderDirection: desc
        first: 1
      ) {
        timestamp
        close
      }
      week: total_value_locked(
        where: { base: "usd", timestamp_gt: $week }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
      month: total_value_locked(
        where: { base: "usd", timestamp_gt: $month }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
      year: total_value_locked(
        where: { base: "usd", timestamp_gt: $year }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
      max: total_value_locked(
        where: { base: "usd", timestamp_gt: 0 }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
    }
  }
`
export const PoolChartsDocument = gql`
  query PoolCharts($id: ID!, $price_period: Int!, $period_selected: Int!) {
    pool(id: $id) {
      price_usd
      price_candles(
        where: {
          base: "usd"
          period: $price_period
          timestamp_gt: $period_selected
        }
        orderBy: timestamp
        first: 365
      ) {
        timestamp
        close
      }
      total_value_locked(
        where: { base: "usd", timestamp_gt: $period_selected }
        orderBy: timestamp
        first: 365
      ) {
        close
        timestamp
      }
      weights(
        where: { timestamp_gt: $period_selected }
        orderBy: timestamp
        first: 365
      ) {
        timestamp
        weights {
          token {
            id
            symbol
          }
          weight_normalized
        }
      }
    }
  }
`
export const PoolDataDocument = gql`
  query PoolData($id: ID!) {
    pool(id: $id) {
      id
      address
      vault
      vault_id
      controller
      chain_id
      logo
      pool_version
      strategy
      is_private_pool
      supply
      manager {
        id
      }
      chain {
        id
        logo
        chainName
        nativeTokenName
        nativeTokenSymbol
        nativeTokenDecimals
        rpcUrls
        blockExplorerUrl
        secondsPerBlock
        addressWrapped
      }
      name
      foundedBy
      symbol
      poolId
      url
      summary
      partners {
        logo
        url
      }
      underlying_assets_addresses
      underlying_assets(orderBy: weight_normalized, orderDirection: desc) {
        balance
        weight_normalized
        weight_goal_normalized
        token {
          id
          name
          logo
          symbol
          decimals
          price_usd
          is_wrap_token
          wraps {
            id
            decimals
            price_usd
            symbol
            name
            logo
          }
        }
      }
      weight_goals(orderBy: end_timestamp, orderDirection: desc, first: 2) {
        start_timestamp
        end_timestamp
        weights(orderBy: weight_normalized, orderDirection: desc) {
          asset {
            token {
              id
            }
          }
          weight_normalized
        }
      }
    }
  }
`
export const PoolInfoDocument = gql`
  query PoolInfo($id: ID!, $day: Int!) {
    pool(id: $id) {
      decimals
      price_usd
      total_value_locked_usd
      fee_exit
      fee_swap
      fee_join_manager
      fee_join_broker
      fee_aum_kassandra
      fee_aum
      withdraw: fees(
        where: { period: 3600, timestamp_gt: $day, type: "exit" }
      ) {
        volume_usd
      }
      swap: fees(where: { period: 3600, timestamp_gt: $day, type: "swap" }) {
        volume_usd
      }
      volumes(where: { period: 3600, timestamp_gt: $day }) {
        volume_usd
      }
    }
  }
`
export const PoolInvestorsTableDocument = gql`
  query poolInvestorsTable($poolId: ID!, $skip: Int, $first: Int) {
    pools(where: { id: $poolId }) {
      id
      supply
      price_usd
      unique_investors
      investors(
        orderBy: amount
        orderDirection: desc
        skip: $skip
        first: $first
      ) {
        id
        wallet
        first_deposit_timestamp
        last_deposit_timestamp
        amount
      }
    }
  }
`
export const PoolJoinsDocument = gql`
  query PoolJoins($id: ID!, $timestamp: Int!) {
    pool(id: $id) {
      volumes(where: { period: 3600, type: "join", timestamp_gt: $timestamp }) {
        volume_usd
      }
    }
  }
`
export const PoolPriceDocument = gql`
  query PoolPrice(
    $id: ID!
    $day: Int!
    $week: Int!
    $month: Int!
    $quarterly: Int!
    $year: Int!
  ) {
    pool(id: $id) {
      price_usd
      now: price_candles(
        where: { base: "usd", period: 3600 }
        orderBy: timestamp
        orderDirection: desc
        first: 1
      ) {
        timestamp
        close
      }
      day: price_candles(
        where: { base: "usd", period: 3600, timestamp_gt: $day }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
      week: price_candles(
        where: { base: "usd", period: 3600, timestamp_gt: $week }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
      month: price_candles(
        where: { base: "usd", period: 3600, timestamp_gt: $month }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
      quarterly: price_candles(
        where: { base: "usd", period: 3600, timestamp_gt: $quarterly }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
      year: price_candles(
        where: { base: "usd", period: 3600, timestamp_gt: $year }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
    }
  }
`
export const PoolPriceChartDocument = gql`
  query poolPriceChart($id: ID!, $timestamp: Int!) {
    pool(id: $id) {
      value: price_candles(
        where: { base: "usd", timestamp_gt: $timestamp, period: 3600 }
        orderBy: timestamp
        orderDirection: asc
        first: 1000
      ) {
        close
        timestamp
      }
    }
  }
`
export const PoolRebalanceTimeDocument = gql`
  query PoolRebalanceTime($id: ID!) {
    pool(id: $id) {
      weight_goals(orderBy: end_timestamp, orderDirection: desc, first: 1) {
        end_timestamp
      }
    }
  }
`
export const PoolTvmChartDocument = gql`
  query PoolTvmChart($id: ID!, $timestamp: Int!) {
    pool(id: $id) {
      value: total_value_locked(
        where: { base: "usd", timestamp_gt: $timestamp }
        orderBy: timestamp
        orderDirection: asc
        first: 1000
      ) {
        close
        timestamp
      }
    }
  }
`
export const PoolWithdrawsDocument = gql`
  query PoolWithdraws($id: ID!, $timestamp: Int!) {
    pool(id: $id) {
      volumes(where: { period: 3600, type: "exit", timestamp_gt: $timestamp }) {
        volume_usd
      }
    }
  }
`
export const PoolsDocument = gql`
  query Pools {
    pools {
      id
      address
      symbol
      price_usd
    }
  }
`
export const TokensDocument = gql`
  query Tokens($tokensList: [ID!]!) {
    tokensByIds(ids: $tokensList) {
      id
      decimals
      logo
      name
      symbol
    }
  }
`
export const TokensPoolDocument = gql`
  query TokensPool($id: ID!) {
    pool(id: $id) {
      name
      symbol
      logo
      price_usd
      chain_id
      num_token_add
      num_token_remove
      num_weight_goals
      chain {
        blockExplorerUrl
        addressWrapped
      }
      weight_goals(orderBy: end_timestamp, orderDirection: desc) {
        id
        type
        end_timestamp
        start_timestamp
        token {
          symbol
          logo
          price_usd
        }
        weights {
          weight_normalized
          asset {
            balance
            token {
              symbol
              logo
            }
          }
        }
      }
    }
  }
`
export const UserPoolDataDocument = gql`
  query userPoolData($id: [ID!]!, $day: Int!, $month: Int!, $wallet: String!) {
    pools(where: { id_in: $id }) {
      id
      address
      name
      symbol
      logo
      price_usd
      total_value_locked_usd
      now: price_candles(
        where: { base: "usd", period: 3600 }
        orderBy: timestamp
        orderDirection: desc
        first: 1
      ) {
        timestamp
        close
      }
      day: price_candles(
        where: { base: "usd", period: 3600, timestamp_gt: $day }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
      month: price_candles(
        where: { base: "usd", period: 3600, timestamp_gt: $month }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
    }
    managedPools: pools(where: { investors_: { wallet: $wallet } }) {
      id
      address
      name
      symbol
      logo
      price_usd
      total_value_locked_usd
      investors(where: { wallet: $wallet }) {
        amount
      }
      chain {
        logo
      }
      now: price_candles(
        where: { base: "usd", period: 3600 }
        orderBy: timestamp
        orderDirection: desc
        first: 1
      ) {
        timestamp
        close
      }
      day: price_candles(
        where: { base: "usd", period: 3600, timestamp_gt: $day }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
      month: price_candles(
        where: { base: "usd", period: 3600, timestamp_gt: $month }
        orderBy: timestamp
        first: 1
      ) {
        timestamp
        close
      }
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    Activities(
      variables: ActivitiesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<ActivitiesQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<ActivitiesQuery>(ActivitiesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'Activities',
        'query'
      )
    },
    FundCard(
      variables: FundCardQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<FundCardQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<FundCardQuery>(FundCardDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'FundCard',
        'query'
      )
    },
    ManagerChangeTVL(
      variables: ManagerChangeTvlQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<ManagerChangeTvlQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<ManagerChangeTvlQuery>(
            ManagerChangeTvlDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'ManagerChangeTVL',
        'query'
      )
    },
    ManagerDeposits(
      variables: ManagerDepositsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<ManagerDepositsQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<ManagerDepositsQuery>(
            ManagerDepositsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'ManagerDeposits',
        'query'
      )
    },
    ManagerPoolActivities(
      variables: ManagerPoolActivitiesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<ManagerPoolActivitiesQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<ManagerPoolActivitiesQuery>(
            ManagerPoolActivitiesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'ManagerPoolActivities',
        'query'
      )
    },
    ManagerPoolInfo(
      variables?: ManagerPoolInfoQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<ManagerPoolInfoQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<ManagerPoolInfoQuery>(
            ManagerPoolInfoDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'ManagerPoolInfo',
        'query'
      )
    },
    ManagerPools(
      variables?: ManagerPoolsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<ManagerPoolsQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<ManagerPoolsQuery>(ManagerPoolsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'ManagerPools',
        'query'
      )
    },
    ManagerTVMChart(
      variables: ManagerTvmChartQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<ManagerTvmChartQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<ManagerTvmChartQuery>(
            ManagerTvmChartDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'ManagerTVMChart',
        'query'
      )
    },
    ManagerUniqueInvestors(
      variables: ManagerUniqueInvestorsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<ManagerUniqueInvestorsQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<ManagerUniqueInvestorsQuery>(
            ManagerUniqueInvestorsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'ManagerUniqueInvestors',
        'query'
      )
    },
    ManagerWithdraws(
      variables: ManagerWithdrawsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<ManagerWithdrawsQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<ManagerWithdrawsQuery>(
            ManagerWithdrawsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'ManagerWithdraws',
        'query'
      )
    },
    PoolAllocation(
      variables: PoolAllocationQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<PoolAllocationQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<PoolAllocationQuery>(
            PoolAllocationDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'PoolAllocation',
        'query'
      )
    },
    PoolAssets(
      variables: PoolAssetsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<PoolAssetsQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<PoolAssetsQuery>(PoolAssetsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'PoolAssets',
        'query'
      )
    },
    PoolChainId(
      variables: PoolChainIdQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<PoolChainIdQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<PoolChainIdQuery>(PoolChainIdDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'PoolChainId',
        'query'
      )
    },
    PoolChangePrice(
      variables: PoolChangePriceQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<PoolChangePriceQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<PoolChangePriceQuery>(
            PoolChangePriceDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'PoolChangePrice',
        'query'
      )
    },
    PoolChangeTvl(
      variables: PoolChangeTvlQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<PoolChangeTvlQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<PoolChangeTvlQuery>(PoolChangeTvlDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'PoolChangeTvl',
        'query'
      )
    },
    PoolCharts(
      variables: PoolChartsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<PoolChartsQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<PoolChartsQuery>(PoolChartsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'PoolCharts',
        'query'
      )
    },
    PoolData(
      variables: PoolDataQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<PoolDataQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<PoolDataQuery>(PoolDataDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'PoolData',
        'query'
      )
    },
    PoolInfo(
      variables: PoolInfoQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<PoolInfoQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<PoolInfoQuery>(PoolInfoDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'PoolInfo',
        'query'
      )
    },
    poolInvestorsTable(
      variables: PoolInvestorsTableQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<PoolInvestorsTableQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<PoolInvestorsTableQuery>(
            PoolInvestorsTableDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'poolInvestorsTable',
        'query'
      )
    },
    PoolJoins(
      variables: PoolJoinsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<PoolJoinsQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<PoolJoinsQuery>(PoolJoinsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'PoolJoins',
        'query'
      )
    },
    PoolPrice(
      variables: PoolPriceQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<PoolPriceQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<PoolPriceQuery>(PoolPriceDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'PoolPrice',
        'query'
      )
    },
    poolPriceChart(
      variables: PoolPriceChartQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<PoolPriceChartQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<PoolPriceChartQuery>(
            PoolPriceChartDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'poolPriceChart',
        'query'
      )
    },
    PoolRebalanceTime(
      variables: PoolRebalanceTimeQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<PoolRebalanceTimeQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<PoolRebalanceTimeQuery>(
            PoolRebalanceTimeDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'PoolRebalanceTime',
        'query'
      )
    },
    PoolTvmChart(
      variables: PoolTvmChartQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<PoolTvmChartQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<PoolTvmChartQuery>(PoolTvmChartDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'PoolTvmChart',
        'query'
      )
    },
    PoolWithdraws(
      variables: PoolWithdrawsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<PoolWithdrawsQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<PoolWithdrawsQuery>(PoolWithdrawsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'PoolWithdraws',
        'query'
      )
    },
    Pools(
      variables?: PoolsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<PoolsQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<PoolsQuery>(PoolsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'Pools',
        'query'
      )
    },
    Tokens(
      variables: TokensQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<TokensQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<TokensQuery>(TokensDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'Tokens',
        'query'
      )
    },
    TokensPool(
      variables: TokensPoolQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<TokensPoolQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<TokensPoolQuery>(TokensPoolDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'TokensPool',
        'query'
      )
    },
    userPoolData(
      variables: UserPoolDataQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<UserPoolDataQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<UserPoolDataQuery>(UserPoolDataDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'userPoolData',
        'query'
      )
    }
  }
}
export type Sdk = ReturnType<typeof getSdk>
