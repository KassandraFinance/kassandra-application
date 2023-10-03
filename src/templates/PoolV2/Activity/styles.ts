import styled, { css } from 'styled-components'

export const Activity = styled.div`
  ${() => css`
    padding-top: 5.6rem;

    @media (max-width: 992px) {
      width: 100%;
      padding-inline: 2.4rem;
    }

    @media (max-width: 576px) {
      padding-inline: 1.6rem;
    }
  `}
`

export const CardContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 4rem;
  `}
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
