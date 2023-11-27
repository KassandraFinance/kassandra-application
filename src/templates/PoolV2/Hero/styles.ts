import styled, { css } from 'styled-components'

export const Hero = styled.div`
  ${() => css`
    max-width: 114rem;
    margin-inline: auto;

    list-style-type: none;

    @media (max-width: 1200px) {
      padding-inline: 3rem;
    }

    @media (max-width: 540px) {
      padding-inline: 1.6rem;
    }
  `}
`

export const TitleConteiner = styled.div`
  ${() => css`
    display: flex;
    gap: 3.2rem;
    align-items: center;

    @media (max-width: 576px) {
      gap: 0;
      justify-content: space-between;
    }
  `}
`

export const LogoAndPoolName = styled.div`
  ${() => css`
    display: flex;
    gap: 3.2rem;
    justify-content: center;
    align-items: center;
  `}
`

export const PoolName = styled.h1`
  ${({ theme }) => css`
    font-weight: ${theme.font.weight.bold};
    font-size: ${theme.font.sizes.font40};
    line-height: 5rem;
    text-transform: capitalize;

    @media (max-width: 576px) {
      font-size: ${theme.font.sizes.font32};
      line-height: 3.6rem;
    }
  `}
`

export const SharedButton = styled.button`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;

    min-width: 3.2rem;
    min-height: 3.2rem;
    border: none;
    border-radius: 50%;

    background: rgb(255 255 255 / 0);

    cursor: pointer;
  `}
`

export const SubTitleConteiner = styled.div`
  ${() => css`
    display: flex;
    gap: 0.6rem;
    justify-content: start;
    align-items: center;

    margin-top: 2.4rem;
    margin-bottom: 2.4rem;

    @media (max-width: 768px) {
      margin-top: 1.6rem;
    }
  `}
`

export const Symbol = styled.span`
  ${({ theme }) => css`
    width: max-content;
    padding: 0.8rem 1.1rem;
    border-radius: 4px;

    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font12};

    background-color: rgb(0 0 0 / 0.19);
  `}
`

type ChainProps = {
  chainColor: string
}

export const Chain = styled.span<ChainProps>`
  ${({ theme, chainColor }) => css`
    width: max-content;
    padding: 0.8rem 1.1rem;
    border-radius: 4px;

    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
    line-height: 100%;

    background-color: ${chainColor};
  `}
`

export const SymbolAndMade = styled.div`
  ${({ theme }) => css`
    a {
      color: ${theme.colors.gray};
      font-weight: ${theme.font.weight.normal};
      font-size: ${theme.font.sizes.font12};
      text-decoration: none;
      text-transform: uppercase;
    }
  `}
`

export const Summary = styled.span`
  ${({ theme }) => css`
    margin-top: 2.4rem;

    color: #c9d1d1;
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font16};
    line-height: ${theme.font.sizes.font32};
  `}
`
