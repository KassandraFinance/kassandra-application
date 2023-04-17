import styled, { css } from 'styled-components'

export const SelectTokenRemove = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1.2rem;
  `}
`

export const RemovedTokenReviewCard = styled.ul`
  ${() => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.2rem;
    padding: 1.6rem 2.4rem;

    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;

    @media (max-width: 992px) {
      width: 100%;
    }
  `}
`

export const LineRemovedTokenReview = styled.li`
  ${() => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `}
`

interface IValueTextProps {
  color?: string;
}

// eslint-disable-next-line prettier/prettier
export const ValueText = styled.p<IValueTextProps>`
  ${({ theme, color }) => css`
    max-width: 13rem;

    color: ${color ? color : theme.colors.grayDisabled};
    font-size: ${theme.font.sizes.font12};
    font-weight: ${theme.font.weight.normal};
    line-height: 1.6rem;
    text-transform: uppercase;
    letter-spacing: 0.3em;
  `}
`

export const AllocationAndHoldingValue = styled.span`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.8rem;

    font-size: ${theme.font.sizes.font20};
    font-weight: ${theme.font.weight.medium};
    line-height: 2rem;
    text-align: right;

    > span {
      width: 2.4rem;
      height: 2.4rem;

      overflow: hidden;
      border-radius: 50%;
    }
  `}
`

export const TextBalance = styled.p`
  ${({ theme }) => css`
    position: relative;

    display: flex;
    align-items: center;
    gap: 0.8rem;

    color: ${theme.colors.grayDisabled};
    font-size: ${theme.font.sizes.font12};
    font-weight: ${theme.font.weight.light};
    line-height: 135%;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    text-align: right;

    img {
      display: none;

      @media (max-width: 576px) {
        display: flex;
      }
    }

    strong {
      color: ${theme.colors.grayDisabled};
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.light};
      line-height: 135%;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      text-align: right;

      @media (max-width: 576px) {
        display: none;
      }
    }

    input {
      position: absolute;
      opacity: 0;
      right: 0;
    }
  `}
`

export const TokenValueContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.4rem;
  `}
`
