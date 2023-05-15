import Link from 'next/link'

import * as S from './styles'

interface ISideBarLinkProps {
  name: string
  icon: JSX.Element
  link: string
  isOpen: boolean
  disabled?: boolean
  isActive: boolean
}

const SideBarLink = ({
  name,
  icon,
  link,
  isOpen,
  disabled = false,
  isActive
}: ISideBarLinkProps) => {
  return (
    <Link href={link} passHref>
      <S.SideBarLink aria-disabled={disabled} isActive={isActive}>
        <S.Wrapper>
          <S.Icon aria-disabled={disabled} isActive={isActive}>
            {icon}
          </S.Icon>

          <S.Title isOpen={isOpen} aria-disabled={disabled} isActive={isActive}>
            {name}
          </S.Title>

          {disabled && <S.Tag>Soon...</S.Tag>}
        </S.Wrapper>
      </S.SideBarLink>
    </Link>
  )
}

export default SideBarLink
