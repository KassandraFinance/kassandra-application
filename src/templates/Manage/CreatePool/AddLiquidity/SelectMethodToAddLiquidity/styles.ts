import styled, { css } from 'styled-components'

export const SelectMethodToAddLiquidity = styled.div`
  ${() => css`
    width: 100%;
    max-height: 13rem;
    padding: 2.4rem;
    border-radius: 8px;

    background: rgb(252 252 252 / 0.05);

    @media (max-width: 576px) {
      padding: 1.6rem;
    }
  `}
`

export const Title = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
    line-height: ${theme.font.sizes.font12};
    letter-spacing: 0.165rem;
    text-transform: uppercase;
  `}
`

export const RadiosContainer = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;

    width: 100%;
    margin-top: 1.2rem;
  `}
`
type InputWrapProps = {
  checked: boolean
}
export const Label = styled.label<InputWrapProps>`
  ${({ theme, checked }) => css`
    display: flex;
    gap: 0.8rem;
    justify-content: center;
    align-items: center;

    width: 100%;
    padding-top: 1.6rem;
    padding-bottom: 1.6rem;
    border: 1px solid ${checked ? theme.colors.snow : 'rgb(252 252 252 / 0.3)'};
    border-radius: 8px;

    color: ${checked ? theme.colors.snow : theme.colors.grayDisabled};
    font-size: ${theme.font.sizes.font12};
    line-height: ${theme.font.sizes.font14};
    letter-spacing: 0.12rem;
    text-align: center;
    text-transform: uppercase;

    cursor: pointer;

    transition: color stroke 0.15s;

    &:hover {
      color: ${theme.colors.white};

      > svg {
        path {
          fill: ${theme.colors.white};
        }
      }
    }

    svg {
      path {
        fill: ${checked ? theme.colors.snow : theme.colors.grayDisabled};
      }
    }

    &:nth-child(1) {
      margin-right: ${checked ? 0 : '-0.5rem'};
      border-right: ${checked ? '1px' : 0} solid;
      border-top-right-radius: ${checked ? '8px' : 0};
      border-bottom-right-radius: ${checked ? '8px' : 0};
    }

    &:nth-child(2) {
      margin-left: ${checked ? 0 : '-0.5rem'};
      border-left: ${checked ? '1px' : 0} solid;
      border-top-left-radius: ${checked ? '8px' : 0};
      border-bottom-left-radius: ${checked ? '8px' : 0};
    }
  `}
`

export const Input = styled.input`
  ${() => css`
    appearance: none;
  `}
`
