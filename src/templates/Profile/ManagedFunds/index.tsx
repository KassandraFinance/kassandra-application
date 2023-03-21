import React from 'react'
import { useRouter } from 'next/router'

import useManagerPools from '@/hooks/useManagerPools'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setToFirstStep } from '@/store/reducers/poolCreationSlice'

import FundCard from '@ui/FundCard'
import AnyCard from '@/components/AnyCard'
import CreatePool from '@/templates/Manage/CreatePool'

import * as S from './styles'

const ManagedFunds = () => {
  const [isCreatePool, setIsCreatePool] = React.useState(false)

  const dispatch = useAppDispatch()

  const userWalletAddress = useAppSelector(state => state.userWalletAddress)
  const stepNumber = useAppSelector(state => state.poolCreation.stepNumber)
  const poolCreattionChainId = useAppSelector(
    state => state.poolCreation.createPoolData.networkId
  )

  const router = useRouter()
  const profileAddress = router.query.profileAddress
  const profileWalletAddress = !profileAddress
    ? ''
    : Array.isArray(profileAddress)
    ? ''
    : profileAddress
  const { managerPools } = useManagerPools(profileWalletAddress)

  function handleCreatePool() {
    if (poolCreattionChainId === 0 && stepNumber > 0) {
      dispatch(setToFirstStep())
    }
    setIsCreatePool(true)
  }

  return (
    <S.ManagedFunds>
      {managerPools && managerPools.pools.length > 0 ? (
        <S.ManagedPoolsContainer>
          {managerPools?.pools.map(pool => (
            <FundCard key={pool.id} poolAddress={pool.id} />
          ))}
        </S.ManagedPoolsContainer>
      ) : (
        <>
          {userWalletAddress === profileWalletAddress ? (
            <AnyCard
              text="Looks like you aren’t managing any Pool."
              button2
              buttonText="Create a Pool"
              onClick={handleCreatePool}
            />
          ) : (
            <AnyCard text="This address is not managing any Pool." />
          )}
        </>
      )}

      {isCreatePool && <CreatePool setIsCreatePool={setIsCreatePool} />}
    </S.ManagedFunds>
  )
}

export default ManagedFunds
