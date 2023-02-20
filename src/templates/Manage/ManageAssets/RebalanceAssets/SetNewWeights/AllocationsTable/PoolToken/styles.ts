import styled, { css, keyframes } from 'styled-components'

// interface IProps {
//   isActive: boolean;
// }
// eslint-disable-next-line prettier/prettier

export const TokenInfo = styled.td`
  ${() => css`
    display: flex;
    align-items: center;
    gap: 1.2rem;

    @media (max-width: 576px) {
      grid-area: tokenInfo;
    }
  `}
`

export const TokenNameContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.4rem;

    > p {
      color: #bdbdbd;
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.light};
      line-height: 104%;
    }

    @media (max-width: 576px) {
      flex-direction: row;
      align-items: center;
    }

    #mobile {
      display: none;
      @media (max-width: 576px) {
        display: flex;
        align-items: flex-end;
      }
    }
    #desktop,
    p {
      @media (max-width: 576px) {
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

    color: #fcfcfc;
    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.medium};
    line-height: 104%;

    text-decoration: none;
  `}
`

export const Line = styled.span`
  ${() => css`
    display: none;
    margin-left: 0.9rem;
    height: 1.4rem;

    border: 1px solid rgba(255, 255, 255, 0.3);

    @media (max-width: 576px) {
      display: block;
    }
  `}
`
interface IMoreInfoProps {
  isOpen: boolean;
}

// eslint-disable-next-line prettier/prettier
export const CurrentAmountContainer = styled.td<IMoreInfoProps>`
  ${({ isOpen }) => css`
    display: flex;
    align-items: center;
    /* justify-content: space-around; */
    /* max-width: 19.5rem; */

    @media (max-width: 576px) {
      display: ${isOpen ? 'flex' : 'none'};
      align-items: center;
      animation: ${moveDown} 0.4s ease;
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
      @media (min-width: 576px) {
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

    @media (max-width: 576px) {
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

    @media (max-width: 576px) {
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

    @media (max-width: 576px) {
      grid-area: porcentage;
    }
  `}
`

export const Arrow = styled.td`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    @media (max-width: 576px) {
      grid-area: arrow;
      justify-content: center;
    }
  `}
`

export const NewAllocation = styled.td`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;

    @media (max-width: 576px) {
      grid-area: newAllocation;
      justify-content: flex-end;
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

    @media (max-width: 576px) {
      width: 1.6rem;
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
      @media (min-width: 576px) {
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

    @media (max-width: 576px) {
      display: ${isOpen ? 'flex' : 'none'};
      animation: ${moveDown} 0.4s ease;
      grid-area: newAmount;
      align-items: center;
    }
  `}
`

export const MoreInfoContainer = styled.td`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.4rem;
    margin-bottom: 1.4rem;
    grid-area: moreInfo;


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

    @media (min-width: 576px) {
      display: none;
    }
  `}
`

const moveDown = keyframes`
  0% { transform: translateY(-2rem); }
  100% { transform: translateY(0); }
`
