import styled, { css } from 'styled-components'

export const ModalViewCoin = styled.div`
  ${() => css`
    @media (min-width: 768px) {
      display: none;
    }
  `}
`

interface IModalCoinProps {
  isOpen: boolean;
}

// prettier-ignore
export const ModalCoin = styled.div<IModalCoinProps>`
  ${() => css`
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1040;

    padding: 0 1.6rem 4rem;
    border-radius: 8px 8px 0 0;

    background: linear-gradient(164.99deg, #1b1d22 19.85%, #333437 116.33%);

    opacity: 0;

    transition-timing-function: ease;
    transition-duration: 500ms;
    transition-property: transform opacity;
    transform: translateY(100%);
  `}
  ${({ isOpen }) => isOpen && css`
    opacity: 1;

    transform: translateY(0%);
  `}
`

export const ModalHeader = styled.div`
  ${() => css`
    display: flex;
    gap: 0.995rem;
    align-items: center;

    height: 6rem;
    border-bottom: 1px solid rgb(252 252 252 / 0.5);
  `}
`

export const ImageWrapper = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    min-width: 2.4rem;
    min-height: 2.4rem;
    border-radius: 50%;
  `}
`

export const Title = styled.p`
  ${({ theme }) => css`
    overflow: hidden;

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font14};
    line-height: 110%;
    letter-spacing: 0.05em;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}
`

export const CloseButton = styled.button`
  ${() => css`
    width: 1.8rem;
    height: 1.8rem;
    margin-left: auto;
    border: none;

    background-color: transparent;

    cursor: pointer;
  `}
`

export const ModalBody = styled.div`
  ${() => css``}
`

export const TableLine = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    align-items: center;

    height: 6rem;
  `}
`

export const TableLineTitle = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.grayDisabled};
    font-weight: 400;
    font-size: ${theme.font.sizes.font12};
    line-height: ${theme.font.sizes.font12};
    letter-spacing: 0.22em;
    text-transform: uppercase;
  `}
`

export const ValueContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  `}
`

export const Value = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight};
    font-size: ${theme.font.sizes.font14};
    line-height: 135%;
    letter-spacing: 0.05em;
    text-align: right;
  `}
`

export const SecondaryValue = styled.span`
  ${({ theme }) => css`
    color: #c4c4c4;
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font12};
    line-height: 135%;
    letter-spacing: 0.05em;
    text-align: right;
  `}
`
