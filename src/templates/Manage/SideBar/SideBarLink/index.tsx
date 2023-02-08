import * as S from './styles'

interface ISideBarLinkProps {
  name: string;
  icon: JSX.Element;
  isOpen: boolean;
}

const SideBarLink = ({ name, icon, isOpen }: ISideBarLinkProps) => {
  return (
    <S.SideBarLink>
      <S.Wrapper>
        <S.Icon>{icon}</S.Icon>

        <S.Title isOpen={isOpen}>{name}</S.Title>

        <S.Tag>Soon...</S.Tag>
      </S.Wrapper>
    </S.SideBarLink>
  )
}

export default SideBarLink
