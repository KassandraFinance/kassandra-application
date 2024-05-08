/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Image from 'next/image'
import { useConnectWallet } from '@web3-onboard/react'

import { useAppSelector, useAppDispatch } from '@/store/hooks'
import {
  setToFirstStep,
  setBackStepNumber,
  setClear
} from '@/store/reducers/poolCreationSlice'

import { VERSION_POOL_CREATE } from '@/constants/tokenAddresses'

import Button from '@/components/Button'

import kacyLogoShadow from '@assets/images/kacy-logo-shadow.png'

import * as S from './styles'

interface IGetStartedProps {
  setIsCreatePool: React.Dispatch<React.SetStateAction<boolean>>
}
const GetStarted = ({ setIsCreatePool }: IGetStartedProps) => {
  const [{ wallet, connecting }, connect] = useConnectWallet()

  const dispatch = useAppDispatch()

  const stepNumber = useAppSelector(state => state.poolCreation.stepNumber)
  const { networkId: poolCreattionChainId, version } = useAppSelector(
    state => state.poolCreation.createPoolData
  )

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
    return
  }

  return (
    <S.GetStarted>
      <Image src={kacyLogoShadow} width={435} height={400} />

      <S.Content>
        <S.Title>Ready to create your first portfolio?</S.Title>

        <S.Text>
          It looks like you don't have any portfolios to manage. Click on the
          button below to combine tokens to create your first portfolio to start
          the journey as a manager.
        </S.Text>

        <S.ButtonWrapper>
          {wallet?.provider ? (
            <Button
              text="Create New Portfolio"
              background="secondary"
              fullWidth
              type="button"
              onClick={handleCreatePool}
            />
          ) : (
            <Button
              text="Connect Wallet"
              background="secondary"
              fullWidth
              disabledNoEvent={connecting}
              onClick={() => connect()}
            />
          )}
        </S.ButtonWrapper>
      </S.Content>
    </S.GetStarted>
  )
}

export default GetStarted
