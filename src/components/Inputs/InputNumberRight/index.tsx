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
  onChange
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
          onChange={onChange}
        />

        <S.PlaceholderWrapper>
          <S.Placeholder>{placeholder}</S.Placeholder>
        </S.PlaceholderWrapper>
      </S.InputContainer>
    </S.InputNumberRight>
  )
}

export default InputNumberRight
