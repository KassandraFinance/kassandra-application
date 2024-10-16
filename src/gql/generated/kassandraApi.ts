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
  BigDecimal: { input: string; output: string }
  BigInt: { input: string; output: string }
  Bytes: { input: string; output: string }
  Int8: { input: any; output: any }
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
  and?: InputMaybe<Array<InputMaybe<Activity_Filter>>>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  or?: InputMaybe<Array<InputMaybe<Activity_Filter>>>
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
  | 'pool__address'
  | 'pool__chain_id'
  | 'pool__change'
  | 'pool__controller'
  | 'pool__created_at'
  | 'pool__decimals'
  | 'pool__deposits_broker_btc'
  | 'pool__deposits_broker_usd'
  | 'pool__deposits_btc'
  | 'pool__deposits_usd'
  | 'pool__factory'
  | 'pool__featured'
  | 'pool__fee_aum'
  | 'pool__fee_aum_kassandra'
  | 'pool__fee_exit'
  | 'pool__fee_join_broker'
  | 'pool__fee_join_manager'
  | 'pool__fee_swap'
  | 'pool__founded_by'
  | 'pool__id'
  | 'pool__is_private_pool'
  | 'pool__last_harvest'
  | 'pool__logo'
  | 'pool__name'
  | 'pool__num_activities'
  | 'pool__num_brokers'
  | 'pool__num_deposits'
  | 'pool__num_deposits_broker'
  | 'pool__num_exit'
  | 'pool__num_join'
  | 'pool__num_swap'
  | 'pool__num_token_add'
  | 'pool__num_token_remove'
  | 'pool__num_tx'
  | 'pool__num_weight_goals'
  | 'pool__pool_id'
  | 'pool__pool_version'
  | 'pool__price_btc'
  | 'pool__price_usd'
  | 'pool__short_summary'
  | 'pool__strategy'
  | 'pool__summary'
  | 'pool__supply'
  | 'pool__symbol'
  | 'pool__total_fees_aum_kassandra'
  | 'pool__total_fees_aum_kassandra_btc'
  | 'pool__total_fees_aum_kassandra_usd'
  | 'pool__total_fees_aum_manager'
  | 'pool__total_fees_aum_manager_btc'
  | 'pool__total_fees_aum_manager_usd'
  | 'pool__total_fees_exit'
  | 'pool__total_fees_exit_btc'
  | 'pool__total_fees_exit_usd'
  | 'pool__total_fees_join_broker'
  | 'pool__total_fees_join_broker_btc'
  | 'pool__total_fees_join_broker_usd'
  | 'pool__total_fees_join_manager'
  | 'pool__total_fees_join_manager_btc'
  | 'pool__total_fees_join_manager_usd'
  | 'pool__total_fees_swap_btc'
  | 'pool__total_fees_swap_usd'
  | 'pool__total_value_locked_btc'
  | 'pool__total_value_locked_usd'
  | 'pool__total_volume_btc'
  | 'pool__total_volume_usd'
  | 'pool__unique_investors'
  | 'pool__unique_investors_broker'
  | 'pool__url'
  | 'pool__vault'
  | 'pool__vault_id'
  | 'pool__whitelist'
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
  and?: InputMaybe<Array<InputMaybe<Asset_Filter>>>
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
  or?: InputMaybe<Array<InputMaybe<Asset_Filter>>>
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
  | 'pool__address'
  | 'pool__chain_id'
  | 'pool__change'
  | 'pool__controller'
  | 'pool__created_at'
  | 'pool__decimals'
  | 'pool__deposits_broker_btc'
  | 'pool__deposits_broker_usd'
  | 'pool__deposits_btc'
  | 'pool__deposits_usd'
  | 'pool__factory'
  | 'pool__featured'
  | 'pool__fee_aum'
  | 'pool__fee_aum_kassandra'
  | 'pool__fee_exit'
  | 'pool__fee_join_broker'
  | 'pool__fee_join_manager'
  | 'pool__fee_swap'
  | 'pool__founded_by'
  | 'pool__id'
  | 'pool__is_private_pool'
  | 'pool__last_harvest'
  | 'pool__logo'
  | 'pool__name'
  | 'pool__num_activities'
  | 'pool__num_brokers'
  | 'pool__num_deposits'
  | 'pool__num_deposits_broker'
  | 'pool__num_exit'
  | 'pool__num_join'
  | 'pool__num_swap'
  | 'pool__num_token_add'
  | 'pool__num_token_remove'
  | 'pool__num_tx'
  | 'pool__num_weight_goals'
  | 'pool__pool_id'
  | 'pool__pool_version'
  | 'pool__price_btc'
  | 'pool__price_usd'
  | 'pool__short_summary'
  | 'pool__strategy'
  | 'pool__summary'
  | 'pool__supply'
  | 'pool__symbol'
  | 'pool__total_fees_aum_kassandra'
  | 'pool__total_fees_aum_kassandra_btc'
  | 'pool__total_fees_aum_kassandra_usd'
  | 'pool__total_fees_aum_manager'
  | 'pool__total_fees_aum_manager_btc'
  | 'pool__total_fees_aum_manager_usd'
  | 'pool__total_fees_exit'
  | 'pool__total_fees_exit_btc'
  | 'pool__total_fees_exit_usd'
  | 'pool__total_fees_join_broker'
  | 'pool__total_fees_join_broker_btc'
  | 'pool__total_fees_join_broker_usd'
  | 'pool__total_fees_join_manager'
  | 'pool__total_fees_join_manager_btc'
  | 'pool__total_fees_join_manager_usd'
  | 'pool__total_fees_swap_btc'
  | 'pool__total_fees_swap_usd'
  | 'pool__total_value_locked_btc'
  | 'pool__total_value_locked_usd'
  | 'pool__total_volume_btc'
  | 'pool__total_volume_usd'
  | 'pool__unique_investors'
  | 'pool__unique_investors_broker'
  | 'pool__url'
  | 'pool__vault'
  | 'pool__vault_id'
  | 'pool__whitelist'
  | 'token'
  | 'token__coingecko_id'
  | 'token__decimals'
  | 'token__id'
  | 'token__in_pool'
  | 'token__is_wrap_token'
  | 'token__logo'
  | 'token__name'
  | 'token__symbol'
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
  and?: InputMaybe<Array<InputMaybe<Balance_Filter>>>
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
  or?: InputMaybe<Array<InputMaybe<Balance_Filter>>>
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

export type Balance_OrderBy =
  | 'asset'
  | 'asset__balance'
  | 'asset__id'
  | 'asset__weight'
  | 'asset__weight_goal'
  | 'asset__weight_goal_normalized'
  | 'asset__weight_normalized'
  | 'id'
  | 'timestamp'
  | 'value'

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
  and?: InputMaybe<Array<InputMaybe<Broker_Filter>>>
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
  or?: InputMaybe<Array<InputMaybe<Broker_Filter>>>
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
  | 'pool__address'
  | 'pool__chain_id'
  | 'pool__change'
  | 'pool__controller'
  | 'pool__created_at'
  | 'pool__decimals'
  | 'pool__deposits_broker_btc'
  | 'pool__deposits_broker_usd'
  | 'pool__deposits_btc'
  | 'pool__deposits_usd'
  | 'pool__factory'
  | 'pool__featured'
  | 'pool__fee_aum'
  | 'pool__fee_aum_kassandra'
  | 'pool__fee_exit'
  | 'pool__fee_join_broker'
  | 'pool__fee_join_manager'
  | 'pool__fee_swap'
  | 'pool__founded_by'
  | 'pool__id'
  | 'pool__is_private_pool'
  | 'pool__last_harvest'
  | 'pool__logo'
  | 'pool__name'
  | 'pool__num_activities'
  | 'pool__num_brokers'
  | 'pool__num_deposits'
  | 'pool__num_deposits_broker'
  | 'pool__num_exit'
  | 'pool__num_join'
  | 'pool__num_swap'
  | 'pool__num_token_add'
  | 'pool__num_token_remove'
  | 'pool__num_tx'
  | 'pool__num_weight_goals'
  | 'pool__pool_id'
  | 'pool__pool_version'
  | 'pool__price_btc'
  | 'pool__price_usd'
  | 'pool__short_summary'
  | 'pool__strategy'
  | 'pool__summary'
  | 'pool__supply'
  | 'pool__symbol'
  | 'pool__total_fees_aum_kassandra'
  | 'pool__total_fees_aum_kassandra_btc'
  | 'pool__total_fees_aum_kassandra_usd'
  | 'pool__total_fees_aum_manager'
  | 'pool__total_fees_aum_manager_btc'
  | 'pool__total_fees_aum_manager_usd'
  | 'pool__total_fees_exit'
  | 'pool__total_fees_exit_btc'
  | 'pool__total_fees_exit_usd'
  | 'pool__total_fees_join_broker'
  | 'pool__total_fees_join_broker_btc'
  | 'pool__total_fees_join_broker_usd'
  | 'pool__total_fees_join_manager'
  | 'pool__total_fees_join_manager_btc'
  | 'pool__total_fees_join_manager_usd'
  | 'pool__total_fees_swap_btc'
  | 'pool__total_fees_swap_usd'
  | 'pool__total_value_locked_btc'
  | 'pool__total_value_locked_usd'
  | 'pool__total_volume_btc'
  | 'pool__total_volume_usd'
  | 'pool__unique_investors'
  | 'pool__unique_investors_broker'
  | 'pool__url'
  | 'pool__vault'
  | 'pool__vault_id'
  | 'pool__whitelist'
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
  and?: InputMaybe<Array<InputMaybe<Candle_Filter>>>
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
  or?: InputMaybe<Array<InputMaybe<Candle_Filter>>>
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
  | 'pool__address'
  | 'pool__chain_id'
  | 'pool__change'
  | 'pool__controller'
  | 'pool__created_at'
  | 'pool__decimals'
  | 'pool__deposits_broker_btc'
  | 'pool__deposits_broker_usd'
  | 'pool__deposits_btc'
  | 'pool__deposits_usd'
  | 'pool__factory'
  | 'pool__featured'
  | 'pool__fee_aum'
  | 'pool__fee_aum_kassandra'
  | 'pool__fee_exit'
  | 'pool__fee_join_broker'
  | 'pool__fee_join_manager'
  | 'pool__fee_swap'
  | 'pool__founded_by'
  | 'pool__id'
  | 'pool__is_private_pool'
  | 'pool__last_harvest'
  | 'pool__logo'
  | 'pool__name'
  | 'pool__num_activities'
  | 'pool__num_brokers'
  | 'pool__num_deposits'
  | 'pool__num_deposits_broker'
  | 'pool__num_exit'
  | 'pool__num_join'
  | 'pool__num_swap'
  | 'pool__num_token_add'
  | 'pool__num_token_remove'
  | 'pool__num_tx'
  | 'pool__num_weight_goals'
  | 'pool__pool_id'
  | 'pool__pool_version'
  | 'pool__price_btc'
  | 'pool__price_usd'
  | 'pool__short_summary'
  | 'pool__strategy'
  | 'pool__summary'
  | 'pool__supply'
  | 'pool__symbol'
  | 'pool__total_fees_aum_kassandra'
  | 'pool__total_fees_aum_kassandra_btc'
  | 'pool__total_fees_aum_kassandra_usd'
  | 'pool__total_fees_aum_manager'
  | 'pool__total_fees_aum_manager_btc'
  | 'pool__total_fees_aum_manager_usd'
  | 'pool__total_fees_exit'
  | 'pool__total_fees_exit_btc'
  | 'pool__total_fees_exit_usd'
  | 'pool__total_fees_join_broker'
  | 'pool__total_fees_join_broker_btc'
  | 'pool__total_fees_join_broker_usd'
  | 'pool__total_fees_join_manager'
  | 'pool__total_fees_join_manager_btc'
  | 'pool__total_fees_join_manager_usd'
  | 'pool__total_fees_swap_btc'
  | 'pool__total_fees_swap_usd'
  | 'pool__total_value_locked_btc'
  | 'pool__total_value_locked_usd'
  | 'pool__total_volume_btc'
  | 'pool__total_volume_usd'
  | 'pool__unique_investors'
  | 'pool__unique_investors_broker'
  | 'pool__url'
  | 'pool__vault'
  | 'pool__vault_id'
  | 'pool__whitelist'
  | 'timestamp'

/**
 * Data about the chain
 *
 */
export type Chain = {
  __typename?: 'Chain'
  address_wrapped?: Maybe<Scalars['String']['output']>
  block_explorer_url: Scalars['String']['output']
  icon?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  pool_count: Scalars['Int']['output']
  rpc_urls: Array<Scalars['String']['output']>
  seconds_per_block: Scalars['Int']['output']
  token_decimals: Scalars['Int']['output']
  token_name: Scalars['String']['output']
  token_symbol: Scalars['String']['output']
}

export type Chain_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  address_wrapped?: InputMaybe<Scalars['String']['input']>
  address_wrapped_contains?: InputMaybe<Scalars['String']['input']>
  address_wrapped_contains_nocase?: InputMaybe<Scalars['String']['input']>
  address_wrapped_ends_with?: InputMaybe<Scalars['String']['input']>
  address_wrapped_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  address_wrapped_gt?: InputMaybe<Scalars['String']['input']>
  address_wrapped_gte?: InputMaybe<Scalars['String']['input']>
  address_wrapped_in?: InputMaybe<Array<Scalars['String']['input']>>
  address_wrapped_lt?: InputMaybe<Scalars['String']['input']>
  address_wrapped_lte?: InputMaybe<Scalars['String']['input']>
  address_wrapped_not?: InputMaybe<Scalars['String']['input']>
  address_wrapped_not_contains?: InputMaybe<Scalars['String']['input']>
  address_wrapped_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  address_wrapped_not_ends_with?: InputMaybe<Scalars['String']['input']>
  address_wrapped_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  address_wrapped_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  address_wrapped_not_starts_with?: InputMaybe<Scalars['String']['input']>
  address_wrapped_not_starts_with_nocase?: InputMaybe<
    Scalars['String']['input']
  >
  address_wrapped_starts_with?: InputMaybe<Scalars['String']['input']>
  address_wrapped_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  and?: InputMaybe<Array<InputMaybe<Chain_Filter>>>
  block_explorer_url?: InputMaybe<Scalars['String']['input']>
  block_explorer_url_contains?: InputMaybe<Scalars['String']['input']>
  block_explorer_url_contains_nocase?: InputMaybe<Scalars['String']['input']>
  block_explorer_url_ends_with?: InputMaybe<Scalars['String']['input']>
  block_explorer_url_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  block_explorer_url_gt?: InputMaybe<Scalars['String']['input']>
  block_explorer_url_gte?: InputMaybe<Scalars['String']['input']>
  block_explorer_url_in?: InputMaybe<Array<Scalars['String']['input']>>
  block_explorer_url_lt?: InputMaybe<Scalars['String']['input']>
  block_explorer_url_lte?: InputMaybe<Scalars['String']['input']>
  block_explorer_url_not?: InputMaybe<Scalars['String']['input']>
  block_explorer_url_not_contains?: InputMaybe<Scalars['String']['input']>
  block_explorer_url_not_contains_nocase?: InputMaybe<
    Scalars['String']['input']
  >
  block_explorer_url_not_ends_with?: InputMaybe<Scalars['String']['input']>
  block_explorer_url_not_ends_with_nocase?: InputMaybe<
    Scalars['String']['input']
  >
  block_explorer_url_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  block_explorer_url_not_starts_with?: InputMaybe<Scalars['String']['input']>
  block_explorer_url_not_starts_with_nocase?: InputMaybe<
    Scalars['String']['input']
  >
  block_explorer_url_starts_with?: InputMaybe<Scalars['String']['input']>
  block_explorer_url_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  icon?: InputMaybe<Scalars['String']['input']>
  icon_contains?: InputMaybe<Scalars['String']['input']>
  icon_contains_nocase?: InputMaybe<Scalars['String']['input']>
  icon_ends_with?: InputMaybe<Scalars['String']['input']>
  icon_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  icon_gt?: InputMaybe<Scalars['String']['input']>
  icon_gte?: InputMaybe<Scalars['String']['input']>
  icon_in?: InputMaybe<Array<Scalars['String']['input']>>
  icon_lt?: InputMaybe<Scalars['String']['input']>
  icon_lte?: InputMaybe<Scalars['String']['input']>
  icon_not?: InputMaybe<Scalars['String']['input']>
  icon_not_contains?: InputMaybe<Scalars['String']['input']>
  icon_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  icon_not_ends_with?: InputMaybe<Scalars['String']['input']>
  icon_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  icon_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  icon_not_starts_with?: InputMaybe<Scalars['String']['input']>
  icon_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  icon_starts_with?: InputMaybe<Scalars['String']['input']>
  icon_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
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
  or?: InputMaybe<Array<InputMaybe<Chain_Filter>>>
  pool_count?: InputMaybe<Scalars['Int']['input']>
  pool_count_gt?: InputMaybe<Scalars['Int']['input']>
  pool_count_gte?: InputMaybe<Scalars['Int']['input']>
  pool_count_in?: InputMaybe<Array<Scalars['Int']['input']>>
  pool_count_lt?: InputMaybe<Scalars['Int']['input']>
  pool_count_lte?: InputMaybe<Scalars['Int']['input']>
  pool_count_not?: InputMaybe<Scalars['Int']['input']>
  pool_count_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  rpc_urls?: InputMaybe<Array<Scalars['String']['input']>>
  rpc_urls_contains?: InputMaybe<Array<Scalars['String']['input']>>
  rpc_urls_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>
  rpc_urls_not?: InputMaybe<Array<Scalars['String']['input']>>
  rpc_urls_not_contains?: InputMaybe<Array<Scalars['String']['input']>>
  rpc_urls_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>
  seconds_per_block?: InputMaybe<Scalars['Int']['input']>
  seconds_per_block_gt?: InputMaybe<Scalars['Int']['input']>
  seconds_per_block_gte?: InputMaybe<Scalars['Int']['input']>
  seconds_per_block_in?: InputMaybe<Array<Scalars['Int']['input']>>
  seconds_per_block_lt?: InputMaybe<Scalars['Int']['input']>
  seconds_per_block_lte?: InputMaybe<Scalars['Int']['input']>
  seconds_per_block_not?: InputMaybe<Scalars['Int']['input']>
  seconds_per_block_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  token_decimals?: InputMaybe<Scalars['Int']['input']>
  token_decimals_gt?: InputMaybe<Scalars['Int']['input']>
  token_decimals_gte?: InputMaybe<Scalars['Int']['input']>
  token_decimals_in?: InputMaybe<Array<Scalars['Int']['input']>>
  token_decimals_lt?: InputMaybe<Scalars['Int']['input']>
  token_decimals_lte?: InputMaybe<Scalars['Int']['input']>
  token_decimals_not?: InputMaybe<Scalars['Int']['input']>
  token_decimals_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  token_name?: InputMaybe<Scalars['String']['input']>
  token_name_contains?: InputMaybe<Scalars['String']['input']>
  token_name_contains_nocase?: InputMaybe<Scalars['String']['input']>
  token_name_ends_with?: InputMaybe<Scalars['String']['input']>
  token_name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  token_name_gt?: InputMaybe<Scalars['String']['input']>
  token_name_gte?: InputMaybe<Scalars['String']['input']>
  token_name_in?: InputMaybe<Array<Scalars['String']['input']>>
  token_name_lt?: InputMaybe<Scalars['String']['input']>
  token_name_lte?: InputMaybe<Scalars['String']['input']>
  token_name_not?: InputMaybe<Scalars['String']['input']>
  token_name_not_contains?: InputMaybe<Scalars['String']['input']>
  token_name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  token_name_not_ends_with?: InputMaybe<Scalars['String']['input']>
  token_name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  token_name_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  token_name_not_starts_with?: InputMaybe<Scalars['String']['input']>
  token_name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  token_name_starts_with?: InputMaybe<Scalars['String']['input']>
  token_name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  token_symbol?: InputMaybe<Scalars['String']['input']>
  token_symbol_contains?: InputMaybe<Scalars['String']['input']>
  token_symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>
  token_symbol_ends_with?: InputMaybe<Scalars['String']['input']>
  token_symbol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  token_symbol_gt?: InputMaybe<Scalars['String']['input']>
  token_symbol_gte?: InputMaybe<Scalars['String']['input']>
  token_symbol_in?: InputMaybe<Array<Scalars['String']['input']>>
  token_symbol_lt?: InputMaybe<Scalars['String']['input']>
  token_symbol_lte?: InputMaybe<Scalars['String']['input']>
  token_symbol_not?: InputMaybe<Scalars['String']['input']>
  token_symbol_not_contains?: InputMaybe<Scalars['String']['input']>
  token_symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  token_symbol_not_ends_with?: InputMaybe<Scalars['String']['input']>
  token_symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  token_symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  token_symbol_not_starts_with?: InputMaybe<Scalars['String']['input']>
  token_symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  token_symbol_starts_with?: InputMaybe<Scalars['String']['input']>
  token_symbol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
}

export type Chain_OrderBy =
  | 'address_wrapped'
  | 'block_explorer_url'
  | 'icon'
  | 'id'
  | 'name'
  | 'pool_count'
  | 'rpc_urls'
  | 'seconds_per_block'
  | 'token_decimals'
  | 'token_name'
  | 'token_symbol'

/**
 * If someone delegates their votes to someone else, this links both sides
 *
 */
export type Delegation = {
  __typename?: 'Delegation'
  from: User
  /**
   * wallet address + pool ID
   *
   */
  id: Scalars['ID']['output']
  pool: Scalars['BigInt']['output']
  to: User
  votingPower: Scalars['BigDecimal']['output']
}

export type Delegation_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<Delegation_Filter>>>
  from?: InputMaybe<Scalars['String']['input']>
  from_?: InputMaybe<User_Filter>
  from_contains?: InputMaybe<Scalars['String']['input']>
  from_contains_nocase?: InputMaybe<Scalars['String']['input']>
  from_ends_with?: InputMaybe<Scalars['String']['input']>
  from_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  from_gt?: InputMaybe<Scalars['String']['input']>
  from_gte?: InputMaybe<Scalars['String']['input']>
  from_in?: InputMaybe<Array<Scalars['String']['input']>>
  from_lt?: InputMaybe<Scalars['String']['input']>
  from_lte?: InputMaybe<Scalars['String']['input']>
  from_not?: InputMaybe<Scalars['String']['input']>
  from_not_contains?: InputMaybe<Scalars['String']['input']>
  from_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  from_not_ends_with?: InputMaybe<Scalars['String']['input']>
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  from_not_starts_with?: InputMaybe<Scalars['String']['input']>
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  from_starts_with?: InputMaybe<Scalars['String']['input']>
  from_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  or?: InputMaybe<Array<InputMaybe<Delegation_Filter>>>
  pool?: InputMaybe<Scalars['BigInt']['input']>
  pool_gt?: InputMaybe<Scalars['BigInt']['input']>
  pool_gte?: InputMaybe<Scalars['BigInt']['input']>
  pool_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  pool_lt?: InputMaybe<Scalars['BigInt']['input']>
  pool_lte?: InputMaybe<Scalars['BigInt']['input']>
  pool_not?: InputMaybe<Scalars['BigInt']['input']>
  pool_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  to?: InputMaybe<Scalars['String']['input']>
  to_?: InputMaybe<User_Filter>
  to_contains?: InputMaybe<Scalars['String']['input']>
  to_contains_nocase?: InputMaybe<Scalars['String']['input']>
  to_ends_with?: InputMaybe<Scalars['String']['input']>
  to_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  to_gt?: InputMaybe<Scalars['String']['input']>
  to_gte?: InputMaybe<Scalars['String']['input']>
  to_in?: InputMaybe<Array<Scalars['String']['input']>>
  to_lt?: InputMaybe<Scalars['String']['input']>
  to_lte?: InputMaybe<Scalars['String']['input']>
  to_not?: InputMaybe<Scalars['String']['input']>
  to_not_contains?: InputMaybe<Scalars['String']['input']>
  to_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  to_starts_with?: InputMaybe<Scalars['String']['input']>
  to_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  votingPower?: InputMaybe<Scalars['BigDecimal']['input']>
  votingPower_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  votingPower_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  votingPower_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  votingPower_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  votingPower_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  votingPower_not?: InputMaybe<Scalars['BigDecimal']['input']>
  votingPower_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
}

