import styled, { css } from 'styled-components'

export const ModalSubgraphStatus = styled.div`
  ${() => css`
    position: absolute;
    right: 0;
    top: 2rem;

    display: flex;
    flex-direction: column;
    padding: 1.6rem;
    width: 32rem;

    border-radius: 16px;
    border: 1px solid rgba(252, 252, 252, 0.08);
    background: linear-gradient(164.99deg, #1b1d22 19.85%, #333437 116.33%);

    z-index: 1057;

    @media (max-width: 840px) {
      top: auto;
      bottom: 4rem;
      left: 0;
    }
  `}
`

export const IconWrapper = styled.div`
  ${() => css`
    height: 1.6rem;
    width: 1.6rem;

    img {
      width: 1.6rem;
    }

    svg {
      pointer-events: none;
      width: 1.6rem;
    }
  `}
`

export const ModalHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1.6rem;
    padding-bottom: 1.6rem;

    border-bottom: 1px solid rgba(252, 252, 252, 0.15);

    > p {
      color: ${theme.colors.snow};
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.medium};
    }
  `}
`

export const ModalBodyContainer = styled.div`
  ${() => css`
    padding-top: 1.6rem;
  `}
`

export const TextWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: flex-start;
    gap: 0.8rem;

    > p {
      color: ${theme.colors.grayDisabled};
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.medium};
    }
  `}
`
