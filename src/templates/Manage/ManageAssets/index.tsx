import React from 'react'

import ModalFullWindow from '../../../components/Modals/ModalFullWindow'

import * as S from './styles'

const ManageAssets = () => {
  return (
    <S.ManageAssets>
      <ModalFullWindow
        // handleCloseModal={() => {
        //   if (stepNumber === 7) {
        //     dispatch(setToFirstStep())
        //   }
        //   setIsCreatePool(false)
        // }}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        handleCloseModal={() => {}}
      >
        {/* <form id="poolCreationForm" onSubmit={handleSubmit}>
          {poolCreationSteps[stepNumber]}

          {stepNumber < 6 && (
            <ContainerButton
              backButtonDisabled={stepNumber < 1}
              onBack={() => dispatch(setBackStepNumber())}
              onNext={() => {
                return
              }}
            />
          )}
        </form> */}
      </ModalFullWindow>
    </S.ManageAssets>
  )
}

export default ManageAssets
