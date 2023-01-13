import React from 'react'
import Big from 'big.js'

import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import {
  setBackStepNumber,
  setNextStepNumber,
  PoolData
} from '../../../store/reducers/poolCreationSlice'
import { setModalAlertText } from '../../../store/reducers/modalAlertText'

import ContainerButton from '../../../components/ContainerButton'
import ModalFullWindow from '../../../components/Modals/ModalFullWindow'
import StepGuide from './StepGuide'
import SetDetails from './SetDetails'
import SelectAssets from './SelectAssets'
import AddLiquidity from './AddLiquidity'
import ConfigureFee from './ConfigureFee'
import Review from './Review'

import * as S from './styles'

const CreatePool = () => {
  const dispatch = useAppDispatch()
  const stepNumber = useAppSelector(state => state.poolCreation.stepNumber)
  const poolData: PoolData = useAppSelector(
    state => state.poolCreation.createPoolData
  )

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

    const tokensBalance = poolData.tokensBalance ? poolData.tokensBalance : {}
    const fourthStepNumber = 3
    let hasLiquidity = true
    let isLiquidityBiggerThanBalance = false
    if (stepNumber === fourthStepNumber) {
      poolData.tokens?.map(token => {
        if (!token.amount.gt(Big(0))) {
          hasLiquidity = false
        }

        if (
          token.amount.gt(
            Big(tokensBalance[token.address].toString()).div(
              Big(10).pow(token.decimals)
            )
          )
        ) {
          isLiquidityBiggerThanBalance = true
        }
      })

      if (hasLiquidity && !isLiquidityBiggerThanBalance) {
        dispatch(setNextStepNumber())
      } else if (!hasLiquidity) {
        dispatch(
          setModalAlertText({
            errorText: 'The liquidity of some tokens are smaller than zero',
            solutionText: 'Add liquidity to the tokens'
          })
        )
      } else {
        dispatch(
          setModalAlertText({
            errorText:
              'The liquidity of some tokens are bigger than your balance',
            solutionText:
              'Add more tokens to your balance, or change your liquidity'
          })
        )
      }
    }

    const fifthStepNumber = 4
    if (stepNumber === fifthStepNumber) {
      const maxFee = 95
      const depositFee = poolData.fees?.depositFee.feeRate
        ? poolData.fees.depositFee.feeRate
        : 0
      const managementFee = poolData.fees?.managementFee.feeRate
        ? poolData.fees.managementFee.feeRate
        : 0
      if (poolData.fees?.depositFee?.isChecked && depositFee > maxFee) {
        dispatch(
          setModalAlertText({
            errorText: 'The deposit fee is higher than 95%',
            solutionText: 'Add a deposit fee that is lower than 95%'
          })
        )
      } else if (
        poolData.fees?.managementFee?.isChecked &&
        managementFee > maxFee
      ) {
        dispatch(
          setModalAlertText({
            errorText: 'The deposit fee is higher than 95%',
            solutionText: 'Add a deposit fee that is lower than 95%'
          })
        )
      } else {
        dispatch(setNextStepNumber())
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
