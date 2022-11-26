import styled, { css } from 'styled-components'

export const SocialLinks = styled.ul`
  ${() => css`
    display: flex;
    justify-content: space-between;

    width: 100%;
  `}
`

export const LinkWrapper = styled.li`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 3.2rem;
    height: 3.2rem;

    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  `}
`

export const SocialLink = styled.a`
  ${() => css`
    width: 2rem;
    height: 2rem;
  `}
`
