import theme from '@/styles/theme'
import styled, { css } from 'styled-components'

export const TokenDescription = styled.div`
  ${() => css``}
`

export const Line = styled.div`
  margin: ${theme.spacings.space24} 0;
  width: 100%;
  height: 0.1rem;

  background-color: rgba(255, 255, 255, 0.1);
`

export const Title = styled.div`
  display: flex;
  align-items: center;

  h2 {
    font-size: ${theme.font.sizes.font18};
    font-weight: ${theme.font.weight.bold};
    margin-left: ${theme.spacings.space16};
  }
`

interface ITextProps {
  isOpen: boolean
  height: number
}

export const Text = styled.section<ITextProps>`
  ${({ height }) => css`
    width: 100%;
    max-height: ${height}px;

    transition-timing-function: ease-in-out;
    transition-duration: 300ms;
    transition-property: max-height;

    h2 {
      margin-bottom: ${theme.spacings.space16};

      font-size: ${theme.font.sizes.font18};
      font-weight: ${theme.font.weight.medium};

      @media (max-width: 1200px) {
        font-size: ${theme.font.sizes.font24};
      }
    }

    p {
      display: inline-block;
      margin-bottom: ${theme.spacings.space32};

      line-height: ${theme.font.sizes.font24};
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.light};
    }

    span {
      display: inline-block;
      margin-bottom: ${theme.spacings.space16};

      line-height: ${theme.font.sizes.font24};
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.light};
    }

    ol {
      display: inline-block;
      margin-bottom: 3.2rem;
      padding-left: 3.5rem;

      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.light};
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

  ${({ isOpen, height }) =>
    !isOpen &&
    css`
      position: relative;

      max-height: 20rem;

      background: linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0) 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      z-index: -1;

      img {
        display: none;
      }

      ::before {
        content: '';

        position: absolute;
        top: 20rem;

        width: 100%;
        height: ${height - 200}px;
      }
    `}
`

export const ToDocumentation = styled.div`
  display: flex;
  align-items: center;
  max-width: 26rem;
  margin-top: 4rem;
  margin-right: 0;
  margin-bottom: 0;
  margin-left: 0;

  padding: 1.6rem 2.4rem;

  background-color: rgba(255, 255, 255, 0.05);
  border: none;
  border-radius: 1.2rem;

  color: #fff;
  font-family: ${theme.font.family};
  font-size: ${theme.font.sizes.font14};

  @media (max-width: 420px) {
    justify-content: center;

    max-width: 100%;
    width: 100%;
  }

  p {
    max-width: 100%;
    margin-bottom: 0;

    line-height: ${theme.font.sizes.font14};
  }

  a {
    color: ${theme.colors.cyan};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  img {
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 0;
    margin-left: 0.8rem;
    width: 1.8rem;
  }
`

interface IisSeeMoreProps {
  isSeeMore: boolean
}

export const ButtonSeeMore = styled.button<IisSeeMoreProps>`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0 auto;
  margin-top: 6rem;

  color: ${theme.colors.snow};
  font-family: ${theme.font.family};
  font-size: ${theme.font.sizes.font16};
  font-weight: ${theme.font.weight.light};

  border: 0;
  background-color: transparent;

  cursor: pointer;

  > span {
    display: flex;
    align-items: center;

    img {
      transition: transform 0.3s ease-in-out;
      transform: ${props => (props.isSeeMore ? `rotate(180deg)` : `rotate(0)`)};
    }
  }
`