export type Delegation_OrderBy =
  | 'from'
  | 'from__created_at'
  | 'from__description'
  | 'from__discord'
  | 'from__id'
  | 'from__image'
  | 'from__is_nft'
  | 'from__nft_chain'
  | 'from__nft_collection_name'
  | 'from__nft_contract_type'
  | 'from__nft_description'
  | 'from__nft_name'
  | 'from__nft_symbol'
  | 'from__nft_token_address'
  | 'from__nft_token_num'
  | 'from__nickname'
  | 'from__telegram'
  | 'from__twitter'
  | 'from__updated_at'
  | 'from__votingPower'
  | 'from__website'
  | 'id'
  | 'pool'
  | 'to'
  | 'to__created_at'
  | 'to__description'
  | 'to__discord'
  | 'to__id'
  | 'to__image'
  | 'to__is_nft'
  | 'to__nft_chain'
  | 'to__nft_collection_name'
  | 'to__nft_contract_type'
  | 'to__nft_description'
  | 'to__nft_name'
  | 'to__nft_symbol'
  | 'to__nft_token_address'
  | 'to__nft_token_num'
  | 'to__nickname'
  | 'to__telegram'
  | 'to__twitter'
  | 'to__updated_at'
  | 'to__votingPower'
  | 'to__website'
  | 'votingPower'

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
  and?: InputMaybe<Array<InputMaybe<Fee_Filter>>>
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
  or?: InputMaybe<Array<InputMaybe<Fee_Filter>>>
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
  | 'kassandra__deposits_btc'
  | 'kassandra__deposits_usd'
  | 'kassandra__fee_aum_kassandra'
  | 'kassandra__id'
  | 'kassandra__num_deposits'
  | 'kassandra__num_managers'
  | 'kassandra__num_tx'
  | 'kassandra__pool_count'
  | 'kassandra__pool_featured_count'
  | 'kassandra__total_fees_aum_kassandra_btc'
  | 'kassandra__total_fees_aum_kassandra_usd'
  | 'kassandra__total_fees_aum_manager_btc'
  | 'kassandra__total_fees_aum_manager_usd'
  | 'kassandra__total_fees_exit_btc'
  | 'kassandra__total_fees_exit_usd'
  | 'kassandra__total_fees_join_broker_btc'
  | 'kassandra__total_fees_join_broker_usd'
  | 'kassandra__total_fees_join_manager_btc'
  | 'kassandra__total_fees_join_manager_usd'
  | 'kassandra__total_fees_swap_btc'
  | 'kassandra__total_fees_swap_usd'
  | 'kassandra__total_value_locked_btc'
  | 'kassandra__total_value_locked_usd'
  | 'kassandra__total_volume_btc'
  | 'kassandra__total_volume_usd'
  | 'period'
  | 'pool'
  | 'pool__address'
  | 'pool__chain_id'
  | 'pool__change'
  | 'pool__controller'
  | 'pool__created_at'
  | 'pool__decimals'
  | 'pool__deposits_broker_btc'
  | 'pool__deposits_broker_usd'
  | 'pool__deposits_btc'
  | 'pool__deposits_usd'
  | 'pool__factory'
  | 'pool__featured'
  | 'pool__fee_aum'
  | 'pool__fee_aum_kassandra'
  | 'pool__fee_exit'
  | 'pool__fee_join_broker'
  | 'pool__fee_join_manager'
  | 'pool__fee_swap'
  | 'pool__founded_by'
  | 'pool__id'
  | 'pool__is_private_pool'
  | 'pool__last_harvest'
  | 'pool__logo'
  | 'pool__name'
  | 'pool__num_activities'
  | 'pool__num_brokers'
  | 'pool__num_deposits'
  | 'pool__num_deposits_broker'
  | 'pool__num_exit'
  | 'pool__num_join'
  | 'pool__num_swap'
  | 'pool__num_token_add'
  | 'pool__num_token_remove'
  | 'pool__num_tx'
  | 'pool__num_weight_goals'
  | 'pool__pool_id'
  | 'pool__pool_version'
  | 'pool__price_btc'
  | 'pool__price_usd'
  | 'pool__short_summary'
  | 'pool__strategy'
  | 'pool__summary'
  | 'pool__supply'
  | 'pool__symbol'
  | 'pool__total_fees_aum_kassandra'
  | 'pool__total_fees_aum_kassandra_btc'
  | 'pool__total_fees_aum_kassandra_usd'
  | 'pool__total_fees_aum_manager'
  | 'pool__total_fees_aum_manager_btc'
  | 'pool__total_fees_aum_manager_usd'
  | 'pool__total_fees_exit'
  | 'pool__total_fees_exit_btc'
  | 'pool__total_fees_exit_usd'
  | 'pool__total_fees_join_broker'
  | 'pool__total_fees_join_broker_btc'
  | 'pool__total_fees_join_broker_usd'
  | 'pool__total_fees_join_manager'
  | 'pool__total_fees_join_manager_btc'
  | 'pool__total_fees_join_manager_usd'
  | 'pool__total_fees_swap_btc'
  | 'pool__total_fees_swap_usd'
  | 'pool__total_value_locked_btc'
  | 'pool__total_value_locked_usd'
  | 'pool__total_volume_btc'
  | 'pool__total_volume_usd'
  | 'pool__unique_investors'
  | 'pool__unique_investors_broker'
  | 'pool__url'
  | 'pool__vault'
  | 'pool__vault_id'
  | 'pool__whitelist'
  | 'timestamp'
  | 'type'
  | 'volume_broker_btc'
  | 'volume_broker_usd'
  | 'volume_btc'
  | 'volume_usd'

/**
 * The governance contract that contains all the proposals and votes
 *
 */
export type Governance = {
  __typename?: 'Governance'
  /**
   * governance contract address
   *
   */
  id: Scalars['ID']['output']
  internal_delegatee_address?: Maybe<Scalars['String']['output']>
  internal_delegation_amount?: Maybe<Scalars['BigDecimal']['output']>
  internal_delegation_tx_id?: Maybe<Scalars['Bytes']['output']>
  proposals: Array<Proposal>
  stakingPools: Scalars['Int']['output']
  totalVotingPower: Scalars['BigDecimal']['output']
  votingAddresses: Scalars['Int']['output']
}

/**
 * The governance contract that contains all the proposals and votes
 *
 */
export type GovernanceProposalsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Proposal_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<Proposal_Filter>
}

export type Governance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<Governance_Filter>>>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  internal_delegatee_address?: InputMaybe<Scalars['String']['input']>
  internal_delegatee_address_contains?: InputMaybe<Scalars['String']['input']>
  internal_delegatee_address_contains_nocase?: InputMaybe<
    Scalars['String']['input']
  >
  internal_delegatee_address_ends_with?: InputMaybe<Scalars['String']['input']>
  internal_delegatee_address_ends_with_nocase?: InputMaybe<
    Scalars['String']['input']
  >
  internal_delegatee_address_gt?: InputMaybe<Scalars['String']['input']>
  internal_delegatee_address_gte?: InputMaybe<Scalars['String']['input']>
  internal_delegatee_address_in?: InputMaybe<Array<Scalars['String']['input']>>
  internal_delegatee_address_lt?: InputMaybe<Scalars['String']['input']>
  internal_delegatee_address_lte?: InputMaybe<Scalars['String']['input']>
  internal_delegatee_address_not?: InputMaybe<Scalars['String']['input']>
  internal_delegatee_address_not_contains?: InputMaybe<
    Scalars['String']['input']
  >
  internal_delegatee_address_not_contains_nocase?: InputMaybe<
    Scalars['String']['input']
  >
  internal_delegatee_address_not_ends_with?: InputMaybe<
    Scalars['String']['input']
  >
  internal_delegatee_address_not_ends_with_nocase?: InputMaybe<
    Scalars['String']['input']
  >
  internal_delegatee_address_not_in?: InputMaybe<
    Array<Scalars['String']['input']>
  >
  internal_delegatee_address_not_starts_with?: InputMaybe<
    Scalars['String']['input']
  >
  internal_delegatee_address_not_starts_with_nocase?: InputMaybe<
    Scalars['String']['input']
  >
  internal_delegatee_address_starts_with?: InputMaybe<
    Scalars['String']['input']
  >
  internal_delegatee_address_starts_with_nocase?: InputMaybe<
    Scalars['String']['input']
  >
  internal_delegation_amount?: InputMaybe<Scalars['BigDecimal']['input']>
  internal_delegation_amount_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  internal_delegation_amount_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  internal_delegation_amount_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  internal_delegation_amount_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  internal_delegation_amount_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  internal_delegation_amount_not?: InputMaybe<Scalars['BigDecimal']['input']>
  internal_delegation_amount_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']['input']>
  >
  internal_delegation_tx_id?: InputMaybe<Scalars['Bytes']['input']>
  internal_delegation_tx_id_contains?: InputMaybe<Scalars['Bytes']['input']>
  internal_delegation_tx_id_gt?: InputMaybe<Scalars['Bytes']['input']>
  internal_delegation_tx_id_gte?: InputMaybe<Scalars['Bytes']['input']>
  internal_delegation_tx_id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>
  internal_delegation_tx_id_lt?: InputMaybe<Scalars['Bytes']['input']>
  internal_delegation_tx_id_lte?: InputMaybe<Scalars['Bytes']['input']>
  internal_delegation_tx_id_not?: InputMaybe<Scalars['Bytes']['input']>
  internal_delegation_tx_id_not_contains?: InputMaybe<Scalars['Bytes']['input']>
  internal_delegation_tx_id_not_in?: InputMaybe<
    Array<Scalars['Bytes']['input']>
  >
  or?: InputMaybe<Array<InputMaybe<Governance_Filter>>>
  proposals_?: InputMaybe<Proposal_Filter>
  stakingPools?: InputMaybe<Scalars['Int']['input']>
  stakingPools_gt?: InputMaybe<Scalars['Int']['input']>
  stakingPools_gte?: InputMaybe<Scalars['Int']['input']>
  stakingPools_in?: InputMaybe<Array<Scalars['Int']['input']>>
  stakingPools_lt?: InputMaybe<Scalars['Int']['input']>
  stakingPools_lte?: InputMaybe<Scalars['Int']['input']>
  stakingPools_not?: InputMaybe<Scalars['Int']['input']>
  stakingPools_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  totalVotingPower?: InputMaybe<Scalars['BigDecimal']['input']>
  totalVotingPower_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  totalVotingPower_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  totalVotingPower_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  totalVotingPower_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  totalVotingPower_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  totalVotingPower_not?: InputMaybe<Scalars['BigDecimal']['input']>
  totalVotingPower_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  votingAddresses?: InputMaybe<Scalars['Int']['input']>
  votingAddresses_gt?: InputMaybe<Scalars['Int']['input']>
  votingAddresses_gte?: InputMaybe<Scalars['Int']['input']>
  votingAddresses_in?: InputMaybe<Array<Scalars['Int']['input']>>
  votingAddresses_lt?: InputMaybe<Scalars['Int']['input']>
  votingAddresses_lte?: InputMaybe<Scalars['Int']['input']>
  votingAddresses_not?: InputMaybe<Scalars['Int']['input']>
  votingAddresses_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
}

export type Governance_OrderBy =
  | 'id'
  | 'internal_delegatee_address'
  | 'internal_delegation_amount'
  | 'internal_delegation_tx_id'
  | 'proposals'
  | 'stakingPools'
  | 'totalVotingPower'
  | 'votingAddresses'

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
  and?: InputMaybe<Array<InputMaybe<History_Filter>>>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  or?: InputMaybe<Array<InputMaybe<History_Filter>>>
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
  | 'activity__address'
  | 'activity__id'
  | 'activity__timestamp'
  | 'activity__txHash'
  | 'activity__type'
  | 'id'
  | 'pool'
  | 'pool__address'
  | 'pool__chain_id'
  | 'pool__change'
  | 'pool__controller'
  | 'pool__created_at'
  | 'pool__decimals'
  | 'pool__deposits_broker_btc'
  | 'pool__deposits_broker_usd'
  | 'pool__deposits_btc'
  | 'pool__deposits_usd'
  | 'pool__factory'
  | 'pool__featured'
  | 'pool__fee_aum'
  | 'pool__fee_aum_kassandra'
  | 'pool__fee_exit'
  | 'pool__fee_join_broker'
  | 'pool__fee_join_manager'
  | 'pool__fee_swap'
  | 'pool__founded_by'
  | 'pool__id'
  | 'pool__is_private_pool'
  | 'pool__last_harvest'
  | 'pool__logo'
  | 'pool__name'
  | 'pool__num_activities'
  | 'pool__num_brokers'
  | 'pool__num_deposits'
  | 'pool__num_deposits_broker'
  | 'pool__num_exit'
  | 'pool__num_join'
  | 'pool__num_swap'
  | 'pool__num_token_add'
  | 'pool__num_token_remove'
  | 'pool__num_tx'
  | 'pool__num_weight_goals'
  | 'pool__pool_id'
  | 'pool__pool_version'
  | 'pool__price_btc'
  | 'pool__price_usd'
  | 'pool__short_summary'
  | 'pool__strategy'
  | 'pool__summary'
  | 'pool__supply'
  | 'pool__symbol'
  | 'pool__total_fees_aum_kassandra'
  | 'pool__total_fees_aum_kassandra_btc'
  | 'pool__total_fees_aum_kassandra_usd'
  | 'pool__total_fees_aum_manager'
  | 'pool__total_fees_aum_manager_btc'
  | 'pool__total_fees_aum_manager_usd'
  | 'pool__total_fees_exit'
  | 'pool__total_fees_exit_btc'
  | 'pool__total_fees_exit_usd'
  | 'pool__total_fees_join_broker'
  | 'pool__total_fees_join_broker_btc'
  | 'pool__total_fees_join_broker_usd'
  | 'pool__total_fees_join_manager'
  | 'pool__total_fees_join_manager_btc'
  | 'pool__total_fees_join_manager_usd'
  | 'pool__total_fees_swap_btc'
  | 'pool__total_fees_swap_usd'
  | 'pool__total_value_locked_btc'
  | 'pool__total_value_locked_usd'
  | 'pool__total_volume_btc'
  | 'pool__total_volume_usd'
  | 'pool__unique_investors'
  | 'pool__unique_investors_broker'
  | 'pool__url'
  | 'pool__vault'
  | 'pool__vault_id'
  | 'pool__whitelist'
  | 'timestamp'
  | 'weight_goal'
  | 'weight_goal__end_timestamp'
  | 'weight_goal__id'
  | 'weight_goal__start_timestamp'
  | 'weight_goal__txHash'
  | 'weight_goal__type'

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
  and?: InputMaybe<Array<InputMaybe<Investor_Filter>>>
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
  or?: InputMaybe<Array<InputMaybe<Investor_Filter>>>
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
  | 'broker__deposits_btc'
  | 'broker__deposits_usd'
  | 'broker__fees'
  | 'broker__fees_btc'
  | 'broker__fees_usd'
  | 'broker__id'
  | 'broker__num_deposits'
  | 'broker__unique_investors'
  | 'broker__wallet'
  | 'first_deposit_timestamp'
  | 'id'
  | 'last_deposit_timestamp'
  | 'pool'
  | 'pool__address'
  | 'pool__chain_id'
  | 'pool__change'
  | 'pool__controller'
  | 'pool__created_at'
  | 'pool__decimals'
  | 'pool__deposits_broker_btc'
  | 'pool__deposits_broker_usd'
  | 'pool__deposits_btc'
  | 'pool__deposits_usd'
  | 'pool__factory'
  | 'pool__featured'
  | 'pool__fee_aum'
  | 'pool__fee_aum_kassandra'
  | 'pool__fee_exit'
  | 'pool__fee_join_broker'
  | 'pool__fee_join_manager'
  | 'pool__fee_swap'
  | 'pool__founded_by'
  | 'pool__id'
  | 'pool__is_private_pool'
  | 'pool__last_harvest'
  | 'pool__logo'
  | 'pool__name'
  | 'pool__num_activities'
  | 'pool__num_brokers'
  | 'pool__num_deposits'
  | 'pool__num_deposits_broker'
  | 'pool__num_exit'
  | 'pool__num_join'
  | 'pool__num_swap'
  | 'pool__num_token_add'
  | 'pool__num_token_remove'
  | 'pool__num_tx'
  | 'pool__num_weight_goals'
  | 'pool__pool_id'
  | 'pool__pool_version'
  | 'pool__price_btc'
  | 'pool__price_usd'
  | 'pool__short_summary'
  | 'pool__strategy'
  | 'pool__summary'
  | 'pool__supply'
  | 'pool__symbol'
  | 'pool__total_fees_aum_kassandra'
  | 'pool__total_fees_aum_kassandra_btc'
  | 'pool__total_fees_aum_kassandra_usd'
  | 'pool__total_fees_aum_manager'
  | 'pool__total_fees_aum_manager_btc'
  | 'pool__total_fees_aum_manager_usd'
  | 'pool__total_fees_exit'
  | 'pool__total_fees_exit_btc'
  | 'pool__total_fees_exit_usd'
  | 'pool__total_fees_join_broker'
  | 'pool__total_fees_join_broker_btc'
  | 'pool__total_fees_join_broker_usd'
  | 'pool__total_fees_join_manager'
  | 'pool__total_fees_join_manager_btc'
  | 'pool__total_fees_join_manager_usd'
  | 'pool__total_fees_swap_btc'
  | 'pool__total_fees_swap_usd'
  | 'pool__total_value_locked_btc'
  | 'pool__total_value_locked_usd'
  | 'pool__total_volume_btc'
  | 'pool__total_volume_usd'
  | 'pool__unique_investors'
  | 'pool__unique_investors_broker'
  | 'pool__url'
  | 'pool__vault'
  | 'pool__vault_id'
  | 'pool__whitelist'
  | 'wallet'

