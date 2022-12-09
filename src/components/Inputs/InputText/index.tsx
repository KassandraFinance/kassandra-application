import * as S from './styles'

interface IInputTextProps {
  name: string;
  type: string;
  value: string;
  required?: boolean;
  placeholder: string;
  minLength: number;
  maxLength: number;
  lable: string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText = ({
  name,
  type,
  value,
  required = false,
  placeholder,
  minLength,
  maxLength,
  lable,
  error,
  onChange
}: IInputTextProps) => {
  return (
    <S.InputText>
      <S.Label htmlFor={name}>{lable}</S.Label>

      <S.InputContainer>
        <S.Input
          id={name}
          name={name}
          type={type}
          value={value ? value : ''}
          required={required}
          onChange={onChange}
          minLength={minLength}
          maxLength={maxLength}
        />

        <S.PlaceholderWrapper>
          <S.Placeholder>{placeholder}</S.Placeholder>
        </S.PlaceholderWrapper>

        <S.Error>{error}</S.Error>
      </S.InputContainer>
    </S.InputText>
  )
}

export default InputText
