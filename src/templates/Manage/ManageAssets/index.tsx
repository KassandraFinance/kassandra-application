import React from 'react'

import SelectAssets from './SelectAssets'
import RemoveAssets from './RemoveAssets'
import ChooseAction from './ChooseAction'
import RebalanceAssets from './RebalanceAssets'
import ContainerButton from '../../../components/ContainerButton'
import ModalFullWindow from '../../../components/Modals/ModalFullWindow'
import AddLiquidity from './AddLiquidity'

import * as S from './styles'

const ManageAssets = () => {
  const [step, setStep] = React.useState(0)
  const addNewAsset = [
    <SelectAssets key="selectAssets" />,
    <AddLiquidity key="addLiquidity" />
  ]

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    console.log('Form')
  }

  return (
    <S.ManageAssets>
      <ModalFullWindow
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        handleCloseModal={() => {}}
      >
        <S.ManageAssetsBody id="managerAssets" onSubmit={handleSubmit}>
          {/* <ChooseAction /> */}
          {/* <RebalanceAssets /> */}
          {/* <RemoveAssets /> */}
          {addNewAsset[step]}
        </S.ManageAssetsBody>

        <ContainerButton
          backButtonDisabled={false}
          onBack={() => setStep(prev => prev - 1)}
          onNext={() => setStep(prev => prev + 1)}
        />
      </ModalFullWindow>
    </S.ManageAssets>
  )
}

export default ManageAssets
