import styled, { css } from 'styled-components'

export const InputContent = styled.div`
  ${() => css`
    position: relative;

    display: flex;
    align-items: center;

    > img {
      position: absolute;
      left: 1rem;
    }
  `}
`

interface IDeleteSearchProps {
  isShowIcon: boolean;
}

// eslint-disable-next-line prettier/prettier
export const DeleteSearch = styled.span<IDeleteSearchProps>`
  ${({ isShowIcon }) => css`
    position: absolute;
    right: 1rem;

    cursor: pointer;

    img {
      display: ${isShowIcon ? 'flex' : 'none'};
      transition: 0.3s;
    }
  `}
`

export const SearchListInput = styled.input`
  ${({ theme }) => css`
    width: 100%;
    padding: 1.6rem 4rem;

    background: #1b1d22;
    border: 0.2rem solid rgba(255, 255, 255, 0.15);
    border-radius: 0.8rem;

    color: ${theme.colors.grayDisabled};
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.light};
  `}
`
