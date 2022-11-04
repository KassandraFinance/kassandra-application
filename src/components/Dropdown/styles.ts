import styled, { css } from 'styled-components'
import theme from '../../styles/theme'

interface IDropdownProps {
  isActive: boolean;
}

export const Dropdown = styled.div`
  position: relative;

  display: inline-block;

  &:hover,
  &:focus-within {
    img {
      transform: rotate(180deg);
    }
  }
`

// prettier-ignore
export const DropButton = styled.button<IDropdownProps>`
  position: relative;

  display: flex;
  align-items: center;
  gap: 1rem;

  width: fit-content;
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;

  font-family: 'Rubik', sans-serif;
  font-size: ${theme.font.sizes.font16};
  font-weight: ${props =>
    props.isActive ? theme.font.weight.semibold : theme.font.weight.light};
  color: ${theme.colors.snow};
  text-transform: capitalize;

  background-color: transparent;
  border: none;
  cursor: pointer;

  ${props =>
    props.isActive &&
    `
    :after {
      content: '';
      position: absolute;
      bottom: 0;

      left: 0%;
      width: 100%;
      height: 0.2rem;

      background-color: ${theme.colors.cyan};
      border-radius: 0.1rem;
      box-shadow: 0 0 0.6rem ${theme.colors.cyan};
    }
  `}

  img {
    transition: transform 300ms ease;
  }


  @media (max-width: 541px) {
    font-size: ${theme.font.sizes.font14};
  }

`

interface IDropdownContentProps {
  isDropdown: boolean;
  adaptToResponsiveSize?: boolean;
}

// prettier-ignore
export const DropdownContent = styled.div<IDropdownContentProps>`
  position: absolute;
  left: -0.2rem;
  top: 3.8rem;
  z-index: 2;

  display: ${props => (props.isDropdown ? 'block' : 'none')};
  min-width: fit-content;

  box-shadow: 0 0.8rem 1.6rem 0 rgba(0,0,0,0.2);
  background-color: #15161C;

  a {
    display: block;
    padding: 1.2rem 1.6rem;

    color: ${theme.colors.snow};
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.light};
    text-decoration: none;

    transition-duration: 200ms;

    &:hover {
      background-color: #3F1A38;
    }

    @media (max-width: 540px) {
      font-size: ${theme.font.sizes.font14};
    }

    @media (max-width: 380px) {
      font-size: ${theme.font.sizes.font12};
    }
  }

  @media (max-width: 960px) {
    left: 0;
  }

  ${({ adaptToResponsiveSize }) => css`
    @media (max-width: 768px) {
      left: ${adaptToResponsiveSize ? 'auto' : ''};
      right: ${adaptToResponsiveSize ? '0' : ''};
    }
  `}
`

export const MenuLinkDisable = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1.2rem 1.6rem;

  color: ${theme.colors.grayDisabled};
  font-size: ${theme.font.sizes.font16};
  font-weight: ${theme.font.weight.light};
  cursor: not-allowed;

  div {
    width: 2rem;
    height: 2rem;
  }

  @media (max-width: 540px) {
    font-size: ${theme.font.sizes.font14};

    div {
      width: 1.6rem;
      height: 1.6rem;
    }
  }

  @media (max-width: 380px) {
    font-size: ${theme.font.sizes.font12};
  }
`
