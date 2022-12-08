import * as S from './styles'

interface ITextProps {
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

const Text = ({
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
}: ITextProps) => {
  return (
    <S.Text>
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

        <S.InputTextWrapper>
          <S.InputText>{placeholder}</S.InputText>
        </S.InputTextWrapper>

        <S.Error>{error}</S.Error>
      </S.InputContainer>
    </S.Text>
  )
}

export default Text
