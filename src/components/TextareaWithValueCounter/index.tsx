import * as S from './styles'

interface ITextareaWithValueCounterProps {
  form?: string
  name: string
  type: string
  value: string
  required?: boolean
  placeholder: string
  minLength: number
  maxLength: number
  lable: string
  readonly?: boolean
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TextareaWithValueCounter = ({
  form = undefined,
  name,
  value,
  required = false,
  placeholder,
  minLength,
  maxLength,
  lable,
  readonly = false,
  onChange
}: ITextareaWithValueCounterProps) => {
  return (
    <S.TextareaWithValueCounter>
      <S.Label htmlFor={name}>{lable}</S.Label>

      <S.TextareaContainer>
        <S.Textarea
          form={form}
          id={name}
          name={name}
          value={value ? value : ''}
          required={required}
          onChange={onChange}
          minLength={minLength}
          maxLength={maxLength}
          readOnly={readonly}
          valueLength={value.length}
        />

        <S.PlaceholderWrapper value={value.length}>
          <S.Placeholder>{placeholder}</S.Placeholder>
        </S.PlaceholderWrapper>
      </S.TextareaContainer>

      <S.CounterContainer>
        <p>{value.length}/150 characters</p>
      </S.CounterContainer>
    </S.TextareaWithValueCounter>
  )
}

export default TextareaWithValueCounter
