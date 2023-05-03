import React from 'react'
import Image from 'next/image'
import Big from 'big.js'
import BigNumber from 'bn.js'
import { useRouter } from 'next/router'

import {
  networks,
  mockTokensReverse
} from '../../../../../constants/tokenAddresses'
import { useAppSelector, useAppDispatch } from '../../../../../store/hooks'
import {
  setAmount,
  setAllocation,
  setTVL,
  setPrice,
  setController,
  AssetType
} from '../../../../../store/reducers/addAssetSlice'
import { ERC20 } from '../../../../../hooks/useERC20Contract'
import usePoolInfo from '@/hooks/usePoolInfo'
import useCoingecko from '@/hooks/useCoingecko'

import { BNtoDecimal } from '../../../../../utils/numerals'

import InputNumberRight from '../../../../../components/Inputs/InputNumberRight'
import CoinSummary from '../../../../Manage/CreatePool/SelectAssets/CoinSummary'

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
    controller: string,
    chain: {
      logo: string
    },
    weight_goals: {
      weights: AssetType[]
    }[]
  }
}

const AddLiquidityOperation = () => {
  const [balance, setBalance] = React.useState<BigNumber>(new BigNumber(0))

  const router = useRouter()

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const dispatch = useAppDispatch()

  const token = useAppSelector(state => state.addAsset.token)
  const chainId = useAppSelector(state => state.addAsset.chainId)
  const liquidit = useAppSelector(state => state.addAsset.liquidit)
  const wallet = useAppSelector(state => state.userWalletAddress)

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

  const { poolInfo } = usePoolInfo(wallet, poolId)

  const { data: priceData } = useCoingecko(
    networks[poolInfo?.chain_id ?? 137].coingecko,
    networks[poolInfo?.chain_id ?? 137].nativeCurrency.address,
    [token.id]
  )

  React.useEffect(() => {
    if (poolInfo) {
      dispatch(setTVL(poolInfo.total_value_locked_usd))
      dispatch(setController(poolInfo.controller))
    }
  }, [])

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

    if (chainId === 5) {
      getBalances(mockTokensReverse[token.id.toLowerCase()])
    } else {
      getBalances(token.id)
    }
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
              min={Big(1).div(Big(10).pow(token.decimals)).toString()}
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
              required
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
            min="0.0000001"
            max="95"
            lable="Token Allocation"
            placeholder=""
            onChange={handleTokenAllocatinChange}
          />
        </S.InputContainer>
      </S.Container>

      <Image src={arrowDown} />

      <S.Title>Receive (est.)</S.Title>

      <S.Container>
        {poolInfo && priceData && (
          <S.InputContainer>
            <CoinSummary
              coinName={poolInfo.name}
              coinSymbol={poolInfo.symbol}
              coinImage={poolInfo.logo}
              chainImage={poolInfo.chain.logo}
              price={0}
            />

            <S.InputWrapper>
              <S.Value>
                {Big(liquidit.amount || 0)
                  .mul(priceData[token.id.toLowerCase()].usd ?? 0)
                  .div(poolInfo.price_usd)
                  .toFixed(2)}
              </S.Value>

              <S.SecondaryValue>
                ~$
                {Big(liquidit.amount || 0)
                  .mul(priceData[token.id.toLowerCase()].usd ?? 0)
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
