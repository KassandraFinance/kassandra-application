import styled, { css, keyframes } from 'styled-components'

export const FeeBreakdown = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 1.4rem;

    width: 100%;
    padding: 2.4rem;
    border-radius: 8px;

    background: rgb(255 255 255 / 0.05);

    hr {
      border: none;
      border-top: 0.1rem solid rgb(139 139 139 / 0.5);
    }

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

export const ReviewListContainer = styled.ul`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    width: 100%;
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
    gap: 0.4rem;
    align-items: center;

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font14};
    line-height: 1.4rem;
    letter-spacing: 0.025em;
    text-transform: uppercase;
  `}
`

export const FeeBreakdownPorcentage = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font18};
    line-height: 2rem;
    letter-spacing: 0.05em;
  `}
`

export const FeeBreakdownParagraph = styled.p`
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

export const FeeBreakdownParagraphAmount = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font14};
    line-height: 135%;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  `}
`

export const FeeBreakdownParagraphTotalAMount = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font16};
    line-height: 135%;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  `}
`
