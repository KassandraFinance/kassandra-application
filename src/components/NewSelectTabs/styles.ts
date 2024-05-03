import styled, { css } from 'styled-components'
import Button from '@/components/Button'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`
export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const LeftContent = styled.div`
  display: flex;
  gap: 3.2rem;
`

export const ViewIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;
`

interface ViewButtonProps {
  isActive?: boolean
}

export const ViewButton = styled(Button)<ViewButtonProps>`
  background-color: transparent;
  padding: 0;

  svg {
    height: 2rem;
    width: 2rem;
    path {
      fill: ${props => (props.isActive ? '#26DBDB' : null)};
      fill-opacity: ${props => (props.isActive ? '1' : '0.08')};
    }
  }
`

export const DesktopTabs = styled.div`
  display: none;
  visibility: hidden;
  border: 1px solid rgba(252, 252, 252, 0.15);
  border-radius: 0.8rem;

  @media (min-width: 768px) {
    visibility: visible;
    display: flex;
  }
`

export const MobileTabs = styled.div`
  display: flex;
  gap: 0.8rem;
  visibility: visible;
  border: 1px solid transparent;
  border-radius: 0.8rem;

  @media (min-width: 768px) {
    visibility: hidden;
    display: none;
  }
`

interface TabButtonProps {
  isActiveTab?: boolean
}

export const TabButton = styled(Button)<TabButtonProps>`
  border: ${props =>
    props.isActiveTab
      ? '0.1rem solid rgba(252, 252, 252, 0.15)'
      : '0.1rem solid transparent'};
  white-space: nowrap;
  border-radius: 0.8rem;
  width: 14rem;
  color: ${props => (props.isActiveTab ? '#ffffff' : '#bdbdbd')};
  font-weight: ${props => (props.isActiveTab ? 500 : 300)};
  transition: all 300ms ease-in-out;
  background-color: ${props =>
    props.isActiveTab ? '#FCFCFC0D' : 'transparent'};

  @media (max-width: 768px) {
    width: 100%;
    border: ${props =>
      props.isActiveTab
        ? '0.1rem solid rgba(252, 252, 252, 0.15)'
        : '0.1rem solid rgba(252, 252, 252, 0.15)'};
  }
`

export const FilterIcons = styled.div`
  display: flex;
  gap: 2.4rem;
`

interface FilterIconProps {
  selected?: boolean
}

export const FilterIcon = styled(Button)<FilterIconProps>`
  height: 4rem;
  width: 4rem;
  padding: 1rem;
  background: rgba(252, 252, 252, 0.05);
  border: 0.1rem solid rgba(252, 252, 252, 0.08);
  border-radius: 0.8rem;

  ${props =>
    !props.selected &&
    css`
      opacity: 0.5;
      filter: grayscale(100%);
      cursor: pointer;
    `}

  img {
    height: 2rem;
    width: 2rem;
  }
`
