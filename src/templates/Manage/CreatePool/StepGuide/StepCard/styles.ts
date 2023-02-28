import styled, { css } from 'styled-components'

export const StepCard = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: 2.4rem 1fr;
    gap: 1.2rem;

    width: 100%;
    padding: 1.6rem;

    background: rgba(33, 20, 38, 0.33);
    border: 0.1rem solid rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(5.7rem);
    border-radius: 1rem;

    @media (min-width: 768px) {
      grid-template-columns: 3.2rem 1fr;
      align-items: center;
      gap: 2.4rem;

      padding: 2.4rem;
    }
  `}
`

export const IconWrapper = styled.div`
  ${() => css`
    width: 2.4rem;
    height: 2.4rem;

    @media (min-width: 768px) {
      width: 3.2rem;
      height: 3.2rem;
    }
  `}
`

export const TextContainer = styled.div`
  ${() => css``}
`

export const Title = styled.h3`
  ${({ theme }) => css`
    margin-bottom: 0.5rem;

    color: #f79640;
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
    font-size: ${theme.font.sizes.font16};
    line-height: ${theme.font.sizes.font24};
  `}
`
