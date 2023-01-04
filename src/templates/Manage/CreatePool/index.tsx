import React from 'react'

import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import {
  setBackStepNumber,
  setNextStepNumber
} from '../../../store/reducers/poolCreationSlice'

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

  const poolCreationSteps = [
    <StepGuide key="stepGuide" />,
    <SetDetails key="setDetails" />,
    <SelectAssets key="selecAssets" />,
    <AddLiquidity key="addLiquidity" />,
    <ConfigureFee key="configureFee" />,
    <Review key="review" />
  ]

  return (
    <S.CreatePool>
      <ModalFullWindow
        handleCloseModal={() => console.log('Function not implemented.')}
      >
        {poolCreationSteps[stepNumber]}

        <ContainerButton
          backButtonDisabled={stepNumber < 1}
          onBack={() => dispatch(setBackStepNumber())}
          onNext={() => dispatch(setNextStepNumber())}
        />
      </ModalFullWindow>
    </S.CreatePool>
  )
}

export default CreatePool
