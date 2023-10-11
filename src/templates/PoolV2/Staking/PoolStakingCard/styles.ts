import styled, { css } from 'styled-components'

export const PoolStakingCard = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    width: 100%;

    border-radius: 8px;
    border: 1px solid rgba(252, 252, 252, 0.05);
    background: rgba(252, 252, 252, 0.05);
  `}
`

export const StakingCardHeaderWrapper = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 1.6rem;

    border-radius: 8px 8px 0px 0px;
    background: rgba(0, 0, 0, 0.25);
    border-bottom: 1px rgba(252, 252, 252, 0.08);
  `}
`

export const AprWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    span {
      color: ${theme.colors.grayDisabled};
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.medium};
      line-height: 1.6rem;
    }

    p {
      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font24};
      font-weight: ${theme.font.weight.medium};
    }
  `}
`

export const StakingCardBodyWrapper = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    padding: 1.6rem;
  `}
`

export const StakingUserDataListCard = styled.ul`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 1.6rem;

    border-radius: 8px;
    border: 1px solid rgba(252, 252, 252, 0.05);
    background: rgba(252, 252, 252, 0.05);
  `}
`

export const StakingUserData = styled.li`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;

    p {
      color: ${theme.colors.grayDisabled};
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.medium};
    }

    span {
      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.normal};
    }

    strong {
      color: ${theme.colors.grayDisabled};
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.light};
    }
  `}
`

export const Line = styled.span`
  ${() => css`
    width: 100%;
    height: 1px;
    margin-bottom: 1.6rem;

    background-color: rgba(252, 252, 252, 0.15);
  `}
`

export const ButtonsWrapper = styled.div`
  ${() => css`
    display: flex;
    gap: 1.6rem;
  `}
`

// export const QuestionsAndAnswersWrapper = styled.div`
//   ${() => css`
//     display: flex;
//     width: 100%;
//   `}
// `

// export const test = styled.`
//   ${() => css``}
// `
