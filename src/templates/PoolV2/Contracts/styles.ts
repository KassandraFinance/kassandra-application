import styled, { css } from 'styled-components'

export const Contracts = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    width: 55.4rem;
    margin-top: 6.8rem;

    @media (max-width: 1200px) {
      padding-inline: 2.4rem;
    }

    @media (max-width: 992px) {
      width: 100%;
    }

    @media (max-width: 576px) {
      padding-inline: 1.6rem;
    }
  `}
`

export const ContractsContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  `}
`

export const Title = styled.h2`
  ${({ theme }) => css`
    color: #c4c4c4;
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font16};
    line-height: ${theme.font.sizes.font18};
    text-transform: uppercase;
  `}
`

export const ContractInfo = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 1.6rem 3.2rem;
    border-radius: 6px;

    background-color: rgb(252 252 252 / 0.08);

    @media (max-width: 768px) {
      padding-inline: 1.6rem;
    }
  `}
`

export const Blockchain = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 0.8rem;
    align-items: center;

    a {
      display: flex;
      justify-content: center;
      align-items: center;

      max-width: 100%;
      border: none;
      border-radius: 7.5px;

      color: ${theme.colors.snow};
      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font14};
      font-family: ${theme.font.family};
      text-decoration: none;

      background-color: inherit;
      outline: none;

      transition: 0.15s;

      svg {
        margin-left: ${theme.spacings.space8};

        path {
          color: white;

          transition: fill 0.15s ease;
        }
      }

      &:hover {
        color: ${theme.colors.cyan};

        > svg {
          path {
            fill: ${theme.colors.cyan};
          }
        }
      }
    }
  `}
`

export const PoolImageContainer = styled.div`
  ${() => css`
    overflow: hidden;

    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
  `}
`

export const ContractName = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.font14};
    text-transform: uppercase;
  `}
`

export const CopyContract = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.spacings.space8};
    justify-content: center;
    align-items: center;

    border: none;

    font-size: ${theme.font.sizes.font14};
    font-family: ${theme.font.family};
    text-decoration: none;

    .metamask {
      @media (max-width: 576px) {
        display: none;
      }
    }

    button {
      display: flex;
      align-items: center;

      border: none;

      color: ${theme.colors.snow};
      font-weight: ${theme.font.weight.normal};
      font-size: ${theme.font.sizes.font12};
      font-family: ${theme.font.family};
      text-decoration: none;

      background-color: transparent;
      outline: none;

      cursor: pointer;

      transition: 0.15s;

      svg {
        margin-left: ${theme.spacings.space8};
      }

      &:hover {
        color: ${theme.colors.cyan};

        > svg {
          path {
            fill: ${theme.colors.cyan};
          }
        }
      }
    }

    @media (max-width: 410px) {
      display: none;
    }
  `}
`
