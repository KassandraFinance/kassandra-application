import Image from 'next/image'

import stepIcon from '../../../../../public/assets/iconGradient/step.svg'

import * as S from './styles'

interface ICreatePoolHeaderProps {
  title: string;
  icon?: JSX.Element;
}

const CreatePoolHeader = ({ title, icon }: ICreatePoolHeaderProps) => {
  return (
    <S.CreatePoolHeader>
      <S.Title>
        <Image src={stepIcon} />
        {title}
        {icon}
      </S.Title>

      <S.Line />
    </S.CreatePoolHeader>
  )
}

export default CreatePoolHeader
