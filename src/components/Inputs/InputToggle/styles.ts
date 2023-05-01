import styled, { css } from 'styled-components'

export const WrapperToggle = styled.div`
  ${() => css`
    display: block;
  `}
`

export const Label = styled.label`
  ${() => css`
    position: absolute;

    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;

    clip: rect(0 0 0 0);
    overflow: hidden;
  `}
`

export const InputToggle = styled.input`
  position: relative;

  width: 4rem;
  height: 2.4rem;

  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  cursor: pointer;
  z-index: 1;

  ::before,
  ::after {
    content: '';

    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;

    transition: left 0.15s cubic-bezier(0.25, 0.8, 0.25, 0.1);
    transform: 0.15s ease-in;
  }

  ::before {
    width: 100%;
    height: 100%;

    border-radius: 10rem;
    background-color: rgba(255, 255, 255, 0.15);
  }

  ::after {
    width: 1.8rem;
    height: 1.8rem;
    margin: 0.3rem 0 0 0.3rem;

    background: #fcfcfc;
    box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.4);
    border-radius: 100%;
  }

  :checked::before {
    background-color: #0c3ddc;
  }

  :checked::after {
    left: 1.6rem;
  }
`
