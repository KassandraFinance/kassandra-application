import React from 'react'
import stringSimilarity from 'string-similarity-js'
import Big from 'big.js'
import { isAddress, ZeroAddress } from 'ethers'

import { CoinsMetadataType } from '@/hooks/query/useTokensData'
import { NATIVE_ADDRESS, networks } from '@/constants/tokenAddresses'
import { BNtoDecimal } from '@/utils/numerals'

import InputSearch from '@/components/Inputs/InputSearch'
import { IUserTokenProps } from '@/templates/PoolV2/NewPoolOperations/Form/TokenSelection'
import TokensSwapProviderList from '@/templates/PoolV2/NewPoolOperations/Form/TokenSelection/TokensSwapProviderList'
import { BalancesType } from '../../'

import { setTokenIn } from '@/store/reducers/poolCreationSlice'
import { ITokenListSwapProviderProps } from '@/store/reducers/tokenListSwapProvider'
import { useAppSelector, useAppDispatch } from '@/store/hooks'

import * as S from './styles'

type SelectAddLiquidityAssetProps = {
  tokensList: CoinsMetadataType
  tokensBalance: BalancesType
}

const SelectAddLiquidityAsset = ({
  tokensList,
  tokensBalance
}: SelectAddLiquidityAssetProps) => {
  const [search, setSearch] = React.useState('')

  const { networkId, tokenIn, tokenInAmount } = useAppSelector(
    state => state.poolCreation.createPoolData
  )
  const dispatch = useAppDispatch()

  function handleUserTokensBalance(
    newTokenList: ITokenListSwapProviderProps[],
    isWithScore = false
  ) {
    const userTokensBalance = newTokenList.map(token => {
      const score = isWithScore
        ? stringSimilarity(token?.symbol || '' + token?.name, search)
        : 0
      const checkToken =
        token.address === NATIVE_ADDRESS
          ? networks[networkId ?? 137].nativeCurrency.address
          : token.address
      const tokenBalance = tokensBalance[token.address.toLowerCase()] || 0
      const tokenPriceInDollar = tokensList[checkToken.toLowerCase()]?.usd ?? 0
      const balanceTokenFormated = Big(tokenBalance.toString() || '0').div(
        Big(10).pow(token?.decimals || 18)
      )
      const balanceInDollar = balanceTokenFormated.mul(tokenPriceInDollar)

      return {
        ...token,
        tokenScore: score,
        balance: BNtoDecimal(balanceTokenFormated, token?.decimals || 18, 2),
        balanceInDollar: balanceInDollar.toNumber()
      }
    })

    return userTokensBalance
  }

  function handleTokenListFiltering(tokens: CoinsMetadataType) {
    const token: ITokenListSwapProviderProps[] = []
    if (isAddress(search)) {
      for (const [key, value] of Object.entries(tokens)) {
        if (key === search) {
          token.push({
            symbol: value.symbol,
            name: value.name,
            address: key,
            decimals: value.decimals,
            logoURI: value.logo
          })
        }
      }

      const tokensWithBalance: IUserTokenProps[] =
        handleUserTokensBalance(token)

      return tokensWithBalance
    }

    for (const [key, value] of Object.entries(tokens)) {
      if (
        value.symbol.toLocaleLowerCase().includes(search) ||
        value.name.toLocaleLowerCase().includes(search)
      ) {
        token.push({
          symbol: value.symbol,
          name: value.name,
          address: key,
          decimals: value.decimals,
          logoURI: value.logo
        })
      }
    }

    const userTokensBalance: IUserTokenProps[] = handleUserTokensBalance(
      token,
      true
    )
    const userTokensBalanceFilteredByScore = userTokensBalance.sort((a, b) => {
      if (a.tokenScore > b.tokenScore) return -1
      if (a.tokenScore < b.tokenScore) return 1
      return 0
    })

    return userTokensBalanceFilteredByScore
  }

  function handleTokenListFilteringBybalance(tokens: CoinsMetadataType) {
    const _tokens: ITokenListSwapProviderProps[] = []
    for (const [key, value] of Object.entries(tokens)) {
      if (
        value.symbol.toLocaleLowerCase().includes(search) ||
        value.name.toLocaleLowerCase().includes(search)
      ) {
        _tokens.push({
          symbol: value.symbol,
          name: value.name,
          address: key,
          decimals: value.decimals,
          logoURI: value.logo
        })
      }
    }

    const tokenArrayFormated: IUserTokenProps[] =
      handleUserTokensBalance(_tokens)

    return tokenArrayFormated.sort((a, b) => {
      if (a.balanceInDollar > b.balanceInDollar) return -1
      if (a.balanceInDollar < b.balanceInDollar) return 1
      return 0
    })
  }

  function handleInvalid(event: any) {
    if (
      !tokenIn ||
      tokenIn.address === ZeroAddress ||
      Number(tokenInAmount) === 0
    ) {
      return event.target.setCustomValidity('Please select any token.')
    }
  }

  const filteredToken =
    search.length > 1
      ? handleTokenListFiltering(tokensList)
      : handleTokenListFilteringBybalance(tokensList)

  return (
    <S.SelectAddLiquidityAsset>
      <S.Title>
        Select which asset you want to use to provide the initial liquidity
      </S.Title>
      <InputSearch
        name="search-token"
        value={search}
        placeholder="Search asset by name"
        onChange={e => setSearch(e.target.value)}
      />
      <TokensSwapProviderList
        filteredToken={filteredToken ?? []}
        setTokenPinList={() => {
          return
        }}
        tokenPinList={[]}
        setTokenSelected={token => dispatch(setTokenIn(token))}
        pin={false}
      />
      <S.InputValidation
        form="poolCreationForm"
        id="select-token"
        name="select-token"
        type="radio"
        onInvalid={handleInvalid}
        required
        checked={tokenIn.address !== ZeroAddress && Number(tokenInAmount) > 0}
        onChange={() => {
          return
        }}
      />
    </S.SelectAddLiquidityAsset>
  )
}

export default SelectAddLiquidityAsset
