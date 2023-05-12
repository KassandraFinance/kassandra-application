import styled, { css } from 'styled-components'

export const PrivacySettingsModal = styled.div`
  ${() => css``}
`

export const Content = styled.div`
  ${() => css`
    @media (min-width: 576px) {
      width: 36.3rem;
    }
  `}
`

export const ButtonContainer = styled.div`
  ${() => css`
    display: grid;
    gap: 1.2rem;
  `}
`

export const Title = styled.span`
  ${({ theme }) => css`
    margin-bottom: 0.7rem;

    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font16};
    line-height: 104%;
  `}
`

export const Text = styled.p`
  ${({ theme }) => css`
    margin-bottom: 1.6rem;

    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font16};
    line-height: 135%;
  `}
`

export const WarningText = styled.p`
  ${({ theme }) => css`
    margin-bottom: 2.4rem;
    padding: 1.6rem 2.4rem;
    border: 1px solid rgb(255 191 0 / 0.5);
    border-radius: 8px;

    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font16};
    line-height: ${theme.font.sizes.font24};

    background: rgb(255 255 255 / 0.04);
  `}
`
