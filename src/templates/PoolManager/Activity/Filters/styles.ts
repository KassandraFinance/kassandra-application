import styled, { css } from 'styled-components'

export const Filters = styled.div`
  ${() => css`
    position: relative;
    min-width: 26.4rem;
    height: 100%;
    border-radius: 8px;
    background: rgb(255 255 255 / 0.04);

    overflow: hidden;
    z-index: 1041;
  `}
`

export const Header = styled.div`
  ${({ theme }) => css`
    padding: 2.4rem;

    background: rgb(0 0 0 / 0.25);

    span {
      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font14};
      line-height: 135%;
      letter-spacing: 0.05em;
    }

    @media (max-width: 576px) {
      padding: 1.6rem;
    }
  `}
`

export const OptionsUl = styled.ul`
  ${({ theme }) => css`
    display: grid;
    grid-gap: 2.4rem 2rem;

    margin: ${theme.spacings.space24};

    @media (max-width: 992px) {
      grid-template-columns: auto auto auto;

      height: 6.2rem;
    }

    @media (max-width: 576px) {
      grid-template-columns: auto auto;
      grid-gap: 1.6rem 2rem;

      height: 10.5rem;
      margin: ${theme.spacings.space16};
    }
  `}
`

export const OptionLi = styled.li`
  ${() => css`
    display: flex;
    gap: 1.2rem;
    align-items: center;
  `}
`

export const OptionName = styled.label`
  ${({ theme }) => css`
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font14};
    letter-spacing: 0.05em;
  `}
`

export const Hr = styled.hr`
  ${({ theme }) => css`
    height: 0;
    margin-inline: ${theme.spacings.space24};
    border: 1.2px solid rgb(255 255 255 / 0.15);
    border-radius: 1px;

    @media (max-width: 576px) {
      margin-inline: ${theme.spacings.space16};
    }
  `}
`

export const ButtonsContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 0.8rem;
    justify-content: center;
    align-items: center;

    padding: ${theme.spacings.space24};

    @media (max-width: 576px) {
      padding: ${theme.spacings.space16};
    }
  `}
`
