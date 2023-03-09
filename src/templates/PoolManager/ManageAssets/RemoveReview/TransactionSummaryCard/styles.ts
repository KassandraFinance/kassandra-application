import styled, { css } from 'styled-components'

export const TransactionSummaryCard = styled.div`
  ${({ theme }) => css`
    width: 100%;
    padding: 2.4rem;

    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;

    > h3 {
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      line-height: 1.6rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }
  `}
`

export const TransactionSummaryCardBody = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    margin-top: 1.6rem;
  `}
`

export const LpSendWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.6rem;

    background: rgba(31, 31, 31, 0.72);
    border-radius: 8px;

    > p {
      color: #bdbdbd;
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.normal};
      line-height: 1.2rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }
  `}
`

export const LpSendValueWrapper = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    gap: 0.8rem;
    text-align: end;
  `}
`

export const LpSendValue = styled.span`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    p {
      font-size: ${theme.font.sizes.font20};
      font-weight: ${theme.font.weight.medium};
      line-height: 2rem;
    }

    span {
      color: #bfbfbf;
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.light};
      line-height: 104%;
    }
  `}
`

export const RemovalInformationList = styled.ul`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    border-top: 0.1rem solid rgba(255, 255, 255, 0.3);
    padding-top: 2.4rem;
  `}
`

export const RemovalInformation = styled.li`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    > p {
      color: #bdbdbd;
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.normal};
      line-height: 1.2rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }
  `}
`

export const SymbolAndImgWrapper = styled.span`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.8rem;

    p {
      font-size: ${theme.font.sizes.font20};
      font-weight: ${theme.font.weight.medium};
      line-height: 2.8rem;
    }
  `}
`

export const ReceivedInfo = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.4rem;

    p {
      font-size: ${theme.font.sizes.font20};
      font-weight: ${theme.font.weight.medium};
      line-height: 2rem;
    }

    span {
      color: #bdbdbd;
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.light};
      line-height: 135%;
      letter-spacing: 0.05em;
    }
  `}
`

export const AllocationValue = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.font20};
    font-weight: ${theme.font.weight.medium};
    line-height: 2rem;
  `}
`
