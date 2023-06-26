/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Image from 'next/image'
import { useConnectWallet } from '@web3-onboard/react'

import { useAppSelector, useAppDispatch } from '@/store/hooks'
import {
  setToFirstStep,
  setBackStepNumber
} from '@/store/reducers/poolCreationSlice'

import Button from '@/components/Button'
import CreatePool from '../CreatePool'

import kacyLogoShadow from '@assets/images/kacy-logo-shadow.png'

import * as S from './styles'

const GetStarted = () => {
  const [isCreatePool, setIsCreatePool] = React.useState(false)

  const [{ wallet, connecting }, connect] = useConnectWallet()

  const dispatch = useAppDispatch()

  const stepNumber = useAppSelector(state => state.poolCreation.stepNumber)
  const poolCreattionChainId = useAppSelector(
    state => state.poolCreation.createPoolData.networkId
  )

  function handleCreatePool() {
    if (poolCreattionChainId === 0 && stepNumber > 0) {
      dispatch(setToFirstStep())
    }
    if (stepNumber >= 6) {
      dispatch(setBackStepNumber())
    }
    setIsCreatePool(true)
    return
  }

  return (
    <S.GetStarted>
      <Image src={kacyLogoShadow} width={435} height={400} />

      <S.Content>
        <S.Title>Ready to create your first pool?</S.Title>

        <S.Text>
          It looks like you don't have any pools to manage. Click on the button
          below to combine tokens to create your first pool to start the journey
          as a manager.
        </S.Text>

        <S.ButtonWrapper>
          {wallet?.provider ? (
            <Button
              text="Create New Pool"
              backgroundSecondary
              fullWidth
              type="button"
              onClick={handleCreatePool}
            />
          ) : (
            <Button
              text="Connect Wallet"
              backgroundSecondary
              fullWidth
              disabledNoEvent={connecting}
              onClick={() => connect()}
            />
          )}
        </S.ButtonWrapper>
      </S.Content>

      {isCreatePool && <CreatePool setIsCreatePool={setIsCreatePool} />}
    </S.GetStarted>
  )
}

export default GetStarted