/**
 * General data about the whole Kassandra
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
  pool_featured_count: Scalars['Int']['output']
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
 * General data about the whole Kassandra
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
 * General data about the whole Kassandra
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
  and?: InputMaybe<Array<InputMaybe<Kassandra_Filter>>>
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
  or?: InputMaybe<Array<InputMaybe<Kassandra_Filter>>>
  pool_count?: InputMaybe<Scalars['Int']['input']>
  pool_count_gt?: InputMaybe<Scalars['Int']['input']>
  pool_count_gte?: InputMaybe<Scalars['Int']['input']>
  pool_count_in?: InputMaybe<Array<Scalars['Int']['input']>>
  pool_count_lt?: InputMaybe<Scalars['Int']['input']>
  pool_count_lte?: InputMaybe<Scalars['Int']['input']>
  pool_count_not?: InputMaybe<Scalars['Int']['input']>
  pool_count_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  pool_featured_count?: InputMaybe<Scalars['Int']['input']>
  pool_featured_count_gt?: InputMaybe<Scalars['Int']['input']>
  pool_featured_count_gte?: InputMaybe<Scalars['Int']['input']>
  pool_featured_count_in?: InputMaybe<Array<Scalars['Int']['input']>>
  pool_featured_count_lt?: InputMaybe<Scalars['Int']['input']>
  pool_featured_count_lte?: InputMaybe<Scalars['Int']['input']>
  pool_featured_count_not?: InputMaybe<Scalars['Int']['input']>
  pool_featured_count_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
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
  | 'pool_featured_count'
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
  created_at?: Maybe<Scalars['String']['output']>
  description?: Maybe<Scalars['String']['output']>
  discord?: Maybe<Scalars['String']['output']>
  /**
   * Wallet address
   *
   */
  id: Scalars['ID']['output']
  image?: Maybe<Scalars['String']['output']>
  is_nft?: Maybe<Scalars['Boolean']['output']>
  nft_chain?: Maybe<Scalars['String']['output']>
  nft_collection_name?: Maybe<Scalars['String']['output']>
  nft_contract_type?: Maybe<Scalars['String']['output']>
  nft_description?: Maybe<Scalars['String']['output']>
  nft_name?: Maybe<Scalars['String']['output']>
  nft_symbol?: Maybe<Scalars['String']['output']>
  nft_token_address?: Maybe<Scalars['String']['output']>
  nft_token_num?: Maybe<Scalars['String']['output']>
  nickname?: Maybe<Scalars['String']['output']>
  pool_count: Scalars['Int']['output']
  pools: Array<Pool>
  telegram?: Maybe<Scalars['String']['output']>
  total_value_locked: Array<TotalValueLocked>
  total_value_locked_btc: Scalars['BigDecimal']['output']
  total_value_locked_usd: Scalars['BigDecimal']['output']
  twitter?: Maybe<Scalars['String']['output']>
  unique_investors: Scalars['Int']['output']
  updated_at?: Maybe<Scalars['String']['output']>
  user?: Maybe<User>
  volumes: Array<Volume>
  website?: Maybe<Scalars['String']['output']>
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
  and?: InputMaybe<Array<InputMaybe<Manager_Filter>>>
  created_at?: InputMaybe<Scalars['String']['input']>
  created_at_contains?: InputMaybe<Scalars['String']['input']>
  created_at_contains_nocase?: InputMaybe<Scalars['String']['input']>
  created_at_ends_with?: InputMaybe<Scalars['String']['input']>
  created_at_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  created_at_gt?: InputMaybe<Scalars['String']['input']>
  created_at_gte?: InputMaybe<Scalars['String']['input']>
  created_at_in?: InputMaybe<Array<Scalars['String']['input']>>
  created_at_lt?: InputMaybe<Scalars['String']['input']>
  created_at_lte?: InputMaybe<Scalars['String']['input']>
  created_at_not?: InputMaybe<Scalars['String']['input']>
  created_at_not_contains?: InputMaybe<Scalars['String']['input']>
  created_at_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  created_at_not_ends_with?: InputMaybe<Scalars['String']['input']>
  created_at_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  created_at_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  created_at_not_starts_with?: InputMaybe<Scalars['String']['input']>
  created_at_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  created_at_starts_with?: InputMaybe<Scalars['String']['input']>
  created_at_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  description_contains?: InputMaybe<Scalars['String']['input']>
  description_contains_nocase?: InputMaybe<Scalars['String']['input']>
  description_ends_with?: InputMaybe<Scalars['String']['input']>
  description_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  description_gt?: InputMaybe<Scalars['String']['input']>
  description_gte?: InputMaybe<Scalars['String']['input']>
  description_in?: InputMaybe<Array<Scalars['String']['input']>>
  description_lt?: InputMaybe<Scalars['String']['input']>
  description_lte?: InputMaybe<Scalars['String']['input']>
  description_not?: InputMaybe<Scalars['String']['input']>
  description_not_contains?: InputMaybe<Scalars['String']['input']>
  description_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  description_not_ends_with?: InputMaybe<Scalars['String']['input']>
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  description_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  description_not_starts_with?: InputMaybe<Scalars['String']['input']>
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  description_starts_with?: InputMaybe<Scalars['String']['input']>
  description_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  discord?: InputMaybe<Scalars['String']['input']>
  discord_contains?: InputMaybe<Scalars['String']['input']>
  discord_contains_nocase?: InputMaybe<Scalars['String']['input']>
  discord_ends_with?: InputMaybe<Scalars['String']['input']>
  discord_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  discord_gt?: InputMaybe<Scalars['String']['input']>
  discord_gte?: InputMaybe<Scalars['String']['input']>
  discord_in?: InputMaybe<Array<Scalars['String']['input']>>
  discord_lt?: InputMaybe<Scalars['String']['input']>
  discord_lte?: InputMaybe<Scalars['String']['input']>
  discord_not?: InputMaybe<Scalars['String']['input']>
  discord_not_contains?: InputMaybe<Scalars['String']['input']>
  discord_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  discord_not_ends_with?: InputMaybe<Scalars['String']['input']>
  discord_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  discord_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  discord_not_starts_with?: InputMaybe<Scalars['String']['input']>
  discord_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  discord_starts_with?: InputMaybe<Scalars['String']['input']>
  discord_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  image?: InputMaybe<Scalars['String']['input']>
  image_contains?: InputMaybe<Scalars['String']['input']>
  image_contains_nocase?: InputMaybe<Scalars['String']['input']>
  image_ends_with?: InputMaybe<Scalars['String']['input']>
  image_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  image_gt?: InputMaybe<Scalars['String']['input']>
  image_gte?: InputMaybe<Scalars['String']['input']>
  image_in?: InputMaybe<Array<Scalars['String']['input']>>
  image_lt?: InputMaybe<Scalars['String']['input']>
  image_lte?: InputMaybe<Scalars['String']['input']>
  image_not?: InputMaybe<Scalars['String']['input']>
  image_not_contains?: InputMaybe<Scalars['String']['input']>
  image_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  image_not_ends_with?: InputMaybe<Scalars['String']['input']>
  image_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  image_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  image_not_starts_with?: InputMaybe<Scalars['String']['input']>
  image_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  image_starts_with?: InputMaybe<Scalars['String']['input']>
  image_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  is_nft?: InputMaybe<Scalars['Boolean']['input']>
  is_nft_in?: InputMaybe<Array<Scalars['Boolean']['input']>>
  is_nft_not?: InputMaybe<Scalars['Boolean']['input']>
  is_nft_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>
  nft_chain?: InputMaybe<Scalars['String']['input']>
  nft_chain_contains?: InputMaybe<Scalars['String']['input']>
  nft_chain_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nft_chain_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_chain_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_chain_gt?: InputMaybe<Scalars['String']['input']>
  nft_chain_gte?: InputMaybe<Scalars['String']['input']>
  nft_chain_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_chain_lt?: InputMaybe<Scalars['String']['input']>
  nft_chain_lte?: InputMaybe<Scalars['String']['input']>
  nft_chain_not?: InputMaybe<Scalars['String']['input']>
  nft_chain_not_contains?: InputMaybe<Scalars['String']['input']>
  nft_chain_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nft_chain_not_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_chain_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_chain_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_chain_not_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_chain_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_chain_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_chain_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_collection_name?: InputMaybe<Scalars['String']['input']>
  nft_collection_name_contains?: InputMaybe<Scalars['String']['input']>
  nft_collection_name_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nft_collection_name_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_collection_name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_collection_name_gt?: InputMaybe<Scalars['String']['input']>
  nft_collection_name_gte?: InputMaybe<Scalars['String']['input']>
  nft_collection_name_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_collection_name_lt?: InputMaybe<Scalars['String']['input']>
  nft_collection_name_lte?: InputMaybe<Scalars['String']['input']>
  nft_collection_name_not?: InputMaybe<Scalars['String']['input']>
  nft_collection_name_not_contains?: InputMaybe<Scalars['String']['input']>
  nft_collection_name_not_contains_nocase?: InputMaybe<
    Scalars['String']['input']
  >
  nft_collection_name_not_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_collection_name_not_ends_with_nocase?: InputMaybe<
    Scalars['String']['input']
  >
  nft_collection_name_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_collection_name_not_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_collection_name_not_starts_with_nocase?: InputMaybe<
    Scalars['String']['input']
  >
  nft_collection_name_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_collection_name_starts_with_nocase?: InputMaybe<
    Scalars['String']['input']
  >
  nft_contract_type?: InputMaybe<Scalars['String']['input']>
  nft_contract_type_contains?: InputMaybe<Scalars['String']['input']>
  nft_contract_type_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nft_contract_type_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_contract_type_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_contract_type_gt?: InputMaybe<Scalars['String']['input']>
  nft_contract_type_gte?: InputMaybe<Scalars['String']['input']>
  nft_contract_type_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_contract_type_lt?: InputMaybe<Scalars['String']['input']>
  nft_contract_type_lte?: InputMaybe<Scalars['String']['input']>
  nft_contract_type_not?: InputMaybe<Scalars['String']['input']>
  nft_contract_type_not_contains?: InputMaybe<Scalars['String']['input']>
  nft_contract_type_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nft_contract_type_not_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_contract_type_not_ends_with_nocase?: InputMaybe<
    Scalars['String']['input']
  >
  nft_contract_type_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_contract_type_not_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_contract_type_not_starts_with_nocase?: InputMaybe<
    Scalars['String']['input']
  >
  nft_contract_type_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_contract_type_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_description?: InputMaybe<Scalars['String']['input']>
  nft_description_contains?: InputMaybe<Scalars['String']['input']>
  nft_description_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nft_description_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_description_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_description_gt?: InputMaybe<Scalars['String']['input']>
  nft_description_gte?: InputMaybe<Scalars['String']['input']>
  nft_description_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_description_lt?: InputMaybe<Scalars['String']['input']>
  nft_description_lte?: InputMaybe<Scalars['String']['input']>
  nft_description_not?: InputMaybe<Scalars['String']['input']>
  nft_description_not_contains?: InputMaybe<Scalars['String']['input']>
  nft_description_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nft_description_not_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_description_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_description_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_description_not_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_description_not_starts_with_nocase?: InputMaybe<
    Scalars['String']['input']
  >
  nft_description_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_description_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_name?: InputMaybe<Scalars['String']['input']>
  nft_name_contains?: InputMaybe<Scalars['String']['input']>
  nft_name_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nft_name_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_name_gt?: InputMaybe<Scalars['String']['input']>
  nft_name_gte?: InputMaybe<Scalars['String']['input']>
  nft_name_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_name_lt?: InputMaybe<Scalars['String']['input']>
  nft_name_lte?: InputMaybe<Scalars['String']['input']>
  nft_name_not?: InputMaybe<Scalars['String']['input']>
  nft_name_not_contains?: InputMaybe<Scalars['String']['input']>
  nft_name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nft_name_not_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_name_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_name_not_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_name_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_symbol?: InputMaybe<Scalars['String']['input']>
  nft_symbol_contains?: InputMaybe<Scalars['String']['input']>
  nft_symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nft_symbol_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_symbol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_symbol_gt?: InputMaybe<Scalars['String']['input']>
  nft_symbol_gte?: InputMaybe<Scalars['String']['input']>
  nft_symbol_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_symbol_lt?: InputMaybe<Scalars['String']['input']>
  nft_symbol_lte?: InputMaybe<Scalars['String']['input']>
  nft_symbol_not?: InputMaybe<Scalars['String']['input']>
  nft_symbol_not_contains?: InputMaybe<Scalars['String']['input']>
  nft_symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nft_symbol_not_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_symbol_not_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_symbol_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_symbol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_token_address?: InputMaybe<Scalars['String']['input']>
  nft_token_address_contains?: InputMaybe<Scalars['String']['input']>
  nft_token_address_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nft_token_address_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_token_address_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_token_address_gt?: InputMaybe<Scalars['String']['input']>
  nft_token_address_gte?: InputMaybe<Scalars['String']['input']>
  nft_token_address_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_token_address_lt?: InputMaybe<Scalars['String']['input']>
  nft_token_address_lte?: InputMaybe<Scalars['String']['input']>
  nft_token_address_not?: InputMaybe<Scalars['String']['input']>
  nft_token_address_not_contains?: InputMaybe<Scalars['String']['input']>
  nft_token_address_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nft_token_address_not_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_token_address_not_ends_with_nocase?: InputMaybe<
    Scalars['String']['input']
  >
  nft_token_address_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_token_address_not_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_token_address_not_starts_with_nocase?: InputMaybe<
    Scalars['String']['input']
  >
  nft_token_address_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_token_address_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_token_num?: InputMaybe<Scalars['String']['input']>
  nft_token_num_contains?: InputMaybe<Scalars['String']['input']>
  nft_token_num_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nft_token_num_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_token_num_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_token_num_gt?: InputMaybe<Scalars['String']['input']>
  nft_token_num_gte?: InputMaybe<Scalars['String']['input']>
  nft_token_num_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_token_num_lt?: InputMaybe<Scalars['String']['input']>
  nft_token_num_lte?: InputMaybe<Scalars['String']['input']>
  nft_token_num_not?: InputMaybe<Scalars['String']['input']>
  nft_token_num_not_contains?: InputMaybe<Scalars['String']['input']>
  nft_token_num_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nft_token_num_not_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_token_num_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_token_num_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_token_num_not_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_token_num_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_token_num_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_token_num_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  nickname?: InputMaybe<Scalars['String']['input']>
  nickname_contains?: InputMaybe<Scalars['String']['input']>
  nickname_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nickname_ends_with?: InputMaybe<Scalars['String']['input']>
  nickname_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  nickname_gt?: InputMaybe<Scalars['String']['input']>
  nickname_gte?: InputMaybe<Scalars['String']['input']>
  nickname_in?: InputMaybe<Array<Scalars['String']['input']>>
  nickname_lt?: InputMaybe<Scalars['String']['input']>
  nickname_lte?: InputMaybe<Scalars['String']['input']>
  nickname_not?: InputMaybe<Scalars['String']['input']>
  nickname_not_contains?: InputMaybe<Scalars['String']['input']>
  nickname_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nickname_not_ends_with?: InputMaybe<Scalars['String']['input']>
  nickname_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  nickname_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  nickname_not_starts_with?: InputMaybe<Scalars['String']['input']>
  nickname_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  nickname_starts_with?: InputMaybe<Scalars['String']['input']>
  nickname_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  or?: InputMaybe<Array<InputMaybe<Manager_Filter>>>
  pool_count?: InputMaybe<Scalars['Int']['input']>
  pool_count_gt?: InputMaybe<Scalars['Int']['input']>
  pool_count_gte?: InputMaybe<Scalars['Int']['input']>
  pool_count_in?: InputMaybe<Array<Scalars['Int']['input']>>
  pool_count_lt?: InputMaybe<Scalars['Int']['input']>
  pool_count_lte?: InputMaybe<Scalars['Int']['input']>
  pool_count_not?: InputMaybe<Scalars['Int']['input']>
  pool_count_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  pools_?: InputMaybe<Pool_Filter>
  telegram?: InputMaybe<Scalars['String']['input']>
  telegram_contains?: InputMaybe<Scalars['String']['input']>
  telegram_contains_nocase?: InputMaybe<Scalars['String']['input']>
  telegram_ends_with?: InputMaybe<Scalars['String']['input']>
  telegram_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  telegram_gt?: InputMaybe<Scalars['String']['input']>
  telegram_gte?: InputMaybe<Scalars['String']['input']>
  telegram_in?: InputMaybe<Array<Scalars['String']['input']>>
  telegram_lt?: InputMaybe<Scalars['String']['input']>
  telegram_lte?: InputMaybe<Scalars['String']['input']>
  telegram_not?: InputMaybe<Scalars['String']['input']>
  telegram_not_contains?: InputMaybe<Scalars['String']['input']>
  telegram_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  telegram_not_ends_with?: InputMaybe<Scalars['String']['input']>
  telegram_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  telegram_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  telegram_not_starts_with?: InputMaybe<Scalars['String']['input']>
  telegram_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  telegram_starts_with?: InputMaybe<Scalars['String']['input']>
  telegram_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
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
  twitter?: InputMaybe<Scalars['String']['input']>
  twitter_contains?: InputMaybe<Scalars['String']['input']>
  twitter_contains_nocase?: InputMaybe<Scalars['String']['input']>
  twitter_ends_with?: InputMaybe<Scalars['String']['input']>
  twitter_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  twitter_gt?: InputMaybe<Scalars['String']['input']>
  twitter_gte?: InputMaybe<Scalars['String']['input']>
  twitter_in?: InputMaybe<Array<Scalars['String']['input']>>
  twitter_lt?: InputMaybe<Scalars['String']['input']>
  twitter_lte?: InputMaybe<Scalars['String']['input']>
  twitter_not?: InputMaybe<Scalars['String']['input']>
  twitter_not_contains?: InputMaybe<Scalars['String']['input']>
  twitter_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  twitter_not_ends_with?: InputMaybe<Scalars['String']['input']>
  twitter_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  twitter_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  twitter_not_starts_with?: InputMaybe<Scalars['String']['input']>
  twitter_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  twitter_starts_with?: InputMaybe<Scalars['String']['input']>
  twitter_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  unique_investors?: InputMaybe<Scalars['Int']['input']>
  unique_investors_gt?: InputMaybe<Scalars['Int']['input']>
  unique_investors_gte?: InputMaybe<Scalars['Int']['input']>
  unique_investors_in?: InputMaybe<Array<Scalars['Int']['input']>>
  unique_investors_lt?: InputMaybe<Scalars['Int']['input']>
  unique_investors_lte?: InputMaybe<Scalars['Int']['input']>
  unique_investors_not?: InputMaybe<Scalars['Int']['input']>
  unique_investors_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  updated_at?: InputMaybe<Scalars['String']['input']>
  updated_at_contains?: InputMaybe<Scalars['String']['input']>
  updated_at_contains_nocase?: InputMaybe<Scalars['String']['input']>
  updated_at_ends_with?: InputMaybe<Scalars['String']['input']>
  updated_at_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  updated_at_gt?: InputMaybe<Scalars['String']['input']>
  updated_at_gte?: InputMaybe<Scalars['String']['input']>
  updated_at_in?: InputMaybe<Array<Scalars['String']['input']>>
  updated_at_lt?: InputMaybe<Scalars['String']['input']>
  updated_at_lte?: InputMaybe<Scalars['String']['input']>
  updated_at_not?: InputMaybe<Scalars['String']['input']>
  updated_at_not_contains?: InputMaybe<Scalars['String']['input']>
  updated_at_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  updated_at_not_ends_with?: InputMaybe<Scalars['String']['input']>
  updated_at_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  updated_at_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  updated_at_not_starts_with?: InputMaybe<Scalars['String']['input']>
  updated_at_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  updated_at_starts_with?: InputMaybe<Scalars['String']['input']>
  updated_at_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  user?: InputMaybe<Scalars['String']['input']>
  user_?: InputMaybe<User_Filter>
  user_contains?: InputMaybe<Scalars['String']['input']>
  user_contains_nocase?: InputMaybe<Scalars['String']['input']>
  user_ends_with?: InputMaybe<Scalars['String']['input']>
  user_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  user_gt?: InputMaybe<Scalars['String']['input']>
  user_gte?: InputMaybe<Scalars['String']['input']>
  user_in?: InputMaybe<Array<Scalars['String']['input']>>
  user_lt?: InputMaybe<Scalars['String']['input']>
  user_lte?: InputMaybe<Scalars['String']['input']>
  user_not?: InputMaybe<Scalars['String']['input']>
  user_not_contains?: InputMaybe<Scalars['String']['input']>
  user_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  user_not_ends_with?: InputMaybe<Scalars['String']['input']>
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  user_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  user_not_starts_with?: InputMaybe<Scalars['String']['input']>
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  user_starts_with?: InputMaybe<Scalars['String']['input']>
  user_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  volumes_?: InputMaybe<Volume_Filter>
  website?: InputMaybe<Scalars['String']['input']>
  website_contains?: InputMaybe<Scalars['String']['input']>
  website_contains_nocase?: InputMaybe<Scalars['String']['input']>
  website_ends_with?: InputMaybe<Scalars['String']['input']>
  website_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  website_gt?: InputMaybe<Scalars['String']['input']>
  website_gte?: InputMaybe<Scalars['String']['input']>
  website_in?: InputMaybe<Array<Scalars['String']['input']>>
  website_lt?: InputMaybe<Scalars['String']['input']>
  website_lte?: InputMaybe<Scalars['String']['input']>
  website_not?: InputMaybe<Scalars['String']['input']>
  website_not_contains?: InputMaybe<Scalars['String']['input']>
  website_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  website_not_ends_with?: InputMaybe<Scalars['String']['input']>
  website_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  website_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  website_not_starts_with?: InputMaybe<Scalars['String']['input']>
  website_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  website_starts_with?: InputMaybe<Scalars['String']['input']>
  website_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
}

export type Manager_OrderBy =
  | 'created_at'
  | 'description'
  | 'discord'
  | 'id'
  | 'image'
  | 'is_nft'
  | 'nft_chain'
  | 'nft_collection_name'
  | 'nft_contract_type'
  | 'nft_description'
  | 'nft_name'
  | 'nft_symbol'
  | 'nft_token_address'
  | 'nft_token_num'
  | 'nickname'
  | 'pool_count'
  | 'pools'
  | 'telegram'
  | 'total_value_locked'
  | 'total_value_locked_btc'
  | 'total_value_locked_usd'
  | 'twitter'
  | 'unique_investors'
  | 'updated_at'
  | 'user'
  | 'user__created_at'
  | 'user__description'
  | 'user__discord'
  | 'user__id'
  | 'user__image'
  | 'user__is_nft'
  | 'user__nft_chain'
  | 'user__nft_collection_name'
  | 'user__nft_contract_type'
  | 'user__nft_description'
  | 'user__nft_name'
  | 'user__nft_symbol'
  | 'user__nft_token_address'
  | 'user__nft_token_num'
  | 'user__nickname'
  | 'user__telegram'
  | 'user__twitter'
  | 'user__updated_at'
  | 'user__votingPower'
  | 'user__website'
  | 'volumes'
  | 'website'

/** Defines the order direction, either ascending or descending */
export type OrderDirection = 'asc' | 'desc'

/**
 * Every pool in the protocol
 *
 */
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
  chain: Chain
  chain_id: Scalars['Int']['output']
  change: Scalars['BigDecimal']['output']
  /**
   * Controller contract that controls the vault
   *
   */
  controller: Scalars['String']['output']
  created_at: Scalars['Int']['output']
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
  featured: Scalars['Boolean']['output']
  fee_aum: Scalars['BigDecimal']['output']
  fee_aum_kassandra: Scalars['BigDecimal']['output']
  fee_exit: Scalars['BigDecimal']['output']
  fee_join_broker: Scalars['BigDecimal']['output']
  fee_join_manager: Scalars['BigDecimal']['output']
  fee_swap: Scalars['BigDecimal']['output']
  fees: Array<Fee>
  founded_by?: Maybe<Scalars['String']['output']>
  history: Array<History>
  /**
   * Chain ID + Pool Vault ID
   *
   */
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
  pool_id?: Maybe<Scalars['Int']['output']>
  pool_version: Scalars['Int']['output']
  price_btc: Scalars['BigDecimal']['output']
  price_candles: Array<Candle>
  price_usd: Scalars['BigDecimal']['output']
  short_summary?: Maybe<Scalars['String']['output']>
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

/**
 * Every pool in the protocol
 *
 */
export type PoolActivitiesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Activity_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<Activity_Filter>
}

/**
 * Every pool in the protocol
 *
 */
export type PoolBrokersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Broker_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<Broker_Filter>
}

/**
 * Every pool in the protocol
 *
 */
export type PoolFeesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Fee_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<Fee_Filter>
}

/**
 * Every pool in the protocol
 *
 */
export type PoolHistoryArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<History_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<History_Filter>
}

/**
 * Every pool in the protocol
 *
 */
export type PoolInvestorsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Investor_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<Investor_Filter>
}

/**
 * Every pool in the protocol
 *
 */
export type PoolPrice_CandlesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Candle_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<Candle_Filter>
}

/**
 * Every pool in the protocol
 *
 */
export type PoolSupply_ChangesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<PoolSupply_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<PoolSupply_Filter>
}

/**
 * Every pool in the protocol
 *
 */
export type PoolTotal_Value_LockedArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<TotalValueLocked_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<TotalValueLocked_Filter>
}

/**
 * Every pool in the protocol
 *
 */
export type PoolUnderlying_AssetsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Asset_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<Asset_Filter>
}

/**
 * Every pool in the protocol
 *
 */
export type PoolVolumesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Volume_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<Volume_Filter>
}

/**
 * Every pool in the protocol
 *
 */
export type PoolWeight_GoalsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<WeightGoalPoint_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<WeightGoalPoint_Filter>
}

