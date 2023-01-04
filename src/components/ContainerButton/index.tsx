import { useAppSelector } from '../../store/hooks'

import Button from '../Button'

import * as S from './styles'

interface IContainerButtonProps {
  backButtonDisabled: boolean;
  onBack: () => void;
  onNext: () => void;
}

const ContainerButton = ({
  backButtonDisabled,
  onBack,
  onNext
}: IContainerButtonProps) => {
  const isValid = useAppSelector(state => state.poolCreation.isValid)

  return (
    <S.ContainerButton>
      <S.ButtonsWrapper>
        <Button
          text="Back"
          backgroundBlack
          fullWidth
          disabledNoEvent={backButtonDisabled}
          onClick={onBack}
        />

        <Button
          text="Next"
          backgroundPrimary
          fullWidth
          onClick={onNext}
          disabledNoEvent={!isValid}
        />
      </S.ButtonsWrapper>
    </S.ContainerButton>
  )
}

export default ContainerButton
