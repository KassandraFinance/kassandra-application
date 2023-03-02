import Button from '../Button'

import * as S from './styles'

interface IContainerButtonProps {
  form: string;
  backButtonDisabled: boolean;
  onBack: () => void;
  onNext: () => void;
}

const ContainerButton = ({
  form,
  backButtonDisabled,
  onBack,
  onNext
}: IContainerButtonProps) => {
  return (
    <S.ContainerButton>
      <S.ButtonsWrapper>
        <Button
          type="button"
          text="Back"
          backgroundBlack
          fullWidth
          disabledNoEvent={backButtonDisabled}
          onClick={onBack}
        />

        <Button
          form={form}
          type="submit"
          text="Next"
          backgroundPrimary
          fullWidth
          onClick={onNext}
        />
      </S.ButtonsWrapper>
    </S.ContainerButton>
  )
}

export default ContainerButton
