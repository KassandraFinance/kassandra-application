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
    bottom: 0;
    left: 0;
    right: 0;
    transform: translateY(100%);

    padding: 0px 1.6rem 4rem;

    background: linear-gradient(164.99deg, #1b1d22 19.85%, #333437 116.33%);
    border-radius: 0.8rem 0.8rem 0px 0px;
    opacity: 0;

    transition-duration: 500ms;
    transition-timing-function: ease;
    transition-property: transform opacity;
    
    z-index: 1040;
  `}
  ${({ isOpen }) => isOpen && css`
    transform: translateY(0%);

    opacity: 1;
  `}
`

export const ModalHeader = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    gap: 0.995rem;

    height: 6rem;

    border-bottom: 0.1rem solid rgba(252, 252, 252, 0.5);
  `}
`

export const ImageWrapper = styled.div`
  ${() => css`
    overflow: hidden;

    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
  `}
`

export const Title = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font14};
    line-height: 110%;
    letter-spacing: 0.05em;
  `}
`

export const CloseButton = styled.button`
  ${() => css`
    width: 1.8rem;
    height: 1.8rem;

    margin-left: auto;

    background-color: transparent;
    border: none;

    cursor: pointer;
  `}
`

export const ModalBody = styled.div`
  ${() => css``}
`

export const TableLine = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 6rem;
  `}
`

export const TableLineTitle = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.grayDisabled};
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
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
    text-align: right;
    letter-spacing: 0.05em;
  `}
`

export const SecondaryValue = styled.span`
  ${({ theme }) => css`
    color: #c4c4c4;
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font12};
    line-height: 135%;
    text-align: right;
    letter-spacing: 0.05em;
  `}
`
