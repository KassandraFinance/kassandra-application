import styled, { css } from 'styled-components'

export const MyAsset = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 3.2rem;
    margin-top: 3.2rem;

    @media (max-width: 992px) {
      margin-top: 2.4rem;
    }

    @media (max-width: 576px) {
      width: 100%;
      gap: 0.8rem;
    }
  `}
`

export const CardInfo = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.6rem;
    width: max-content;
    border-radius: 8px;

    padding: 1.6rem;

    background: rgba(252, 252, 252, 0.05);

    @media (max-width: 576px) {
      flex-direction: column;
      width: 100%;

      align-items: flex-start;
    }
  `}
`

export const Text = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.grayDisabled};
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.light};
    line-height: ${theme.font.sizes.font18};
  `}
`

export const ValueInfo = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
  `}
`

export const Value = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.medium};
    line-height: ${theme.font.sizes.font24};
  `}
`

export const Tooltip = styled.div`
  ${() => css`
    width: 1.2rem;
    height: 1.2rem;
  `}
`
