import React from 'react'
import useSWR from 'swr'
import { request } from 'graphql-request'
import Big from 'big.js'

import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import { setWeights, AssetType } from '../../../../store/reducers/addAssetSlice'
import { BACKEND_KASSANDRA } from '../../../../constants/tokenAddresses'
import { GET_POOL_TOKENS } from './graphql'

import CreatePoolHeader from '@/templates/Manage/CreatePool/CreatePoolHeader'
import Steps from '../../../../components/Steps'
import NewAllocationTable from './NewAllocationTable'
import AddLiquidityOperation, {
  GetPoolTokensType
} from './AddLiquidityOperation'

import * as S from './styles'
import {
  TextContainer,
  AddAssetsTitle,
  AddAssetsText
} from '../SelectAssets/styles'

const AddLiquidity = () => {
  const poolId = useAppSelector(state => state.addAsset.poolId)
  const allocationTokenAdd = useAppSelector(
    state => state.addAsset.liquidit.allocation
  )
  const assets = useAppSelector(state => state.addAsset.weights)

  const dispatch = useAppDispatch()

  const params = {
    id: poolId
  }

  function getNewAllocation(
    tokensArr: AssetType[],
    allocationTokenAdd: string
  ) {
    const newArr = tokensArr.map(token => {
      const allocationAfter = Big(token.weight_normalized).mul(
        Big(1).minus(Big(allocationTokenAdd || '0').div(100))
      )
      return {
        ...token,
        newWeight: allocationAfter.toString()
      }
    })

    return newArr
  }

  const { data } = useSWR<GetPoolTokensType>(
    [GET_POOL_TOKENS, params],
    (query, params) => request(BACKEND_KASSANDRA, query, params)
  )

  React.useEffect(() => {
    if (data) {
      getNewAllocation(data?.pool.weight_goals[0].weights, allocationTokenAdd)
      dispatch(
        setWeights(
          getNewAllocation(
            data?.pool.weight_goals[0].weights,
            allocationTokenAdd
          )
        )
      )
    }
  }, [data, allocationTokenAdd])

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
