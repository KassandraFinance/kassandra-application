import styled, { css } from 'styled-components'
import { Tr, Td, TBody } from '../../AssetsTable/styles'
import { Input, InputButton } from '@/components/Inputs/InputNumberRight/styles'

export const AddLiquidityTable = styled.div`
  ${({ theme }) => css`
    .asset {
      width: 100%;
    }

    .price {
      display: none;

      text-align: right;
    }

    .balance {
      display: none;

      min-width: 8.5rem;

      text-align: right;
    }

    .liquidity {
      align-items: flex-end;

      min-width: 12.7rem;
    }

    ${TBody} {
      max-height: 49rem;
    }

    ${Tr} {
      gap: 3rem;

      @media (min-width: 768px) {
        gap: 9.1rem;
      }

      @media (min-width: 992px) {
        gap: 3rem;
      }

      @media (min-width: 1050px) {
        gap: 4.5rem;
      }

      @media (min-width: 1200px) {
        gap: 10rem;
      }
    }

    ${Td} {
      position: relative;

      font-weight: ${theme.font.weight.medium};
    }

    @media (min-width: 576px) {
      .balance {
        display: flex;
      }
    }

    @media (min-width: 768px) {
      .price {
        display: flex;
      }
    }
  `}
`

export const Tooltip = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  margin-bottom: 0.1rem;
`

export const SecondaryText = styled.span`
  ${({ theme }) => css`
    color: #bfbfbf;
    font-weight: ${theme.font.weight.light};
  `}
`

export const Footer = styled.div`
  ${() => css`
    background: rgb(255 255 255 / 0.04);

    ${Tr} {
      border-top: 0.1rem solid rgb(255 255 255 / 0.3);
    }
  `}
`

export const Title = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font14};
    line-height: ${theme.font.sizes.font24};

    @media (min-width: 768px) {
      font-size: ${theme.font.sizes.font20};
      line-height: 110%;
      letter-spacing: 0.02em;
    }
  `}
`

export const TotalContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    align-items: flex-end;
  `}
`

export const Total = styled.span`
  ${({ theme }) => css`
    display: flex;
    gap: 0.4rem;
    align-items: center;

    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font16};
    letter-spacing: 0.02em;
    text-align: right;

    @media (min-width: 768px) {
      font-size: ${theme.font.sizes.font20};
    }
  `}
`

export const Available = styled.span`
  ${({ theme }) => css`
    color: #bfbfbf;
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
    line-height: ${theme.font.sizes.font16};
    letter-spacing: 0.05em;
    text-align: right;

    @media (min-width: 768px) {
      font-size: ${theme.font.sizes.font14};
    }
  `}
`

interface IInputWrapperProps {
  isBiggerThanZero: boolean
  isBiggerThanBalance: boolean
}

// prettier-ignore
export const InputWrapper = styled.div<IInputWrapperProps>`
  ${() => css`
    width: 11.6rem;
  `}
  ${({ theme, isBiggerThanZero, isBiggerThanBalance }) =>
    (isBiggerThanZero || isBiggerThanBalance) && css`
      ${Input} {
        border-left: 0.1rem solid ${theme.colors.error};
        border-block: 0.1rem solid ${theme.colors.error};
      }

      ${InputButton} {
        border-right: 0.1rem solid ${theme.colors.error} !important;
        border-left: none !inportant;
        border-block: 0.1rem solid ${theme.colors.error} !important;
      }
  `}
`

export const MaxButton = styled.button`
  ${({ theme }) => css`
    width: 3.9rem;
    height: 2rem;
    border: 1px solid rgb(255 255 255 / 0.3);
    border-radius: 3px;

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font12};
    line-height: 100%;
    letter-spacing: 0.01em;

    background-color: transparent;

    cursor: pointer;

    transition-timing-function: ease-in-out;
    transition-duration: 300ms;
    transition-property: color background-color;

    &:hover {
      color: #1e1322;

      background-color: ${theme.colors.snow};
    }
  `}
`

interface IErrorProps {
  isError: boolean
}

// prettier-ignore
export const Error = styled.p<IErrorProps>`
  ${({ theme }) => css`
    position: absolute;
    bottom: -2rem;

    color: ${theme.colors.error};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: 100%;
    white-space: nowrap;

    opacity: 0;

    transition-timing-function: ease-in-out;
    transition-duration: 300ms;
    transition-property: opacity;
  `}
  ${({ isError }) => isError && css`
      opacity: 1;
  `}
`
