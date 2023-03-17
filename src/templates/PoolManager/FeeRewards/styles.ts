import styled, { css, keyframes } from 'styled-components'

export const FeeRewards = styled.div`
  ${() => css`
    margin-top: 2.4rem;

    @media (min-width: 992px) {
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 2.4rem;

      margin-top: 4.4rem;
    }
  `}
`

export const FeeBreakdownContainer = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 2.4rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.8rem;
    gap: 1.4rem;

    hr {
      border: none;
      border-top: 0.1rem solid rgba(139, 139, 139, 0.5);
    }

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

export const ReviewListContainer = styled.ul`
  ${() => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
  `}
`

export const ListContent = styled.li`
  ${() => css`
    display: flex;
    justify-content: space-between;
    width: 100%;

    animation: ${translateY} 0.3s ease;
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

export const FeeBreakdownTitle = styled.p`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.4rem;

    color: ${theme.colors.snow};
    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.medium};
    line-height: 1.4rem;
    letter-spacing: 0.025em;
    text-transform: uppercase;
  `}
`

export const FeeBreakdownPorcentage = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.font18};
    font-weight: ${theme.font.weight.medium};
    letter-spacing: 0.05em;
    line-height: 2rem;
  `}
`

export const FeeBreakdownParagraph = styled.p`
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

export const FeeBreakdownParagraphAmount = styled.p`
  ${({ theme }) => css`
    color: #fcfcfc;
    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.medium};
    line-height: 135%;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  `}
`

export const FeeBreakdownParagraphTotalAMount = styled.p`
  ${({ theme }) => css`
    color: #fcfcfc;
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.medium};
    line-height: 135%;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  `}
`

export const FeeBreakdownAdress = styled.a`
  ${({ theme }) => css`
    display: flex;
    gap: 0.4rem;

    color: #c4c4c4;
    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.light};
    line-height: 1.6rem;

    text-decoration: none;
  `}
`

export const AumFees = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    p {
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      line-height: 1.6rem;
      letter-spacing: 0.22rem;

      color: #c4c4c4;
    }
  `}
`

export const AvailableAumFees = styled.div`
  ${({ theme }) =>
    css`
      display: flex;
      flex-direction: column;
      gap: 1.6rem;
      background-color: rgba(255, 255, 255, 0.05);
      border-radius: 0.4rem;
      padding: 2.4rem;

      @media (min-width: 576px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 2.4rem;
      }

      h3 {
        font-size: ${theme.font.sizes.font16};
        font-weight: ${theme.font.weight.medium};
        line-height: 104%;
      }
    `}
`

export const ManagerFee = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    @media (min-width: 576px) {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
    }
  `}
`

export const AmountFees = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    span:first-child {
      font-size: ${theme.font.sizes.font24};
      font-weight: ${theme.font.weight.medium};
      line-height: 104%;
      color: ${theme.colors.white};
    }

    span {
      color: #bdbdbd;
      font-size: ${theme.font.sizes.font16};
      line-height: 135%;
      font-weight: ${theme.font.weight.normal};
    }

    @media (min-width: 576px) {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  `}
`

export const Harvest = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    @media (min-width: 576px) {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    span {
      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.normal};
    }
  `}
`

export const ClaimedRewards = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 0.4rem;
    padding: 2.4rem;

    span {
      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.normal};
    }
  `}
`
