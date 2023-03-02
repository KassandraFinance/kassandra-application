import styled, { css } from 'styled-components'

export const SelectAssets = styled.div`
  ${() => css``}
`

export const TextContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    margin-bottom: 2.4rem;
  `}
`

export const AddAssetsTitle = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font14};
    line-height: ${theme.font.sizes.font16};
    letter-spacing: 0.22em;
    text-transform: uppercase;
  `}
`

export const AddAssetsText = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font16};
    line-height: 135%;
  `}
`
