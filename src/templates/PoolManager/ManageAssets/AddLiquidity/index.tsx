import React from 'react'
import { useRouter } from 'next/router'
import Big from 'big.js'

import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import { usePoolAssets } from '@/hooks/query/usePoolAssets'

import { setWeights } from '../../../../store/reducers/addAssetSlice'

import CreatePoolHeader from '@/templates/Manage/CreatePool/CreatePoolHeader'
import Steps from '../../../../components/Steps'
import NewAllocationTable from './NewAllocationTable'
import AddLiquidityOperation from './AddLiquidityOperation'

import * as S from './styles'
import {
  TextContainer,
  AddAssetsTitle,
  AddAssetsText
} from '../SelectAssets/styles'

const AddLiquidity = () => {
  const router = useRouter()

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const { data: poolAssets } = usePoolAssets({ id: poolId })

  const allocationTokenAdd = useAppSelector(
    state => state.addAsset.liquidit.allocation
  )
  const assets = useAppSelector(state => state.addAsset.weights)
  const tokenSelected = useAppSelector(state => state.addAsset.token)

  const dispatch = useAppDispatch()

  function getNewAllocation(tokensArr: any[], allocationTokenAdd: string) {
    const allocationTokenAddFormatted = Big(allocationTokenAdd || '0').div(100)

    const newArr = tokensArr.map(token => {
      const allocationAfter = Big(token.weight_normalized).mul(
        Big(1).minus(allocationTokenAddFormatted)
      )
      return {
        ...token,
        newWeight: allocationAfter.toString()
      }
    })

    const tokenSeletedd = {
      newWeight: allocationTokenAddFormatted.toString(),
      weight_normalized: '0',
      token: {
        decimals: tokenSelected.decimals,
        id: tokenSelected.id,
        logo: tokenSelected.logo,
        name: tokenSelected.name,
        symbol: tokenSelected.symbol
      }
    }

    return [...newArr, tokenSeletedd]
  }

  React.useEffect(() => {
    if (!poolAssets) {
      return
    }
    dispatch(setWeights(getNewAllocation(poolAssets, allocationTokenAdd)))
  }, [allocationTokenAdd])

  return (
    <S.AddLiquidity>
      <CreatePoolHeader title="Add new assets to the pool" />
      <Steps
        steps={[
          {
            stepNumber: 1,
            stepeTitle: 'Select asset to add',
            state: 'PREVIOUS'
          },
          {
            stepNumber: 2,
            stepeTitle: 'Add liquidity to the pool',
            state: 'CURRENT'
          },
          {
            stepNumber: 3,
            stepeTitle: 'review',
            state: 'NEXT'
          }
        ]}
      />
      <TextContainer>
        <AddAssetsTitle>Liquidity addition</AddAssetsTitle>
        <AddAssetsText>
          Add the necessary liquidity to add the selected asset
        </AddAssetsText>
      </TextContainer>

      <S.Container>
        <AddLiquidityOperation />

        <NewAllocationTable assets={assets} />
      </S.Container>
    </S.AddLiquidity>
  )
}

export default AddLiquidity
