import Image from 'next/image'

import kassandraFooter from '../../../../public/assets/images/kassandra-footer.svg'
import SocialLinks from '../SocialLinks'

import * as S from './styles'

const MenuFooter = () => {
  return (
    <S.MenuFooter>
      <SocialLinks />

      <S.LogoWrapper>
        <Image src={kassandraFooter} />
      </S.LogoWrapper>

      <S.CopyRitght>© 2021-2022 Kassandra.</S.CopyRitght>
    </S.MenuFooter>
  )
}

export default MenuFooter
