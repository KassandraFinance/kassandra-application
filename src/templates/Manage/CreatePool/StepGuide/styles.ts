import styled, { css } from 'styled-components'
import { InputRadioContainer } from '@/components/Inputs/InputRadio/styles'

type colorDictType = {
  [key: string]: string
}

const colorDict: colorDictType = {
  avalanche: '#E84142',
  polygon: '#8247E5',
  goerli: '#0784c3'
}

export const StepGuide = styled.div`
  ${() => css`
    overflow: auto;
  `}
`

export const ContainerCardAndNetwork = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3.1rem;

  max-width: 55.3rem;
  margin-inline: auto;

  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3.1rem;

    max-width: 100%;
  }
`

export const StepCardContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    margin-inline: auto;
    margin-bottom: 20rem;

    @media (min-width: 768px) {
      gap: 2.4rem;

      width: 100%;
      margin: 0;
      margin-bottom: 33rem;
    }
  `}
`

export const SelectNetwork = styled.div`
  ${() => css`
    margin-inline: auto;
    margin-bottom: 3.1rem;

    @media (min-width: 768px) {
      width: 100%;
      margin: 0;
    }
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

    ${InputRadioContainer} {
      position: absolute;
      top: 2.6rem;
      right: 2rem;

      display: block;

      width: fit-content;
      height: fit-content;

      pointer-events: none;
    }
  `}
`

interface IButtonNetworkProps {
  borderColor: string
  selected: boolean
}

// prettier-ignore
export const ButtonNetwork = styled.button<IButtonNetworkProps>`
  ${({ theme, borderColor, selected }) => css`
    display: flex;
    gap: 1rem;
    align-items: center;

    width: 100%;
    height: 6.4rem;
    padding: 1.6rem;
    border: none;
    border: 1px solid ${!selected ? 'rgba(31, 31, 31, 0.72)' : colorDict[borderColor]};
    border-radius: 8px;

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: ${theme.font.sizes.font24};
    letter-spacing: 0.05em;

    background: rgb(31 31 31 / 0.72);

    cursor: pointer;

    transition-timing-function: ease-in-out;
    transition-duration: 300ms;
    transition-property: border;

    &:hover,
    &:active {
      border: 1px solid ${colorDict[borderColor]};
    }

    &:disabled {
      margin-bottom: 0;
      border-color: ${theme.colors.darkGray};

      color: rgb(255 255 255 / 0.3);

      background: ${theme.colors.darkGray} ;

      cursor: not-allowed;

      img {
        filter: grayscale(150%);
      }
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
        color: rgb(255 255 255 / 0.3);

        cursor: not-allowed;

        span:last-of-type {
          display: none;
        }
      }
    }

    @media (min-width: 768px) {
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
