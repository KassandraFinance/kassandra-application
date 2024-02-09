import * as S from './styles'

interface ITitleWithCounterProps {
  title: string
  optional?: boolean
  maxValue?: number
  currentvalue?: number
}

const TitleWithCounter = ({
  title,
  optional,
  maxValue,
  currentvalue
}: ITitleWithCounterProps) => {
  return (
    <S.TitleWithCounter>
      <S.TitleWrapper>
        <S.Title>{title}</S.Title>
        {optional && <S.Optional>(optional)</S.Optional>}
      </S.TitleWrapper>

      {maxValue && (
        <S.Values>
          {currentvalue}/{maxValue}
        </S.Values>
      )}
    </S.TitleWithCounter>
  )
}

export default TitleWithCounter