/**
 * Every pool in the protocol
 *
 */
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
  and?: InputMaybe<Array<InputMaybe<PoolSupply_Filter>>>
  block?: InputMaybe<Scalars['BigInt']['input']>
  block_gt?: InputMaybe<Scalars['BigInt']['input']>
  block_gte?: InputMaybe<Scalars['BigInt']['input']>
  block_hash?: InputMaybe<Scalars['Bytes']['input']>
  block_hash_contains?: InputMaybe<Scalars['Bytes']['input']>
  block_hash_gt?: InputMaybe<Scalars['Bytes']['input']>
  block_hash_gte?: InputMaybe<Scalars['Bytes']['input']>
  block_hash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>
  block_hash_lt?: InputMaybe<Scalars['Bytes']['input']>
  block_hash_lte?: InputMaybe<Scalars['Bytes']['input']>
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
  or?: InputMaybe<Array<InputMaybe<PoolSupply_Filter>>>
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
  | 'pool__address'
  | 'pool__chain_id'
  | 'pool__change'
  | 'pool__controller'
  | 'pool__created_at'
  | 'pool__decimals'
  | 'pool__deposits_broker_btc'
  | 'pool__deposits_broker_usd'
  | 'pool__deposits_btc'
  | 'pool__deposits_usd'
  | 'pool__factory'
  | 'pool__featured'
  | 'pool__fee_aum'
  | 'pool__fee_aum_kassandra'
  | 'pool__fee_exit'
  | 'pool__fee_join_broker'
  | 'pool__fee_join_manager'
  | 'pool__fee_swap'
  | 'pool__founded_by'
  | 'pool__id'
  | 'pool__is_private_pool'
  | 'pool__last_harvest'
  | 'pool__logo'
  | 'pool__name'
  | 'pool__num_activities'
  | 'pool__num_brokers'
  | 'pool__num_deposits'
  | 'pool__num_deposits_broker'
  | 'pool__num_exit'
  | 'pool__num_join'
  | 'pool__num_swap'
  | 'pool__num_token_add'
  | 'pool__num_token_remove'
  | 'pool__num_tx'
  | 'pool__num_weight_goals'
  | 'pool__pool_id'
  | 'pool__pool_version'
  | 'pool__price_btc'
  | 'pool__price_usd'
  | 'pool__short_summary'
  | 'pool__strategy'
  | 'pool__summary'
  | 'pool__supply'
  | 'pool__symbol'
  | 'pool__total_fees_aum_kassandra'
  | 'pool__total_fees_aum_kassandra_btc'
  | 'pool__total_fees_aum_kassandra_usd'
  | 'pool__total_fees_aum_manager'
  | 'pool__total_fees_aum_manager_btc'
  | 'pool__total_fees_aum_manager_usd'
  | 'pool__total_fees_exit'
  | 'pool__total_fees_exit_btc'
  | 'pool__total_fees_exit_usd'
  | 'pool__total_fees_join_broker'
  | 'pool__total_fees_join_broker_btc'
  | 'pool__total_fees_join_broker_usd'
  | 'pool__total_fees_join_manager'
  | 'pool__total_fees_join_manager_btc'
  | 'pool__total_fees_join_manager_usd'
  | 'pool__total_fees_swap_btc'
  | 'pool__total_fees_swap_usd'
  | 'pool__total_value_locked_btc'
  | 'pool__total_value_locked_usd'
  | 'pool__total_volume_btc'
  | 'pool__total_volume_usd'
  | 'pool__unique_investors'
  | 'pool__unique_investors_broker'
  | 'pool__url'
  | 'pool__vault'
  | 'pool__vault_id'
  | 'pool__whitelist'
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
  and?: InputMaybe<Array<InputMaybe<Pool_Filter>>>
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
  change?: InputMaybe<Scalars['BigDecimal']['input']>
  change_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  change_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  change_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  change_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  change_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  change_not?: InputMaybe<Scalars['BigDecimal']['input']>
  change_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
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
  created_at?: InputMaybe<Scalars['Int']['input']>
  created_at_gt?: InputMaybe<Scalars['Int']['input']>
  created_at_gte?: InputMaybe<Scalars['Int']['input']>
  created_at_in?: InputMaybe<Array<Scalars['Int']['input']>>
  created_at_lt?: InputMaybe<Scalars['Int']['input']>
  created_at_lte?: InputMaybe<Scalars['Int']['input']>
  created_at_not?: InputMaybe<Scalars['Int']['input']>
  created_at_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
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
  featured?: InputMaybe<Scalars['Boolean']['input']>
  featured_in?: InputMaybe<Array<Scalars['Boolean']['input']>>
  featured_not?: InputMaybe<Scalars['Boolean']['input']>
  featured_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>
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
  founded_by?: InputMaybe<Scalars['String']['input']>
  founded_by_contains?: InputMaybe<Scalars['String']['input']>
  founded_by_contains_nocase?: InputMaybe<Scalars['String']['input']>
  founded_by_ends_with?: InputMaybe<Scalars['String']['input']>
  founded_by_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  founded_by_gt?: InputMaybe<Scalars['String']['input']>
  founded_by_gte?: InputMaybe<Scalars['String']['input']>
  founded_by_in?: InputMaybe<Array<Scalars['String']['input']>>
  founded_by_lt?: InputMaybe<Scalars['String']['input']>
  founded_by_lte?: InputMaybe<Scalars['String']['input']>
  founded_by_not?: InputMaybe<Scalars['String']['input']>
  founded_by_not_contains?: InputMaybe<Scalars['String']['input']>
  founded_by_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  founded_by_not_ends_with?: InputMaybe<Scalars['String']['input']>
  founded_by_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  founded_by_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  founded_by_not_starts_with?: InputMaybe<Scalars['String']['input']>
  founded_by_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  founded_by_starts_with?: InputMaybe<Scalars['String']['input']>
  founded_by_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
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
  logo?: InputMaybe<Scalars['String']['input']>
  logo_contains?: InputMaybe<Scalars['String']['input']>
  logo_contains_nocase?: InputMaybe<Scalars['String']['input']>
  logo_ends_with?: InputMaybe<Scalars['String']['input']>
  logo_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  logo_gt?: InputMaybe<Scalars['String']['input']>
  logo_gte?: InputMaybe<Scalars['String']['input']>
  logo_in?: InputMaybe<Array<Scalars['String']['input']>>
  logo_lt?: InputMaybe<Scalars['String']['input']>
  logo_lte?: InputMaybe<Scalars['String']['input']>
  logo_not?: InputMaybe<Scalars['String']['input']>
  logo_not_contains?: InputMaybe<Scalars['String']['input']>
  logo_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  logo_not_ends_with?: InputMaybe<Scalars['String']['input']>
  logo_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  logo_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  logo_not_starts_with?: InputMaybe<Scalars['String']['input']>
  logo_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  logo_starts_with?: InputMaybe<Scalars['String']['input']>
  logo_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
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
  or?: InputMaybe<Array<InputMaybe<Pool_Filter>>>
  pool_id?: InputMaybe<Scalars['Int']['input']>
  pool_id_gt?: InputMaybe<Scalars['Int']['input']>
  pool_id_gte?: InputMaybe<Scalars['Int']['input']>
  pool_id_in?: InputMaybe<Array<Scalars['Int']['input']>>
  pool_id_lt?: InputMaybe<Scalars['Int']['input']>
  pool_id_lte?: InputMaybe<Scalars['Int']['input']>
  pool_id_not?: InputMaybe<Scalars['Int']['input']>
  pool_id_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
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
  short_summary?: InputMaybe<Scalars['String']['input']>
  short_summary_contains?: InputMaybe<Scalars['String']['input']>
  short_summary_contains_nocase?: InputMaybe<Scalars['String']['input']>
  short_summary_ends_with?: InputMaybe<Scalars['String']['input']>
  short_summary_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  short_summary_gt?: InputMaybe<Scalars['String']['input']>
  short_summary_gte?: InputMaybe<Scalars['String']['input']>
  short_summary_in?: InputMaybe<Array<Scalars['String']['input']>>
  short_summary_lt?: InputMaybe<Scalars['String']['input']>
  short_summary_lte?: InputMaybe<Scalars['String']['input']>
  short_summary_not?: InputMaybe<Scalars['String']['input']>
  short_summary_not_contains?: InputMaybe<Scalars['String']['input']>
  short_summary_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  short_summary_not_ends_with?: InputMaybe<Scalars['String']['input']>
  short_summary_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  short_summary_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  short_summary_not_starts_with?: InputMaybe<Scalars['String']['input']>
  short_summary_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  short_summary_starts_with?: InputMaybe<Scalars['String']['input']>
  short_summary_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
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
  summary?: InputMaybe<Scalars['String']['input']>
  summary_contains?: InputMaybe<Scalars['String']['input']>
  summary_contains_nocase?: InputMaybe<Scalars['String']['input']>
  summary_ends_with?: InputMaybe<Scalars['String']['input']>
  summary_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  summary_gt?: InputMaybe<Scalars['String']['input']>
  summary_gte?: InputMaybe<Scalars['String']['input']>
  summary_in?: InputMaybe<Array<Scalars['String']['input']>>
  summary_lt?: InputMaybe<Scalars['String']['input']>
  summary_lte?: InputMaybe<Scalars['String']['input']>
  summary_not?: InputMaybe<Scalars['String']['input']>
  summary_not_contains?: InputMaybe<Scalars['String']['input']>
  summary_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  summary_not_ends_with?: InputMaybe<Scalars['String']['input']>
  summary_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  summary_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  summary_not_starts_with?: InputMaybe<Scalars['String']['input']>
  summary_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  summary_starts_with?: InputMaybe<Scalars['String']['input']>
  summary_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
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
  url?: InputMaybe<Scalars['String']['input']>
  url_contains?: InputMaybe<Scalars['String']['input']>
  url_contains_nocase?: InputMaybe<Scalars['String']['input']>
  url_ends_with?: InputMaybe<Scalars['String']['input']>
  url_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  url_gt?: InputMaybe<Scalars['String']['input']>
  url_gte?: InputMaybe<Scalars['String']['input']>
  url_in?: InputMaybe<Array<Scalars['String']['input']>>
  url_lt?: InputMaybe<Scalars['String']['input']>
  url_lte?: InputMaybe<Scalars['String']['input']>
  url_not?: InputMaybe<Scalars['String']['input']>
  url_not_contains?: InputMaybe<Scalars['String']['input']>
  url_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  url_not_ends_with?: InputMaybe<Scalars['String']['input']>
  url_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  url_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  url_not_starts_with?: InputMaybe<Scalars['String']['input']>
  url_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  url_starts_with?: InputMaybe<Scalars['String']['input']>
  url_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
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
  | 'chain__address_wrapped'
  | 'chain__block_explorer_url'
  | 'chain__icon'
  | 'chain__id'
  | 'chain__name'
  | 'chain__pool_count'
  | 'chain__seconds_per_block'
  | 'chain__token_decimals'
  | 'chain__token_name'
  | 'chain__token_symbol'
  | 'chain_id'
  | 'change'
  | 'controller'
  | 'created_at'
  | 'decimals'
  | 'deposits_broker_btc'
  | 'deposits_broker_usd'
  | 'deposits_btc'
  | 'deposits_usd'
  | 'factory'
  | 'featured'
  | 'fee_aum'
  | 'fee_aum_kassandra'
  | 'fee_exit'
  | 'fee_join_broker'
  | 'fee_join_manager'
  | 'fee_swap'
  | 'fees'
  | 'founded_by'
  | 'history'
  | 'id'
  | 'investors'
  | 'is_private_pool'
  | 'last_harvest'
  | 'logo'
  | 'manager'
  | 'manager__created_at'
  | 'manager__description'
  | 'manager__discord'
  | 'manager__id'
  | 'manager__image'
  | 'manager__is_nft'
  | 'manager__nft_chain'
  | 'manager__nft_collection_name'
  | 'manager__nft_contract_type'
  | 'manager__nft_description'
  | 'manager__nft_name'
  | 'manager__nft_symbol'
  | 'manager__nft_token_address'
  | 'manager__nft_token_num'
  | 'manager__nickname'
  | 'manager__pool_count'
  | 'manager__telegram'
  | 'manager__total_value_locked_btc'
  | 'manager__total_value_locked_usd'
  | 'manager__twitter'
  | 'manager__unique_investors'
  | 'manager__updated_at'
  | 'manager__website'
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
  | 'pool_id'
  | 'pool_version'
  | 'price_btc'
  | 'price_candles'
  | 'price_usd'
  | 'short_summary'
  | 'strategy'
  | 'summary'
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
  | 'url'
  | 'vault'
  | 'vault_id'
  | 'volumes'
  | 'weight_goals'
  | 'weights'
  | 'whitelist'

/**
 * A proposal made in the governance
 *
 */
export type Proposal = {
  __typename?: 'Proposal'
  againstVotes: Scalars['BigDecimal']['output']
  calldatas: Array<Scalars['Bytes']['output']>
  canceled?: Maybe<Scalars['BigInt']['output']>
  created: Scalars['BigInt']['output']
  description: Scalars['String']['output']
  endBlock: Scalars['BigInt']['output']
  eta?: Maybe<Scalars['BigInt']['output']>
  executed?: Maybe<Scalars['BigInt']['output']>
  forVotes: Scalars['BigDecimal']['output']
  governance: Governance
  /**
   * governance contract address + proposal number
   *
   */
  id: Scalars['ID']['output']
  /**
   * proposal ID
   *
   */
  number: Scalars['Int']['output']
  proposer: User
  queued?: Maybe<Scalars['BigInt']['output']>
  quorum: Scalars['BigDecimal']['output']
  signatures: Array<Scalars['String']['output']>
  startBlock: Scalars['BigInt']['output']
  targets: Array<Scalars['String']['output']>
  values: Array<Scalars['BigDecimal']['output']>
  votes: Array<Vote>
}

/**
 * A proposal made in the governance
 *
 */
export type ProposalVotesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Vote_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<Vote_Filter>
}

export type Proposal_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  againstVotes?: InputMaybe<Scalars['BigDecimal']['input']>
  againstVotes_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  againstVotes_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  againstVotes_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  againstVotes_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  againstVotes_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  againstVotes_not?: InputMaybe<Scalars['BigDecimal']['input']>
  againstVotes_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  and?: InputMaybe<Array<InputMaybe<Proposal_Filter>>>
  calldatas?: InputMaybe<Array<Scalars['Bytes']['input']>>
  calldatas_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>
  calldatas_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>
  calldatas_not?: InputMaybe<Array<Scalars['Bytes']['input']>>
  calldatas_not_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>
  calldatas_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>
  canceled?: InputMaybe<Scalars['BigInt']['input']>
  canceled_gt?: InputMaybe<Scalars['BigInt']['input']>
  canceled_gte?: InputMaybe<Scalars['BigInt']['input']>
  canceled_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  canceled_lt?: InputMaybe<Scalars['BigInt']['input']>
  canceled_lte?: InputMaybe<Scalars['BigInt']['input']>
  canceled_not?: InputMaybe<Scalars['BigInt']['input']>
  canceled_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  created?: InputMaybe<Scalars['BigInt']['input']>
  created_gt?: InputMaybe<Scalars['BigInt']['input']>
  created_gte?: InputMaybe<Scalars['BigInt']['input']>
  created_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  created_lt?: InputMaybe<Scalars['BigInt']['input']>
  created_lte?: InputMaybe<Scalars['BigInt']['input']>
  created_not?: InputMaybe<Scalars['BigInt']['input']>
  created_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  description?: InputMaybe<Scalars['String']['input']>
  description_contains?: InputMaybe<Scalars['String']['input']>
  description_contains_nocase?: InputMaybe<Scalars['String']['input']>
  description_ends_with?: InputMaybe<Scalars['String']['input']>
  description_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  description_gt?: InputMaybe<Scalars['String']['input']>
  description_gte?: InputMaybe<Scalars['String']['input']>
  description_in?: InputMaybe<Array<Scalars['String']['input']>>
  description_lt?: InputMaybe<Scalars['String']['input']>
  description_lte?: InputMaybe<Scalars['String']['input']>
  description_not?: InputMaybe<Scalars['String']['input']>
  description_not_contains?: InputMaybe<Scalars['String']['input']>
  description_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  description_not_ends_with?: InputMaybe<Scalars['String']['input']>
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  description_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  description_not_starts_with?: InputMaybe<Scalars['String']['input']>
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  description_starts_with?: InputMaybe<Scalars['String']['input']>
  description_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  endBlock?: InputMaybe<Scalars['BigInt']['input']>
  endBlock_gt?: InputMaybe<Scalars['BigInt']['input']>
  endBlock_gte?: InputMaybe<Scalars['BigInt']['input']>
  endBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  endBlock_lt?: InputMaybe<Scalars['BigInt']['input']>
  endBlock_lte?: InputMaybe<Scalars['BigInt']['input']>
  endBlock_not?: InputMaybe<Scalars['BigInt']['input']>
  endBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  eta?: InputMaybe<Scalars['BigInt']['input']>
  eta_gt?: InputMaybe<Scalars['BigInt']['input']>
  eta_gte?: InputMaybe<Scalars['BigInt']['input']>
  eta_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  eta_lt?: InputMaybe<Scalars['BigInt']['input']>
  eta_lte?: InputMaybe<Scalars['BigInt']['input']>
  eta_not?: InputMaybe<Scalars['BigInt']['input']>
  eta_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  executed?: InputMaybe<Scalars['BigInt']['input']>
  executed_gt?: InputMaybe<Scalars['BigInt']['input']>
  executed_gte?: InputMaybe<Scalars['BigInt']['input']>
  executed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  executed_lt?: InputMaybe<Scalars['BigInt']['input']>
  executed_lte?: InputMaybe<Scalars['BigInt']['input']>
  executed_not?: InputMaybe<Scalars['BigInt']['input']>
  executed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  forVotes?: InputMaybe<Scalars['BigDecimal']['input']>
  forVotes_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  forVotes_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  forVotes_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  forVotes_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  forVotes_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  forVotes_not?: InputMaybe<Scalars['BigDecimal']['input']>
  forVotes_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  governance?: InputMaybe<Scalars['String']['input']>
  governance_?: InputMaybe<Governance_Filter>
  governance_contains?: InputMaybe<Scalars['String']['input']>
  governance_contains_nocase?: InputMaybe<Scalars['String']['input']>
  governance_ends_with?: InputMaybe<Scalars['String']['input']>
  governance_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  governance_gt?: InputMaybe<Scalars['String']['input']>
  governance_gte?: InputMaybe<Scalars['String']['input']>
  governance_in?: InputMaybe<Array<Scalars['String']['input']>>
  governance_lt?: InputMaybe<Scalars['String']['input']>
  governance_lte?: InputMaybe<Scalars['String']['input']>
  governance_not?: InputMaybe<Scalars['String']['input']>
  governance_not_contains?: InputMaybe<Scalars['String']['input']>
  governance_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  governance_not_ends_with?: InputMaybe<Scalars['String']['input']>
  governance_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  governance_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  governance_not_starts_with?: InputMaybe<Scalars['String']['input']>
  governance_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  governance_starts_with?: InputMaybe<Scalars['String']['input']>
  governance_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  number?: InputMaybe<Scalars['Int']['input']>
  number_gt?: InputMaybe<Scalars['Int']['input']>
  number_gte?: InputMaybe<Scalars['Int']['input']>
  number_in?: InputMaybe<Array<Scalars['Int']['input']>>
  number_lt?: InputMaybe<Scalars['Int']['input']>
  number_lte?: InputMaybe<Scalars['Int']['input']>
  number_not?: InputMaybe<Scalars['Int']['input']>
  number_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  or?: InputMaybe<Array<InputMaybe<Proposal_Filter>>>
  proposer?: InputMaybe<Scalars['String']['input']>
  proposer_?: InputMaybe<User_Filter>
  proposer_contains?: InputMaybe<Scalars['String']['input']>
  proposer_contains_nocase?: InputMaybe<Scalars['String']['input']>
  proposer_ends_with?: InputMaybe<Scalars['String']['input']>
  proposer_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  proposer_gt?: InputMaybe<Scalars['String']['input']>
  proposer_gte?: InputMaybe<Scalars['String']['input']>
  proposer_in?: InputMaybe<Array<Scalars['String']['input']>>
  proposer_lt?: InputMaybe<Scalars['String']['input']>
  proposer_lte?: InputMaybe<Scalars['String']['input']>
  proposer_not?: InputMaybe<Scalars['String']['input']>
  proposer_not_contains?: InputMaybe<Scalars['String']['input']>
  proposer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  proposer_not_ends_with?: InputMaybe<Scalars['String']['input']>
  proposer_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  proposer_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  proposer_not_starts_with?: InputMaybe<Scalars['String']['input']>
  proposer_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  proposer_starts_with?: InputMaybe<Scalars['String']['input']>
  proposer_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  queued?: InputMaybe<Scalars['BigInt']['input']>
  queued_gt?: InputMaybe<Scalars['BigInt']['input']>
  queued_gte?: InputMaybe<Scalars['BigInt']['input']>
  queued_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  queued_lt?: InputMaybe<Scalars['BigInt']['input']>
  queued_lte?: InputMaybe<Scalars['BigInt']['input']>
  queued_not?: InputMaybe<Scalars['BigInt']['input']>
  queued_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  quorum?: InputMaybe<Scalars['BigDecimal']['input']>
  quorum_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  quorum_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  quorum_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  quorum_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  quorum_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  quorum_not?: InputMaybe<Scalars['BigDecimal']['input']>
  quorum_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  signatures?: InputMaybe<Array<Scalars['String']['input']>>
  signatures_contains?: InputMaybe<Array<Scalars['String']['input']>>
  signatures_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>
  signatures_not?: InputMaybe<Array<Scalars['String']['input']>>
  signatures_not_contains?: InputMaybe<Array<Scalars['String']['input']>>
  signatures_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>
  startBlock?: InputMaybe<Scalars['BigInt']['input']>
  startBlock_gt?: InputMaybe<Scalars['BigInt']['input']>
  startBlock_gte?: InputMaybe<Scalars['BigInt']['input']>
  startBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  startBlock_lt?: InputMaybe<Scalars['BigInt']['input']>
  startBlock_lte?: InputMaybe<Scalars['BigInt']['input']>
  startBlock_not?: InputMaybe<Scalars['BigInt']['input']>
  startBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>
  targets?: InputMaybe<Array<Scalars['String']['input']>>
  targets_contains?: InputMaybe<Array<Scalars['String']['input']>>
  targets_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>
  targets_not?: InputMaybe<Array<Scalars['String']['input']>>
  targets_not_contains?: InputMaybe<Array<Scalars['String']['input']>>
  targets_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>
  values?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  values_contains?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  values_contains_nocase?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  values_not?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  values_not_contains?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  values_not_contains_nocase?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  votes_?: InputMaybe<Vote_Filter>
}

export type Proposal_OrderBy =
  | 'againstVotes'
  | 'calldatas'
  | 'canceled'
  | 'created'
  | 'description'
  | 'endBlock'
  | 'eta'
  | 'executed'
  | 'forVotes'
  | 'governance'
  | 'governance__id'
  | 'governance__internal_delegatee_address'
  | 'governance__internal_delegation_amount'
  | 'governance__internal_delegation_tx_id'
  | 'governance__stakingPools'
  | 'governance__totalVotingPower'
  | 'governance__votingAddresses'
  | 'id'
  | 'number'
  | 'proposer'
  | 'proposer__created_at'
  | 'proposer__description'
  | 'proposer__discord'
  | 'proposer__id'
  | 'proposer__image'
  | 'proposer__is_nft'
  | 'proposer__nft_chain'
  | 'proposer__nft_collection_name'
  | 'proposer__nft_contract_type'
  | 'proposer__nft_description'
  | 'proposer__nft_name'
  | 'proposer__nft_symbol'
  | 'proposer__nft_token_address'
  | 'proposer__nft_token_num'
  | 'proposer__nickname'
  | 'proposer__telegram'
  | 'proposer__twitter'
  | 'proposer__updated_at'
  | 'proposer__votingPower'
  | 'proposer__website'
  | 'queued'
  | 'quorum'
  | 'signatures'
  | 'startBlock'
  | 'targets'
  | 'values'
  | 'votes'

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
  chains: Array<Chain>
  delegation?: Maybe<Delegation>
  delegations: Array<Delegation>
  fee?: Maybe<Fee>
  fees: Array<Fee>
  governance?: Maybe<Governance>
  governances: Array<Governance>
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
  proposal?: Maybe<Proposal>
  proposals: Array<Proposal>
  token?: Maybe<Token>
  tokens: Array<Token>
  totalValueLocked?: Maybe<TotalValueLocked>
  totalValueLockeds: Array<TotalValueLocked>
  user?: Maybe<User>
  users: Array<User>
  volume?: Maybe<Volume>
  volumes: Array<Volume>
  vote?: Maybe<Vote>
  votes: Array<Vote>
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

export type QueryChainsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Chain_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Chain_Filter>
}

export type QueryDelegationArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryDelegationsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Delegation_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Delegation_Filter>
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

export type QueryGovernanceArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryGovernancesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Governance_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Governance_Filter>
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

export type QueryProposalArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryProposalsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Proposal_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Proposal_Filter>
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

export type QueryUserArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryUsersArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<User_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<User_Filter>
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

export type QueryVoteArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryVotesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Vote_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Vote_Filter>
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
  delegation?: Maybe<Delegation>
  delegations: Array<Delegation>
  fee?: Maybe<Fee>
  fees: Array<Fee>
  governance?: Maybe<Governance>
  governances: Array<Governance>
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
  proposal?: Maybe<Proposal>
  proposals: Array<Proposal>
  token?: Maybe<Token>
  tokens: Array<Token>
  totalValueLocked?: Maybe<TotalValueLocked>
  totalValueLockeds: Array<TotalValueLocked>
  user?: Maybe<User>
  users: Array<User>
  volume?: Maybe<Volume>
  volumes: Array<Volume>
  vote?: Maybe<Vote>
  votes: Array<Vote>
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

export type SubscriptionDelegationArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionDelegationsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Delegation_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Delegation_Filter>
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

export type SubscriptionGovernanceArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionGovernancesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Governance_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Governance_Filter>
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

export type SubscriptionProposalArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionProposalsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Proposal_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Proposal_Filter>
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

export type SubscriptionUserArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionUsersArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<User_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<User_Filter>
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

export type SubscriptionVoteArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']['input']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionVotesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Vote_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Vote_Filter>
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

/**
 * Every token that is/was in a pool of the protocol
 *
 */
export type Token = {
  __typename?: 'Token'
  chain_ids: Array<Scalars['Int']['output']>
  coingecko_id?: Maybe<Scalars['String']['output']>
  decimals: Scalars['Int']['output']
  /**
   * Token Address
   *
   */
  id: Scalars['ID']['output']
  in_pool: Scalars['Boolean']['output']
  is_wrap_token: Scalars['Int']['output']
  logo?: Maybe<Scalars['String']['output']>
  name: Scalars['String']['output']
  pools: Array<Asset>
  symbol: Scalars['String']['output']
  wraps?: Maybe<Token>
}

