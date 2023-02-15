import styled, { css } from 'styled-components'
import {
  Input as I,
  PlaceholderWrapper as PW,
  Placeholder as P
} from '../InputText/styles'

export const InputFilter = styled.div`
  ${() => css``}
`

export const InputFilterContainer = styled.div`
  ${() => css`
    position: relative;
  `}
`

export const Input = styled(I)`
  ${() => css`
    height: 5.2rem;
    padding-left: 5.2rem;
    padding-right: 4rem;

    @media (min-width: 768px) {
      padding-block: 1.4rem;
    }

    &::-webkit-search-cancel-button {
      -webkit-appearance: none;
      display: none;
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
    left: 2rem;

    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;

    height: 5.2rem;
    width: 2.4rem;
  `}
`

export const PlaceholderWrapper = styled(PW)`
  ${() => css`
    padding-left: 5.2rem;
  `}
`

export const Placeholder = styled(P)`
  ${() => css`
    height: 5.2rem;
    padding-inline: 0;

    line-height: 2rem;
  `}
`

export const SearchCancelButton = styled.button`
  ${() => css`
    position: absolute;
    top: 0;
    right: 2rem;

    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;

    height: 5.2rem;
    width: 1.6rem;

    background-color: transparent;
    border: none;

    cursor: pointer;
  `}
`
