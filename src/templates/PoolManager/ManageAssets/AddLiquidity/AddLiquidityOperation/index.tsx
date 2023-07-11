import React from 'react'
import Image from 'next/image'
import Big from 'big.js'
import { useRouter } from 'next/router'
import { useConnectWallet, useSetChain } from '@web3-onboard/react'

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
import { ERC20 } from '../../../../../hooks/useERC20'
import { useManagerPoolInfo } from '@/hooks/query/useManagerPoolInfo'
import { useTokensData } from '@/hooks/query/useTokensData'

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
    address: string
    chainId: number
    logo: string
    name: string
    price_usd: string
    symbol: string
    total_value_locked_usd: string
    controller: string
    chain: {
      logo: string
    }
    weight_goals: {
      weights: AssetType[]
    }[]
  }
}

const AddLiquidityOperation = () => {
  const [userBalance, setUserBalance] = React.useState<Big>(Big(0))

  const router = useRouter()

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const [{ wallet }] = useConnectWallet()
  const [{ connectedChain }] = useSetChain()
  const dispatch = useAppDispatch()
  const token = useAppSelector(state => state.addAsset.token)
  const liquidit = useAppSelector(state => state.addAsset.liquidit)

  const chainId = Number(connectedChain?.id ?? '0x89')

  function handleTokenAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setAmount(e.target.value.length > 0 ? e.target.value : '0'))
  }

  function handleTokenAllocatinChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setAllocation(e.target.value.length > 0 ? e.target.value : '0'))
  }

  function handleMaxTokenInput() {
    const amount = Big(userBalance.toString()).div(Big(10).pow(token.decimals))
    dispatch(setAmount(amount.toString()))
  }

  const { data: poolInfo } = useManagerPoolInfo({
    manager: wallet?.accounts[0].address,
    id: poolId
  })

  const { data: priceData } = useTokensData({
    chainId: (poolInfo && poolInfo[0]?.chain_id) || 137,
    tokenAddresses: [token.id]
  })

  React.useEffect(() => {
    if (poolInfo) {
      dispatch(setTVL(poolInfo[0].total_value_locked_usd))
      dispatch(setController(poolInfo[0].controller))
    }
  }, [])

  React.useEffect(() => {
    if (priceData) {
      dispatch(setPrice(priceData[token.id.toLowerCase()]?.usd))
    }
  }, [priceData])

  React.useEffect(() => {
    async function getBalances(token: string) {
      if (!wallet) return

      const { balance } = await ERC20(
        token,
        networks[(poolInfo && poolInfo[0]?.chain_id) ?? 137].rpc
      )
      const balanceValue = await balance(wallet.accounts[0].address)
      setUserBalance(Big(balanceValue))
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
            price={'0'}
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
                userBalance
                  ? Big(userBalance.toString())
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
              Balance:
              {userBalance
                ? BNtoDecimal(
                    userBalance.div(Big(10).pow(token.decimals)),
                    token.decimals
                  )
                : '0'}
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
              coinName={poolInfo[0].name}
              coinSymbol={poolInfo[0].symbol}
              coinImage={poolInfo[0]?.logo || ''}
              chainImage={poolInfo[0].chain?.logo || ''}
              price={'0'}
            />

            <S.InputWrapper>
              <S.Value>
                {Big(liquidit.amount || 0)
                  .mul(priceData[token.id.toLowerCase()]?.usd ?? 0)
                  .div(poolInfo[0].price_usd)
                  .toFixed(2)}
              </S.Value>

              <S.SecondaryValue>
                ~$
                {Big(liquidit.amount || 0)
                  .mul(priceData[token.id.toLowerCase()]?.usd ?? 0)
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
