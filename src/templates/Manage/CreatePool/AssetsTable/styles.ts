import { Input } from '@/components/Inputs/InputText/styles'
import styled, { css } from 'styled-components'

export const AssetsTable = styled.div`
  ${() => css`
    position: relative;

    min-width: 100%;

    .asset {
      width: 100%;
    }

    .price {
      display: none;

      @media (min-width: 992px) {
        display: flex;
        align-items: flex-end;

        min-width: 6.5rem;

        text-align: right;
      }
    }

    .marketCap {
      display: none;

      @media (min-width: 576px) {
        display: flex;
        align-items: flex-end;

        min-width: 11rem;

        text-align: right;
      }
    }

    .balance {
      align-items: flex-end;

      min-width: 10rem;

      text-align: right;
    }

    .add {
      align-items: center;

      min-width: 2.8rem;
    }
  `}
`

export const SearchWrapper = styled.div`
  ${() => css`
    margin-bottom: 2.4rem;

    ${Input} {
      &:valid {
        border: 1px solid rgba(255, 255, 255, 0.15);
      }
    }
  `}
`

export const Table = styled.div`
  ${() => css`
    position: relative;

    overflow: hidden;

    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
  `}
`

export const THead = styled.div`
  ${() => css`
    height: 6.2rem;

    background: rgba(0, 0, 0, 0.25);
  `}
`

export const TBody = styled.div`
  ${() =>
    css`
      overflow-y: auto;

      max-height: 41.1rem;

      background: rgba(255, 255, 255, 0.04);
    `}
`

export const Tr = styled.div`
  ${() => css`
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;

    margin-inline: 1.6rem;
    padding-block: 2.4rem;

    &:not(:first-of-type) {
      border-top: 0.1rem solid rgba(255, 255, 255, 0.3);
    }

    @media (min-width: 576px) {
      gap: 3.6rem;
    }

    @media (min-width: 768px) {
      gap: 9rem;

      margin-inline: 2.4rem;
    }

    @media (min-width: 992px) {
      gap: 0.8rem;
    }

    @media (min-width: 1200px) {
      gap: 6rem;
    }
  `}
`

export const Th = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 0.8rem;
    justify-content: flex-end;
    align-items: center;

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: 100%;
    letter-spacing: 0.05em;
    text-align: center;

    &:first-of-type {
      justify-content: flex-start;

      text-align: left;
    }
  `}
`

export const Td = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: 104%;
  `}
`

export const SecondaryText = styled.span`
  ${() => css`
    color: #bfbfbf;
  `}
`

interface IShadowProps {
  inView: boolean;
}

// prettier-ignore
export const Shadow = styled.div<IShadowProps>`
  ${() => css`
    position: absolute;
    bottom: 0;

    width: 100%;
    height: 10.9rem;
    border-radius: 0 0 8px 8px;

    background: linear-gradient(180deg, rgba(31, 31, 31, 0) 0%, #1f1f1f 100%);

    opacity: 1;
    visibility: visible;
    pointer-events: none;

    transition-timing-function: ease-in-out;
    transition-duration: 300ms;
    transition-property: opacity visibility;
  `}
  ${({ inView }) => inView && css`
    opacity: 0;
    visibility: hidden;
  `}
`

export const EmptyListContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;

    height: 41.1rem;
    padding-inline: 3.5rem;

    p {
      color: ${theme.colors.white};
      font-weight: ${theme.font.weight.normal};
      font-size: ${theme.font.sizes.font14};
      line-height: 1.8rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      text-align: center;
    }
  `}
`

export const TrsWrapper = styled.div`
  ${() => css`
    height: fit-content;
  `}
`

export const InputValidation = styled.input`
  ${() => css`
    position: absolute;
    top: 0;
    right: 0;

    opacity: 0;
    pointer-events: none;
  `}
`
