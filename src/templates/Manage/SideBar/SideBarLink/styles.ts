import styled, { css } from 'styled-components'

export const SideBarLink = styled.div`
  ${() => css`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    width: 100%;
    height: 5.6rem;
  `}
`

export const Wrapper = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    gap: 0.8rem;

    width: 100%;

    cursor: not-allowed;
  `}
`

export const Icon = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;

    min-width: 2.4rem;
    min-height: 2.4rem;
  `}
`

interface ITitleProps {
  isOpen: boolean;
}

// prettier-ignore
export const Title = styled.p<ITitleProps>`
  ${({ theme }) => css`
    color: rgba(255, 255, 255, 0.08);
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font16};
    line-height: ${theme.font.sizes.font16};
    text-transform: capitalize;
    white-space: nowrap;

    opacity: 1;

    transition-duration: 550ms;
    transition-timing-function: ease;
    transition-property: opacity;
  `}
  ${({ isOpen }) => !isOpen && css`
    opacity: 0;

    @media (min-width: 992px) {
      opacity: 1;
    }
  `}
`

export const Tag = styled.span`
  ${({ theme }) => css`
    width: 5.6rem;
    height: 2rem;
    margin-left: auto;
    padding: 0.4rem 0.8rem;

    color: rgba(252, 252, 252, 0.5);
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font12};
    line-height: 100%;

    background: rgba(255, 255, 255, 0.08);
    border-radius: 0.4rem;
  `}
`
