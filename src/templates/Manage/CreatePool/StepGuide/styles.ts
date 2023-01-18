import styled, { css } from 'styled-components'

type colorDictType = {
  [key: string]: string
}

const colorDict: colorDictType = {
  avalanche: '#E84142',
  polygon: '#8247E5'
}

export const StepGuide = styled.div`
  ${() =>
    css`
      overflow: auto;
    `}
`

export const StepCardContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    max-width: 55.3rem;
    margin-inline: auto;
    margin-bottom: 2.4rem;

    @media (min-width: 768px) {
      gap: 2.4rem;

      margin-bottom: 3.1rem;
    }
  `}
`

export const SelectNetwork = styled.div`
  ${() => css`
    max-width: 55.3rem;
    margin-inline: auto;

    margin-bottom: 26.3rem;
  `}
`

export const TextContainer = styled.div`
  ${() => css`
    margin-bottom: 2.4rem;
  `}
`

export const Title = styled.h3`
  ${({ theme }) => css`
    margin-bottom: 1.2rem;

    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font14};
    line-height: ${theme.font.sizes.font16};
    letter-spacing: 0.22em;
    text-transform: uppercase;
  `}
`

export const Text = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: ${theme.font.sizes.font24};
    letter-spacing: 0.05em;

    @media (min-width: 768px) {
      font-size: ${theme.font.sizes.font16};
      line-height: 135%;
      letter-spacing: normal;
    }
  `}
`

export const ButtonsContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  `}
`

export const ButtonWrapper = styled.div`
  ${() => css`
    position: relative;
  `}
`

interface IButtonNetworkProps {
  borderColor: string;
  selected: boolean;
}

// prettier-ignore
export const ButtonNetwork = styled.button<IButtonNetworkProps>`
  ${({ theme, borderColor, selected }) => css`
    display: flex;
    align-items: center;
    gap: 1rem;

    width: 100%;
    height: 6.4rem;
    margin-bottom: 0.8rem;
    padding: 1.6rem;

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: ${theme.font.sizes.font24};
    letter-spacing: 0.05em;

    background: rgba(31, 31, 31, 0.72);
    border: none;
    border-radius: 0.8rem;
    border: 0.1rem solid ${!selected ? 'rgba(31, 31, 31, 0.72)' : colorDict[borderColor]};

    transition-duration: 300ms;
    transition-timing-function: ease-in-out;
    transition-property: border;

    cursor: pointer;

    &:hover,
    &:active {
      border: 0.1rem solid ${colorDict[borderColor]};
    }

    &:disabled {
      margin-bottom: 0;

      color: rgba(255, 255, 255, 0.3);

      background: ${theme.colors.darkGray} ;
      border-color: ${theme.colors.darkGray};

      img {
        filter: grayscale(150%);
      }

      cursor: not-allowed;
    }

    @media (min-width: 768px) {
      margin-bottom: 0;

      font-size: ${theme.font.sizes.font16};
      line-height: 100%;
    }
  `}
`

export const LinkWrapper = styled.div`
  ${({ theme }) => css`
    > a {
      width: fit-content;
      margin-inline: auto;

      font-size: ${theme.font.sizes.font14};
    }

    ${ButtonNetwork}:disabled ~ & {
      position: absolute;
      top: 50%;
      right: 1.6rem;
      transform: translateY(-50%);

      > a {
        color: rgba(255, 255, 255, 0.3);

        cursor: not-allowed;

        span:last-of-type {
          display: none;
        }
      }
    }

    @media (min-width: 768px) {
      position: absolute;
      top: 50%;
      right: 1.6rem;
      transform: translateY(-50%);

      > a {
        height: 6.4rem;

        font-size: ${theme.font.sizes.font16};
      }
    }
  `}
`

export const InputValidation = styled.input`
  ${() => css`
    position: absolute;
    top: 0;

    opacity: 0;

    pointer-events: none;
  `}
`