/**
 * Every token that is/was in a pool of the protocol
 *
 */
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
  and?: InputMaybe<Array<InputMaybe<Token_Filter>>>
  chain_ids?: InputMaybe<Array<Scalars['Int']['input']>>
  chain_ids_contains?: InputMaybe<Array<Scalars['Int']['input']>>
  chain_ids_contains_nocase?: InputMaybe<Array<Scalars['Int']['input']>>
  chain_ids_not?: InputMaybe<Array<Scalars['Int']['input']>>
  chain_ids_not_contains?: InputMaybe<Array<Scalars['Int']['input']>>
  chain_ids_not_contains_nocase?: InputMaybe<Array<Scalars['Int']['input']>>
  coingecko_id?: InputMaybe<Scalars['String']['input']>
  coingecko_id_contains?: InputMaybe<Scalars['String']['input']>
  coingecko_id_contains_nocase?: InputMaybe<Scalars['String']['input']>
  coingecko_id_ends_with?: InputMaybe<Scalars['String']['input']>
  coingecko_id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  coingecko_id_gt?: InputMaybe<Scalars['String']['input']>
  coingecko_id_gte?: InputMaybe<Scalars['String']['input']>
  coingecko_id_in?: InputMaybe<Array<Scalars['String']['input']>>
  coingecko_id_lt?: InputMaybe<Scalars['String']['input']>
  coingecko_id_lte?: InputMaybe<Scalars['String']['input']>
  coingecko_id_not?: InputMaybe<Scalars['String']['input']>
  coingecko_id_not_contains?: InputMaybe<Scalars['String']['input']>
  coingecko_id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  coingecko_id_not_ends_with?: InputMaybe<Scalars['String']['input']>
  coingecko_id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  coingecko_id_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  coingecko_id_not_starts_with?: InputMaybe<Scalars['String']['input']>
  coingecko_id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  coingecko_id_starts_with?: InputMaybe<Scalars['String']['input']>
  coingecko_id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
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
  in_pool?: InputMaybe<Scalars['Boolean']['input']>
  in_pool_in?: InputMaybe<Array<Scalars['Boolean']['input']>>
  in_pool_not?: InputMaybe<Scalars['Boolean']['input']>
  in_pool_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>
  is_wrap_token?: InputMaybe<Scalars['Int']['input']>
  is_wrap_token_gt?: InputMaybe<Scalars['Int']['input']>
  is_wrap_token_gte?: InputMaybe<Scalars['Int']['input']>
  is_wrap_token_in?: InputMaybe<Array<Scalars['Int']['input']>>
  is_wrap_token_lt?: InputMaybe<Scalars['Int']['input']>
  is_wrap_token_lte?: InputMaybe<Scalars['Int']['input']>
  is_wrap_token_not?: InputMaybe<Scalars['Int']['input']>
  is_wrap_token_not_in?: InputMaybe<Array<Scalars['Int']['input']>>
  logo?: InputMaybe<Scalars['String']['input']>
  logo_contains?: InputMaybe<Scalars['String']['input']>
  logo_contains_nocase?: InputMaybe<Scalars['String']['input']>
  logo_ends_with?: InputMaybe<Scalars['String']['input']>
  logo_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  logo_gt?: InputMaybe<Scalars['String']['input']>
  logo_gte?: InputMaybe<Scalars['String']['input']>
  logo_in?: InputMaybe<Array<Scalars['String']['input']>>
  logo_lt?: InputMaybe<Scalars['String']['input']>
  logo_lte?: InputMaybe<Scalars['String']['input']>
  logo_not?: InputMaybe<Scalars['String']['input']>
  logo_not_contains?: InputMaybe<Scalars['String']['input']>
  logo_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  logo_not_ends_with?: InputMaybe<Scalars['String']['input']>
  logo_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  logo_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  logo_not_starts_with?: InputMaybe<Scalars['String']['input']>
  logo_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  logo_starts_with?: InputMaybe<Scalars['String']['input']>
  logo_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
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
  or?: InputMaybe<Array<InputMaybe<Token_Filter>>>
  pools_?: InputMaybe<Asset_Filter>
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
  | 'chain_ids'
  | 'coingecko_id'
  | 'decimals'
  | 'id'
  | 'in_pool'
  | 'is_wrap_token'
  | 'logo'
  | 'name'
  | 'pools'
  | 'symbol'
  | 'wraps'
  | 'wraps__coingecko_id'
  | 'wraps__decimals'
  | 'wraps__id'
  | 'wraps__in_pool'
  | 'wraps__is_wrap_token'
  | 'wraps__logo'
  | 'wraps__name'
  | 'wraps__symbol'

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
  and?: InputMaybe<Array<InputMaybe<TotalValueLocked_Filter>>>
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
  or?: InputMaybe<Array<InputMaybe<TotalValueLocked_Filter>>>
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
  | 'manager__created_at'
  | 'manager__description'
  | 'manager__discord'
  | 'manager__id'
  | 'manager__image'
  | 'manager__is_nft'
  | 'manager__nft_chain'
  | 'manager__nft_collection_name'
  | 'manager__nft_contract_type'
  | 'manager__nft_description'
  | 'manager__nft_name'
  | 'manager__nft_symbol'
  | 'manager__nft_token_address'
  | 'manager__nft_token_num'
  | 'manager__nickname'
  | 'manager__pool_count'
  | 'manager__telegram'
  | 'manager__total_value_locked_btc'
  | 'manager__total_value_locked_usd'
  | 'manager__twitter'
  | 'manager__unique_investors'
  | 'manager__updated_at'
  | 'manager__website'
  | 'open'
  | 'pool'
  | 'pool__address'
  | 'pool__chain_id'
  | 'pool__change'
  | 'pool__controller'
  | 'pool__created_at'
  | 'pool__decimals'
  | 'pool__deposits_broker_btc'
  | 'pool__deposits_broker_usd'
  | 'pool__deposits_btc'
  | 'pool__deposits_usd'
  | 'pool__factory'
  | 'pool__featured'
  | 'pool__fee_aum'
  | 'pool__fee_aum_kassandra'
  | 'pool__fee_exit'
  | 'pool__fee_join_broker'
  | 'pool__fee_join_manager'
  | 'pool__fee_swap'
  | 'pool__founded_by'
  | 'pool__id'
  | 'pool__is_private_pool'
  | 'pool__last_harvest'
  | 'pool__logo'
  | 'pool__name'
  | 'pool__num_activities'
  | 'pool__num_brokers'
  | 'pool__num_deposits'
  | 'pool__num_deposits_broker'
  | 'pool__num_exit'
  | 'pool__num_join'
  | 'pool__num_swap'
  | 'pool__num_token_add'
  | 'pool__num_token_remove'
  | 'pool__num_tx'
  | 'pool__num_weight_goals'
  | 'pool__pool_id'
  | 'pool__pool_version'
  | 'pool__price_btc'
  | 'pool__price_usd'
  | 'pool__short_summary'
  | 'pool__strategy'
  | 'pool__summary'
  | 'pool__supply'
  | 'pool__symbol'
  | 'pool__total_fees_aum_kassandra'
  | 'pool__total_fees_aum_kassandra_btc'
  | 'pool__total_fees_aum_kassandra_usd'
  | 'pool__total_fees_aum_manager'
  | 'pool__total_fees_aum_manager_btc'
  | 'pool__total_fees_aum_manager_usd'
  | 'pool__total_fees_exit'
  | 'pool__total_fees_exit_btc'
  | 'pool__total_fees_exit_usd'
  | 'pool__total_fees_join_broker'
  | 'pool__total_fees_join_broker_btc'
  | 'pool__total_fees_join_broker_usd'
  | 'pool__total_fees_join_manager'
  | 'pool__total_fees_join_manager_btc'
  | 'pool__total_fees_join_manager_usd'
  | 'pool__total_fees_swap_btc'
  | 'pool__total_fees_swap_usd'
  | 'pool__total_value_locked_btc'
  | 'pool__total_value_locked_usd'
  | 'pool__total_volume_btc'
  | 'pool__total_volume_usd'
  | 'pool__unique_investors'
  | 'pool__unique_investors_broker'
  | 'pool__url'
  | 'pool__vault'
  | 'pool__vault_id'
  | 'pool__whitelist'
  | 'timestamp'

/**
 * User with voting power in the governance
 *
 */
export type User = {
  __typename?: 'User'
  created_at?: Maybe<Scalars['String']['output']>
  delegates: Array<Delegation>
  description?: Maybe<Scalars['String']['output']>
  discord?: Maybe<Scalars['String']['output']>
  /**
   * wallet address
   *
   */
  id: Scalars['ID']['output']
  image?: Maybe<Scalars['String']['output']>
  is_nft?: Maybe<Scalars['Boolean']['output']>
  manager?: Maybe<Manager>
  nft_chain?: Maybe<Scalars['String']['output']>
  nft_collection_name?: Maybe<Scalars['String']['output']>
  nft_contract_type?: Maybe<Scalars['String']['output']>
  nft_description?: Maybe<Scalars['String']['output']>
  nft_name?: Maybe<Scalars['String']['output']>
  nft_symbol?: Maybe<Scalars['String']['output']>
  nft_token_address?: Maybe<Scalars['String']['output']>
  nft_token_num?: Maybe<Scalars['String']['output']>
  nickname?: Maybe<Scalars['String']['output']>
  proposals: Array<Proposal>
  telegram?: Maybe<Scalars['String']['output']>
  twitter?: Maybe<Scalars['String']['output']>
  unstakingPools: Array<Scalars['BigInt']['output']>
  updated_at?: Maybe<Scalars['String']['output']>
  votes: Array<Vote>
  votingPower: Scalars['BigDecimal']['output']
  website?: Maybe<Scalars['String']['output']>
}

/**
 * User with voting power in the governance
 *
 */
export type UserDelegatesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Delegation_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<Delegation_Filter>
}

/**
 * User with voting power in the governance
 *
 */
export type UserProposalsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Proposal_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<Proposal_Filter>
}

/**
 * User with voting power in the governance
 *
 */
export type UserVotesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Vote_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<Vote_Filter>
}

export type User_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<User_Filter>>>
  created_at?: InputMaybe<Scalars['String']['input']>
  created_at_contains?: InputMaybe<Scalars['String']['input']>
  created_at_contains_nocase?: InputMaybe<Scalars['String']['input']>
  created_at_ends_with?: InputMaybe<Scalars['String']['input']>
  created_at_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  created_at_gt?: InputMaybe<Scalars['String']['input']>
  created_at_gte?: InputMaybe<Scalars['String']['input']>
  created_at_in?: InputMaybe<Array<Scalars['String']['input']>>
  created_at_lt?: InputMaybe<Scalars['String']['input']>
  created_at_lte?: InputMaybe<Scalars['String']['input']>
  created_at_not?: InputMaybe<Scalars['String']['input']>
  created_at_not_contains?: InputMaybe<Scalars['String']['input']>
  created_at_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  created_at_not_ends_with?: InputMaybe<Scalars['String']['input']>
  created_at_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  created_at_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  created_at_not_starts_with?: InputMaybe<Scalars['String']['input']>
  created_at_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  created_at_starts_with?: InputMaybe<Scalars['String']['input']>
  created_at_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  delegates_?: InputMaybe<Delegation_Filter>
  description?: InputMaybe<Scalars['String']['input']>
  description_contains?: InputMaybe<Scalars['String']['input']>
  description_contains_nocase?: InputMaybe<Scalars['String']['input']>
  description_ends_with?: InputMaybe<Scalars['String']['input']>
  description_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  description_gt?: InputMaybe<Scalars['String']['input']>
  description_gte?: InputMaybe<Scalars['String']['input']>
  description_in?: InputMaybe<Array<Scalars['String']['input']>>
  description_lt?: InputMaybe<Scalars['String']['input']>
  description_lte?: InputMaybe<Scalars['String']['input']>
  description_not?: InputMaybe<Scalars['String']['input']>
  description_not_contains?: InputMaybe<Scalars['String']['input']>
  description_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  description_not_ends_with?: InputMaybe<Scalars['String']['input']>
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  description_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  description_not_starts_with?: InputMaybe<Scalars['String']['input']>
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  description_starts_with?: InputMaybe<Scalars['String']['input']>
  description_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  discord?: InputMaybe<Scalars['String']['input']>
  discord_contains?: InputMaybe<Scalars['String']['input']>
  discord_contains_nocase?: InputMaybe<Scalars['String']['input']>
  discord_ends_with?: InputMaybe<Scalars['String']['input']>
  discord_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  discord_gt?: InputMaybe<Scalars['String']['input']>
  discord_gte?: InputMaybe<Scalars['String']['input']>
  discord_in?: InputMaybe<Array<Scalars['String']['input']>>
  discord_lt?: InputMaybe<Scalars['String']['input']>
  discord_lte?: InputMaybe<Scalars['String']['input']>
  discord_not?: InputMaybe<Scalars['String']['input']>
  discord_not_contains?: InputMaybe<Scalars['String']['input']>
  discord_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  discord_not_ends_with?: InputMaybe<Scalars['String']['input']>
  discord_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  discord_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  discord_not_starts_with?: InputMaybe<Scalars['String']['input']>
  discord_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  discord_starts_with?: InputMaybe<Scalars['String']['input']>
  discord_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  image?: InputMaybe<Scalars['String']['input']>
  image_contains?: InputMaybe<Scalars['String']['input']>
  image_contains_nocase?: InputMaybe<Scalars['String']['input']>
  image_ends_with?: InputMaybe<Scalars['String']['input']>
  image_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  image_gt?: InputMaybe<Scalars['String']['input']>
  image_gte?: InputMaybe<Scalars['String']['input']>
  image_in?: InputMaybe<Array<Scalars['String']['input']>>
  image_lt?: InputMaybe<Scalars['String']['input']>
  image_lte?: InputMaybe<Scalars['String']['input']>
  image_not?: InputMaybe<Scalars['String']['input']>
  image_not_contains?: InputMaybe<Scalars['String']['input']>
  image_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  image_not_ends_with?: InputMaybe<Scalars['String']['input']>
  image_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  image_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  image_not_starts_with?: InputMaybe<Scalars['String']['input']>
  image_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  image_starts_with?: InputMaybe<Scalars['String']['input']>
  image_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  is_nft?: InputMaybe<Scalars['Boolean']['input']>
  is_nft_in?: InputMaybe<Array<Scalars['Boolean']['input']>>
  is_nft_not?: InputMaybe<Scalars['Boolean']['input']>
  is_nft_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>
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
  nft_chain?: InputMaybe<Scalars['String']['input']>
  nft_chain_contains?: InputMaybe<Scalars['String']['input']>
  nft_chain_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nft_chain_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_chain_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_chain_gt?: InputMaybe<Scalars['String']['input']>
  nft_chain_gte?: InputMaybe<Scalars['String']['input']>
  nft_chain_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_chain_lt?: InputMaybe<Scalars['String']['input']>
  nft_chain_lte?: InputMaybe<Scalars['String']['input']>
  nft_chain_not?: InputMaybe<Scalars['String']['input']>
  nft_chain_not_contains?: InputMaybe<Scalars['String']['input']>
  nft_chain_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nft_chain_not_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_chain_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_chain_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_chain_not_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_chain_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_chain_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_chain_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_collection_name?: InputMaybe<Scalars['String']['input']>
  nft_collection_name_contains?: InputMaybe<Scalars['String']['input']>
  nft_collection_name_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nft_collection_name_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_collection_name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_collection_name_gt?: InputMaybe<Scalars['String']['input']>
  nft_collection_name_gte?: InputMaybe<Scalars['String']['input']>
  nft_collection_name_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_collection_name_lt?: InputMaybe<Scalars['String']['input']>
  nft_collection_name_lte?: InputMaybe<Scalars['String']['input']>
  nft_collection_name_not?: InputMaybe<Scalars['String']['input']>
  nft_collection_name_not_contains?: InputMaybe<Scalars['String']['input']>
  nft_collection_name_not_contains_nocase?: InputMaybe<
    Scalars['String']['input']
  >
  nft_collection_name_not_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_collection_name_not_ends_with_nocase?: InputMaybe<
    Scalars['String']['input']
  >
  nft_collection_name_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_collection_name_not_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_collection_name_not_starts_with_nocase?: InputMaybe<
    Scalars['String']['input']
  >
  nft_collection_name_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_collection_name_starts_with_nocase?: InputMaybe<
    Scalars['String']['input']
  >
  nft_contract_type?: InputMaybe<Scalars['String']['input']>
  nft_contract_type_contains?: InputMaybe<Scalars['String']['input']>
  nft_contract_type_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nft_contract_type_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_contract_type_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_contract_type_gt?: InputMaybe<Scalars['String']['input']>
  nft_contract_type_gte?: InputMaybe<Scalars['String']['input']>
  nft_contract_type_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_contract_type_lt?: InputMaybe<Scalars['String']['input']>
  nft_contract_type_lte?: InputMaybe<Scalars['String']['input']>
  nft_contract_type_not?: InputMaybe<Scalars['String']['input']>
  nft_contract_type_not_contains?: InputMaybe<Scalars['String']['input']>
  nft_contract_type_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nft_contract_type_not_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_contract_type_not_ends_with_nocase?: InputMaybe<
    Scalars['String']['input']
  >
  nft_contract_type_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_contract_type_not_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_contract_type_not_starts_with_nocase?: InputMaybe<
    Scalars['String']['input']
  >
  nft_contract_type_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_contract_type_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_description?: InputMaybe<Scalars['String']['input']>
  nft_description_contains?: InputMaybe<Scalars['String']['input']>
  nft_description_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nft_description_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_description_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_description_gt?: InputMaybe<Scalars['String']['input']>
  nft_description_gte?: InputMaybe<Scalars['String']['input']>
  nft_description_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_description_lt?: InputMaybe<Scalars['String']['input']>
  nft_description_lte?: InputMaybe<Scalars['String']['input']>
  nft_description_not?: InputMaybe<Scalars['String']['input']>
  nft_description_not_contains?: InputMaybe<Scalars['String']['input']>
  nft_description_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nft_description_not_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_description_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_description_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_description_not_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_description_not_starts_with_nocase?: InputMaybe<
    Scalars['String']['input']
  >
  nft_description_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_description_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_name?: InputMaybe<Scalars['String']['input']>
  nft_name_contains?: InputMaybe<Scalars['String']['input']>
  nft_name_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nft_name_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_name_gt?: InputMaybe<Scalars['String']['input']>
  nft_name_gte?: InputMaybe<Scalars['String']['input']>
  nft_name_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_name_lt?: InputMaybe<Scalars['String']['input']>
  nft_name_lte?: InputMaybe<Scalars['String']['input']>
  nft_name_not?: InputMaybe<Scalars['String']['input']>
  nft_name_not_contains?: InputMaybe<Scalars['String']['input']>
  nft_name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nft_name_not_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_name_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_name_not_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_name_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_symbol?: InputMaybe<Scalars['String']['input']>
  nft_symbol_contains?: InputMaybe<Scalars['String']['input']>
  nft_symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nft_symbol_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_symbol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_symbol_gt?: InputMaybe<Scalars['String']['input']>
  nft_symbol_gte?: InputMaybe<Scalars['String']['input']>
  nft_symbol_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_symbol_lt?: InputMaybe<Scalars['String']['input']>
  nft_symbol_lte?: InputMaybe<Scalars['String']['input']>
  nft_symbol_not?: InputMaybe<Scalars['String']['input']>
  nft_symbol_not_contains?: InputMaybe<Scalars['String']['input']>
  nft_symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nft_symbol_not_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_symbol_not_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_symbol_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_symbol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_token_address?: InputMaybe<Scalars['String']['input']>
  nft_token_address_contains?: InputMaybe<Scalars['String']['input']>
  nft_token_address_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nft_token_address_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_token_address_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_token_address_gt?: InputMaybe<Scalars['String']['input']>
  nft_token_address_gte?: InputMaybe<Scalars['String']['input']>
  nft_token_address_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_token_address_lt?: InputMaybe<Scalars['String']['input']>
  nft_token_address_lte?: InputMaybe<Scalars['String']['input']>
  nft_token_address_not?: InputMaybe<Scalars['String']['input']>
  nft_token_address_not_contains?: InputMaybe<Scalars['String']['input']>
  nft_token_address_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nft_token_address_not_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_token_address_not_ends_with_nocase?: InputMaybe<
    Scalars['String']['input']
  >
  nft_token_address_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_token_address_not_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_token_address_not_starts_with_nocase?: InputMaybe<
    Scalars['String']['input']
  >
  nft_token_address_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_token_address_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_token_num?: InputMaybe<Scalars['String']['input']>
  nft_token_num_contains?: InputMaybe<Scalars['String']['input']>
  nft_token_num_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nft_token_num_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_token_num_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_token_num_gt?: InputMaybe<Scalars['String']['input']>
  nft_token_num_gte?: InputMaybe<Scalars['String']['input']>
  nft_token_num_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_token_num_lt?: InputMaybe<Scalars['String']['input']>
  nft_token_num_lte?: InputMaybe<Scalars['String']['input']>
  nft_token_num_not?: InputMaybe<Scalars['String']['input']>
  nft_token_num_not_contains?: InputMaybe<Scalars['String']['input']>
  nft_token_num_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nft_token_num_not_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_token_num_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_token_num_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  nft_token_num_not_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_token_num_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  nft_token_num_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_token_num_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  nickname?: InputMaybe<Scalars['String']['input']>
  nickname_contains?: InputMaybe<Scalars['String']['input']>
  nickname_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nickname_ends_with?: InputMaybe<Scalars['String']['input']>
  nickname_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  nickname_gt?: InputMaybe<Scalars['String']['input']>
  nickname_gte?: InputMaybe<Scalars['String']['input']>
  nickname_in?: InputMaybe<Array<Scalars['String']['input']>>
  nickname_lt?: InputMaybe<Scalars['String']['input']>
  nickname_lte?: InputMaybe<Scalars['String']['input']>
  nickname_not?: InputMaybe<Scalars['String']['input']>
  nickname_not_contains?: InputMaybe<Scalars['String']['input']>
  nickname_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  nickname_not_ends_with?: InputMaybe<Scalars['String']['input']>
  nickname_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  nickname_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  nickname_not_starts_with?: InputMaybe<Scalars['String']['input']>
  nickname_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  nickname_starts_with?: InputMaybe<Scalars['String']['input']>
  nickname_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  or?: InputMaybe<Array<InputMaybe<User_Filter>>>
  proposals_?: InputMaybe<Proposal_Filter>
  telegram?: InputMaybe<Scalars['String']['input']>
  telegram_contains?: InputMaybe<Scalars['String']['input']>
  telegram_contains_nocase?: InputMaybe<Scalars['String']['input']>
  telegram_ends_with?: InputMaybe<Scalars['String']['input']>
  telegram_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  telegram_gt?: InputMaybe<Scalars['String']['input']>
  telegram_gte?: InputMaybe<Scalars['String']['input']>
  telegram_in?: InputMaybe<Array<Scalars['String']['input']>>
  telegram_lt?: InputMaybe<Scalars['String']['input']>
  telegram_lte?: InputMaybe<Scalars['String']['input']>
  telegram_not?: InputMaybe<Scalars['String']['input']>
  telegram_not_contains?: InputMaybe<Scalars['String']['input']>
  telegram_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  telegram_not_ends_with?: InputMaybe<Scalars['String']['input']>
  telegram_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  telegram_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  telegram_not_starts_with?: InputMaybe<Scalars['String']['input']>
  telegram_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  telegram_starts_with?: InputMaybe<Scalars['String']['input']>
  telegram_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  twitter?: InputMaybe<Scalars['String']['input']>
  twitter_contains?: InputMaybe<Scalars['String']['input']>
  twitter_contains_nocase?: InputMaybe<Scalars['String']['input']>
  twitter_ends_with?: InputMaybe<Scalars['String']['input']>
  twitter_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  twitter_gt?: InputMaybe<Scalars['String']['input']>
  twitter_gte?: InputMaybe<Scalars['String']['input']>
  twitter_in?: InputMaybe<Array<Scalars['String']['input']>>
  twitter_lt?: InputMaybe<Scalars['String']['input']>
  twitter_lte?: InputMaybe<Scalars['String']['input']>
  twitter_not?: InputMaybe<Scalars['String']['input']>
  twitter_not_contains?: InputMaybe<Scalars['String']['input']>
  twitter_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  twitter_not_ends_with?: InputMaybe<Scalars['String']['input']>
  twitter_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  twitter_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  twitter_not_starts_with?: InputMaybe<Scalars['String']['input']>
  twitter_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  twitter_starts_with?: InputMaybe<Scalars['String']['input']>
  twitter_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  unstakingPools?: InputMaybe<Array<Scalars['BigInt']['input']>>
  unstakingPools_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>
  unstakingPools_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>
  unstakingPools_not?: InputMaybe<Array<Scalars['BigInt']['input']>>
  unstakingPools_not_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>
  unstakingPools_not_contains_nocase?: InputMaybe<
    Array<Scalars['BigInt']['input']>
  >
  updated_at?: InputMaybe<Scalars['String']['input']>
  updated_at_contains?: InputMaybe<Scalars['String']['input']>
  updated_at_contains_nocase?: InputMaybe<Scalars['String']['input']>
  updated_at_ends_with?: InputMaybe<Scalars['String']['input']>
  updated_at_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  updated_at_gt?: InputMaybe<Scalars['String']['input']>
  updated_at_gte?: InputMaybe<Scalars['String']['input']>
  updated_at_in?: InputMaybe<Array<Scalars['String']['input']>>
  updated_at_lt?: InputMaybe<Scalars['String']['input']>
  updated_at_lte?: InputMaybe<Scalars['String']['input']>
  updated_at_not?: InputMaybe<Scalars['String']['input']>
  updated_at_not_contains?: InputMaybe<Scalars['String']['input']>
  updated_at_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  updated_at_not_ends_with?: InputMaybe<Scalars['String']['input']>
  updated_at_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  updated_at_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  updated_at_not_starts_with?: InputMaybe<Scalars['String']['input']>
  updated_at_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  updated_at_starts_with?: InputMaybe<Scalars['String']['input']>
  updated_at_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  votes_?: InputMaybe<Vote_Filter>
  votingPower?: InputMaybe<Scalars['BigDecimal']['input']>
  votingPower_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  votingPower_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  votingPower_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  votingPower_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  votingPower_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  votingPower_not?: InputMaybe<Scalars['BigDecimal']['input']>
  votingPower_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  website?: InputMaybe<Scalars['String']['input']>
  website_contains?: InputMaybe<Scalars['String']['input']>
  website_contains_nocase?: InputMaybe<Scalars['String']['input']>
  website_ends_with?: InputMaybe<Scalars['String']['input']>
  website_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  website_gt?: InputMaybe<Scalars['String']['input']>
  website_gte?: InputMaybe<Scalars['String']['input']>
  website_in?: InputMaybe<Array<Scalars['String']['input']>>
  website_lt?: InputMaybe<Scalars['String']['input']>
  website_lte?: InputMaybe<Scalars['String']['input']>
  website_not?: InputMaybe<Scalars['String']['input']>
  website_not_contains?: InputMaybe<Scalars['String']['input']>
  website_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  website_not_ends_with?: InputMaybe<Scalars['String']['input']>
  website_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  website_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  website_not_starts_with?: InputMaybe<Scalars['String']['input']>
  website_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  website_starts_with?: InputMaybe<Scalars['String']['input']>
  website_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
}

