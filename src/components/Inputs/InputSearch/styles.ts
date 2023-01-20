import styled, { css } from 'styled-components'
import {
  InputContainer,
  Input as I,
  PlaceholderWrapper as PW,
  Placeholder as P
} from '../InputText/styles'

export const InputSearch = styled.div`
  ${() => css``}
`

export const InputSearchContainer = styled(InputContainer)``

export const Input = styled(I)`
  ${() => css`
    padding-left: 4.6rem;

    @media (min-width: 768px) {
      height: 6.4rem;
      padding-block: 1.4rem;
      padding-right: 1.6rem;
    }

    &:valid {
      border: 0.1rem solid rgba(255, 255, 255, 0.15);
    }
  `}
`

export const ImageWrapper = styled.div`
  ${() => css`
    position: absolute;
    top: 0;
    left: 1.6rem;

    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;

    height: 4.8rem;

    @media (min-width: 768px) {
      height: 6.4rem;
    }
  `}
`

export const PlaceholderWrapper = styled(PW)`
  ${() => css`
    padding-left: 4.6rem;

    @media (min-width: 768px) {
    }
  `}
`

export const Placeholder = styled(P)`
  ${() => css`
    padding-inline: 0;

    @media (min-width: 768px) {
      height: 6.4rem;
      padding-block: 2.4rem;
    }
  `}
`
