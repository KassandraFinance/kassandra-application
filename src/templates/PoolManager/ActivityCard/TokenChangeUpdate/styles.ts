import styled, { css } from 'styled-components'

export const TokenChangeUpdate = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
    gap: 2.4rem;

    @media (max-width: 600px) {
      flex-direction: column;
      padding-left: 2.4rem;
    }
  `}
`

export const TokenChangeUpdateContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    > p {
      color: ${theme.colors.grayDisabled};
      font-weight: ${theme.font.weight.normal};
      font-size: ${theme.font.sizes.font12};
      line-height: 1.2rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }
  `}
`

export const TokenInfoContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1.2rem;

    p {
      font-weight: ${theme.font.weight.medium};
      font-size: ${theme.font.sizes.font16};
      line-height: 1.6rem;
      letter-spacing: 0.05em;
    }
  `}
`

export const WeightsWrapper = styled.div`
  display: flex;
  gap: 0.6rem;
  justify-content: center;
  align-items: center;
`
