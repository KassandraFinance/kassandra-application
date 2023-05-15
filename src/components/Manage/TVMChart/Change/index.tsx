import * as S from './styles'

interface IChangeProps {
  title: string
  value: number
}

const Change = ({ title, value }: IChangeProps) => {
  function addSign(n: number) {
    return n > 0 ? `+${n}` : n
  }

  return (
    <S.Change>
      <S.ChangeTitle>{title}</S.ChangeTitle>

      <S.ChangeValue value={value}>{addSign(value)}%</S.ChangeValue>
    </S.Change>
  )
}

export default Change
