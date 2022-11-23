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

    background: rgba(31, 41, 55, 0.96);
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

    background: #1f1f1fb8;
    border-radius: 1rem;
    border: none;

    &:disabled {
      filter: grayscale(1);

      &:disabled {
        > div {
          span {
            color: rgba(255, 255, 255, 0.3);
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 300;
            font-size: ${theme.font.sizes.font16};
            line-height: 100%;
            letter-spacing: 0.05em;
          }

          span:nth-of-type(3) {
            margin-left: auto;
          }
        }
      }
    }

    &:hover,
    &:focus {
      background-image: linear-gradient(0deg, #ffbf00 -0.02%, #e843c4 99.99%);
    }

    &:focus {
      outline: none;
    }
  `}
`

export const WrapperIcons = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1.2rem;

    width: 100%;
    padding: 1.6rem;

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font16};
    letter-spacing: 0.08rem;

    background: #1f1f1f;
    border-radius: 1rem;
    border: none;

    cursor: pointer;
    z-index: 2;

    span {
      color: ${theme.colors.snow};
      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font16};
      letter-spacing: 0.08rem;
    }
  `}
`
