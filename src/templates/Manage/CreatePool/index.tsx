import React from 'react'

import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import {
  setBackStepNumber,
  setNextStepNumber
} from '../../../store/reducers/poolCreationSlice'
import { setModalAlertText } from '../../../store/reducers/modalAlertText'

import ContainerButton from '../../../components/ContainerButton'
import ModalFullWindow from '../../../components/Modals/ModalFullWindow'
import StepGuide from './StepGuide'
import SetDetails from './SetDetails'
import SelectAssets from './SelectAssets'
import AddLiquidity from './AddLiquidity'

import * as S from './styles'
import ConfigureFee from './ConfigureFee'
import Review from './Review'

const CreatePool = () => {
  const dispatch = useAppDispatch()
  const stepNumber = useAppSelector(state => state.poolCreation.stepNumber)
  const poolData = useAppSelector(state => state.poolCreation.createPoolData)

  const poolCreationSteps = [
    <StepGuide key="stepGuide" />,
    <SetDetails key="setDetails" />,
    <SelectAssets key="selecAssets" />,
    <AddLiquidity key="addLiquidity" />,
    <ConfigureFee key="configureFee" />,
    <Review key="review" />
  ]

  function handleNextButton(stepNumber: number) {
    const firstStepNumber = 0
    if (stepNumber === firstStepNumber) {
      const network = poolData.network ? poolData.network : ''
      if (network.length > 0) {
        dispatch(setNextStepNumber())
      } else {
        dispatch(
          setModalAlertText({
            errorText: 'Incomplete data',
            solutionText: 'You need to select a network'
          })
        )
      }
    }

    const secondStepNumber = 1
    if (stepNumber === secondStepNumber) {
      const name = poolData.poolName ? poolData.poolName : ''
      const symbol = poolData.poolSymbol ? poolData.poolSymbol : ''
      const icon = poolData.icon?.image_preview
        ? poolData.icon.image_preview
        : ''

      if (name.length > 0 && symbol.length > 0 && icon.length > 0) {
        dispatch(setNextStepNumber())
        console.log(poolData)
      } else {
        dispatch(
          setModalAlertText({
            errorText: 'Incomplete data',
            solutionText: 'You need to add a pool name, symbol and icon'
          })
        )
      }
    }

    const thirdStepNumber = 2
    if (stepNumber === thirdStepNumber) {
      const maxAllocation = 100
      let totalAllocation = 0
      let hasValue = true
      const tokensArr = poolData.tokens ? poolData.tokens : []

      for (const token of tokensArr) {
        totalAllocation = totalAllocation + token.allocation
        if (token.allocation < 1) {
          hasValue = false
        }
      }

      if (totalAllocation === maxAllocation && hasValue) {
        dispatch(setNextStepNumber())
      } else if (totalAllocation > maxAllocation) {
        dispatch(
          setModalAlertText({
            errorText: 'Allocation is bigger than 100%',
            solutionText: 'Allocation must be equal to 100%'
          })
        )
      } else if (totalAllocation < maxAllocation) {
        dispatch(
          setModalAlertText({
            errorText: 'Allocation is smaller than 100%',
            solutionText: 'Allocation must be equal to 100%'
          })
        )
      } else {
        dispatch(
          setModalAlertText({
            errorText: 'Token allocation is smaller than 1%',
            solutionText: 'Add at least 1% of allocation on token'
          })
        )
      }
    }
  }

  return (
    <S.CreatePool>
      <ModalFullWindow
        handleCloseModal={() => console.log('Function not implemented.')}
      >
        {poolCreationSteps[stepNumber]}

        <ContainerButton
          backButtonDisabled={stepNumber < 1}
          onBack={() => dispatch(setBackStepNumber())}
          onNext={() => handleNextButton(stepNumber)}
        />
      </ModalFullWindow>
    </S.CreatePool>
  )
}

export default CreatePool
