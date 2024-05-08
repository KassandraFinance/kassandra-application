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

export function ExploreAllPools() {
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
          Din't find what you were looking for?
          <span>Why not create your own?</span>
        </S.TextContent>
        <Button
          background="primary"
          size="huge"
          text="Create Your Portfolio"
          className="button"
          onClick={handleCreatePool}
        />
      </S.Content>

      {isCreatePool && <CreatePool setIsCreatePool={setIsCreatePool} />}
    </S.AllPoolsWrapper>
  )
}
