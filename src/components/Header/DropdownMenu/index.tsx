import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import useMatomoEcommerce from '@/hooks/useMatomoEcommerce'

import pickaxe from '@assets/icons/pickaxe.svg'

import * as S from './styles'

interface ILinkPage {
  name: string
  href: string
  disabled?: boolean
  newTab?: boolean
}

interface IDropdownProps {
  nameOnHeader: string
  linkPage: Array<ILinkPage>
  isActive?: boolean
  adaptToResponsiveSize?: boolean
  onClick: () => void
}

const DropdownMenu = ({
  nameOnHeader,
  linkPage,
  isActive,
  adaptToResponsiveSize = false,
  onClick
}: IDropdownProps) => {
  const [isDropdown, setIsDropdown] = React.useState<boolean>(false)
  const { trackEventFunction } = useMatomoEcommerce()

  return (
    <S.DropdownMenu>
      <S.DropButton
        isActive={isActive ? isActive : false}
        onTouchStart={() => setIsDropdown(!isDropdown)}
        onMouseOver={() => setIsDropdown(true)}
        onMouseOut={() => {
          setIsDropdown(false)
        }}
        onKeyPress={event =>
          event.key === 'Enter' && setIsDropdown(!isDropdown)
        }
      >
        {nameOnHeader}
        <img src="/assets/utilities/arrow-down-thin.svg" />
      </S.DropButton>

      <S.MenuWrapper
        onMouseOver={() => setIsDropdown(true)}
        onMouseOut={() => setIsDropdown(false)}
        isDropdown={isDropdown}
        adaptToResponsiveSize={adaptToResponsiveSize}
      >
        <S.DropdownContent onClick={onClick}>
          {linkPage.map((item, index) => (
            <div key={index}>
              {item.disabled ? (
                <S.MenuLinkDisable>
                  {item.name}
                  <div>
                    <Image src={pickaxe} />
                  </div>
                </S.MenuLinkDisable>
              ) : !item.newTab ? (
                <Link href={item.href} passHref>
                  <S.DropDownLink
                    onClick={() =>
                      trackEventFunction(
                        'click-on-link',
                        `${item.name}`,
                        `header-${nameOnHeader}`
                      )
                    }
                  >
                    {item.name}
                  </S.DropDownLink>
                </Link>
              ) : (
                <S.DropDownLink
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEventFunction(
                      'click-on-link',
                      `${item.name}`,
                      `header-${nameOnHeader}`
                    )
                  }
                >
                  {item.name}
                </S.DropDownLink>
              )}
            </div>
          ))}
        </S.DropdownContent>
      </S.MenuWrapper>
    </S.DropdownMenu>
  )
}

export default DropdownMenu
