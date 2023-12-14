import styled, { css } from 'styled-components'

import { Input, Error } from '@/components/Inputs/InputText/styles'

export const DepositFee = styled.div`
  ${() => css`
    position: relative;

    width: 100%;
    height: auto;
    padding: 2.4rem;
    border-radius: 8px;

    background: rgb(255 255 255 / 0.05);

    hr {
      margin: 2.4rem 0;
      border: none;
      border-top: 0.1rem solid rgb(139 139 139 / 0.5);
    }
  `}
`

type ButtonWrapperProps = {
  showButtons: boolean
}
export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  ${() => css`
    display: flex;
    width: 100%;
    gap: 2.4rem;

    opacity: 0;
    height: 0;
    pointer-events: none;

    transition-timing-function: ease-in;
    transition-duration: 300ms;
    transition-property: opacity height;
  `}

  ${({ showButtons }) =>
    showButtons &&
    css`
      height: auto;
      opacity: 1;
      margin-top: 2.4rem;
      pointer-events: all;
    `}
`

export const DepositFeeHeader = styled.span`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;

    width: 100%;

    > h3 {
      color: ${theme.colors.white};
      font-weight: ${theme.font.weight.normal};
      font-size: ${theme.font.sizes.font14};
      line-height: 1.6rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }
  `}
`

export const CardWrapperParagraph = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font16};
    line-height: 135%;
  `}
`

interface IFeeContainerProps {
  isFeeChecked?: boolean
}

export const FeeContainer = styled.div<IFeeContainerProps>`
  ${() => css`
    overflow: hidden;

    max-height: 0;
    padding: 0.1rem;

    opacity: 0;
    pointer-events: none;

    transition-timing-function: ease-out;
    transition-duration: 700ms;
    transition-property: max-height opacity;
  `}
  ${({ isFeeChecked = true }) =>
    isFeeChecked &&
    css`
      max-height: 500px;

      opacity: 1;
      pointer-events: auto;

      transition-timing-function: ease-in;
      transition-duration: 700ms;
      transition-property: max-height opacity;
    `}
`

interface IWrapperInputFeeProps {
  isAddress: boolean
  value: number
}

export const InputFeeWrapper = styled.span<IWrapperInputFeeProps>`
  ${({ theme, isAddress }) => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    margin-top: 1.6rem;

    ${Input}[type="number"]:invalid:not([value=""]) {
      border: 1px solid ${theme.colors.error};
    }
    ${Input}[type="number"]:invalid:not([value='']) ~ ${Error} {
      color: ${theme.colors.error};
    }

    ${Input}[type="text"]:valid {
      border: ${isAddress
        ? `1px solid ${theme.colors.success};`
        : `1px solid ${theme.colors.error};`};
    }

    ${Input}[type="text"]:valid ~ ${Error} {
      display: ${!isAddress && 'block'};
    }
  `}
  ${({ theme, value }) =>
    value > 50 &&
    value <= 95 &&
    css`
      ${Input}[type="number"]:valid {
        border: 1px solid ${theme.colors.amber};
      }
      ${Input}[type="number"]:not([value='']) ~ ${Error} {
        display: block;

        color: ${theme.colors.amber};
      }
    `}
`

export const ReferralCommissionWrapper = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;

    width: 100%;
    margin-bottom: 1.6rem;
  `}
`

export const CardWrapperTitle = styled.h3`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font14};
    line-height: 1.6rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  `}
`

export const RefferalCommissionContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `}
`

export const InputRangeContent = styled.span`
  ${({ theme }) => css`
    display: flex;
    align-items: center;

    width: 100%;

    p {
      width: 16rem;

      color: #c4c4c4;
      font-weight: ${theme.font.weight.normal};
      font-size: ${theme.font.sizes.font12};
      line-height: 1.4rem;
      text-transform: uppercase;
    }
  `}
`

export const WrapperInputRange = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;

    width: 100%;
  `}
`

export const TotalDepositFeeContainer = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  `}
`

export const TotalDepositFeeTitle = styled.span`
  ${({ theme }) => css`
    margin-bottom: 0.4rem;

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font14};
    line-height: 1.4rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
  `}
`

export const TotalDepositFeePercentage = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font18};
    line-height: 2rem;
    letter-spacing: 0.05em;
    text-align: right;
    text-transform: uppercase;
  `}
`

export const BrokerAndManagerTitle = styled.span`
  ${({ theme }) => css`
    display: flex;
    align-items: center;

    color: #c4c4c4;
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
    line-height: 1.6rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
  `}
`

export const BrokerAndManagerPercentage = styled.p`
  ${({ theme }) => css`
    color: #c4c4c4;
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
    line-height: 1.6rem;
    letter-spacing: 0.3em;
    text-align: right;
    text-transform: uppercase;
  `}
`
