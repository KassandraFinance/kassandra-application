import styled, { css } from 'styled-components'

export const TVMChart = styled.div`
  ${() => css`
    position: relative;

    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    width: 100%;
    height: 100%;
    padding: 1.6rem;

    background: rgba(31, 31, 31, 0.72);
    border-radius: 0.4rem;
  `}
`

export const SegmentedControlsContainer = styled.div`
  ${() => css`
    position: absolute;
    display: none;

    right: 1.6rem;
    z-index: 10;

    @media (min-width: 768px) {
      display: block;
    }
  `}
`

export const InputListContainer = styled.div`
  ${() => css`
    position: absolute;

    right: 1.6rem;
    z-index: 10;

    @media (min-width: 768px) {
      display: none;
    }
  `}
`

export const ChangeContainer = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
  `}
`
