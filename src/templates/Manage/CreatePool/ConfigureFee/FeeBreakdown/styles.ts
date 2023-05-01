import styled, { css, keyframes } from 'styled-components'

export const FeeBreakdown = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1.4rem;

    @media (max-width: 992px) {
      margin-bottom: 12rem;
    }
  `}
`

export const FeeBreakdownContainer = styled.div`
  ${({ theme }) => css`
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

export const ReviewListContent = styled.li`
  ${() => css`
    display: flex;
    justify-content: space-between;
    width: 100%;

    animation: ${translateY} 0.3s ease;
  `}
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

export const FeeBreakdownParagraph = styled.p`
  ${({ theme }) => css`
    color: #c4c4c4;
    font-size: ${theme.font.sizes.font12};
    font-weight: ${theme.font.weight.normal};
    line-height: 1.6rem;
    letter-spacing: 0.3em;
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

export const FeeBreakdownPorcentage = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.font18};
    font-weight: ${theme.font.weight.medium};
    letter-spacing: 0.05em;
    line-height: 2rem;
  `}
`

export const WarningContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.6rem 2.4rem;

    background: rgba(255, 255, 255, 0.04);
    border: 0.1rem solid rgba(255, 191, 0, 0.8);
    border-radius: 0.8rem;

    img {
      margin-top: 0.4rem;

      @media (max-width: 992px) {
        margin-top: 0;
      }
    }

    p {
      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.normal};
      line-height: 2.4rem;
    }

    strong {
      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.bold};
      line-height: 2.4rem;
    }
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
