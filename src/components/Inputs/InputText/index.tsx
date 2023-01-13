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
  readonly?: boolean;
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
  readonly = false,
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
          min={minLength}
          max={maxLength}
          step={0.1}
          readOnly={readonly}
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
