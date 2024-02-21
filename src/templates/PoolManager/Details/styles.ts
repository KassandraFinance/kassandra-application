import styled, { css } from 'styled-components'

export const Details = styled.div`
  ${() => css`
    display: grid;
    grid-template-areas: 'left right';
    grid-template-columns: 1fr 45.6rem;
    gap: 2.4rem;

    margin-bottom: 5rem;

    @media (max-width: 992px) {
      grid-template-areas:
        'top'
        'bottom';
      grid-template-columns: 1fr;
    }
  `}
`

export const Wrapper1 = styled.div`
  ${() => css`
    grid-area: left;

    @media (max-width: 992px) {
      grid-area: bottom;
    }
  `}
`

export const Wrapper2 = styled.div`
  ${() => css`
    grid-area: right;

    @media (max-width: 992px) {
      display: flex;
      flex-direction: column;
      gap: 2.4rem;
      grid-area: top;
    }
  `}
`

export const TitleWrapper = styled.div`
  ${() => css`
    margin-block: 2.4rem;
    padding-bottom: 1.2rem;
    border-bottom: 0.1rem solid rgb(255 255 255 / 0.1);
  `}
`

export const Contract = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  `}
`

export const Title = styled.div`
  ${({ theme }) => css`
    color: #c4c4c4;
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
    line-height: 100%;
    text-transform: uppercase;
  `}
`

export const ContractInfoContainer = styled.div`
  ${() => css`
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;

    width: 32.5rem;
    height: 4.7rem;
    padding: 1.5rem 2.5rem;
    border-radius: 12px;

    background: rgba(255 255 255 / 0.04);
  `}
`

export const Text = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: 180%;
  `}
`

export const ChainName = styled.span`
  ${({ theme }) => css`
    color: #c4c4c4;
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
    line-height: 100%;
    text-transform: uppercase;
  `}
`

export const Address = styled.span`
  ${({ theme }) => css`
    display: flex;
    gap: 1rem;
    align-items: center;

    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
    line-height: 100%;
    text-transform: uppercase;

    cursor: pointer;

    transition: color 300ms ease-in-out;

    svg {
      path {
        transition: fill 300ms ease-in-out;
      }
    }

    &:hover {
      color: ${theme.colors.cyan};

      svg {
        path {
          fill: ${theme.colors.cyan};
        }
      }
    }
  `}
`

export const AddToken = styled.button`
  ${() => css`
    border: none;

    background-color: transparent;

    cursor: pointer;
  `}
`
