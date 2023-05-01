import styled, { css } from 'styled-components'

export const ModalBridge = styled.div`
  ${() => css``}
`

export const Content = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    width: 30.7rem;

    @media (max-width: 576px) {
      width: 100%;
    }
  `}
`

export const Wrapper = styled.div`
  ${() => css`
    position: relative;

    height: 3.4rem;
  `}
`

export const ListContainer = styled.div`
  ${() => css`
    position: absolute;

    display: flex;
    justify-content: space-between;

    width: 100%;
  `}
`

export const InputContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `}
`

export const Text = styled.span`
  ${({ theme }) => css`
    display: block;

    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
    line-height: 100%;
  `}
`

export const Info = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    min-height: 10rem;
    padding: 1rem;
    border: 1px solid ${theme.colors.amber};
    border-radius: 8px;
  `}
`
