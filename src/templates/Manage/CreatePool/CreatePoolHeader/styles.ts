import styled, { css } from 'styled-components'

export const CreatePoolHeader = styled.div`
  ${() => css`
    margin-bottom: 2.4rem;
  `}
`

export const Title = styled.h2`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.8rem;

    margin-bottom: 1.6rem;

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font14};
    letter-spacing: 0.22em;
    text-transform: uppercase;
  `}
`

export const Line = styled.span`
  ${() => css`
    display: block;

    width: 100%;
    height: 0.1rem;

    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 0.05rem;
  `}
`