export type User_OrderBy =
  | 'created_at'
  | 'delegates'
  | 'description'
  | 'discord'
  | 'id'
  | 'image'
  | 'is_nft'
  | 'manager'
  | 'manager__created_at'
  | 'manager__description'
  | 'manager__discord'
  | 'manager__id'
  | 'manager__image'
  | 'manager__is_nft'
  | 'manager__nft_chain'
  | 'manager__nft_collection_name'
  | 'manager__nft_contract_type'
  | 'manager__nft_description'
  | 'manager__nft_name'
  | 'manager__nft_symbol'
  | 'manager__nft_token_address'
  | 'manager__nft_token_num'
  | 'manager__nickname'
  | 'manager__pool_count'
  | 'manager__telegram'
  | 'manager__total_value_locked_btc'
  | 'manager__total_value_locked_usd'
  | 'manager__twitter'
  | 'manager__unique_investors'
  | 'manager__updated_at'
  | 'manager__website'
  | 'nft_chain'
  | 'nft_collection_name'
  | 'nft_contract_type'
  | 'nft_description'
  | 'nft_name'
  | 'nft_symbol'
  | 'nft_token_address'
  | 'nft_token_num'
  | 'nickname'
  | 'proposals'
  | 'telegram'
  | 'twitter'
  | 'unstakingPools'
  | 'updated_at'
  | 'votes'
  | 'votingPower'
  | 'website'

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
  and?: InputMaybe<Array<InputMaybe<Volume_Filter>>>
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
  or?: InputMaybe<Array<InputMaybe<Volume_Filter>>>
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
  | 'kassandra__deposits_btc'
  | 'kassandra__deposits_usd'
  | 'kassandra__fee_aum_kassandra'
  | 'kassandra__id'
  | 'kassandra__num_deposits'
  | 'kassandra__num_managers'
  | 'kassandra__num_tx'
  | 'kassandra__pool_count'
  | 'kassandra__pool_featured_count'
  | 'kassandra__total_fees_aum_kassandra_btc'
  | 'kassandra__total_fees_aum_kassandra_usd'
  | 'kassandra__total_fees_aum_manager_btc'
  | 'kassandra__total_fees_aum_manager_usd'
  | 'kassandra__total_fees_exit_btc'
  | 'kassandra__total_fees_exit_usd'
  | 'kassandra__total_fees_join_broker_btc'
  | 'kassandra__total_fees_join_broker_usd'
  | 'kassandra__total_fees_join_manager_btc'
  | 'kassandra__total_fees_join_manager_usd'
  | 'kassandra__total_fees_swap_btc'
  | 'kassandra__total_fees_swap_usd'
  | 'kassandra__total_value_locked_btc'
  | 'kassandra__total_value_locked_usd'
  | 'kassandra__total_volume_btc'
  | 'kassandra__total_volume_usd'
  | 'manager'
  | 'manager__created_at'
  | 'manager__description'
  | 'manager__discord'
  | 'manager__id'
  | 'manager__image'
  | 'manager__is_nft'
  | 'manager__nft_chain'
  | 'manager__nft_collection_name'
  | 'manager__nft_contract_type'
  | 'manager__nft_description'
  | 'manager__nft_name'
  | 'manager__nft_symbol'
  | 'manager__nft_token_address'
  | 'manager__nft_token_num'
  | 'manager__nickname'
  | 'manager__pool_count'
  | 'manager__telegram'
  | 'manager__total_value_locked_btc'
  | 'manager__total_value_locked_usd'
  | 'manager__twitter'
  | 'manager__unique_investors'
  | 'manager__updated_at'
  | 'manager__website'
  | 'num_tx'
  | 'period'
  | 'pool'
  | 'pool__address'
  | 'pool__chain_id'
  | 'pool__change'
  | 'pool__controller'
  | 'pool__created_at'
  | 'pool__decimals'
  | 'pool__deposits_broker_btc'
  | 'pool__deposits_broker_usd'
  | 'pool__deposits_btc'
  | 'pool__deposits_usd'
  | 'pool__factory'
  | 'pool__featured'
  | 'pool__fee_aum'
  | 'pool__fee_aum_kassandra'
  | 'pool__fee_exit'
  | 'pool__fee_join_broker'
  | 'pool__fee_join_manager'
  | 'pool__fee_swap'
  | 'pool__founded_by'
  | 'pool__id'
  | 'pool__is_private_pool'
  | 'pool__last_harvest'
  | 'pool__logo'
  | 'pool__name'
  | 'pool__num_activities'
  | 'pool__num_brokers'
  | 'pool__num_deposits'
  | 'pool__num_deposits_broker'
  | 'pool__num_exit'
  | 'pool__num_join'
  | 'pool__num_swap'
  | 'pool__num_token_add'
  | 'pool__num_token_remove'
  | 'pool__num_tx'
  | 'pool__num_weight_goals'
  | 'pool__pool_id'
  | 'pool__pool_version'
  | 'pool__price_btc'
  | 'pool__price_usd'
  | 'pool__short_summary'
  | 'pool__strategy'
  | 'pool__summary'
  | 'pool__supply'
  | 'pool__symbol'
  | 'pool__total_fees_aum_kassandra'
  | 'pool__total_fees_aum_kassandra_btc'
  | 'pool__total_fees_aum_kassandra_usd'
  | 'pool__total_fees_aum_manager'
  | 'pool__total_fees_aum_manager_btc'
  | 'pool__total_fees_aum_manager_usd'
  | 'pool__total_fees_exit'
  | 'pool__total_fees_exit_btc'
  | 'pool__total_fees_exit_usd'
  | 'pool__total_fees_join_broker'
  | 'pool__total_fees_join_broker_btc'
  | 'pool__total_fees_join_broker_usd'
  | 'pool__total_fees_join_manager'
  | 'pool__total_fees_join_manager_btc'
  | 'pool__total_fees_join_manager_usd'
  | 'pool__total_fees_swap_btc'
  | 'pool__total_fees_swap_usd'
  | 'pool__total_value_locked_btc'
  | 'pool__total_value_locked_usd'
  | 'pool__total_volume_btc'
  | 'pool__total_volume_usd'
  | 'pool__unique_investors'
  | 'pool__unique_investors_broker'
  | 'pool__url'
  | 'pool__vault'
  | 'pool__vault_id'
  | 'pool__whitelist'
  | 'swap_pair'
  | 'timestamp'
  | 'type'
  | 'volume_btc'
  | 'volume_usd'

/**
 * Vote of a single wallet for a single proposal
 *
 */
export type Vote = {
  __typename?: 'Vote'
  /**
   * proposal ID (governance ID + proposal number) + voting wallet address
   *
   */
  id: Scalars['ID']['output']
  proposal: Proposal
  support: Scalars['Boolean']['output']
  voter: User
  votingPower: Scalars['BigDecimal']['output']
}

export type Vote_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<Vote_Filter>>>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  or?: InputMaybe<Array<InputMaybe<Vote_Filter>>>
  proposal?: InputMaybe<Scalars['String']['input']>
  proposal_?: InputMaybe<Proposal_Filter>
  proposal_contains?: InputMaybe<Scalars['String']['input']>
  proposal_contains_nocase?: InputMaybe<Scalars['String']['input']>
  proposal_ends_with?: InputMaybe<Scalars['String']['input']>
  proposal_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  proposal_gt?: InputMaybe<Scalars['String']['input']>
  proposal_gte?: InputMaybe<Scalars['String']['input']>
  proposal_in?: InputMaybe<Array<Scalars['String']['input']>>
  proposal_lt?: InputMaybe<Scalars['String']['input']>
  proposal_lte?: InputMaybe<Scalars['String']['input']>
  proposal_not?: InputMaybe<Scalars['String']['input']>
  proposal_not_contains?: InputMaybe<Scalars['String']['input']>
  proposal_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  proposal_not_ends_with?: InputMaybe<Scalars['String']['input']>
  proposal_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  proposal_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  proposal_not_starts_with?: InputMaybe<Scalars['String']['input']>
  proposal_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  proposal_starts_with?: InputMaybe<Scalars['String']['input']>
  proposal_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  support?: InputMaybe<Scalars['Boolean']['input']>
  support_in?: InputMaybe<Array<Scalars['Boolean']['input']>>
  support_not?: InputMaybe<Scalars['Boolean']['input']>
  support_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>
  voter?: InputMaybe<Scalars['String']['input']>
  voter_?: InputMaybe<User_Filter>
  voter_contains?: InputMaybe<Scalars['String']['input']>
  voter_contains_nocase?: InputMaybe<Scalars['String']['input']>
  voter_ends_with?: InputMaybe<Scalars['String']['input']>
  voter_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  voter_gt?: InputMaybe<Scalars['String']['input']>
  voter_gte?: InputMaybe<Scalars['String']['input']>
  voter_in?: InputMaybe<Array<Scalars['String']['input']>>
  voter_lt?: InputMaybe<Scalars['String']['input']>
  voter_lte?: InputMaybe<Scalars['String']['input']>
  voter_not?: InputMaybe<Scalars['String']['input']>
  voter_not_contains?: InputMaybe<Scalars['String']['input']>
  voter_not_contains_nocase?: InputMaybe<Scalars['String']['input']>
  voter_not_ends_with?: InputMaybe<Scalars['String']['input']>
  voter_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>
  voter_not_in?: InputMaybe<Array<Scalars['String']['input']>>
  voter_not_starts_with?: InputMaybe<Scalars['String']['input']>
  voter_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  voter_starts_with?: InputMaybe<Scalars['String']['input']>
  voter_starts_with_nocase?: InputMaybe<Scalars['String']['input']>
  votingPower?: InputMaybe<Scalars['BigDecimal']['input']>
  votingPower_gt?: InputMaybe<Scalars['BigDecimal']['input']>
  votingPower_gte?: InputMaybe<Scalars['BigDecimal']['input']>
  votingPower_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
  votingPower_lt?: InputMaybe<Scalars['BigDecimal']['input']>
  votingPower_lte?: InputMaybe<Scalars['BigDecimal']['input']>
  votingPower_not?: InputMaybe<Scalars['BigDecimal']['input']>
  votingPower_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>
}

export type Vote_OrderBy =
  | 'id'
  | 'proposal'
  | 'proposal__againstVotes'
  | 'proposal__canceled'
  | 'proposal__created'
  | 'proposal__description'
  | 'proposal__endBlock'
  | 'proposal__eta'
  | 'proposal__executed'
  | 'proposal__forVotes'
  | 'proposal__id'
  | 'proposal__number'
  | 'proposal__queued'
  | 'proposal__quorum'
  | 'proposal__startBlock'
  | 'support'
  | 'voter'
  | 'voter__created_at'
  | 'voter__description'
  | 'voter__discord'
  | 'voter__id'
  | 'voter__image'
  | 'voter__is_nft'
  | 'voter__nft_chain'
  | 'voter__nft_collection_name'
  | 'voter__nft_contract_type'
  | 'voter__nft_description'
  | 'voter__nft_name'
  | 'voter__nft_symbol'
  | 'voter__nft_token_address'
  | 'voter__nft_token_num'
  | 'voter__nickname'
  | 'voter__telegram'
  | 'voter__twitter'
  | 'voter__updated_at'
  | 'voter__votingPower'
  | 'voter__website'
  | 'votingPower'

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
  and?: InputMaybe<Array<InputMaybe<WeightGoalPoint_Filter>>>
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
  or?: InputMaybe<Array<InputMaybe<WeightGoalPoint_Filter>>>
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
  | 'pool__address'
  | 'pool__chain_id'
  | 'pool__change'
  | 'pool__controller'
  | 'pool__created_at'
  | 'pool__decimals'
  | 'pool__deposits_broker_btc'
  | 'pool__deposits_broker_usd'
  | 'pool__deposits_btc'
  | 'pool__deposits_usd'
  | 'pool__factory'
  | 'pool__featured'
  | 'pool__fee_aum'
  | 'pool__fee_aum_kassandra'
  | 'pool__fee_exit'
  | 'pool__fee_join_broker'
  | 'pool__fee_join_manager'
  | 'pool__fee_swap'
  | 'pool__founded_by'
  | 'pool__id'
  | 'pool__is_private_pool'
  | 'pool__last_harvest'
  | 'pool__logo'
  | 'pool__name'
  | 'pool__num_activities'
  | 'pool__num_brokers'
  | 'pool__num_deposits'
  | 'pool__num_deposits_broker'
  | 'pool__num_exit'
  | 'pool__num_join'
  | 'pool__num_swap'
  | 'pool__num_token_add'
  | 'pool__num_token_remove'
  | 'pool__num_tx'
  | 'pool__num_weight_goals'
  | 'pool__pool_id'
  | 'pool__pool_version'
  | 'pool__price_btc'
  | 'pool__price_usd'
  | 'pool__short_summary'
  | 'pool__strategy'
  | 'pool__summary'
  | 'pool__supply'
  | 'pool__symbol'
  | 'pool__total_fees_aum_kassandra'
  | 'pool__total_fees_aum_kassandra_btc'
  | 'pool__total_fees_aum_kassandra_usd'
  | 'pool__total_fees_aum_manager'
  | 'pool__total_fees_aum_manager_btc'
  | 'pool__total_fees_aum_manager_usd'
  | 'pool__total_fees_exit'
  | 'pool__total_fees_exit_btc'
  | 'pool__total_fees_exit_usd'
  | 'pool__total_fees_join_broker'
  | 'pool__total_fees_join_broker_btc'
  | 'pool__total_fees_join_broker_usd'
  | 'pool__total_fees_join_manager'
  | 'pool__total_fees_join_manager_btc'
  | 'pool__total_fees_join_manager_usd'
  | 'pool__total_fees_swap_btc'
  | 'pool__total_fees_swap_usd'
  | 'pool__total_value_locked_btc'
  | 'pool__total_value_locked_usd'
  | 'pool__total_volume_btc'
  | 'pool__total_volume_usd'
  | 'pool__unique_investors'
  | 'pool__unique_investors_broker'
  | 'pool__url'
  | 'pool__vault'
  | 'pool__vault_id'
  | 'pool__whitelist'
  | 'previous'
  | 'previous__end_timestamp'
  | 'previous__id'
  | 'previous__start_timestamp'
  | 'previous__txHash'
  | 'previous__type'
  | 'start_timestamp'
  | 'token'
  | 'token__coingecko_id'
  | 'token__decimals'
  | 'token__id'
  | 'token__in_pool'
  | 'token__is_wrap_token'
  | 'token__logo'
  | 'token__name'
  | 'token__symbol'
  | 'txHash'
  | 'type'
  | 'weights'

export type WeightGoal_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<WeightGoal_Filter>>>
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
  or?: InputMaybe<Array<InputMaybe<WeightGoal_Filter>>>
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
  | 'asset__balance'
  | 'asset__id'
  | 'asset__weight'
  | 'asset__weight_goal'
  | 'asset__weight_goal_normalized'
  | 'asset__weight_normalized'
  | 'id'
  | 'point'
  | 'point__end_timestamp'
  | 'point__id'
  | 'point__start_timestamp'
  | 'point__txHash'
  | 'point__type'
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
  and?: InputMaybe<Array<InputMaybe<WeightPoint_Filter>>>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  or?: InputMaybe<Array<InputMaybe<WeightPoint_Filter>>>
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

export type WeightPoint_OrderBy =
  | 'id'
  | 'pool'
  | 'pool__address'
  | 'pool__chain_id'
  | 'pool__change'
  | 'pool__controller'
  | 'pool__created_at'
  | 'pool__decimals'
  | 'pool__deposits_broker_btc'
  | 'pool__deposits_broker_usd'
  | 'pool__deposits_btc'
  | 'pool__deposits_usd'
  | 'pool__factory'
  | 'pool__featured'
  | 'pool__fee_aum'
  | 'pool__fee_aum_kassandra'
  | 'pool__fee_exit'
  | 'pool__fee_join_broker'
  | 'pool__fee_join_manager'
  | 'pool__fee_swap'
  | 'pool__founded_by'
  | 'pool__id'
  | 'pool__is_private_pool'
  | 'pool__last_harvest'
  | 'pool__logo'
  | 'pool__name'
  | 'pool__num_activities'
  | 'pool__num_brokers'
  | 'pool__num_deposits'
  | 'pool__num_deposits_broker'
  | 'pool__num_exit'
  | 'pool__num_join'
  | 'pool__num_swap'
  | 'pool__num_token_add'
  | 'pool__num_token_remove'
  | 'pool__num_tx'
  | 'pool__num_weight_goals'
  | 'pool__pool_id'
  | 'pool__pool_version'
  | 'pool__price_btc'
  | 'pool__price_usd'
  | 'pool__short_summary'
  | 'pool__strategy'
  | 'pool__summary'
  | 'pool__supply'
  | 'pool__symbol'
  | 'pool__total_fees_aum_kassandra'
  | 'pool__total_fees_aum_kassandra_btc'
  | 'pool__total_fees_aum_kassandra_usd'
  | 'pool__total_fees_aum_manager'
  | 'pool__total_fees_aum_manager_btc'
  | 'pool__total_fees_aum_manager_usd'
  | 'pool__total_fees_exit'
  | 'pool__total_fees_exit_btc'
  | 'pool__total_fees_exit_usd'
  | 'pool__total_fees_join_broker'
  | 'pool__total_fees_join_broker_btc'
  | 'pool__total_fees_join_broker_usd'
  | 'pool__total_fees_join_manager'
  | 'pool__total_fees_join_manager_btc'
  | 'pool__total_fees_join_manager_usd'
  | 'pool__total_fees_swap_btc'
  | 'pool__total_fees_swap_usd'
  | 'pool__total_value_locked_btc'
  | 'pool__total_value_locked_usd'
  | 'pool__total_volume_btc'
  | 'pool__total_volume_usd'
  | 'pool__unique_investors'
  | 'pool__unique_investors_broker'
  | 'pool__url'
  | 'pool__vault'
  | 'pool__vault_id'
  | 'pool__whitelist'
  | 'timestamp'
  | 'weights'

export type Weight_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<Weight_Filter>>>
  id?: InputMaybe<Scalars['ID']['input']>
  id_gt?: InputMaybe<Scalars['ID']['input']>
  id_gte?: InputMaybe<Scalars['ID']['input']>
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>
  id_lt?: InputMaybe<Scalars['ID']['input']>
  id_lte?: InputMaybe<Scalars['ID']['input']>
  id_not?: InputMaybe<Scalars['ID']['input']>
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>
  or?: InputMaybe<Array<InputMaybe<Weight_Filter>>>
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
  | 'point__id'
  | 'point__timestamp'
  | 'token'
  | 'token__coingecko_id'
  | 'token__decimals'
  | 'token__id'
  | 'token__in_pool'
  | 'token__is_wrap_token'
  | 'token__logo'
  | 'token__name'
  | 'token__symbol'
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
    price_usd: string
    chain_id: number
    activities: Array<{
      __typename?: 'Activity'
      id: string
      address: string
      type: string
      txHash: string
      timestamp: number
      symbol: Array<string>
      amount: Array<string>
      price_usd: Array<string>
    }>
  } | null
}

export type BrokersQueryVariables = Exact<{
  poolId: Scalars['ID']['input']
  first?: InputMaybe<Scalars['Int']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
}>

export type BrokersQuery = {
  __typename?: 'Query'
  pools: Array<{
    __typename?: 'Pool'
    num_brokers: number
    brokers: Array<{
      __typename?: 'Broker'
      wallet: string
      num_deposits: number
      unique_investors: number
      deposits_usd: string
      fees_usd: string
    }>
  }>
}

export type BrokersFeesQueryVariables = Exact<{
  id: Scalars['ID']['input']
  poolId: Scalars['ID']['input']
  depositsTimestamp?: InputMaybe<Scalars['Int']['input']>
  rewardsTimestamp?: InputMaybe<Scalars['Int']['input']>
}>

export type BrokersFeesQuery = {
  __typename?: 'Query'
  manager?: {
    __typename?: 'Manager'
    pools: Array<{
      __typename?: 'Pool'
      num_deposits_broker: string
      unique_investors_broker: number
      brokeredDeposits: Array<{
        __typename?: 'Volume'
        volume_usd: string
        timestamp: number
      }>
      brokersRewards: Array<{
        __typename?: 'Fee'
        volume_broker_usd?: string | null
        timestamp: number
      }>
    }>
  } | null
}

export type CommunityPoolsQueryVariables = Exact<{
  orderBy?: InputMaybe<Pool_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  first?: InputMaybe<Scalars['Int']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  chainInId?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>
  chainInString?: InputMaybe<
    Array<Scalars['String']['input']> | Scalars['String']['input']
  >
}>

export type CommunityPoolsQuery = {
  __typename?: 'Query'
  chains: Array<{ __typename?: 'Chain'; pool_count: number }>
  pools: Array<{
    __typename?: 'Pool'
    id: string
    name: string
    symbol: string
    logo?: string | null
    address: string
    unique_investors: number
    fee_join_broker: string
    chain_id: number
    pool_id?: number | null
    change: string
    price_usd: string
    total_value_locked_usd: string
    is_private_pool: boolean
    chain: { __typename?: 'Chain'; logo?: string | null }
    volumes: Array<{ __typename?: 'Volume'; volume_usd: string }>
    underlying_assets: Array<{
      __typename?: 'Asset'
      token: {
        __typename?: 'Token'
        logo?: string | null
        wraps?: { __typename?: 'Token'; logo?: string | null } | null
      }
    }>
  }>
}

export type DelegationsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>
}>

export type DelegationsQuery = {
  __typename?: 'Query'
  delegations: Array<{
    __typename?: 'Delegation'
    pool: string
    votingPower: string
    to: { __typename?: 'User'; id: string }
    from: { __typename?: 'User'; id: string }
  }>
  received: Array<{
    __typename?: 'Delegation'
    pool: string
    votingPower: string
    from: { __typename?: 'User'; id: string }
    to: { __typename?: 'User'; id: string }
  }>
}

export type ExploreOverviewPoolsQueryVariables = Exact<{ [key: string]: never }>

export type ExploreOverviewPoolsQuery = {
  __typename?: 'Query'
  kassandras: Array<{
    __typename?: 'Kassandra'
    pool_count: number
    num_managers: number
    num_deposits: string
  }>
}

export type ExplorePoolsQueryVariables = Exact<{
  price_period: Scalars['Int']['input']
  period_selected: Scalars['Int']['input']
  month: Scalars['Int']['input']
  chainIn?: InputMaybe<
    Array<Scalars['String']['input']> | Scalars['String']['input']
  >
  orderBy?: InputMaybe<Pool_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  totalValueLockedUsdGt?: InputMaybe<Scalars['BigDecimal']['input']>
}>

export type ExplorePoolsQuery = {
  __typename?: 'Query'
  pools: Array<{
    __typename?: 'Pool'
    id: string
    name: string
    symbol: string
    logo?: string | null
    address: string
    pool_id?: number | null
    founded_by?: string | null
    price_usd: string
    pool_version: number
    featured: boolean
    fee_join_broker: string
    chain_id: number
    total_value_locked_usd: string
    strategy: string
    manager: { __typename?: 'Manager'; id: string; nickname?: string | null }
    chain: { __typename?: 'Chain'; logo?: string | null }
    price_candles: Array<{
      __typename?: 'Candle'
      timestamp: number
      close: string
    }>
    total_value_locked: Array<{
      __typename?: 'TotalValueLocked'
      close: string
      timestamp: number
    }>
    weights: Array<{
      __typename?: 'WeightPoint'
      timestamp: number
      weights: Array<{
        __typename?: 'Weight'
        weight_normalized: string
        token: { __typename?: 'Token'; id: string; symbol: string }
      }>
    }>
    underlying_assets: Array<{
      __typename?: 'Asset'
      balance: string
      weight_normalized: string
      weight_goal_normalized: string
      token: {
        __typename?: 'Token'
        id: string
        name: string
        logo?: string | null
        symbol: string
        decimals: number
        is_wrap_token: number
        wraps?: {
          __typename?: 'Token'
          id: string
          decimals: number
          symbol: string
          name: string
          logo?: string | null
        } | null
      }
    }>
    month: Array<{ __typename?: 'Candle'; timestamp: number; close: string }>
    weight_goals: Array<{
      __typename?: 'WeightGoalPoint'
      start_timestamp: number
      end_timestamp: number
      weights: Array<{
        __typename?: 'WeightGoal'
        weight_normalized: string
        asset: {
          __typename?: 'Asset'
          token: { __typename?: 'Token'; id: string }
        }
      }>
    }>
  }>
}

