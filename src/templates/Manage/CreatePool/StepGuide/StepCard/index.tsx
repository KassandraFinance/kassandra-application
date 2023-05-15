import Image from 'next/image'

import * as S from './styles'

interface IStepCardProps {
  icon: any
  title: string
  text: string
}

const StepCard = ({ icon, title, text }: IStepCardProps) => {
  return (
    <S.StepCard>
      <S.IconWrapper>
        <Image src={icon} layout="responsive" />
      </S.IconWrapper>

      <S.TextContainer>
        <S.Title>{title}</S.Title>

        <S.Text>{text}</S.Text>
      </S.TextContainer>
    </S.StepCard>
  )
}

export default StepCard
