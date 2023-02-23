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
          {
            // <SelectAssets />
          }
          <AddLiquidity />
          {/* <RemoveAssets /> */}
        </S.ManageAssetsBody>

        <ContainerButton
          backButtonDisabled={false}
          onBack={() => console.log('aqui')}
          onNext={() => {
            return
          }}
        />
      </ModalFullWindow>
    </S.ManageAssets>
  )
}

export default ManageAssets
