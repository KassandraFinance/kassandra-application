import styled, { css } from 'styled-components'

export const QuestionsAndAnswers = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    background-color: transparent;
    border-radius: 8px;

    details[open] {
      ${PlusIcon} {
        display: none;
      }
      ${DashIcon} {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  `}
`

export const Questions = styled.details`
  ${() => css`
    display: flex;

    border-radius: 8px;
    background-color: rgba(252, 252, 252, 0.03);
  `}
`

export const Summary = styled.summary`
  ${({ theme }) => css`
    all: unset;

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 3.2rem;

    background-color: rgba(252, 252, 252, 0.05);
    border-radius: 8px;

    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.medium};
    line-height: 2.4rem;

    cursor: pointer;

    &:focus-visible {
      outline: 2px solid #bdbdbd;
    }
  `}
`

export const IconWrapper = styled.div`
  ${() => css`
    margin-left: 0.8rem;
  `}
`

export const PlusIcon = styled.span`
  ${() => css``}
`

export const DashIcon = styled.span`
  ${() => css`
    display: none;
  `}
`

export const text = styled.p`
  ${({ theme }) => css`
    padding: 2.4rem 3.2rem;

    color: ${theme.colors.grayDisabled};
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.normal};
    line-height: 2.4rem;
  `}
`
