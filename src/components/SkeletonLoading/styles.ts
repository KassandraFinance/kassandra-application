import styled, { css, keyframes } from 'styled-components'

type SkeletonLoading = {
  spacings: number
}

export const SkeletonLoading = styled.div<SkeletonLoading>`
  ${({ spacings }) => css`
    display: flex;
    flex-direction: column;
    gap: ${spacings}rem;
  `}
`

type SkeletonLoadingContent = {
  height: number
  width?: number | string
  borderRadios?: number
}

export const SkeletonLoadingContent = styled.div<SkeletonLoadingContent>`
  ${({ height, borderRadios }) => css`
    width: 100%;
    height: ${height}rem;

    border-radius: ${borderRadios}px;

    background-color: #ffffff12;
    background: linear-gradient(
        100deg,
        rgba(255, 255, 255, 0) 40%,
        #ffffff20 50%,
        rgba(255, 255, 255, 0) 60%
      )
      #ffffff12;
    background-size: 200% 100%;
    background-position-x: 180%;

    animation: 1.2s ${skeletonScreenLoadingAni} ease infinite;
  `}

  ${({ width }) =>
    width &&
    css`
      width: ${width}rem;
    `}
`

const skeletonScreenLoadingAni = keyframes`
  to {
    background-position-x: -20%;
  }
`
