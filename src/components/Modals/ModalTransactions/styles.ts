import styled, { css } from 'styled-components'

export const ModalTransactions = styled.div`
  ${() => css`
    max-width: 37.5rem;
    padding: 4rem;
    margin-inline: auto;

    background: rgba(255, 255, 255, 0.04);
    border-radius: 0.8rem;
  `}
`

export const Title = styled.h3`
  ${({ theme }) => css`
    margin-bottom: 2.4rem;

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font16};
    line-height: ${theme.font.sizes.font24};
    text-align: center;
  `}
`

export const TransactionContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    margin-bottom: 2.4rem;
  `}
`

export const Transaction = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `}
`

interface ITransactionTextProps {
  status: 'WAITING' | 'APROVED' | 'APPROVING' | 'NEXT';
}

// prettier-ignore
export const TransactionText = styled.p<ITransactionTextProps>`
  ${({ theme }) => css`
    color: ${theme.colors.gray};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: 100%;
    text-align: center;
    letter-spacing: 0.05em;
  `}
  ${({ theme, status }) =>
    status === 'APROVED' && css`
      color: ${theme.colors.snow};
  `}
  ${({ theme, status }) =>
    status === 'APPROVING' && css`
      color: ${theme.colors.snow};
      font-weight: ${theme.font.weight.medium};
  `}
  ${({ theme, status }) =>
    status === 'NEXT' && css`
      color: ${theme.colors.snow};
  `}
`

export const TransactionStatus = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 2.4rem;
    height: 2.4rem;
  `}
`

export const ButtonsWrapper = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
  `}
`

export const Spinner = styled.div`
  width: 1.6rem;
  height: 1.6rem;

  animation: rotate 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
