import styled, { css } from 'styled-components'

export const Overlay = styled.div`
  ${() => css`
    position: fixed;
    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;

    background-color: rgba(0, 0, 0, 0.6);

    z-index: 100;
  `}
`

export const ChooseNetwork = styled.div`
  ${() => css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 35.5rem;
    height: auto;

    border: 0.1rem solid rgba(255, 255, 255, 0.25);
    box-shadow: 0rem 0.4rem 6.9rem -1.7rem rgba(0, 0, 0, 0.51);
    border-radius: 1rem;

    overflow: hidden;
    z-index: 110;

    @media (max-width: 450px) {
      width: 90%;
    }
  `}
`

export const ModalHeader = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 6.5rem;
    padding-inline: 2.4rem;

    background-color: rgba(31, 31, 31, 0.72);
    backdrop-filter: blur(0.4rem);
    border-bottom: 0.1rem solid rgba(255, 255, 255, 0.25);
    border-radius: 1rem 1rem 0rem 0rem;
  `}
`

export const TitleWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font18};
    line-height: 100%;
    letter-spacing: 0.05em;
  `}
`

export const CloseButton = styled.button`
  ${() => css`
    background-color: transparent;
    border: none;

    cursor: pointer;
  `}
`

export const ModalBody = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    padding: 2.4rem;

    background: rgba(31, 41, 55, 0.96);
    backdrop-filter: blur(0.4rem);
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
