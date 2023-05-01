import styled, { css } from 'styled-components'

export const TransactionFinalized = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 3.2rem;

    width: 100%;
    height: 43.4rem;
    margin-inline: auto;
    padding: 3.2rem;

    background: rgba(255, 255, 255, 0.04);
    border-radius: 8px;

    @media (min-width: 576px) {
      width: 43.2rem;
    }
  `}
`

export const ImageWrapper = styled.div`
  ${() => css`
    position: relative;

    width: 8rem;
    height: 8rem;
  `}
`

export const Title = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.bold};
    font-size: ${theme.font.sizes.font24};
    line-height: 110%;
    text-align: center;
  `}
`
