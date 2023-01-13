import styled, { css } from 'styled-components'

export const FundSummary = styled.div`
  ${() => css`
    border-radius: 0.8rem;
  `}
`

export const Header = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 6.2rem;
    padding: 2.4rem 1.6rem;

    background: rgba(0, 0, 0, 0.25);
    border-radius: 0.8rem 0.8rem 0rem 0rem;

    @media (min-width: 768px) {
      padding: 2.4rem;
    }
  `}
`

export const HeaderTitle = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: 100%;
    letter-spacing: 0.05em;
  `}
`

export const Body = styled.div`
  ${() => css`
    padding: 2.4rem 1.6rem;

    background: rgba(255, 255, 255, 0.04);
    border-radius: 0rem 0rem 0.8rem 0.8rem;

    @media (min-width: 768px) {
      padding: 2.4rem;
    }
  `}
`

export const CoinsContainer = styled.div`
  ${() =>
    css`
      display: flex;
      flex-direction: column;
      gap: 2.4rem;

      margin-bottom: 2.4rem;
    `}
`

export const CoinContainer = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: auto 13.5rem;
    gap: 1.2rem;

    ${ProgressBar} {
      grid-column: span 2;
    }
  `}
`

export const AllocationContainer = styled.div`
  ${() =>
    css`
      display: grid;
      grid-template-columns: 3.2rem auto 1rem;
      align-items: center;
      gap: 1.2rem;
    `}
`

interface ILockButtonProps {
  active: boolean;
}

// prettier-ignore
export const LockButton = styled.button<ILockButtonProps>`
  ${() => css`
    width: 3.2rem;
    height: 3.2rem;

    background: rgba(255, 255, 255, 0);
    border: 0.1rem solid rgba(255, 255, 255, 0);
    border-radius: 50%;

    cursor: pointer;


    transition-duration: 300ms;
    transition-timing-function: ease-in-out;
    transition-property: background-color border;

    &:hover {
      background-color: rgba(255, 255, 255, 0.08);
    }
  `}
  ${({ active }) => active && css`
    background-color: rgba(255, 255, 255, 0.08);
    border: 0.1rem solid rgba(255, 255, 255, 0.1) ;
  `}
`

export const RemoveButton = styled.button`
  ${() => css`
    width: 1rem;
    height: 1rem;

    background-color: transparent;
    border: none;

    cursor: pointer;
  `}
`

export const ProgressBar = styled.div`
  ${() => css`
    width: 100%;
    height: 0.4rem;

    background-color: #8b8b8b;
    border-radius: 0.4rem;
    border: none;
  `}
`

interface IProgressValueProps {
  value: number;
}

// prettier-ignore
export const ProgressValue = styled.div<IProgressValueProps>`
  ${({ theme, value }) => css`
    position: relative;
    width: ${value}%;
    height: 0.4rem;

    border-radius: 0.2rem;

    background-color: ${theme.colors.magenta};

    transition-duration: 300ms;
    transition-timing-function: ease;
    transition-property: width;

    &::before {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;

      border-radius: 0.2rem;

      background-color: inherit;
      background-image: inherit;
      filter: blur(5px);
      z-index: -1;
    }
  `}
  ${({theme, value}) => value > 100 && css`
    width: 100%;

    background-color: ${theme.colors.error};
    background-image: none;
  `}
`

interface ITotalContainerProps {
  value: number;
}

// prettier-ignore
export const TotalContainer = styled.div<ITotalContainerProps>`
  ${() => css`
    display: grid;
    grid-template-columns: auto 13.5rem;
    gap: 1.6rem;

    ${ProgressBar} {
      grid-column: span 2;
    }

    ${ProgressValue} {
      background-image: linear-gradient(
        90deg,
        #ffbf00 -10.71%,
        #e843c4 110.71%
      );
    }
  `}
  ${({ theme, value }) => value > 100 && css`
    ${ProgressValue} {
      width: 100%;

      background-color: ${theme.colors.error};
      background-image: none;
    }
  `}
`

export const Text = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font16};
    line-height: 100%;

    &:last-of-type {
      text-align: end;
    }
  `}
`

export const Error = styled.span`
  ${({ theme }) => css`
    grid-column: span 2;
    display: block;

    margin-top: 0.8rem;

    color: ${theme.colors.error};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: 100%;
  `}
`
