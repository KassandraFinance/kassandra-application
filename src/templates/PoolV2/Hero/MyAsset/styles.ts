import styled, { css } from 'styled-components'

export const MyAsset = styled.div`
  ${() => css`
    display: flex;
    gap: 1.6rem;
    justify-content: start;
    align-items: center;

    margin-top: 3.2rem;

    @media (max-width: 992px) {
      margin-top: 2.4rem;
    }

    @media (max-width: 576px) {
      gap: 0.8rem;

      width: 100%;
    }
  `}
`

export const CardInfo = styled.div`
  ${() => css`
    display: flex;
    gap: 1.6rem;
    justify-content: center;
    align-items: center;

    width: max-content;
    padding: 1.6rem;
    border-radius: 8px;

    background: rgb(252 252 252 / 0.05);

    @media (max-width: 576px) {
      flex-direction: column;
      align-items: flex-start;

      width: 100%;
    }
  `}
`

export const Text = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.grayDisabled};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font16};
    line-height: ${theme.font.sizes.font18};
  `}
`

export const ValueInfo = styled.div`
  ${() => css`
    display: flex;
    gap: 0.8rem;
    justify-content: center;
    align-items: center;
  `}
`

export const Value = styled.span`
  ${({ theme }) => css`
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font16};
    line-height: ${theme.font.sizes.font24};
  `}
`

export const Tooltip = styled.div`
  ${() => css`
    width: 1.2rem;
    height: 1.2rem;
  `}
`