export type FarmPoolsQueryVariables = Exact<{
  price_period: Scalars['Int']['input']
  period_selected: Scalars['Int']['input']
  month: Scalars['Int']['input']
  chainIn?: InputMaybe<
    Array<Scalars['String']['input']> | Scalars['String']['input']
  >
  poolIdList?: InputMaybe<
    Array<Scalars['ID']['input']> | Scalars['ID']['input']
  >
}>

export type FarmPoolsQuery = {
  __typename?: 'Query'
  pools: Array<{
    __typename?: 'Pool'
    id: string
    name: string
    symbol: string
    logo?: string | null
    address: string
    pool_id?: number | null
    founded_by?: string | null
    price_usd: string
    pool_version: number
    featured: boolean
    fee_join_broker: string
    chain_id: number
    total_value_locked_usd: string
    strategy: string
    manager: { __typename?: 'Manager'; id: string; nickname?: string | null }
    chain: { __typename?: 'Chain'; logo?: string | null }
    price_candles: Array<{
      __typename?: 'Candle'
      timestamp: number
      close: string
    }>
    total_value_locked: Array<{
      __typename?: 'TotalValueLocked'
      close: string
      timestamp: number
    }>
    weights: Array<{
      __typename?: 'WeightPoint'
      timestamp: number
      weights: Array<{
        __typename?: 'Weight'
        weight_normalized: string
        token: { __typename?: 'Token'; id: string; symbol: string }
      }>
    }>
    underlying_assets: Array<{
      __typename?: 'Asset'
      balance: string
      weight_normalized: string
      weight_goal_normalized: string
      token: {
        __typename?: 'Token'
        id: string
        name: string
        logo?: string | null
        symbol: string
        decimals: number
        is_wrap_token: number
        wraps?: {
          __typename?: 'Token'
          id: string
          decimals: number
          symbol: string
          name: string
          logo?: string | null
        } | null
      }
    }>
    month: Array<{ __typename?: 'Candle'; timestamp: number; close: string }>
    weight_goals: Array<{
      __typename?: 'WeightGoalPoint'
      start_timestamp: number
      end_timestamp: number
      weights: Array<{
        __typename?: 'WeightGoal'
        weight_normalized: string
        asset: {
          __typename?: 'Asset'
          token: { __typename?: 'Token'; id: string }
        }
      }>
    }>
  }>
}

export type FeaturedPoolsQueryVariables = Exact<{
  price_period: Scalars['Int']['input']
  period_selected: Scalars['Int']['input']
  month: Scalars['Int']['input']
  chainIn?: InputMaybe<
    Array<Scalars['String']['input']> | Scalars['String']['input']
  >
}>

export type FeaturedPoolsQuery = {
  __typename?: 'Query'
  pools: Array<{
    __typename?: 'Pool'
    id: string
    name: string
    symbol: string
    logo?: string | null
    address: string
    pool_id?: number | null
    founded_by?: string | null
    price_usd: string
    pool_version: number
    featured: boolean
    fee_join_broker: string
    chain_id: number
    total_value_locked_usd: string
    strategy: string
    manager: { __typename?: 'Manager'; id: string; nickname?: string | null }
    chain: { __typename?: 'Chain'; logo?: string | null }
    price_candles: Array<{
      __typename?: 'Candle'
      timestamp: number
      close: string
    }>
    total_value_locked: Array<{
      __typename?: 'TotalValueLocked'
      close: string
      timestamp: number
    }>
    weights: Array<{
      __typename?: 'WeightPoint'
      timestamp: number
      weights: Array<{
        __typename?: 'Weight'
        weight_normalized: string
        token: { __typename?: 'Token'; id: string; symbol: string }
      }>
    }>
    underlying_assets: Array<{
      __typename?: 'Asset'
      balance: string
      weight_normalized: string
      weight_goal_normalized: string
      token: {
        __typename?: 'Token'
        id: string
        name: string
        logo?: string | null
        symbol: string
        decimals: number
        is_wrap_token: number
        wraps?: {
          __typename?: 'Token'
          id: string
          decimals: number
          symbol: string
          name: string
          logo?: string | null
        } | null
      }
    }>
    month: Array<{ __typename?: 'Candle'; timestamp: number; close: string }>
    weight_goals: Array<{
      __typename?: 'WeightGoalPoint'
      start_timestamp: number
      end_timestamp: number
      weights: Array<{
        __typename?: 'WeightGoal'
        weight_normalized: string
        asset: {
          __typename?: 'Asset'
          token: { __typename?: 'Token'; id: string }
        }
      }>
    }>
  }>
}

export type FeesQueryVariables = Exact<{
  poolId: Scalars['ID']['input']
}>

export type FeesQuery = {
  __typename?: 'Query'
  pool?: {
    __typename?: 'Pool'
    chain_id: number
    price_usd: string
    symbol: string
    controller: string
    fee_join_manager: string
    fee_join_broker: string
    total_fees_join_manager_usd: string
    total_fees_join_broker_usd: string
    total_fees_aum_manager_usd: string
    total_fees_aum_kassandra_usd: string
    fee_aum: string
    fee_aum_kassandra: string
    last_harvest?: string | null
    manager: { __typename?: 'Manager'; id: string }
    fees: Array<{
      __typename?: 'Fee'
      type: string
      period: number
      volume_usd: string
      volume_broker_usd?: string | null
      timestamp: number
    }>
    lasCollectedAum: Array<{ __typename?: 'Fee'; timestamp: number }>
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
    founded_by?: string | null
    price_usd: string
    pool_version: number
    featured: boolean
    total_value_locked_usd: string
    strategy: string
    manager: { __typename?: 'Manager'; id: string; nickname?: string | null }
    chain: { __typename?: 'Chain'; logo?: string | null }
    price_candles: Array<{
      __typename?: 'Candle'
      timestamp: number
      close: string
    }>
    total_value_locked: Array<{
      __typename?: 'TotalValueLocked'
      close: string
      timestamp: number
    }>
    weights: Array<{
      __typename?: 'WeightPoint'
      timestamp: number
      weights: Array<{
        __typename?: 'Weight'
        weight_normalized: string
        token: { __typename?: 'Token'; id: string; symbol: string }
      }>
    }>
    underlying_assets: Array<{
      __typename?: 'Asset'
      balance: string
      weight_normalized: string
      weight_goal_normalized: string
      token: {
        __typename?: 'Token'
        id: string
        name: string
        logo?: string | null
        symbol: string
        decimals: number
        is_wrap_token: number
        wraps?: {
          __typename?: 'Token'
          id: string
          decimals: number
          symbol: string
          name: string
          logo?: string | null
        } | null
      }
    }>
    now: Array<{ __typename?: 'Candle'; timestamp: number; close: string }>
    day: Array<{ __typename?: 'Candle'; timestamp: number; close: string }>
    month: Array<{ __typename?: 'Candle'; timestamp: number; close: string }>
    weight_goals: Array<{
      __typename?: 'WeightGoalPoint'
      start_timestamp: number
      end_timestamp: number
      weights: Array<{
        __typename?: 'WeightGoal'
        weight_normalized: string
        asset: {
          __typename?: 'Asset'
          token: { __typename?: 'Token'; id: string }
        }
      }>
    }>
  } | null
}

export type InvestorsAmountQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>
  investorsAddresses?: InputMaybe<
    Array<Scalars['String']['input']> | Scalars['String']['input']
  >
}>

export type InvestorsAmountQuery = {
  __typename?: 'Query'
  investors: Array<{ __typename?: 'Investor'; wallet: string; amount: string }>
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
      close: string
    }>
    day: Array<{
      __typename?: 'TotalValueLocked'
      timestamp: number
      close: string
    }>
    week: Array<{
      __typename?: 'TotalValueLocked'
      timestamp: number
      close: string
    }>
    month: Array<{
      __typename?: 'TotalValueLocked'
      timestamp: number
      close: string
    }>
    year: Array<{
      __typename?: 'TotalValueLocked'
      timestamp: number
      close: string
    }>
    max: Array<{
      __typename?: 'TotalValueLocked'
      timestamp: number
      close: string
    }>
  } | null
}

export type ManagerDepositFeeQueryVariables = Exact<{
  id: Scalars['ID']['input']
  poolId: Scalars['ID']['input']
}>

export type ManagerDepositFeeQuery = {
  __typename?: 'Query'
  manager?: {
    __typename?: 'Manager'
    pools: Array<{
      __typename?: 'Pool'
      fee_join_broker: string
      fee_join_manager: string
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
      volume_usd: string
      timestamp: number
    }>
  } | null
}

export type ManagerJoinFeesQueryVariables = Exact<{
  id: Scalars['ID']['input']
  poolId: Scalars['ID']['input']
}>

export type ManagerJoinFeesQuery = {
  __typename?: 'Query'
  manager?: {
    __typename?: 'Manager'
    pools: Array<{
      __typename?: 'Pool'
      fees: Array<{
        __typename?: 'Fee'
        type: string
        volume_usd: string
        volume_broker_usd?: string | null
        timestamp: number
      }>
      volumes: Array<{
        __typename?: 'Volume'
        volume_usd: string
        swap_pair: string
        timestamp: number
      }>
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
        symbol: string
        wraps?: {
          __typename?: 'Token'
          symbol: string
          logo?: string | null
        } | null
      }
    }>
    chain: { __typename?: 'Chain'; block_explorer_url: string }
    activities: Array<{
      __typename?: 'Activity'
      id: string
      type: string
      timestamp: number
      price_usd: Array<string>
      txHash: string
      address: string
      symbol: Array<string>
      amount: Array<string>
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
          weight_normalized: string
          asset: {
            __typename?: 'Asset'
            token: { __typename?: 'Token'; symbol: string }
          }
        }>
      } | null
      token?: {
        __typename?: 'Token'
        symbol: string
        logo?: string | null
      } | null
      weights: Array<{
        __typename?: 'WeightGoal'
        weight_normalized: string
        asset: {
          __typename?: 'Asset'
          balance: string
          token: { __typename?: 'Token'; symbol: string; logo?: string | null }
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
    strategy: string
    pool_version: number
    is_private_pool: boolean
    decimals: number
    name: string
    symbol: string
    pool_id?: number | null
    total_value_locked_usd: string
    underlying_assets_addresses: Array<string>
    controller: string
    price_usd: string
    manager: { __typename?: 'Manager'; id: string }
    chain: {
      __typename?: 'Chain'
      id: string
      name: string
      token_name: string
      token_symbol: string
      token_decimals: number
      rpc_urls: Array<string>
      block_explorer_url: string
      seconds_per_block: number
      address_wrapped?: string | null
      logo?: string | null
    }
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
    chain: { __typename?: 'Chain'; logo?: string | null }
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
      close: string
      timestamp: number
    }>
  } | null
}

export type ManagerTotalManagedQueryVariables = Exact<{
  manager: Scalars['ID']['input']
}>

export type ManagerTotalManagedQuery = {
  __typename?: 'Query'
  manager?: { __typename?: 'Manager'; total_value_locked_usd: string } | null
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
      volume_usd: string
      timestamp: number
    }>
  } | null
}

export type ManagersPoolsQueryVariables = Exact<{
  day?: InputMaybe<Scalars['Int']['input']>
  month?: InputMaybe<Scalars['Int']['input']>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
}>

export type ManagersPoolsQuery = {
  __typename?: 'Query'
  totalManagers: Array<{ __typename?: 'Manager'; id: string }>
  managers: Array<{
    __typename?: 'Manager'
    id: string
    nickname?: string | null
    is_nft?: boolean | null
    image?: string | null
    pool_count: number
    unique_investors: number
    total_value_locked_usd: string
    TVLDay: Array<{
      __typename?: 'TotalValueLocked'
      timestamp: number
      close: string
    }>
    TVLMonthly: Array<{
      __typename?: 'TotalValueLocked'
      timestamp: number
      close: string
    }>
  }>
}

export type MyPoolsQueryVariables = Exact<{
  day: Scalars['Int']['input']
  month: Scalars['Int']['input']
  userWallet?: InputMaybe<Scalars['String']['input']>
  chainIn?: InputMaybe<
    Array<Scalars['String']['input']> | Scalars['String']['input']
  >
}>

