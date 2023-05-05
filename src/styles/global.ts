import {
  createGlobalStyle,
  css,
  DefaultTheme,
  GlobalStyleComponent
} from 'styled-components'

type GlobalStylesProps = {
  removeBg?: boolean,
  selectBackground?: boolean
}

const GlobalStyles: GlobalStyleComponent<
  GlobalStylesProps,
  DefaultTheme
> = createGlobalStyle`
  @font-face{
    font-weight: 300;
    font-style: normal;
  font-family: Rubik;
    src: local(''),
    url('../fonts/rubik-v14-latin-300.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
  }

  /* rubik-regular - latin */
  @font-face {
    font-weight: 400;
    font-style: normal;
    font-family: Rubik;
    src: local(''),
    url('../fonts/rubik-v14-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
  }

  /* rubik-500 - latin */
  @font-face {
    font-weight: 500;
    font-style: normal;
    font-family: Rubik;
    src: local(''),
    url('../fonts/rubik-v14-latin-500.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
  }

  /* rubik-600 - latin */
  @font-face {
    font-weight: 600;
    font-style: normal;
    font-family: Rubik;
    src: local(''),
    url('../fonts/rubik-v14-latin-600.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
  }

  @font-face {
  font-weight: 900;
  font-style: normal;
  font-family: Rubik;
  src: local(''),
  url('../fonts/rubik-v14-latin-900.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
  url('../fonts/rubik-v14-latin-900.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}

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
    }

    body {
      color: #fcfcfc;
      font-family: Rubik, sans-serif;

      background-color: #151117;

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

      ${selectBackground
        ? `background-image: url('/assets/images/background-768.png');
           background-repeat: repeat-y;
           background-size: cover;
           background-position-x: center;


           @media (min-width: 768px) {
             background-image: url('/assets/images/background-992.png');
           }

           @media (min-width: 992px) {
             background-image: url('/assets/images/background-1440.png');
           }
        `
        : ''}
    }
  `}
  ul, ol {
    list-style: none;
  }
`
export default GlobalStyles
