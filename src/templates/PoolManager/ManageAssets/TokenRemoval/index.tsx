import React from 'react'
import { useRouter } from 'next/router'
import Big from 'big.js'
import { useConnectWallet } from '@web3-onboard/react'

import { mockTokens, networks } from '@/constants/tokenAddresses'

import {
  setLpNeeded,
  setPoolTokensList,
  setWeight
} from '@/store/reducers/removeAssetSlice'
import { useTokensData } from '@/hooks/query/useTokensData'
import useGetToken from '@/hooks/useGetToken'
import useERC20 from '@/hooks/useERC20'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useManagerPoolInfo } from '@/hooks/query/useManagerPoolInfo'
import { usePoolAssets } from '@/hooks/query/usePoolAssets'
import useManagedPool from '@/hooks/useManagedPool'

import Steps from '@/components/Steps'
import SelectTokenRemove from './SelectTokenRemove'
import NewAllocationTable from '../AddLiquidity/NewAllocationTable'
import CreatePoolHeader from '@/templates/Manage/CreatePool/CreatePoolHeader'

import * as S from './styles'

const TokenRemoval = () => {
  const router = useRouter()

  const dispatch = useAppDispatch()
  const { weights, tokenSelection } = useAppSelector(state => state.removeAsset)

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const { data: poolAssets } = usePoolAssets({ id: poolId })
  const [{ wallet }] = useConnectWallet()
  const { data: poolInfo } = useManagerPoolInfo({
    manager: wallet?.accounts[0].address,
    id: poolId
  })
  const { balance } = useERC20(
    (poolInfo && poolInfo[0]?.address) ?? '',
    networks[(poolInfo && poolInfo[0]?.chain_id) ?? 137].rpc
  )

  const { data } = useTokensData({
    chainId: (poolInfo && poolInfo[0]?.chain_id) ?? 137,
    tokenAddresses: handleMockToken(
      (poolInfo && poolInfo[0]?.underlying_assets_addresses) ?? []
    )
  })

  const { priceToken } = useGetToken({
    nativeTokenAddress: (poolInfo && poolInfo[0]?.chain?.addressWrapped) ?? '',
    tokens: data || {}
  })

  const { totalSupply } = useManagedPool(
    (poolInfo && poolInfo[0]?.address) ?? '',
    networks[(poolInfo && poolInfo[0]?.chain_id) ?? 137].rpc
  )

  function handleMockToken(tokenList: string[]) {
    const mockTokensList = tokenList?.map(item => {
      return mockTokens[item] ?? item
    })

    return mockTokensList
  }

  async function handleCheckLpNeeded(allocation: string, poolPrice: string) {
    if (tokenSelection.address === '' || !poolInfo || !wallet) return

    const userBalance = await balance(wallet.accounts[0].address)

    let totalSupplyy = Big(0)
    try {
      const currentPoolSupply = await totalSupply()

      totalSupplyy = Big(currentPoolSupply.toString()).div(Big(10).pow(18))
    } catch (error) {
      console.log(error)
    }

    const lpNeeded = totalSupplyy.mul(Big(allocation))

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
    if (!poolAssets) return

    const poolInfo = poolAssets.map(item => {
      return {
        address: item.token.id,
        name: item.token?.name || '',
        symbol: item.token?.symbol || '',
        logo: item.token?.logo || '',
        decimals: item.token?.decimals || 18,
        balance: item.balance,
        weight: item.weight_normalized ?? 0
      }
    })

    dispatch(setPoolTokensList(poolInfo))
  }, [])

  React.useEffect(() => {
    if (!poolInfo) return

    handleCheckLpNeeded(tokenSelection?.weight, poolInfo[0]?.price_usd)
  }, [tokenSelection])

  React.useEffect(() => {
    if (tokenSelection.address === '' || !poolAssets) return

    const poolWeightInfo = poolAssets.map(item => {
      const currentWeight = item.weight_normalized ?? '0'
      const isSelectedToken = tokenSelection.address === item.token.id

      return {
        weight_normalized: currentWeight,
        newWeight: isSelectedToken
          ? '0'
          : handleCalcNewWeight(currentWeight, tokenSelection.weight),
        token: {
          decimals: item.token?.decimals || 18,
          id: item.token.id,
          logo: item.token?.logo || '',
          name: item.token?.name || '',
          symbol: item.token?.symbol || ''
        }
      }
    })

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
          {poolInfo && (
            <SelectTokenRemove
              chainId={poolInfo[0]?.chain_id ?? 137}
              priceToken={priceToken}
              poolInfo={{
                name: poolInfo[0]?.name ?? '',
                symbol: poolInfo[0]?.symbol ?? '',
                logo: poolInfo[0]?.logo || ''
              }}
            />
          )}
          <NewAllocationTable
            assets={tokenSelection.address === '' ? undefined : weights}
          />
        </S.SelectTokenAndTableAllocation>
      </S.TokenRemovalsBody>
    </S.TokenRemoval>
  )
}

export default TokenRemoval
