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
    align-items: center;
    justify-content: space-between;
    gap: 3.2rem;

    @media (max-width: 576px) {
      justify-content: space-between;
      gap: 0;
    }
  `}
`

export const LogoAndPoolName = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3.2rem;
  `}
`

export const PoolName = styled.h1`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.font40};
    font-weight: ${theme.font.weight.bold};
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

    background: rgba(255, 255, 255, 0);
    border-radius: 50%;
    border: none;

    cursor: pointer;
  `}
`

export const SubTitleConteiner = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 0.6rem;

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

    font-size: ${theme.font.sizes.font12};
    font-weight: ${theme.font.weight.light};

    background-color: rgba(0, 0, 0, 0.19);
    border-radius: 0.4rem;
  `}
`

type ChainProps = {
  chainColor: string
}

export const Chain = styled.span<ChainProps>`
  ${({ theme, chainColor }) => css`
    width: max-content;
    padding: 0.8rem 1.1rem;

    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.font12};
    line-height: 100%;
    font-weight: ${theme.font.weight.light};

    background-color: ${chainColor};
    border-radius: 0.4rem;
  `}
`

export const SymbolAndMade = styled.div`
  ${({ theme }) => css`
    a {
      color: ${theme.colors.gray};
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.normal};
      text-transform: uppercase;
      text-decoration: none;
    }
  `}
`

export const Summary = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.light};
    line-height: ${theme.font.sizes.font32};
    color: #c9d1d1;
    margin-top: 2.4rem;
  `}
`
