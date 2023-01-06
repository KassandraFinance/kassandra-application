import * as S from './styles'

interface IInputNumberRightProps {
  name: string;
  type: string;
  value: string;
  required?: boolean;
  placeholder: string;
  min: number;
  max: number;
  lable: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  button?: boolean;
  buttonText?: string;
  onClick?: () => void;
}

const InputNumberRight = ({
  name,
  type,
  value,
  required = false,
  placeholder,
  min,
  max,
  lable,
  onChange,
  button = false,
  buttonText = '',
  onClick
}: IInputNumberRightProps) => {
  return (
    <S.InputNumberRight>
      <S.Label htmlFor={name}>{lable}</S.Label>

      <S.InputContainer>
        <S.Input
          id={name}
          name={name}
          type={type}
          value={value ? value : ''}
          required={required}
          min={min}
          max={max}
          step="any"
          onChange={onChange}
          button={button}
        />

        <S.PlaceholderWrapper>
          <S.Placeholder>{placeholder}</S.Placeholder>
        </S.PlaceholderWrapper>

        {button && (
          <>
            <S.Line />
            <S.InputButton onClick={onClick}>{buttonText}</S.InputButton>
          </>
        )}
      </S.InputContainer>
    </S.InputNumberRight>
  )
}

export default InputNumberRight
