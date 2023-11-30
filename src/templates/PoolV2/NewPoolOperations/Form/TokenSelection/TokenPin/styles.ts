import styled, { css } from 'styled-components'

export const TokenPinContainer = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    gap: 0.8rem;
    flex-wrap: wrap;

    min-height: 8rem;
  `}
`

export const DeletePin = styled.span`
  ${() => css`
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;

    display: none;

    padding: 0.3rem;

    background-color: #8a7887;
    border-radius: 50%;

    opacity: 1;

    cursor: pointer;
  `}
`

export const TokenPinMobile = styled.div`
  display: none;
  justify-content: center;
  padding: 0.9rem 1.1rem;

  background: rgba(255, 255, 255, 0.08);
  border-radius: 0.4rem;
  border: 0.1rem solid transparent;

  :hover {
    border: 0.1rem solid rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 960px) {
    display: flex;
  }
`

interface ITokenPinProps {
  isActive: boolean
}

// eslint-disable-next-line prettier/prettier
export const TokenPin = styled.div<ITokenPinProps>`
  ${({ isActive }) => css`
    position: relative;

    ${isActive
      ? `
      div {
        border: 0.1rem solid rgba(255, 255, 255, 0.3);
      }
      span {
        display: flex
      }
    `
      : `
      :hover {
        span {
          display: flex;
          animation: pinAnimation 0.5s ease;
        }
      }
    `}

    @keyframes pinAnimation {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `}
`

export const TokenPinNameContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.9rem 1.1rem;

    background: rgba(255, 255, 255, 0.08);
    border-radius: 0.4rem;

    color: ${theme.colors.snow};
    font-size: ${theme.font.sizes.font12};
    font-weight: ${theme.font.weight.normal};

    border: 0.1rem solid transparent;

    cursor: pointer;

    transition: border 0.2s;

    :hover {
      border: 0.1rem solid rgba(255, 255, 255, 0.3);
    }
  `}
`
