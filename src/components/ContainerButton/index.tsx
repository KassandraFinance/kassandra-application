import Button from '../Button'

import * as S from './styles'

interface IContainerButtonProps {
  form: string
  backButtonDisabled: boolean
  onBack: () => void
  onNext: () => void
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
          background="black"
          fullWidth
          disabledNoEvent={backButtonDisabled}
          onClick={onBack}
        />

        <Button
          form={form}
          type="submit"
          text="Next"
          background="primary"
          fullWidth
          onClick={onNext}
        />
      </S.ButtonsWrapper>
    </S.ContainerButton>
  )
}

export default ContainerButton
