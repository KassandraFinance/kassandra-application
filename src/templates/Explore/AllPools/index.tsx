import React from 'react'
import Button from '@/components/Button'
import * as S from './styles'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import {
  setToFirstStep,
  setBackStepNumber,
  setClear
} from '@/store/reducers/poolCreationSlice'
import { VERSION_POOL_CREATE } from '@/constants/tokenAddresses'
import CreatePool from '@/templates/Manage/CreatePool'

interface ExploreAllPools {
  numberOfPools: string
}

export function ExploreAllPools({ numberOfPools }: ExploreAllPools) {
  const [isCreatePool, setIsCreatePool] = React.useState(false)
  const dispatch = useAppDispatch()

  const { networkId: poolCreattionChainId, version } = useAppSelector(
    state => state.poolCreation.createPoolData
  )
  const stepNumber = useAppSelector(state => state.poolCreation.stepNumber)

  function handleCreatePool() {
    if (version !== VERSION_POOL_CREATE) {
      dispatch(setToFirstStep())
      dispatch(setClear())
    }
    if (poolCreattionChainId === 0 && stepNumber > 0) {
      dispatch(setToFirstStep())
    }
    if (stepNumber >= 6) {
      dispatch(setBackStepNumber())
    }
    setIsCreatePool(true)
  }

  return (
    <S.AllPoolsWrapper>
      <S.Content>
        <S.TextContent>
          All Pools <S.PoolsNumber>({numberOfPools})</S.PoolsNumber>
        </S.TextContent>
        <Button
          background="secondary"
          size="large"
          text="Create Pool"
          className="button"
          onClick={handleCreatePool}
        />
      </S.Content>

      {isCreatePool && <CreatePool setIsCreatePool={setIsCreatePool} />}
    </S.AllPoolsWrapper>
  )
}
