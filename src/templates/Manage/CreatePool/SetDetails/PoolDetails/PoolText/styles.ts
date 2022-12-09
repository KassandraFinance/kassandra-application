import styled, { css } from 'styled-components'

export const PoolText = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  `}
`

export const Title = styled.h4`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font14};
    line-height: ${theme.font.sizes.font16};
    letter-spacing: 0.22em;
    text-transform: uppercase;
  `}
`

export const Text = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: ${theme.font.sizes.font24};
    letter-spacing: 0.05em;

    @media (min-width: 768px) {
      font-size: ${theme.font.sizes.font16};
      line-height: 135%;
    }
  `}
`
