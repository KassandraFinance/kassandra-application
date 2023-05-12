import React from 'react'
import { AbiItem } from 'web3-utils'
import { useRouter } from 'next/router'
import Big from 'big.js'

import {
  mockTokens,
  networks
} from '@/constants/tokenAddresses'
import ManagedPool from '@/constants/abi/ManagedPool.json'

import {
  setLpNeeded,
  setPoolTokensList,
  setWeight
} from '@/store/reducers/removeAssetSlice'
import useCoingecko from '@/hooks/useCoingecko'
import { ERC20 } from '@/hooks/useERC20Contract'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import usePoolInfo from '@/hooks/usePoolInfo'
import usePoolAssets from '@/hooks/usePoolAssets'

import web3 from '@/utils/web3'

import Steps from '@/components/Steps'
import SelectTokenRemove from './SelectTokenRemove'
import NewAllocationTable from '../AddLiquidity/NewAllocationTable'
import CreatePoolHeader from '@/templates/Manage/CreatePool/CreatePoolHeader'

import * as S from './styles'

const TokenRemoval = () => {
  const router = useRouter()

  const dispatch = useAppDispatch()
  const { weights, tokenSelection } = useAppSelector(state => state.removeAsset)
  const userWalletAddress  = useAppSelector(state => state.userWalletAddress)

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const { poolAssets } = usePoolAssets(poolId)
  const { poolInfo } = usePoolInfo(userWalletAddress, poolId)

  const { priceToken } = useCoingecko(
    networks[poolInfo?.chain_id ?? 137]?.coingecko,
    poolInfo?.chain.addressWrapped ?? '',
    handleMockToken(poolInfo?.underlying_assets_addresses ?? [])
  )

  function handleMockToken(tokenList: string[]) {
    const mockTokensList = tokenList?.map(item => {
      return mockTokens[item]
    })

    return mockTokensList
  }

  async function handleCheckLpNeeded(allocation: string, poolPrice: string) {
    if (tokenSelection.address === '' || !poolInfo) return

    const userBalance = await ERC20(poolInfo.address).balance(
      userWalletAddress
    )

    let totalSupply = Big(0)
    try {
      // eslint-disable-next-line prettier/prettier
      const managedPool = new web3.eth.Contract((ManagedPool as unknown) as AbiItem, poolInfo.address);
      const currentPoolSupply = await managedPool.methods.getActualSupply().call()

      totalSupply = Big(currentPoolSupply).div(Big(10).pow(18))
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
    if (!poolAssets) return

    const poolInfo = poolAssets.map(item => {
        return {
          address: item.token.id,
          name: item.token.name,
          symbol: item.token.symbol,
          logo: item.token.logo,
          decimals: item.token.decimals,
          balance: item.balance,
          weight: item.weight_normalized ?? 0,
        }
      }
    )

    dispatch(setPoolTokensList(poolInfo))
  }, [])

  React.useEffect(() => {
    if (!poolInfo) return

    handleCheckLpNeeded(tokenSelection?.weight, poolInfo?.price_usd)
  }, [tokenSelection])

  React.useEffect(() => {
    if (tokenSelection.address === '' || !poolAssets) return

    const poolWeightInfo = poolAssets.map(item => {
        // eslint-disable-next-line prettier/prettier
        const currentWeight = item.weight_normalized ?? '0'
        const isSelectedToken = tokenSelection.address === item.token.id

        return {
          weight_normalized: currentWeight,
          newWeight: isSelectedToken
            ? '0'
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
          <SelectTokenRemove
            chainId={poolInfo?.chain_id ?? 137}
            priceToken={priceToken}
            poolInfo={{
              name: poolInfo?.name ?? '',
              symbol: poolInfo?.symbol ?? '',
              logo: poolInfo?.logo
            }}
          />
          <NewAllocationTable
            assets={tokenSelection.address === '' ? undefined : weights}
          />
        </S.SelectTokenAndTableAllocation>
      </S.TokenRemovalsBody>
    </S.TokenRemoval>
  )
}

export default TokenRemoval
