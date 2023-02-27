import styled, { css } from 'styled-components'
import { Tr, Td, TBody } from '../../AssetsTable/styles'
import {
  Input,
  InputButton
} from '../../../../../components/Inputs/InputNumberRight/styles'

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
      gap: 5.1rem;

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
  width: 15px;
  height: 15px;

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
    background: rgba(255, 255, 255, 0.04);

    ${Tr} {
      border-top: 0.1rem solid rgba(255, 255, 255, 0.3);
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
    align-items: flex-end;
    gap: 0.4rem;
  `}
`

export const Total = styled.span`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.4rem;

    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font16};
    text-align: right;
    letter-spacing: 0.02em;

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
    text-align: right;
    letter-spacing: 0.05em;

    @media (min-width: 768px) {
      font-size: ${theme.font.sizes.font14};
    }
  `}
`

interface IInputWrapperProps {
  isBiggerThanZero: boolean;
  isBiggerThanBalance: boolean;
}

// prettier-ignore
export const InputWrapper = styled.div<IInputWrapperProps>`
  ${() => css`
    width: 11.6rem;
  `}
  ${({ theme, isBiggerThanZero, isBiggerThanBalance }) =>
    (isBiggerThanZero || isBiggerThanBalance) && css`
      ${Input} {
        border-block: 0.1rem solid ${theme.colors.error};
        border-left: 0.1rem solid ${theme.colors.error};
      }

      ${InputButton} {
        border-block: 0.1rem solid ${theme.colors.error} !important;
        border-right: 0.1rem solid ${theme.colors.error} !important;
        border-left: none !inportant;
      }
  `}
`

export const MaxButton = styled.button`
  ${({ theme }) => css`
    width: 3.9rem;
    height: 2rem;

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font12};
    line-height: 100%;
    letter-spacing: 0.01em;

    background-color: transparent;
    border: 0.1rem solid rgba(255, 255, 255, 0.3);
    border-radius: 0.3rem;

    cursor: pointer;

    transition-duration: 300ms;
    transition-timing-function: ease-in-out;
    transition-property: color background-color;

    &:hover {
      color: #1e1322;

      background-color: ${theme.colors.snow};
    }
  `}
`

export const Error = styled.p`
  ${({ theme }) => css`
    /* display: none; */

    margin-top: 0.8rem;

    color: ${theme.colors.error};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: 100%;

    transition-duration: 300ms;
    transition-timing-function: ease-in-out;
    transition-property: opacity;
  `}
`
