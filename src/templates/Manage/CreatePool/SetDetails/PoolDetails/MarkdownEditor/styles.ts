import styled, { css } from 'styled-components'

export const MarkdownEditor = styled.div`
  ${() => css`
    .rc-md-editor {
      height: 30.2rem;

      background: #1b1d22;
      border-radius: 0.8rem;
      border: 0.1rem solid #343434;

      overflow: hidden;
    }

    .rc-md-navigation {
      padding: 1.2rem;

      background-color: #343434;
      border-bottom: 0.1rem solid #343434;
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
