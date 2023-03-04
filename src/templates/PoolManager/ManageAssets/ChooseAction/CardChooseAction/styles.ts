import styled, { css } from 'styled-components'

interface ICardChooseActionProps {
  isActive: boolean;
}
// eslint-disable-next-line prettier/prettier
export const CardChooseAction = styled.button<ICardChooseActionProps>`
  ${({ theme, isActive }) => css`
    display: flex;
    align-items: center;
    gap: 2.4rem;
    padding: 2.4rem 3.2rem;
    max-width: 57.4rem;

    background: ${isActive
      ? 'rgba(255, 255, 255, 0.15)'
      : 'rgba(255, 255, 255, 0.05)'};
    border-radius: 8px;
    border: 1px solid ${isActive ? 'rgba(252, 252, 252, 0.5)' : 'transparent'};

    font-family: ${theme.font.family};
    text-align: left;

    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      border: 1px solid rgba(252, 252, 252, 0.5);
      background: rgba(255, 255, 255, 0.15);
    }

    @media (max-width: 576px) {
      gap: 1.6rem;
    }
  `}
`

export const imageContent = styled.span`
  ${() => css`
    min-width: 4.9rem;
    height: 4.9rem;

    img {
      height: 100%;
      width: 100%;
    }
  `}
`

export const TitleAndParagraph = styled.span`
  ${({ theme }) => css`
    span {
      color: #f79640;
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      line-height: 100%;
      text-transform: uppercase;
      letter-spacing: 0.22em;

      @media (max-width: 560px) {
        font-size: ${theme.font.sizes.font12};
        line-height: 12px;
      }
    }

    p {
      margin-top: 0.5rem;

      color: #ffffff;
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.light};
      line-height: 2.88rem;

      @media (max-width: 560px) {
        font-size: ${theme.font.sizes.font14};
        letter-spacing: 0.05em;
        line-height: 2.4rem;
      }
    }
  `}
`
