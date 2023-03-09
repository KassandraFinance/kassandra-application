import React from 'react'
import useSWR from 'swr'
import { AbiItem } from 'web3-utils'
import request from 'graphql-request'
import { useRouter } from 'next/router'
import Big from 'big.js'

import {
  BACKEND_KASSANDRA,
  mockTokens,
  networks
} from '@/constants/tokenAddresses'
import ManagedPool from '@/constants/abi/managedPool.json'
import { GET_INFO_POOL } from '@/templates/PoolManager/graphql'

import {
  AssetType,
  setLpNeeded,
  setPoolTokensList,
  setWeight,
  setPoolInfo
} from '@/store/reducers/removeAssetSlice'
import useCoingecko from '@/hooks/useCoingecko'
import { ERC20 } from '@/hooks/useERC20Contract'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

import web3 from '@/utils/web3'

import Steps from '@/components/Steps'
import SelectTokenRemove from './SelectTokenRemove'
import NewAllocationTable from '../AddLiquidity/NewAllocationTable'
import CreatePoolHeader from '@/templates/Manage/CreatePool/CreatePoolHeader'

import * as S from './styles'

const TokenRemoval = () => {
  const router = useRouter()

  const dispatch = useAppDispatch()
  const { weights, tokenSelection, poolInfo } = useAppSelector(state => state.removeAsset)
  const { userWalletAddress } = useAppSelector(state => state)

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const { data } = useSWR([GET_INFO_POOL, poolId], (query, poolId) =>
    request(BACKEND_KASSANDRA, query, {
      id: poolId ?? ''
    })
  )

  const { data: coingeckoData, priceToken } = useCoingecko(
    networks[data?.pool.chain.id]?.coingecko,
    data?.pool.chain.addressWrapped,
    handleMockToken(data?.pool.underlying_assets_addresses ?? [])
  )

  function handleMockToken(tokenList: any) {
    const mockTokensList = tokenList?.map((item: string) => {
      return mockTokens[item]
    })

    return mockTokensList
  }

  async function handleCheckLpNeeded(allocation: string, poolPrice: string) {
    if (tokenSelection.address === '') return

    const userBalance = await ERC20(data.pool.address).balance(
      userWalletAddress
    )

    let totalSupply = Big(0)
    try {
      // eslint-disable-next-line prettier/prettier
      const managedPool = new web3.eth.Contract((ManagedPool as unknown) as AbiItem, poolInfo.address);
      const actualSupply = await managedPool.methods.getActualSupply().call()

      totalSupply = Big(actualSupply).div(Big(10).pow(18))
    } catch (error) {
      console.log(error)
    }

    const lpNeeded = totalSupply.mul(Big(allocation))

    dispatch(
      setLpNeeded({
        value: lpNeeded,
        balanceInWallet: Big(userBalance.toString()).div(Big(10).pow(18)),
        valueInDollar: lpNeeded.mul(Big(poolPrice ?? 0))
      })
    )
  }

  function handleCalcNewWeight(weight: string, removeWeight: string) {
    return Big(weight)
      .div(Big(1).sub(Big(removeWeight)))
      .toFixed(4, 2)
  }

  React.useEffect(() => {
    if (!data) return

    const poolInfo = data?.pool.underlying_assets.map(
      (item: any, index: number) => {
        return {
          address: item.token.id,
          symbol: item.token.symbol,
          logo: item.token.logo,
          decimals: item.token.decimals,
          balance: item.balance,
          weight:
            data?.pool?.weight_goals[0]?.weights[index].weight_normalized ?? 0,
          balanceUSD:
            item.balance * (priceToken(mockTokens[item.token.id]) ?? 0)
        }
      }
    )

    dispatch(setPoolTokensList(poolInfo))
    dispatch(
      setPoolInfo({
        id: data.pool.id,
        name: data.pool.name,
        controller: data.pool.controller,
        chainLogo: data.pool.chain.logo,
        address: data.pool.address,
        chainId: data.pool.chain_id,
        logo: data.pool.logo
      })
    )
  }, [data, coingeckoData])

  React.useEffect(() => {
    handleCheckLpNeeded(tokenSelection?.weight, data?.pool.price_usd)
  }, [tokenSelection])

  React.useEffect(() => {
    if (tokenSelection.address === '') return

    const poolWeightInfo: AssetType[] = data?.pool.underlying_assets.map(
      (item: any, index: number) => {
        // eslint-disable-next-line prettier/prettier
        const currentWeight = data?.pool?.weight_goals[0]?.weights[index].weight_normalized ?? 0
        const isSelectedToken = tokenSelection.address === item.token.id

        return {
          weight_normalized: currentWeight,
          newWeight: isSelectedToken
            ? 0
            : handleCalcNewWeight(currentWeight, tokenSelection.weight),
          token: {
            decimals: item.token.decimals,
            id: item.token.id,
            logo: item.token.logo,
            name: item.token.name,
            symbol: item.token.symbol
          }
        }
      }
    )

    dispatch(
      setWeight(
        poolWeightInfo.sort((a, b) => {
          if (a.newWeight > b.newWeight) return 1
          if (a.newWeight < b.newWeight) return -1
          return 0
        })
      )
    )
  }, [tokenSelection])

  return (
    <S.TokenRemoval>
      <CreatePoolHeader title="remove asset from the pool" />
      <Steps
        steps={[
          {
            stepNumber: 1,
            stepeTitle: 'Select asset to remove',
            state: 'CURRENT'
          },
          {
            stepNumber: 2,
            stepeTitle: 'Review',
            state: 'NEXT'
          }
        ]}
      />
      <S.TokenRemovalsBody>
        <h2>asset removal</h2>
        <p>Select the token you wish to be removed from the pool</p>

        <S.SelectTokenAndTableAllocation>
          <SelectTokenRemove />
          <NewAllocationTable
            assets={tokenSelection.address === '' ? undefined : weights}
          />
        </S.SelectTokenAndTableAllocation>
      </S.TokenRemovalsBody>
    </S.TokenRemoval>
  )
}

export default TokenRemoval
