import * as S from './styles'

interface IPoolTextProps {
  title: string;
  text: string;
}

const PoolText = ({ title, text }: IPoolTextProps) => {
  return (
    <S.PoolText>
      <S.Title>{title}</S.Title>

      <S.Text>{text}</S.Text>
    </S.PoolText>
  )
}

export default PoolText
