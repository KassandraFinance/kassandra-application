import { WrapperInputNumber } from '@/components/Inputs/InputNumber/styles'
import styled, { css } from 'styled-components'

export const TokenInfo = styled.td`
  ${() => css`
    display: flex;
    align-items: center;
    gap: 1.2rem;

    @media (max-width: 745px) {
      grid-area: tokenInfo;
      gap: 0.8rem;
    }
  `}
`

export const TokenNameContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.4rem;

    width: 100%;

    > p {
      color: #bdbdbd;
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.light};
      line-height: 104%;
    }

    @media (max-width: 745px) {
      flex-direction: row;
      align-items: center;
    }

    #mobile {
      display: none;
      @media (max-width: 745px) {
        display: flex;
        align-items: flex-end;
      }
    }
    #desktop,
    p {
      @media (max-width: 745px) {
        display: none;
      }
    }
  `}
`

export const TokenName = styled.a`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    max-width: 10rem;

    color: #fcfcfc;
    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.medium};
    line-height: 104%;

    text-decoration: none;
    white-space: nowrap;

    cursor: pointer;
  `}
`

export const Line = styled.span`
  ${() => css`
    display: none;
    margin-left: auto;
    height: 1.4rem;

    border: 1px solid rgba(255, 255, 255, 0.3);

    @media (max-width: 745px) {
      display: block;
    }
  `}
`
interface IMoreInfoProps {
  isOpen: boolean
}

// eslint-disable-next-line prettier/prettier
export const CurrentAmountContainer = styled.td<IMoreInfoProps>`
  ${({ isOpen }) => css`
    display: flex;
    align-items: center;

    transition:
      height 0.4s ease,
      opacity 0.4s ease,
      margin-top 0.4s ease;

    @media (max-width: 745px) {
      height: ${isOpen ? '5.5rem' : '0'};
      opacity: ${isOpen ? '1' : '0'};
      z-index: ${isOpen ? '1000' : '-1'};
      margin-top: ${isOpen ? '0' : '-2rem'};

      ${CurrentAmount} {
        height: ${isOpen ? '5.5rem' : '0'};
      }

      align-items: center;
      grid-area: currentAmount;
      /* max-width: 23rem; */
    }
  `}
`

export const CurrentAmount = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    gap: 0.4rem;
    width: 100%;

    p:first-child {
      margin-bottom: 0.4rem;
      @media (min-width: 745px) {
        display: none;
      }
    }

    > span {
      color: #ffffff;
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.medium};
      line-height: 104%;
    }
    > p {
      color: #bfbfbf;
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.light};
      line-height: 104%;
    }

    @media (max-width: 745px) {
      align-items: center;
    }
  `}
`
export const AmountLine = styled.span`
  ${() => css`
    display: none;
    height: 2.8rem;
    margin-right: 1.6rem;

    border: 1px solid rgba(255, 255, 255, 0.3);

    @media (max-width: 745px) {
      display: block;
    }
  `}
`
export const Allocation = styled.td`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-width: 6.3rem;

    color: #ffffff;
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.medium};
    line-height: 100%;

    p {
      width: 7.5rem;
      text-align: right;
    }

    @media (max-width: 745px) {
      grid-area: porcentage;

      p {
        width: 100%;
        text-align: center;
      }
    }
  `}
`

export const Arrow = styled.td`
  ${() => css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    width: 3.2rem;

    @media (max-width: 650px) {
      justify-content: center;
    }

    @media (max-width: 745px) {
      grid-area: arrow;
      justify-content: center;
      width: 1.5rem;
    }
  `}
`

interface INewAllocation {
  checkValueDiff: boolean
}

export const NewAllocation = styled.td<INewAllocation>`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;

    @media (max-width: 745px) {
      grid-area: newAllocation;
      justify-content: flex-end;
    }
  `}

  ${({ checkValueDiff, theme }) =>
    checkValueDiff &&
    css`
      ${WrapperInputNumber} {
        border: 1px solid ${theme.colors.amber};
      }
    `}
`

export const ImageContent = styled.span`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 3.2rem;
    min-width: 3.2rem;
    border-radius: 50%;
    background: #ffffff10;

    @media (max-width: 745px) {
      width: 1.6rem;
    }
  `}
`

interface ILockButtonProps {
  active: boolean
}

// prettier-ignore
export const LockButton = styled.button<ILockButtonProps>`
  ${() => css`
    width: 3.2rem;
    height: 3.2rem;
    border: 1px solid rgb(255 255 255 / 0);
    border-radius: 50%;

    background: rgb(255 255 255 / 0);

    cursor: pointer;

    transition-timing-function: ease-in-out;
    transition-duration: 300ms;
    transition-property: background-color border;

    #lock-up-closed {
      transition-timing-function: ease;
      transition-duration: 300ms;
      transition-property: stroke-dashoffset;

      stroke-dasharray: 100%;
      stroke-dashoffset: 30%;
    }

    &:hover {
      background-color: rgb(255 255 255 / 0.08);
    }
  `}
  ${({ theme, active }) => active && css`
    border: 1px solid ${theme.colors.blue};
    background-color: ${theme.colors.blue};

    #lock-up-closed {
      stroke-dashoffset: 0%;
    }

    &:hover {
      background-color: ${theme.colors.blue};
      filter: brightness(0.9);
    }
  `}
`

export const InputCheckbox = styled.td`
  max-width: 1rem;
  max-height: 1rem;
`

// eslint-disable-next-line prettier/prettier
export const NewAmount = styled.td<IMoreInfoProps>`
  ${({ theme, isOpen }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.4rem;

    p:first-child {
      margin-bottom: 0.4rem;
      @media (min-width: 745px) {
        display: none;
      }
    }

    > span {
      color: #ffffff;
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.medium};
      line-height: 104%;
    }
    > p {
      color: #bfbfbf;
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.light};
      line-height: 104%;
    }

    transition:
      height 0.4s ease,
      opacity 0.4s ease,
      margin-top 0.4s ease;

    @media (max-width: 745px) {
      height: ${isOpen ? '5.5rem' : '0'};
      opacity: ${isOpen ? '1' : '0'};
      z-index: ${isOpen ? '1000' : '-1'};
      margin-top: ${isOpen ? '0' : '-4rem'};

      grid-area: newAmount;
      align-items: center;
    }
  `}
`

// eslint-disable-next-line prettier/prettier
export const MoreInfoContainer = styled.td<IMoreInfoProps>`
  ${({ theme, isOpen }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.4rem;
    margin-bottom: 1.4rem;
    grid-area: moreInfo;


    img {
      transition: transform 0.4s ease;
      transform: rotate(${isOpen ? '180deg' : '0'});
    }

    button {
      display: flex;
      align-items: center;
      gap: 0.8rem;

      color: #fcfcfc;
      font-family: ${theme.font.family}
      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font14};
      line-height: 100%;
      letter-spacing: 0.05em;

      background-color: transparent;
      border: none;

      cursor: pointer;
    }

    @media (min-width: 745px) {
      display: none;
    }
  `}
`
