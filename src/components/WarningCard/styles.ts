import styled, { css } from 'styled-components'

interface IWarningCardProps {
  showCard: boolean
}

// eslint-disable-next-line prettier/prettier
export const WarningCard = styled.div<IWarningCardProps>`
  ${({ theme }) => css`
    display: flex;
    align-items: start;
    min-height: 0;
    padding: 1.6rem 2.4rem;
    gap: 1rem;
    width: 100%;

    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.light};
    line-height: 160%;

    background: rgba(255, 255, 255, 0.04);
    border: 0.1rem solid rgba(255, 191, 0, 0.5);
    border-radius: 8px;

    opacity: 0;

    transition-duration: 600ms;
    transition-timing-function: ease;
    transition-property: opacity;

    img {
      margin-top: 0.1rem;
    }
  `}

  ${({ showCard }) =>
    showCard &&
    css`
      min-height: 8.4rem;
      opacity: 1;
    `}
`
