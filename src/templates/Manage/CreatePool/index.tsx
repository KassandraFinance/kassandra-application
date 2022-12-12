import ContainerButton from '../../../components/ContainerButton'
import ModalFullWindow from '../../../components/Modals/ModalFullWindow'
import StepGuide from './StepGuide'
import SetDetails from './SetDetails'
import SelectAssets from './SelectAssets'

import * as S from './styles'

const CreatePool = () => {
  return (
    <S.CreatePool>
      <ModalFullWindow
        handleCloseModal={() => console.log('Function not implemented.')}
      >
        {/* <StepGuide /> */}

        {/* <SetDetails network="Polygon" /> */}

        <SelectAssets />

        <ContainerButton
          onBack={() => console.log('Function not implemented.')}
          onNext={() => console.log('Function not implemented.')}
        />
      </ModalFullWindow>
    </S.CreatePool>
  )
}

export default CreatePool
