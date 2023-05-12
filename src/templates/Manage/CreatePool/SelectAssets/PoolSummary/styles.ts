import styled, { css } from 'styled-components'

export const PoolSummary = styled.div`
  ${() => css`
    border-radius: 8px;
  `}
`

export const Header = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 6.2rem;
    padding: 2.4rem 1.6rem;
    border-radius: 8px 8px 0 0;

    background: rgb(0 0 0 / 0.25);

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
    border-radius: 0 0 8px 8px;

    background: rgb(255 255 255 / 0.04);

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
    align-items: center;

    ${ProgressBar} {
      grid-column: span 2;
    }
  `}
`

export const AllocationContainer = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: 3.2rem auto 1rem;
    gap: 1.2rem;
    align-items: center;
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
    border: 1px solid rgb(255 255 255 / 0);
    border-radius: 50%;

    background: rgb(255 255 255 / 0);

    cursor: pointer;

    transition-timing-function: ease-in-out;
    transition-duration: 300ms;
    transition-property: background-color border;

    #lock-up-closed {
      transition-timing-function: ease;
      transition-duration: 300ms;
      transition-property: stroke-dashoffset;

      stroke-dasharray: 100%;
      stroke-dashoffset: 30%;
    }

    &:hover {
      background-color: rgb(255 255 255 / 0.08);
    }
  `}
  ${({ active }) => active && css`
    border: 1px solid rgb(255 255 255 / 0.1) ;

    background-color: rgb(255 255 255 / 0.08);

    #lock-up-closed {
      stroke-dashoffset: 0%;
    }
  `}
`

export const RemoveButton = styled.button`
  ${() => css`
    width: 1rem;
    height: 1rem;
    border: none;

    background-color: transparent;

    cursor: pointer;
  `}
`

export const ProgressBar = styled.div`
  ${({ theme }) => css`
    position: relative;

    width: 100%;
    height: 0.4rem;
    border: none;
    border-radius: 4px;

    background-color: ${theme.colors.lightGray};
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
    border-radius: 2px;

    background-color: ${theme.colors.magenta};

    transition-timing-function: ease;
    transition-duration: 300ms;
    transition-property: width;

    &::before {
      content: '';
      position: absolute;
      z-index: -1;

      width: 100%;
      height: 100%;
      border-radius: 2px;

      background-color: inherit;
      background-image: inherit;

      filter: blur(5px);
    }
  `}
  ${({ theme, value }) => value > 100 && css`
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
  ${({ theme, value }) => value < 100 && css`
    ${ProgressValue} {
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
    display: block;
    grid-column: span 2;

    margin-top: 0.8rem;

    color: ${theme.colors.error};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: 100%;
  `}
`

export const InputValidation = styled.input`
  ${() => css`
    position: absolute;
    top: 0;
    right: 0;

    opacity: 0;
    pointer-events: none;
  `}
`
