import ContainerButton from '../../../components/ContainerButton'
import ModalFullWindow from '../../../components/Modals/ModalFullWindow'
import StepGuide from './StepGuide'

import * as S from './styles'

const CreatePool = () => {
  return (
    <S.CreatePool>
      <ModalFullWindow
        handleCloseModal={() => console.log('Function not implemented.')}
      >
        <StepGuide />

        <ContainerButton
          onBack={() => console.log('Function not implemented.')}
          onNext={() => console.log('Function not implemented.')}
        />
      </ModalFullWindow>
    </S.CreatePool>
  )
}

export default CreatePool
