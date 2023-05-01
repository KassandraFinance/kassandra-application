import styled, { css } from 'styled-components'

export const ModalChooseNetwork = styled.div`
  ${() => css``}
`

export const ModalContent = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    width: 39.2rem;

    background: rgb(31 41 55 / 0.96);
    backdrop-filter: blur(0.4rem);

    @media (max-width: 576px) {
      width: 100%;
    }
  `}
`

export const WrapperIconsBackGround = styled.button`
  ${({ theme }) => css`
    display: flex;
    align-items: center;

    width: 100%;
    padding: 0.1rem;
    border: none;
    border-radius: 10px;

    background: #1f1f1fb8;

    &:hover,
    &:focus {
      background-image: linear-gradient(0deg, #ffbf00 -0.02%, #e843c4 99.99%);
    }

    &:focus {
      outline: none;
    }

    &:disabled {
      filter: grayscale(1);

      &:disabled {
        > div {
          span {
            color: rgb(255 255 255 / 0.3);
            font-weight: 300;
            font-style: normal;
            font-size: ${theme.font.sizes.font16};
            font-family: Rubik, sans-serif;
            line-height: 100%;
            letter-spacing: 0.05em;
          }

          span:nth-of-type(3) {
            margin-left: auto;
          }
        }
      }
    }
  `}
`

export const WrapperIcons = styled.div`
  ${({ theme }) => css`
    z-index: 2;

    display: flex;
    gap: 1.2rem;
    align-items: center;

    width: 100%;
    padding: 1.6rem;
    border: none;
    border-radius: 10px;

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font16};
    letter-spacing: 0.08rem;

    background: #1f1f1f;

    cursor: pointer;

    span {
      color: ${theme.colors.snow};
      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font16};
      letter-spacing: 0.08rem;
    }
  `}
`
