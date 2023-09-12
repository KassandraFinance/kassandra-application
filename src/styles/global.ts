import {
  createGlobalStyle,
  css,
  DefaultTheme,
  GlobalStyleComponent
} from 'styled-components'

type GlobalStylesProps = {
  removeBg?: boolean
  selectBackground?: boolean
}

const GlobalStyles: GlobalStyleComponent<
  GlobalStylesProps,
  DefaultTheme
> = createGlobalStyle`
   * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;



    &::before,
    &::after {
      box-sizing: inherit;
    }
  }

  ::-webkit-scrollbar {
    width: 0.4rem;
    height: 0.4rem;
  }

  ::-webkit-scrollbar-track {
    margin-block: 0.3rem;
  }

  body::-webkit-scrollbar {
    width: 1rem;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;

    background-color: rgb(255 255 255 / 0.2);

    transition: background-color ease-in-out 30000ms;

    &:hover {
      background-color: rgb(255 255 255 / 0.3);
    }
  }

  html, body, #root {
    min-height: 100%;
  }

  ${({ selectBackground }) => css`
    html {
      font-size: 62.5%;

      :root {
        --onboard-connect-sidebar-progress-background: #333437;
        --onboard-font-family-normal: rubik, sans-serif;
        --onboard-font-size-5: 1.6rem;
        --onboard-font-size-6: 1.3rem;
        --onboard-modal-z-index: 1050;

        /* classname to wallect connect modal */
        --wcm-z-index: 1060 !important;
      }
    }

    body {
      color: #fcfcfc;
      font-family: Rubik, sans-serif;

      background-color: #151117;
      background-image: url('/assets/images/background-768.png');
      background-image: image-set(
        url('/assets/images/background-768.avif') type('image/avif'),
        url('/assets/images/background-768.webp') type('image/webp'),
        url('/assets/images/background-768.png') type('image/png')
      );
      background-position-x: center;
      background-size: cover;
      background-repeat: repeat-y;

      /* Chrome, Safari, Edge, Opera */
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        margin: 0;
        appearance: none;
      }

      /* Firefox */
      input[type='number'] {
        appearance: textfield;
      }

      @media (min-width: 768px) {
        background-image: url('/assets/images/background-992.png');
        background-image: image-set(
          url('/assets/images/background-992.avif') type('image/avif'),
          url('/assets/images/background-992.webp') type('image/webp'),
          url('/assets/images/background-992.png') type('image/png')
        );
      }

      @media (min-width: 992px) {
        background-image: url('/assets/images/background-1440.png');
        background-image: image-set(
          url('/assets/images/background-1440.avif') type('image/avif'),
          url('/assets/images/background-1440.webp') type('image/webp'),
          url('/assets/images/background-1440.png') type('image/png')
        );
      }
    }
  `}
  ul, ol {
    list-style: none;
  }
`
export default GlobalStyles
