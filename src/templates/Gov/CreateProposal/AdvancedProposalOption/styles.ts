import styled, { css } from 'styled-components'

type AdvancedProposalOption = {
  isOpen: boolean
}

export const AdvancedProposalOption = styled.div<AdvancedProposalOption>`
  ${() => css`
    display: flex;
    flex-direction: column;
    width: 100%;

    border-radius: 8px;
    border: 1px solid rgba(252, 252, 252, 0.15);
    background: rgba(252, 252, 252, 0.05);
  `}
`

export const TitleContainer = styled.div`
  ${({ theme }) => css`
    padding: 2.4rem;
    border-bottom: 1px solid rgba(252, 252, 252, 0.15);

    > p {
      color: ${theme.colors.grayDisabled};
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.light};
      line-height: 135%;
    }

    a {
      text-decoration: underline;
      color: ${theme.colors.snow};
      font-size: ${theme.font.sizes.font16};
      line-height: 135%;
    }
  `}
`

export const TitleContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.6rem;

    > p {
      color: ${theme.colors.snow};
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      letter-spacing: 3.08px;
      text-transform: uppercase;
    }
  `}
`

export const BodyContainer = styled.div<AdvancedProposalOption>`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    padding: 0;
    gap: 3.2rem;

    overflow: hidden;

    max-height: 0;

    opacity: 0;
    pointer-events: none;

    transition-duration: 500ms;
    transition-timing-function: ease-out;
    transition-property: max-height opacity;

    > p {
      color: ${theme.colors.snow};
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      letter-spacing: 3.08px;
      text-transform: uppercase;
    }
  `}

  ${({ isOpen }) =>
    isOpen &&
    css`
      max-height: 50rem;
      padding: 2.4rem;

      opacity: 1;
      pointer-events: auto;
    `}
`
export const InputTextContainer = styled.div``

export const Example = styled.p`
  ${({ theme }) => css`
    margin-top: 0.8rem;
    margin-left: 0.8rem;
    color: ${theme.colors.grayDisabled};
    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.light};
    letter-spacing: 1px;
  `}
`
