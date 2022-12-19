import styled, { css, keyframes } from 'styled-components'

import { Input, Error } from '../../../../../components/Inputs/InputText/styles'

export const FeeConfig = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    margin-bottom: 12rem;

    @media (max-width: 992px) {
      margin-bottom: 0;
    }
  `}
`

export const CardWrapper = styled.div`
  ${() => css`
    height: auto;
    width: 100%;
    padding: 2.4rem;

    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.8rem;

    hr {
      margin: 2.4rem 0;

      border: none;
      border-top: 0.1rem solid rgba(139, 139, 139, 0.5);
    }
  `}
`

export const DepositFeeHeader = styled.span`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    width: 100%;

    > h3 {
      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      line-height: 1.6rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }
  `}
`

export const ManagementHeader = styled.span`
  ${() => css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 1.6rem;
  `}
`

interface IIsAddressProps {
  isAddress: boolean;
}
// eslint-disable-next-line prettier/prettier
export const WrapperInput = styled.div<IIsAddressProps>`
  ${({ theme, isAddress }) => css`
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
    margin-top: 1.6rem;

    ${Input}[type="number"]:invalid:not([value=""]) {
      border: 0.1rem solid ${theme.colors.amber};
    }
    ${Input}[type="number"]:invalid:not([value='']) ~ ${Error} {
      color: ${theme.colors.amber};
    }

    ${Input}[type="text"]:valid {
      border: ${isAddress
        ? `0.1rem solid ${theme.colors.success};`
        : `0.1rem solid ${theme.colors.error};`};
    }

    ${Input}[type="text"]:valid ~ ${Error} {
      display: ${!isAddress && 'block'};
    }

    animation: ${translateY} 0.4s ease;
  `}
`

export const CardWrapperParagraph = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.light};
    line-height: 135%;
  `}
`

export const CardWrapperTitle = styled.h3`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.normal};
    line-height: 1.6rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  `}
`

// eslint-disable-next-line prettier/prettier
export const WrapperInputFee = styled.span<IIsAddressProps>`
  ${({ theme, isAddress }) => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 1.6rem;

    ${Input}[type="number"]:invalid:not([value=""]) {
      border: 0.1rem solid ${theme.colors.amber};
    }
    ${Input}[type="number"]:invalid:not([value='']) ~ ${Error} {
      color: ${theme.colors.amber};
    }

    ${Input}[type="text"]:valid {
      border: ${isAddress
        ? `0.1rem solid ${theme.colors.success};`
        : `0.1rem solid ${theme.colors.error};`};
    }

    ${Input}[type="text"]:valid ~ ${Error} {
      display: ${!isAddress && 'block'};
    }

    animation: ${translateY} 0.4s ease;
  `}
`

export const RefferalCommissionContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    animation: ${translateY} 0.4s ease;
  `}
`

export const RefferalCommissionWrapper = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 1.6rem;
  `}
`

export const TotalDepositFeeContainer = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;

    animation: ${translateY} 0.4s ease;
  `}
`

export const TotalDepositFeeTitle = styled.span`
  ${({ theme }) => css`
    margin-bottom: 0.4rem;

    color: ${theme.colors.snow};
    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.medium};
    line-height: 1.4rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
  `}
`
export const TotalDepositFeePercentage = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.font18};
    font-weight: ${theme.font.weight.medium};
    line-height: 2rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    text-align: right;
  `}
`

export const BrokerAndManagerTitle = styled.span`
  ${({ theme }) => css`
    display: flex;
    align-items: center;

    color: #c4c4c4;
    font-size: ${theme.font.sizes.font12};
    font-weight: ${theme.font.weight.normal};
    line-height: 1.6rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
  `}
`
export const BrokerAndManagerPercentage = styled.p`
  ${({ theme }) => css`
    color: #c4c4c4;
    font-size: ${theme.font.sizes.font12};
    font-weight: ${theme.font.weight.normal};
    line-height: 1.6rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    text-align: right;
  `}
`

export const WrapperInputRange = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
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
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.normal};
      line-height: 1.4rem;
      text-transform: uppercase;
    }
  `}
`

export const WithdrawFeeTitle = styled.h3`
  ${({ theme }) => css`
    margin-bottom: 1.8rem;

    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.normal};
    line-height: 1.6rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;

    strong {
      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      line-height: 1.6rem;
      letter-spacing: 0.05em;
      text-transform: lowercase;
    }
  `}
`

export const WithdrawFeeParagraph = styled.h3`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.normal};
    line-height: 1.6rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  `}
`

const translateY = keyframes`
  from {
    transform: translateY(-2.5rem);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`
