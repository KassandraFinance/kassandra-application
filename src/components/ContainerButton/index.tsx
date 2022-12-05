import Button from '../Button'

import * as S from './styles'

interface IContainerButtonProps {
  onBack: () => void;
  onNext: () => void;
}

const ContainerButton = ({ onBack, onNext }: IContainerButtonProps) => {
  return (
    <S.ContainerButton>
      <S.ButtonsWrapper>
        <Button text="Back" backgroundBlack fullWidth onClick={onBack} />

        <Button text="Next" backgroundPrimary fullWidth onClick={onNext} />
      </S.ButtonsWrapper>
    </S.ContainerButton>
  )
}

export default ContainerButton
