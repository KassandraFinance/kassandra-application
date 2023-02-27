import React from 'react'
import Image from 'next/image'
import useSWR from 'swr'
import { request } from 'graphql-request'
import Big from 'big.js'
import BigNumber from 'bn.js'

import {
  BACKEND_KASSANDRA,
  COINGECKO_API
} from '../../../../../constants/tokenAddresses'
import { GET_POOL_TOKENS } from '../graphql'
import { useAppSelector, useAppDispatch } from '../../../../../store/hooks'
import {
  setAmount,
  setAllocation,
  setTVL,
  setPrice,
  AssetType
} from '../../../../../store/reducers/addAssetSlice'
import { ERC20 } from '../../../../../hooks/useERC20Contract'

import { BNtoDecimal } from '../../../../../utils/numerals'

import CoinSummary from '../../../CreatePool/SelectAssets/CoinSummary'
import InputNumberRight from '../../../../../components/Inputs/InputNumberRight'

import arrowDown from '../../../../../../public/assets/utilities/arrow-down.svg'

import * as S from './styles'

export type CoinGeckoAssetsResponseType = {
  [key: string]: {
    usd: number
  }
}

export type GetPoolTokensType = {
  pool: {
    address: string,
    chainId: number,
    logo: string,
    name: string,
    price_usd: string,
    symbol: string,
    total_value_locked_usd: string,
    weight_goals: {
      weights: AssetType[]
    }[]
  }
}

const AddLiquidityOperation = () => {
  const dispatch = useAppDispatch()

  const [balance, setBalance] = React.useState<BigNumber>(new BigNumber(0))

  const token = useAppSelector(state => state.addAsset.token)
  const poolId = useAppSelector(state => state.addAsset.poolId)
  const liquidit = useAppSelector(state => state.addAsset.liquidit)
  const wallet = useAppSelector(state => state.userWalletAddress)

  const params = {
    id: poolId
  }

  function handleTokenAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setAmount(e.target.value.length > 0 ? e.target.value : '0'))
  }

  function handleTokenAllocatinChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setAllocation(e.target.value.length > 0 ? e.target.value : '0'))
  }

  function handleMaxTokenInput() {
    const amount = Big(balance.toString()).div(Big(10).pow(token.decimals))
    dispatch(setAmount(amount.toString()))
  }

  const { data } = useSWR<GetPoolTokensType>(
    [GET_POOL_TOKENS, params],
    (query, params) => request(BACKEND_KASSANDRA, query, params)
  )
  console.log(data)

  const { data: priceData } = useSWR<CoinGeckoAssetsResponseType>(
    `${COINGECKO_API}/simple/token_price/polygon-pos?contract_addresses=${token.id}&vs_currencies=usd`
  )

  React.useEffect(() => {
    if (data) {
      dispatch(setTVL(data.pool.total_value_locked_usd))
    }
  }, [data])

  React.useEffect(() => {
    if (priceData) {
      dispatch(setPrice(priceData[token.id.toLowerCase()]?.usd))
    }
  }, [priceData])

  React.useEffect(() => {
    async function getBalances(token: string) {
      const { balance } = ERC20(token)
      const balanceValue = await balance(wallet)
      setBalance(balanceValue)
    }

    getBalances('0x841a91e3De1202b7b750f464680068aAa0d0EA35')
  }, [wallet])

  return (
    <S.AddLiquidityOperation>
      <S.Title>Add Liquidity</S.Title>

      <S.Container>
        <S.InputContainer>
          <CoinSummary
            coinName={token.name}
            coinSymbol={token.symbol}
            coinImage={token.image}
            url={`https://heimdall-frontend.vercel.app/coins/btc`}
            price={0}
          />

          <S.InputWrapper>
            <InputNumberRight
              name="inputTokenAmount"
              type="number"
              buttonText="Max"
              button
              value={liquidit.amount}
              min="1"
              max={
                balance
                  ? Big(balance.toString())
                      .div(Big(10).pow(token.decimals))
                      .toString()
                  : '0'
              }
              lable="Token Amount"
              placeholder=""
              onChange={handleTokenAmountChange}
              onClick={handleMaxTokenInput}
            />

            <S.Balance>
              Balance: {balance ? BNtoDecimal(balance, token.decimals) : '0'}
            </S.Balance>
          </S.InputWrapper>
        </S.InputContainer>

        <S.Line />

        <S.InputContainer>
          <S.InputText>Allocation</S.InputText>

          <InputNumberRight
            name="inputTokenAllocation"
            type="number"
            buttonText="Max"
            button
            value={liquidit.allocation}
            min="1"
            max="any"
            lable="Token Allocation"
            placeholder=""
            onChange={handleTokenAllocatinChange}
          />
        </S.InputContainer>
      </S.Container>

      <Image src={arrowDown} />

      <S.Title>Receive (est.)</S.Title>

      <S.Container>
        {data && priceData && (
          <S.InputContainer>
            <CoinSummary
              coinName={data?.pool.name}
              coinSymbol={data?.pool.symbol}
              coinImage={data?.pool.logo}
              price={0}
            />

            <S.InputWrapper>
              <S.Value>
                {Big(liquidit.amount || 0)
                  .mul(priceData[token.id.toLowerCase()].usd)
                  .div(data.pool.price_usd)
                  .toFixed(2)}
              </S.Value>

              <S.SecondaryValue>
                ~$
                {Big(liquidit.amount || 0)
                  .mul(priceData[token.id.toLowerCase()].usd)
                  .toFixed(2)}
              </S.SecondaryValue>
            </S.InputWrapper>
          </S.InputContainer>
        )}
      </S.Container>
    </S.AddLiquidityOperation>
  )
}

export default AddLiquidityOperation
