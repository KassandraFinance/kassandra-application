import styled, { css } from 'styled-components'

export const Operation = styled.div`
  ${() => css`
    display: flex;
    gap: 1.6rem;
    justify-content: flex-start;
    align-items: flex-start;

    margin-top: 3.2rem;
  `}
`

export const ButtonWarap = styled.div`
  ${({ theme }) => css`
    width: 12rem;
    height: 4.8rem;

    .sell {
      border: 1px solid ${theme.colors.snow};

      background-color: #fff0;
      outline-color: ${theme.colors.snow};

      transition-timing-function: ease-in-out;
      transition-duration: 300ms;
      transition-property: color background-color border-color;

      &:hover,
      &:focus {
        background-color: ${theme.colors.snow};
      }
    }
  `}
`

export const StakeButton = styled.button`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    width: 12rem;
    height: 4.6rem;

    font-family: ${theme.font.family};

    background-color: rgba(252, 252, 252, 0.05);
    border: 1px solid rgba(252, 252, 252, 0.15);
    border-radius: 8px;

    outline-color: ${theme.colors.snow};

    transition-timing-function: ease-in-out;
    transition-duration: 300ms;
    transition-property: border;

    cursor: pointer;

    &:hover {
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    p {
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.medium};
      line-height: 1.6rem;
      letter-spacing: 0.8px;

      background: linear-gradient(270deg, #ffbf00 -1.42%, #e843c4 101.42%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  `}
`
