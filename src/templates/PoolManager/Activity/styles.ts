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

export const LoadMoreContainer = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`

export const LoadMore = styled.button`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 4rem;
    height: 4rem;
    border: none;
    border: 1px solid rgb(255 255 255 / 0);
    border-radius: 50%;

    background-color: rgb(255 255 255 / 0.1);

    cursor: pointer;

    transition: border 300ms ease-in-out;

    &:hover {
      border: 1px solid rgb(255 255 255 / 0.1);
    }
  `}
`
