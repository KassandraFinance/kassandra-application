import styled, { css } from 'styled-components'

interface IWarningCardProps {
  showCard: boolean
}

export const WarningCard = styled.div<IWarningCardProps>`
  ${({ theme }) => css`
    display: flex;
    align-items: start;
    min-height: 0;
    padding: 0;
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
      display: none;
    }
  `}

  ${({ showCard }) =>
    showCard &&
    css`
      min-height: 6rem;
      padding: 0.8rem 1.6rem;
      opacity: 1;

      img {
        display: flex;
        margin-top: 0.1rem;
      }
    `}
`
