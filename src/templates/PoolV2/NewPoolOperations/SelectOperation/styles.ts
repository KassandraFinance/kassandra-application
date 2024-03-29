import styled, { css } from 'styled-components'
import theme from '../../../../styles/theme'

// eslint-disable-next-line prettier/prettier

export const SelectOperation = styled.div`
  ${() => css`
    position: relative;

    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;

    background: rgba(31, 31, 31, 0.72);
    border-top-left-radius: 1.2rem;
    border-top-right-radius: 1.2rem;
  `};
`

interface ILineProps {
  activeLine: boolean
}

// eslint-disable-next-line prettier/prettier
export const LineBottom = styled.div<ILineProps>`
  ${({ activeLine }) => css`
    position: absolute;
    bottom: 0;
    left: 0;

    background-color: ${theme.colors.cyan};
    width: 50%;
    height: 2px;

    transition: transform 0.3s ease;
    transform: ${activeLine ? 'translateX(100%)' : 'translateX(0)'};
  `};
`

export const Input = styled.input`
  display: none;
`

interface ILabelProps {
  selected: boolean
}

// eslint-disable-next-line prettier/prettier
export const Label = styled.label<ILabelProps>`
  ${({ theme, selected }) => css`
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 2.2rem 0;

    color: ${selected ? '#fff' : theme.colors.gray};
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.normal};
    text-align: center;
    text-transform: capitalize;

    border-bottom: 0.2rem solid rgba(255, 255, 255, 0.15);

    cursor: pointer;

    @media (max-width: 375px) {
      padding: 1.8rem;
      font-size: 1.3rem;
    }

    @media (max-width: 360px) {
      padding: 1.6rem;
      font-size: ${theme.font.sizes.font12};
    }
  `}
`

export const TypeWithdraw = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem 4rem;
  gap: 1.6rem;

  background: rgba(31, 31, 31, 0.72);
  border-bottom: 0.2rem solid rgba(255, 255, 255, 0.15);

  @media (max-width: 360px) {
    padding: 1.5rem 2rem;
  }
`

export const TypeRadio = styled.div`
  display: flex;
  align-items: center;

  .radio {
    display: block;
    text-align: left;

    cursor: pointer;
    user-select: none;

    & + .radio {
      margin-top: 0.7rem;
    }

    input {
      ${({ theme }) => css`
        display: none;
        & + span {
          position: relative;
          display: inline-block;
          padding-left: 2.4rem;

          font-size: ${theme.font.sizes.font16};
          line-height: ${theme.font.sizes.font16};

          @media (max-width: 360px) {
            font-size: ${theme.font.sizes.font12};
          }

          &:before {
            content: '';

            position: absolute;
            top: 0;
            left: 0;

            display: block;
            width: 1.6rem;
            height: 1.6rem;
            margin-right: 1rem;

            border: 0.1rem solid ${theme.colors.darkGray};
            border-radius: 50%;
            background: ${theme.colors.darkGray};
          }
          &:after {
            content: '';

            position: absolute;
            top: 0.3rem;
            left: 0.3rem;

            display: block;
            width: 1rem;
            height: 1rem;

            background: ${theme.colors.cyan};
            border-radius: 50%;

            opacity: 0;
            transform: scale(0, 0);
            transition: all 0.2s cubic-bezier(0.64, 0.57, 0.67, 1.53);
          }
        }
        &:checked + span:after {
          opacity: 1;
          transform: scale(1, 1);
        }
      `}
    }
  }
`

export const InputWithdraw = styled.input``
