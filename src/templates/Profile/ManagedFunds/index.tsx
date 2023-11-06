import React from 'react'
import { useRouter } from 'next/router'
import { useConnectWallet } from '@web3-onboard/react'

import { useManagerPools } from '@/hooks/query/useManagerPools'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import {
  setToFirstStep,
  setBackStepNumber,
  setClear
} from '@/store/reducers/poolCreationSlice'

import FundCard from '@ui/FundCard'
import AnyCard from '@/components/AnyCard'
import CreatePool from '@/templates/Manage/CreatePool'

import * as S from './styles'
import { VERSION_POOL_CREATE } from '@/constants/tokenAddresses'

const ManagedFunds = () => {
  const [isCreatePool, setIsCreatePool] = React.useState(false)

  const dispatch = useAppDispatch()

  const [{ wallet }] = useConnectWallet()
  const stepNumber = useAppSelector(state => state.poolCreation.stepNumber)
  const { networkId: poolCreattionChainId, version } = useAppSelector(
    state => state.poolCreation.createPoolData
  )

  const router = useRouter()
  const profileAddress = router.query.profileAddress
  const profileWalletAddress = !profileAddress
    ? ''
    : Array.isArray(profileAddress)
    ? ''
    : profileAddress

  const isPoolOwner =
    wallet?.accounts[0].address === profileWalletAddress.toLowerCase()

  const { data: managerPools } = useManagerPools({
    manager: profileWalletAddress
  })

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
    <S.ManagedFunds>
      {managerPools && managerPools.length > 0 ? (
        <S.ManagedPoolsContainer>
          {managerPools.map(pool => (
            <FundCard
              key={pool.id}
              poolAddress={pool.id}
              link={isPoolOwner ? `/manage/${pool.id}` : `/pool/${pool.id}`}
            />
          ))}
        </S.ManagedPoolsContainer>
      ) : (
        <>
          {isPoolOwner ? (
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
