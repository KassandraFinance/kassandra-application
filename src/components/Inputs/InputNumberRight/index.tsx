import * as S from './styles'

interface IInputNumberRightProps {
  form?: string;
  name: string;
  type: string;
  value: string;
  required?: boolean;
  placeholder: string;
  min: string;
  max: string | 'any';
  lable: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  button?: boolean;
  buttonText?: string;
  onClick?: () => void;
}

const InputNumberRight = ({
  form = undefined,
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
          form={form}
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
          <S.InputButton type="button" onClick={onClick}>
            <S.Line />
            {buttonText}
          </S.InputButton>
        )}
      </S.InputContainer>
    </S.InputNumberRight>
  )
}

export default InputNumberRight
