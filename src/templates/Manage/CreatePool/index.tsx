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
    if (stepNumber === 0) {
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

    if (stepNumber === 1) {
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
