import styled, { css } from 'styled-components'

export const Strategy = styled.div`
  ${() => css``}
`

export const ButtonEdit = styled.button`
  ${() => css`
    width: 3.2rem;
    height: 3.2rem;
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

export const TitleWrapper = styled.div`
  ${() => css`
    display: flex;
    gap: 0.8rem;

    margin-block: 2.4rem;
    padding-bottom: 1.2rem;
    border-bottom: 0.1rem solid rgb(255 255 255 / 0.1);
  `}
`

export const Text = styled.section`
  ${({ theme }) => css`
    max-width: 100%;
    max-width: 80rem;

    h2 {
      margin-bottom: ${theme.spacings.space16};

      font-weight: ${theme.font.weight.medium};
      font-size: ${theme.font.sizes.font18};

      @media (max-width: 1200px) {
        font-size: ${theme.font.sizes.font24};
      }
    }

    p {
      display: inline-block;

      margin-bottom: ${theme.spacings.space48};

      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font14};
      line-height: ${theme.font.sizes.font24};
    }

    span {
      display: inline-block;

      margin-bottom: ${theme.spacings.space16};

      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font14};
      line-height: ${theme.font.sizes.font24};
    }

    ol {
      display: inline-block;

      margin-bottom: 3.2rem;
      padding-left: 3.5rem;

      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font14};

      list-style: decimal;

      li {
        margin-bottom: 1.6rem;
      }
    }

    img {
      max-width: 100%;
      margin: 0 3.2rem;

      @media (max-width: 1200px) {
        max-width: 80%;
      }
    }
  `}
`

export const MarkdownEditor = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    margin-bottom: 3rem;

    .rc-md-editor {
      overflow: hidden;

      height: 30.2rem;
      border: 1px solid #343434;
      border-radius: 8px;

      background: #1b1d22;
    }

    .full {
      height: calc(100vh - 7.6rem) !important;

      @media (min-width: 768px) {
        height: calc(100vh - 9.6rem) !important;
      }

      @media (min-width: 992px) {
        height: calc(100vh - 8rem) !important;
      }
    }

    .rc-md-navigation {
      padding: 1.2rem;
      border-bottom: 0.1rem solid #343434;

      background-color: #343434;
    }

    .editor-container {
      > .section.sec-md {
        border-right: 0.1rem solid #343434;
      }

      > .section.sec-html {
        border-right: none;
      }

      .sec-md {
        .input {
          color: #c4c4c4;

          background: #1b1d22;
        }
      }

      .sec-html {
        .html-wrap {
          .custom-html-style {
            color: #c4c4c4;
          }
        }
      }
    }
  `}
`

export const ButtonContainer = styled.div`
  ${() => css`
    display: flex;
    gap: 1.6rem;
  `}
`