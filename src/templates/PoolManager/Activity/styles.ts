import styled, { css } from 'styled-components'

export const Activity = styled.div`
  ${() => css`
    display: flex;
    gap: 2.4rem;
    justify-content: space-between;

    margin-top: 2.4rem;
    margin-bottom: 2.4rem;

    @media (max-width: 992px) {
      flex-direction: column-reverse;
    }
  `}
`

export const ActivityCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  justify-content: center;

  width: 100%;
`
