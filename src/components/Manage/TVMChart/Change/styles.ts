import styled, { css } from 'styled-components'

export const Change = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.4rem;
  `}
`

export const ChangeTitle = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.grayDisabled};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: ${theme.font.sizes.font16};
    text-transform: capitalize;
  `}
`

interface IChangeValueProps {
  value: number
}

// prettier-ignore
export const ChangeValue = styled.div<IChangeValueProps>`
  ${({ theme }) => css`
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font14};
    line-height: ${theme.font.sizes.font14};
    letter-spacing: 0.025em;
    text-transform: uppercase;
  `}
  ${({ theme, value }) => value > 0 && css`
    color: ${theme.colors.green};
  `}
  ${({ theme, value }) => value < 0 && css`
    color: ${theme.colors.red};
  `}
  ${({ theme, value }) => value === 0 && css`
    color: ${theme.colors.snow};
  `}
`
