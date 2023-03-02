import styled from 'styled-components'
import theme from '../../styles/theme'

export const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  margin-top: 6rem;

  white-space: nowrap;

  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  @media (max-width: 1200px) {
    overflow-x: auto;

    ::-webkit-scrollbar {
      height: 1px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0);
    }

    ::-moz-scrollbar {
      height: 1px;
    }
    ::-moz-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0);
    }

    ::-o-scrollbar {
      height: 1px;
    }
    ::-o-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0);
    }

    ::-ms-scrollbar {
      height: 1px;
    }
    ::-ms-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0);
    }
  }
`

interface ITabsButtonProps {
  isActiveTab?: boolean;
}

// prettier-ignore
export const TabsButton =styled.button<ITabsButtonProps>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.6rem;

  background-color: ${props =>
    props.isActiveTab ? 'rgba(255, 255, 255, 0.05)' : 'transparent'};
  border: 0;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  border: ${props =>
    props.isActiveTab
      ? '0.1rem solid rgba(255, 255, 255, 0.08)'
      : '0.1rem solid transparent'};
  border-bottom: none;

  font-family: 'Rubik', sans-serif;
  color: ${props => (props.isActiveTab ? '#ffffff' : '#c4c4c4')};
  font-size: ${theme.font.sizes.font16};
  font-weight: ${theme.font.weight.normal};

  transition: background-color 300ms ease-in-out, border 300ms ease-in-out, color 300ms ease-in-out;

  cursor: pointer;

  span {
    display: flex;
    align-items: center;
  }

  @media (max-width: 580px) {
    height: 5.2rem;
    padding: 1rem;

    font-size: ${theme.font.sizes.font14};
    font-weight: ${props =>
      props.isActiveTab ? theme.font.weight.semibold : theme.font.weight.light};
  }
`