export type MyPoolsQuery = {
  __typename?: 'Query'
  pools: Array<{
    __typename?: 'Pool'
    id: string
    name: string
    symbol: string
    price_usd: string
    total_value_locked_usd: string
    address: string
    pool_id?: number | null
    logo?: string | null
    chain: { __typename?: 'Chain'; id: string; icon?: string | null }
    investors: Array<{
      __typename?: 'Investor'
      wallet: string
      amount: string
    }>
    now: Array<{ __typename?: 'Candle'; timestamp: number; close: string }>
    day: Array<{ __typename?: 'Candle'; timestamp: number; close: string }>
    month: Array<{ __typename?: 'Candle'; timestamp: number; close: string }>
  }>
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
    num_join: string
    num_exit: string
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
          weight_normalized: string
          asset: {
            __typename?: 'Asset'
            token: { __typename?: 'Token'; symbol: string }
          }
        }>
      } | null
      token?: {
        __typename?: 'Token'
        symbol: string
        logo?: string | null
      } | null
      weights: Array<{
        __typename?: 'WeightGoal'
        weight_normalized: string
        asset: {
          __typename?: 'Asset'
          balance: string
          token: { __typename?: 'Token'; symbol: string; logo?: string | null }
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
      balance: string
      weight_normalized: string
      weight_goal_normalized: string
      token: {
        __typename?: 'Token'
        id: string
        name: string
        logo?: string | null
        symbol: string
        decimals: number
        is_wrap_token: number
        coingecko_id?: string | null
        wraps?: {
          __typename?: 'Token'
          id: string
          decimals: number
          symbol: string
          name: string
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
        weight_normalized: string
        asset: {
          __typename?: 'Asset'
          token: {
            __typename?: 'Token'
            id: string
            name: string
            symbol: string
            decimals: number
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
    now: Array<{ __typename?: 'Candle'; timestamp: number; close: string }>
    week: Array<{ __typename?: 'Candle'; timestamp: number; close: string }>
    month: Array<{ __typename?: 'Candle'; timestamp: number; close: string }>
    year: Array<{ __typename?: 'Candle'; timestamp: number; close: string }>
    max: Array<{ __typename?: 'Candle'; timestamp: number; close: string }>
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
      close: string
    }>
    week: Array<{
      __typename?: 'TotalValueLocked'
      timestamp: number
      close: string
    }>
    month: Array<{
      __typename?: 'TotalValueLocked'
      timestamp: number
      close: string
    }>
    year: Array<{
      __typename?: 'TotalValueLocked'
      timestamp: number
      close: string
    }>
    max: Array<{
      __typename?: 'TotalValueLocked'
      timestamp: number
      close: string
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
    price_usd: string
    price_candles: Array<{
      __typename?: 'Candle'
      timestamp: number
      close: string
    }>
    total_value_locked: Array<{
      __typename?: 'TotalValueLocked'
      close: string
      timestamp: number
    }>
    weight_goal_last: Array<{
      __typename?: 'WeightGoalPoint'
      start_timestamp: number
      end_timestamp: number
      weights: Array<{
        __typename?: 'WeightGoal'
        weight_normalized: string
        asset: {
          __typename?: 'Asset'
          token: { __typename?: 'Token'; id: string; symbol: string }
        }
      }>
    }>
    weight_goals: Array<{
      __typename?: 'WeightGoalPoint'
      start_timestamp: number
      end_timestamp: number
      weights: Array<{
        __typename?: 'WeightGoal'
        weight_normalized: string
        asset: {
          __typename?: 'Asset'
          token: { __typename?: 'Token'; id: string; symbol: string }
        }
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
    price_usd: string
    decimals: number
    total_value_locked_usd: string
    vault: string
    vault_id: string
    controller: string
    chain_id: number
    logo?: string | null
    pool_version: number
    strategy: string
    is_private_pool: boolean
    supply: string
    fee_join_broker: string
    fee_join_manager: string
    fee_aum: string
    name: string
    founded_by?: string | null
    symbol: string
    pool_id?: number | null
    url?: string | null
    summary?: string | null
    short_summary?: string | null
    underlying_assets_addresses: Array<string>
    manager: {
      __typename?: 'Manager'
      id: string
      nickname?: string | null
      image?: string | null
    }
    chain: {
      __typename?: 'Chain'
      id: string
      name: string
      token_name: string
      token_symbol: string
      token_decimals: number
      rpc_urls: Array<string>
      block_explorer_url: string
      seconds_per_block: number
      address_wrapped?: string | null
      logo?: string | null
    }
    underlying_assets: Array<{
      __typename?: 'Asset'
      balance: string
      weight_normalized: string
      weight_goal_normalized: string
      token: {
        __typename?: 'Token'
        id: string
        name: string
        logo?: string | null
        symbol: string
        decimals: number
        is_wrap_token: number
        wraps?: {
          __typename?: 'Token'
          id: string
          decimals: number
          symbol: string
          name: string
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
        weight_normalized: string
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
    price_usd: string
    total_value_locked_usd: string
    fee_exit: string
    fee_swap: string
    fee_join_manager: string
    fee_join_broker: string
    fee_aum_kassandra: string
    fee_aum: string
    withdraw: Array<{ __typename?: 'Fee'; volume_usd: string }>
    swap: Array<{ __typename?: 'Fee'; volume_usd: string }>
    volumes: Array<{ __typename?: 'Volume'; volume_usd: string }>
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
    supply: string
    price_usd: string
    unique_investors: number
    investors: Array<{
      __typename?: 'Investor'
      id: string
      wallet: string
      first_deposit_timestamp: number
      last_deposit_timestamp: number
      amount: string
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
    volumes: Array<{ __typename?: 'Volume'; volume_usd: string }>
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
    price_usd: string
    now: Array<{ __typename?: 'Candle'; timestamp: number; close: string }>
    day: Array<{ __typename?: 'Candle'; timestamp: number; close: string }>
    week: Array<{ __typename?: 'Candle'; timestamp: number; close: string }>
    month: Array<{ __typename?: 'Candle'; timestamp: number; close: string }>
    quarterly: Array<{
      __typename?: 'Candle'
      timestamp: number
      close: string
    }>
    year: Array<{ __typename?: 'Candle'; timestamp: number; close: string }>
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
    value: Array<{ __typename?: 'Candle'; close: string; timestamp: number }>
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

export type PoolStrategyQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type PoolStrategyQuery = {
  __typename?: 'Query'
  pool?: {
    __typename?: 'Pool'
    summary?: string | null
    short_summary?: string | null
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
      close: string
      timestamp: number
    }>
  } | null
}

export type PoolVolumeDataQueryVariables = Exact<{
  id: Scalars['ID']['input']
  timestamp: Scalars['Int']['input']
}>

export type PoolVolumeDataQuery = {
  __typename?: 'Query'
  pool?: {
    __typename?: 'Pool'
    volumes: Array<{ __typename?: 'Volume'; volume_usd: string }>
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
    volumes: Array<{ __typename?: 'Volume'; volume_usd: string }>
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
    price_usd: string
  }>
}

export type PoolsPriceListQueryVariables = Exact<{
  addresses?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>
}>

export type PoolsPriceListQuery = {
  __typename?: 'Query'
  pools: Array<{ __typename?: 'Pool'; price_usd: string; address: string }>
}

export type PoolsWithFeeJoinBrokerQueryVariables = Exact<{
  price_period: Scalars['Int']['input']
  period_selected: Scalars['Int']['input']
  month: Scalars['Int']['input']
  chainIn?: InputMaybe<
    Array<Scalars['String']['input']> | Scalars['String']['input']
  >
}>

export type PoolsWithFeeJoinBrokerQuery = {
  __typename?: 'Query'
  pools: Array<{
    __typename?: 'Pool'
    id: string
    name: string
    symbol: string
    logo?: string | null
    address: string
    pool_id?: number | null
    founded_by?: string | null
    price_usd: string
    pool_version: number
    featured: boolean
    fee_join_broker: string
    chain_id: number
    total_value_locked_usd: string
    strategy: string
    manager: { __typename?: 'Manager'; id: string; nickname?: string | null }
    chain: { __typename?: 'Chain'; logo?: string | null }
    price_candles: Array<{
      __typename?: 'Candle'
      timestamp: number
      close: string
    }>
    total_value_locked: Array<{
      __typename?: 'TotalValueLocked'
      close: string
      timestamp: number
    }>
    weights: Array<{
      __typename?: 'WeightPoint'
      timestamp: number
      weights: Array<{
        __typename?: 'Weight'
        weight_normalized: string
        token: { __typename?: 'Token'; id: string; symbol: string }
      }>
    }>
    underlying_assets: Array<{
      __typename?: 'Asset'
      balance: string
      weight_normalized: string
      weight_goal_normalized: string
      token: {
        __typename?: 'Token'
        id: string
        name: string
        logo?: string | null
        symbol: string
        decimals: number
        is_wrap_token: number
        wraps?: {
          __typename?: 'Token'
          id: string
          decimals: number
          symbol: string
          name: string
          logo?: string | null
        } | null
      }
    }>
    month: Array<{ __typename?: 'Candle'; timestamp: number; close: string }>
    weight_goals: Array<{
      __typename?: 'WeightGoalPoint'
      start_timestamp: number
      end_timestamp: number
      weights: Array<{
        __typename?: 'WeightGoal'
        weight_normalized: string
        asset: {
          __typename?: 'Asset'
          token: { __typename?: 'Token'; id: string }
        }
      }>
    }>
  }>
}

export type ProposalQueryVariables = Exact<{
  number: Scalars['Int']['input']
  voter?: InputMaybe<Scalars['String']['input']>
}>

export type ProposalQuery = {
  __typename?: 'Query'
  proposal: Array<{
    __typename?: 'Proposal'
    number: number
    description: string
    forVotes: string
    againstVotes: string
    startBlock: string
    endBlock: string
    quorum: string
    values: Array<string>
    calldatas: Array<string>
    signatures: Array<string>
    targets: Array<string>
    created: string
    canceled?: string | null
    queued?: string | null
    executed?: string | null
    eta?: string | null
    proposer: {
      __typename?: 'User'
      id: string
      nickname?: string | null
      is_nft?: boolean | null
      image?: string | null
    }
    votes: Array<{
      __typename?: 'Vote'
      support: boolean
      voter: { __typename?: 'User'; id: string }
    }>
  }>
}

export type ProposalsQueryVariables = Exact<{
  skip: Scalars['Int']['input']
  take: Scalars['Int']['input']
}>

export type ProposalsQuery = {
  __typename?: 'Query'
  proposals: Array<{
    __typename?: 'Proposal'
    id: string
    number: number
    targets: Array<string>
    values: Array<string>
    signatures: Array<string>
    startBlock: string
    endBlock: string
    description: string
    created: string
  }>
}

export type StrategyPoolQueryVariables = Exact<{
  strategy?: InputMaybe<Scalars['String']['input']>
}>

export type StrategyPoolQuery = {
  __typename?: 'Query'
  pools: Array<{
    __typename?: 'Pool'
    id: string
    name: string
    logo?: string | null
    chain: { __typename?: 'Chain'; logo?: string | null }
  }>
}

export type TokensQueryVariables = Exact<{
  tokensList: Array<Scalars['ID']['input']> | Scalars['ID']['input']
}>

export type TokensQuery = {
  __typename?: 'Query'
  tokens: Array<{
    __typename?: 'Token'
    id: string
    decimals: number
    logo?: string | null
    name: string
    symbol: string
  }>
}

export type TokensInfoQueryVariables = Exact<{
  whitelist: Array<Scalars['ID']['input']> | Scalars['ID']['input']
  id: Scalars['ID']['input']
}>

export type TokensInfoQuery = {
  __typename?: 'Query'
  tokens: Array<{
    __typename?: 'Token'
    id: string
    name: string
    logo?: string | null
    symbol: string
    decimals: number
  }>
  pool?: {
    __typename?: 'Pool'
    underlying_assets_addresses: Array<string>
  } | null
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
    price_usd: string
    chain_id: number
    num_token_add: number
    num_token_remove: number
    num_weight_goals: number
    chain: {
      __typename?: 'Chain'
      block_explorer_url: string
      address_wrapped?: string | null
    }
    weight_goals: Array<{
      __typename?: 'WeightGoalPoint'
      id: string
      type: string
      end_timestamp: number
      start_timestamp: number
      token?: {
        __typename?: 'Token'
        symbol: string
        logo?: string | null
      } | null
      weights: Array<{
        __typename?: 'WeightGoal'
        weight_normalized: string
        asset: {
          __typename?: 'Asset'
          balance: string
          token: { __typename?: 'Token'; symbol: string; logo?: string | null }
        }
      }>
    }>
  } | null
}

export type TokensSwapQueryVariables = Exact<{
  chainId: Scalars['Int']['input']
}>

export type TokensSwapQuery = {
  __typename?: 'Query'
  tokens: Array<{
    __typename?: 'Token'
    id: string
    decimals: number
    logo?: string | null
    name: string
    symbol: string
  }>
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
    price_usd: string
    total_value_locked_usd: string
    now: Array<{ __typename?: 'Candle'; timestamp: number; close: string }>
    day: Array<{ __typename?: 'Candle'; timestamp: number; close: string }>
    month: Array<{ __typename?: 'Candle'; timestamp: number; close: string }>
  }>
  managedPools: Array<{
    __typename?: 'Pool'
    id: string
    address: string
    name: string
    symbol: string
    logo?: string | null
    price_usd: string
    total_value_locked_usd: string
    investors: Array<{ __typename?: 'Investor'; amount: string }>
    chain: { __typename?: 'Chain'; logo?: string | null }
    now: Array<{ __typename?: 'Candle'; timestamp: number; close: string }>
    day: Array<{ __typename?: 'Candle'; timestamp: number; close: string }>
    month: Array<{ __typename?: 'Candle'; timestamp: number; close: string }>
  }>
}

export type UserVotesQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type UserVotesQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    votes: Array<{
      __typename?: 'Vote'
      support: boolean
      proposal: {
        __typename?: 'Proposal'
        id: string
        number: number
        targets: Array<string>
        values: Array<string>
        signatures: Array<string>
        startBlock: string
        description: string
        endBlock: string
        created: string
      }
    }>
  } | null
}

export type UsersInfoQueryVariables = Exact<{
  skip: Scalars['Int']['input']
  take: Scalars['Int']['input']
}>

export type UsersInfoQuery = {
  __typename?: 'Query'
  users: Array<{
    __typename?: 'User'
    id: string
    votingPower: string
    nickname?: string | null
    is_nft?: boolean | null
    image?: string | null
    votes: Array<{
      __typename?: 'Vote'
      proposal: { __typename?: 'Proposal'; number: number }
    }>
    proposals: Array<{
      __typename?: 'Proposal'
      proposer: { __typename?: 'User'; id: string }
    }>
  }>
  governances: Array<{ __typename?: 'Governance'; totalVotingPower: string }>
}

export type UsersVoteWeightsQueryVariables = Exact<{
  id_in?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>
}>

export type UsersVoteWeightsQuery = {
  __typename?: 'Query'
  users: Array<{ __typename?: 'User'; id: string; votingPower: string }>
  governances: Array<{ __typename?: 'Governance'; totalVotingPower: string }>
}

export type VotesQueryVariables = Exact<{
  number: Scalars['Int']['input']
  support: Scalars['Boolean']['input']
}>

export type VotesQuery = {
  __typename?: 'Query'
  proposals: Array<{
    __typename?: 'Proposal'
    votes: Array<{
      __typename?: 'Vote'
      support: boolean
      votingPower: string
      voter: {
        __typename?: 'User'
        id: string
        nickname?: string | null
        is_nft?: boolean | null
        image?: string | null
      }
    }>
  }>
}

export type VotingPowerQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type VotingPowerQuery = {
  __typename?: 'Query'
  user?: { __typename?: 'User'; votingPower: string } | null
  governances: Array<{
    __typename?: 'Governance'
    totalVotingPower: string
    votingAddresses: number
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
export const BrokersDocument = gql`
  query Brokers($poolId: ID!, $first: Int, $skip: Int) {
    pools(where: { id: $poolId }) {
      num_brokers
      brokers(first: $first, skip: $skip) {
        wallet
        num_deposits
        unique_investors
        deposits_usd
        fees_usd
      }
    }
  }
`
export const BrokersFeesDocument = gql`
  query BrokersFees(
    $id: ID!
    $poolId: ID!
    $depositsTimestamp: Int
    $rewardsTimestamp: Int
  ) {
    manager(id: $id) {
      pools(where: { id: $poolId }) {
        num_deposits_broker
        unique_investors_broker
        brokeredDeposits: volumes(
          where: {
            period: 86400
            type: "join"
            swap_pair_in: ["broker"]
            timestamp_gt: $depositsTimestamp
          }
        ) {
          volume_usd
          timestamp
        }
        brokersRewards: fees(
          where: {
            period: 86400
            type: "join"
            timestamp_gt: $rewardsTimestamp
          }
        ) {
          volume_broker_usd
          timestamp
        }
      }
    }
  }
`
export const CommunityPoolsDocument = gql`
  query CommunityPools(
    $orderBy: Pool_orderBy
    $orderDirection: OrderDirection
    $first: Int
    $skip: Int
    $chainInId: [ID!]
    $chainInString: [String!]
  ) {
    chains(where: { id_in: $chainInId }) {
      pool_count
    }
    pools(
      where: { chain_in: $chainInString }
      orderBy: $orderBy
      orderDirection: $orderDirection
      first: $first
      skip: $skip
    ) {
      id
      name
      symbol
      logo
      address
      unique_investors
      fee_join_broker
      chain_id
      pool_id
      chain {
        logo: icon
      }
      change
      price_usd
      total_value_locked_usd
      is_private_pool
      volumes(
        where: { period: 86400 }
        orderBy: timestamp
        orderDirection: desc
        first: 1
      ) {
        volume_usd
      }
      underlying_assets {
        token {
          logo
          wraps {
            logo
          }
        }
      }
    }
  }
`
export const DelegationsDocument = gql`
  query Delegations($id: String) {
    delegations(where: { from: $id, votingPower_gt: 0 }) {
      pool
      votingPower
      to {
        id
      }
      from {
        id
      }
    }
    received: delegations(where: { to: $id, from_not: $id }) {
      pool
      votingPower
      from {
        id
      }
      to {
        id
      }
    }
  }
`
export const ExploreOverviewPoolsDocument = gql`
  query ExploreOverviewPools {
    kassandras {
      pool_count
      num_managers
      num_deposits
    }
  }
`
export const ExplorePoolsDocument = gql`
  query ExplorePools(
    $price_period: Int!
    $period_selected: Int!
    $month: Int!
    $chainIn: [String!]
    $orderBy: Pool_orderBy
    $orderDirection: OrderDirection
    $totalValueLockedUsdGt: BigDecimal
  ) {
    pools(
      orderBy: $orderBy
      orderDirection: $orderDirection
      first: 9
      where: {
        chain_in: $chainIn
        total_value_locked_usd_gt: $totalValueLockedUsdGt
      }
    ) {
      id
      name
      symbol
      name
      logo
      address
      pool_id
      founded_by
      price_usd
      pool_version
      featured
      fee_join_broker
      manager {
        id
        nickname
      }
      chain_id
      chain {
        logo: icon
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
          is_wrap_token
          wraps {
            id
            decimals
            symbol
            name
            logo
          }
        }
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
export const FarmPoolsDocument = gql`
  query FarmPools(
    $price_period: Int!
    $period_selected: Int!
    $month: Int!
    $chainIn: [String!]
    $poolIdList: [ID!]
  ) {
    pools(first: 9, where: { chain_in: $chainIn, id_in: $poolIdList }) {
      id
      name
      symbol
      name
      logo
      address
      pool_id
      founded_by
      price_usd
      pool_version
      featured
      fee_join_broker
      manager {
        id
        nickname
      }
      chain_id
      chain {
        logo: icon
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
          is_wrap_token
          wraps {
            id
            decimals
            symbol
            name
            logo
          }
        }
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
export const FeaturedPoolsDocument = gql`
  query FeaturedPools(
    $price_period: Int!
    $period_selected: Int!
    $month: Int!
    $chainIn: [String!]
  ) {
    pools(
      orderBy: unique_investors
      orderDirection: desc
      where: { featured: true, chain_in: $chainIn }
    ) {
      id
      name
      symbol
      name
      logo
      address
      pool_id
      founded_by
      price_usd
      pool_version
      featured
      fee_join_broker
      manager {
        id
        nickname
      }
      chain_id
      chain {
        logo: icon
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
          is_wrap_token
          wraps {
            id
            decimals
            symbol
            name
            logo
          }
        }
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
export const FeesDocument = gql`
  query Fees($poolId: ID!) {
    pool(id: $poolId) {
      chain_id
      manager {
        id
      }
      price_usd
      symbol
      controller
      fee_join_manager
      fee_join_broker
      total_fees_join_manager_usd
      total_fees_join_broker_usd
      total_fees_aum_manager_usd
      total_fees_aum_kassandra_usd
      fee_aum
      fee_aum_kassandra
      last_harvest
      fees(
        where: { period: 604800, type_in: ["join", "aum"] }
        orderBy: timestamp
        orderDirection: desc
        first: 96
      ) {
        type
        period
        volume_usd
        volume_broker_usd
        timestamp
      }
      lasCollectedAum: fees(
        orderBy: timestamp
        orderDirection: desc
        where: { type: "aum" }
        first: 1
      ) {
        timestamp
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
      founded_by
      price_usd
      pool_version
      featured
      manager {
        id
        nickname
      }
      chain {
        logo: icon
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
          is_wrap_token
          wraps {
            id
            decimals
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
export const InvestorsAmountDocument = gql`
  query InvestorsAmount($id: String, $investorsAddresses: [String!]) {
    investors(where: { pool: $id, wallet_in: $investorsAddresses }) {
      wallet
      amount
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
export const ManagerDepositFeeDocument = gql`
  query ManagerDepositFee($id: ID!, $poolId: ID!) {
    manager(id: $id) {
      pools(where: { id: $poolId }) {
        fee_join_broker
        fee_join_manager
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
export const ManagerJoinFeesDocument = gql`
  query ManagerJoinFees($id: ID!, $poolId: ID!) {
    manager(id: $id) {
      pools(where: { id: $poolId }) {
        fees(where: { type: "join" }) {
          type
          volume_usd
          volume_broker_usd
          timestamp
        }
        volumes(
          where: {
            period: 86400
            type: "join"
            swap_pair_in: ["broker", "manager"]
          }
        ) {
          volume_usd
          swap_pair
          timestamp
        }
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
        block_explorer_url
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
    pools(
      where: {
        and: [
          { id: $id }
          { or: [{ manager: $manager }, { strategy: $manager }] }
        ]
      }
    ) {
      id
      address
      vault
      chain_id
      logo
      strategy
      manager {
        id
      }
      pool_version
      is_private_pool
      decimals
      chain {
        id
        logo: icon
        name
        token_name
        token_symbol
        token_decimals
        rpc_urls
        block_explorer_url
        seconds_per_block
        address_wrapped
      }
      name
      symbol
      pool_id
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
        logo: icon
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
export const ManagerTotalManagedDocument = gql`
  query managerTotalManaged($manager: ID!) {
    manager(id: $manager) {
      total_value_locked_usd
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
export const ManagersPoolsDocument = gql`
  query ManagersPools(
    $day: Int
    $month: Int
    $orderDirection: OrderDirection
    $skip: Int
    $first: Int
  ) {
    totalManagers: managers {
      id
    }
    managers(
      orderBy: total_value_locked_usd
      orderDirection: $orderDirection
      skip: $skip
      first: $first
    ) {
      id
      nickname
      is_nft
      image
      pool_count
      unique_investors
      total_value_locked_usd
      TVLDay: total_value_locked(
        where: { base: "usd", timestamp_gt: $day }
        first: 1
      ) {
        timestamp
        close
      }
      TVLMonthly: total_value_locked(
        where: { base: "usd", timestamp_gt: $month }
        first: 1
      ) {
        timestamp
        close
      }
    }
  }
`
export const MyPoolsDocument = gql`
  query MyPools(
    $day: Int!
    $month: Int!
    $userWallet: String
    $chainIn: [String!]
  ) {
    pools(
      where: {
        investors_: { wallet: $userWallet, amount_gt: 0 }
        chain_in: $chainIn
      }
    ) {
      id
      name
      symbol
      price_usd
      total_value_locked_usd
      address
      pool_id
      logo
      chain {
        id
        icon
      }
      investors(where: { wallet: $userWallet }) {
        wallet
        amount
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
          is_wrap_token
          coingecko_id
          wraps {
            id
            decimals
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
      weight_goal_last: weight_goals(
        orderBy: start_timestamp
        orderDirection: desc
        first: 1
      ) {
        start_timestamp
        end_timestamp
        weights {
          asset {
            token {
              id
              symbol
            }
          }
          weight_normalized
        }
      }
      weight_goals(
        where: { start_timestamp_gt: $period_selected }
        orderBy: start_timestamp
        orderDirection: desc
        first: 1000
      ) {
        start_timestamp
        end_timestamp
        weights {
          asset {
            token {
              id
              symbol
            }
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
      price_usd
      decimals
      total_value_locked_usd
      vault
      vault_id
      controller
      chain_id
      logo
      pool_version
      strategy
      is_private_pool
      supply
      fee_join_broker
      fee_join_manager
      fee_aum
      manager {
        id
        nickname
        image
      }
      chain {
        id
        logo: icon
        name
        token_name
        token_symbol
        token_decimals
        rpc_urls
        block_explorer_url
        seconds_per_block
        address_wrapped
      }
      name
      founded_by
      symbol
      pool_id
      url
      summary
      short_summary
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
          is_wrap_token
          wraps {
            id
            decimals
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
      volumes(
        first: 1000
        where: {
          period: 86400
          swap_pair_in: ["broker", "manager"]
          type: "join"
          timestamp_gt: $timestamp
        }
      ) {
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
export const PoolStrategyDocument = gql`
  query PoolStrategy($id: ID!) {
    pool(id: $id) {
      summary
      short_summary
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
export const PoolVolumeDataDocument = gql`
  query PoolVolumeData($id: ID!, $timestamp: Int!) {
    pool(id: $id) {
      volumes(first: 1000, where: { period: 86400, timestamp_gt: $timestamp }) {
        volume_usd
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
export const PoolsPriceListDocument = gql`
  query PoolsPriceList($addresses: [ID!]) {
    pools(where: { id_in: $addresses }) {
      price_usd
      address
    }
  }
`
export const PoolsWithFeeJoinBrokerDocument = gql`
  query PoolsWithFeeJoinBroker(
    $price_period: Int!
    $period_selected: Int!
    $month: Int!
    $chainIn: [String!]
  ) {
    pools(
      orderBy: fee_join_broker
      orderDirection: desc
      first: 9
      where: { chain_in: $chainIn, total_value_locked_usd_gt: 500 }
    ) {
      id
      name
      symbol
      name
      logo
      address
      pool_id
      founded_by
      price_usd
      pool_version
      featured
      fee_join_broker
      manager {
        id
        nickname
      }
      chain_id
      chain {
        logo: icon
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
          is_wrap_token
          wraps {
            id
            decimals
            symbol
            name
            logo
          }
        }
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
export const ProposalDocument = gql`
  query Proposal($number: Int!, $voter: String) {
    proposal: proposals(where: { number: $number }) {
      number
      description
      forVotes
      againstVotes
      startBlock
      endBlock
      quorum
      values
      calldatas
      signatures
      targets
      created
      canceled
      queued
      executed
      eta
      proposer {
        id
        nickname
        is_nft
        image
      }
      votes(where: { voter: $voter }) {
        support
        voter {
          id
        }
      }
    }
  }
`
export const ProposalsDocument = gql`
  query Proposals($skip: Int!, $take: Int!) {
    proposals(
      orderDirection: desc
      orderBy: number
      first: $take
      skip: $skip
    ) {
      id
      number
      targets
      values
      signatures
      startBlock
      endBlock
      description
      created
    }
  }
`
export const StrategyPoolDocument = gql`
  query StrategyPool($strategy: String) {
    pools(where: { strategy: $strategy, manager_not: $strategy }) {
      id
      name
      logo
      chain {
        logo: icon
      }
    }
  }
`
export const TokensDocument = gql`
  query Tokens($tokensList: [ID!]!) {
    tokens(where: { id_in: $tokensList }) {
      id
      decimals
      logo
      name
      symbol
    }
  }
`
export const TokensInfoDocument = gql`
  query TokensInfo($whitelist: [ID!]!, $id: ID!) {
    tokens(where: { id_in: $whitelist }) {
      id
      name
      logo
      symbol
      decimals
    }
    pool(id: $id) {
      underlying_assets_addresses
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
        block_explorer_url
        address_wrapped
      }
      weight_goals(orderBy: end_timestamp, orderDirection: desc) {
        id
        type
        end_timestamp
        start_timestamp
        token {
          symbol
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
export const TokensSwapDocument = gql`
  query tokensSwap($chainId: Int!) {
    tokens(
      where: { chain_ids_contains: [$chainId], coingecko_id_not: null }
      first: 1000
    ) {
      id
      decimals
      logo
      name
      symbol
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
        logo: icon
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
export const UserVotesDocument = gql`
  query UserVotes($id: ID!) {
    user(id: $id) {
      votes {
        support
        proposal {
          id
          number
          targets
          values
          signatures
          startBlock
          description
          endBlock
          created
        }
      }
    }
  }
`
export const UsersInfoDocument = gql`
  query UsersInfo($skip: Int!, $take: Int!) {
    users(
      orderDirection: desc
      orderBy: votingPower
      first: $take
      skip: $skip
    ) {
      id
      votingPower
      nickname
      is_nft
      image
      votes {
        proposal {
          number
        }
      }
      proposals {
        proposer {
          id
        }
      }
    }
    governances {
      totalVotingPower
    }
  }
`
export const UsersVoteWeightsDocument = gql`
  query UsersVoteWeights($id_in: [ID!]) {
    users(where: { id_in: $id_in }) {
      id
      votingPower
    }
    governances {
      totalVotingPower
    }
  }
`
export const VotesDocument = gql`
  query Votes($number: Int!, $support: Boolean!) {
    proposals(where: { number: $number }) {
      votes(where: { support: $support }) {
        support
        votingPower
        voter {
          id
          nickname
          is_nft
          image
        }
      }
    }
  }
`
export const VotingPowerDocument = gql`
  query VotingPower($id: ID!) {
    user(id: $id) {
      votingPower
    }
    governances {
      totalVotingPower
      votingAddresses
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
    Brokers(
      variables: BrokersQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<BrokersQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<BrokersQuery>(BrokersDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'Brokers',
        'query'
      )
    },
    BrokersFees(
      variables: BrokersFeesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<BrokersFeesQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<BrokersFeesQuery>(BrokersFeesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'BrokersFees',
        'query'
      )
    },
    CommunityPools(
      variables?: CommunityPoolsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<CommunityPoolsQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<CommunityPoolsQuery>(
            CommunityPoolsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'CommunityPools',
        'query'
      )
    },
    Delegations(
      variables?: DelegationsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<DelegationsQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<DelegationsQuery>(DelegationsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'Delegations',
        'query'
      )
    },
    ExploreOverviewPools(
      variables?: ExploreOverviewPoolsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<ExploreOverviewPoolsQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<ExploreOverviewPoolsQuery>(
            ExploreOverviewPoolsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'ExploreOverviewPools',
        'query'
      )
    },
    ExplorePools(
      variables: ExplorePoolsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<ExplorePoolsQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<ExplorePoolsQuery>(ExplorePoolsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'ExplorePools',
        'query'
      )
    },
    FarmPools(
      variables: FarmPoolsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<FarmPoolsQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<FarmPoolsQuery>(FarmPoolsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'FarmPools',
        'query'
      )
    },
    FeaturedPools(
      variables: FeaturedPoolsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<FeaturedPoolsQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<FeaturedPoolsQuery>(FeaturedPoolsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'FeaturedPools',
        'query'
      )
    },
    Fees(
      variables: FeesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<FeesQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<FeesQuery>(FeesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'Fees',
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
    InvestorsAmount(
      variables?: InvestorsAmountQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<InvestorsAmountQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<InvestorsAmountQuery>(
            InvestorsAmountDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'InvestorsAmount',
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
    ManagerDepositFee(
      variables: ManagerDepositFeeQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<ManagerDepositFeeQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<ManagerDepositFeeQuery>(
            ManagerDepositFeeDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'ManagerDepositFee',
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
    ManagerJoinFees(
      variables: ManagerJoinFeesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<ManagerJoinFeesQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<ManagerJoinFeesQuery>(
            ManagerJoinFeesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'ManagerJoinFees',
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
    managerTotalManaged(
      variables: ManagerTotalManagedQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<ManagerTotalManagedQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<ManagerTotalManagedQuery>(
            ManagerTotalManagedDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'managerTotalManaged',
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
    ManagersPools(
      variables?: ManagersPoolsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<ManagersPoolsQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<ManagersPoolsQuery>(ManagersPoolsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'ManagersPools',
        'query'
      )
    },
    MyPools(
      variables: MyPoolsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<MyPoolsQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<MyPoolsQuery>(MyPoolsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'MyPools',
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
    PoolStrategy(
      variables: PoolStrategyQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<PoolStrategyQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<PoolStrategyQuery>(PoolStrategyDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'PoolStrategy',
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
    PoolVolumeData(
      variables: PoolVolumeDataQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<PoolVolumeDataQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<PoolVolumeDataQuery>(
            PoolVolumeDataDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'PoolVolumeData',
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
    PoolsPriceList(
      variables?: PoolsPriceListQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<PoolsPriceListQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<PoolsPriceListQuery>(
            PoolsPriceListDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'PoolsPriceList',
        'query'
      )
    },
    PoolsWithFeeJoinBroker(
      variables: PoolsWithFeeJoinBrokerQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<PoolsWithFeeJoinBrokerQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<PoolsWithFeeJoinBrokerQuery>(
            PoolsWithFeeJoinBrokerDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'PoolsWithFeeJoinBroker',
        'query'
      )
    },
    Proposal(
      variables: ProposalQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<ProposalQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<ProposalQuery>(ProposalDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'Proposal',
        'query'
      )
    },
    Proposals(
      variables: ProposalsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<ProposalsQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<ProposalsQuery>(ProposalsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'Proposals',
        'query'
      )
    },
    StrategyPool(
      variables?: StrategyPoolQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<StrategyPoolQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<StrategyPoolQuery>(StrategyPoolDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'StrategyPool',
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
    TokensInfo(
      variables: TokensInfoQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<TokensInfoQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<TokensInfoQuery>(TokensInfoDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'TokensInfo',
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
    tokensSwap(
      variables: TokensSwapQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<TokensSwapQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<TokensSwapQuery>(TokensSwapDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'tokensSwap',
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
    },
    UserVotes(
      variables: UserVotesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<UserVotesQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<UserVotesQuery>(UserVotesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'UserVotes',
        'query'
      )
    },
    UsersInfo(
      variables: UsersInfoQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<UsersInfoQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<UsersInfoQuery>(UsersInfoDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'UsersInfo',
        'query'
      )
    },
    UsersVoteWeights(
      variables?: UsersVoteWeightsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<UsersVoteWeightsQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<UsersVoteWeightsQuery>(
            UsersVoteWeightsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'UsersVoteWeights',
        'query'
      )
    },
    Votes(
      variables: VotesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<VotesQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<VotesQuery>(VotesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'Votes',
        'query'
      )
    },
    VotingPower(
      variables: VotingPowerQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<VotingPowerQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<VotingPowerQuery>(VotingPowerDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        'VotingPower',
        'query'
      )
    }
  }
}
export type Sdk = ReturnType<typeof getSdk>
