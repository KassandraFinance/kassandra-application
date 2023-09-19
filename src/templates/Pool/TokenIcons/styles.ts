import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

interface IWrapperProps {
  index: number
}

export const ImageWrapper = styled.div<IWrapperProps>`
  z-index: -${({ index }) => index};

  display: flex;

  max-width: 1.8rem;
  margin-left: -0.4rem;

  img {
    max-width: 2rem;
    margin: 0;
    padding: 0;
    border-radius: 50%;
  }

  &.svg-none img {
    width: 4rem !important;
    min-width: 4rem;
  }

  @media (max-width: 350px) {
    margin-left: -0.9rem;
  }
`
