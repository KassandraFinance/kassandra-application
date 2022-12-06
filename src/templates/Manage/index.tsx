import React from 'react'
import ModalModalAvailableAssets from '../../components/Modals/ModalModalAvailableAssets'
import * as S from './styles'

const Manage = () => {
  const [modalOpen, setModalOpen] = React.useState(false)

  return (
    <S.Manage>
      <h1>Ready to create your first pool?</h1>

      <button onClick={() => setModalOpen(true)}>click me</button>

      {modalOpen && <ModalModalAvailableAssets setModalOpen={setModalOpen} />}
    </S.Manage>
  )
}

export default Manage
