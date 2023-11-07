import styled, { css } from 'styled-components'

export const Swap = styled.ul`
  ${() => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2.4rem;
  `}
`

export const SwapContent = styled.li`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    > p {
      color: ${theme.colors.grayDisabled};
      font-weight: ${theme.font.weight.medium};
      font-size: ${theme.font.sizes.font14};
      line-height: 1.6rem;
      letter-spacing: 0.35px;
      text-transform: uppercase;
    }
  `}
`
