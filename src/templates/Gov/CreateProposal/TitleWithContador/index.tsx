import * as S from './styles'

interface ITitleWithContadorProps {
  title: string
  optional?: boolean
  maxValue?: number
  currentvalue?: number
}

const TitleWithContador = ({
  title,
  optional,
  maxValue,
  currentvalue
}: ITitleWithContadorProps) => {
  return (
    <S.TitleWithContador>
      <S.TitleWrapper>
        <S.Title>{title}</S.Title>
        {optional && <S.Optional>(optional)</S.Optional>}
      </S.TitleWrapper>

      {maxValue && (
        <S.Values>
          {currentvalue}/{maxValue}
        </S.Values>
      )}
    </S.TitleWithContador>
  )
}

export default TitleWithContador
