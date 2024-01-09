import styled, { css, keyframes } from 'styled-components'

export const ModalProfile = styled.div`
  ${() => css`
    position: absolute;
    right: 0;
    top: 4.4rem;

    z-index: 1057;

    @media (max-width: 840px) {
      width: 100vw;
      height: 100vh;
    }
  `}
`

const openModal = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.6);

  z-index: 1056;
  animation: ${openModal} 500ms ease;
`

export const ModalBody = styled.div`
  ${() => css`
    position: relative;

    display: flex;
    flex-direction: column;
    padding: 1.6rem 2.4rem;
    width: 36rem;

    border-radius: 16px;
    border: 1px solid rgba(252, 252, 252, 0.08);
    background: #1b1d22;

    z-index: 1057;

    @media (max-width: 840px) {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `}
`

export const CloseIconContent = styled.div`
  ${() => css`
    display: flex;
    justify-content: flex-end;
    width: 100%;

    z-index: 1058;
    cursor: pointer;
  `}
`

export const ProfileContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.6rem;
    width: 100%;
    margin-top: -2rem;
  `}
`

export const ProfileContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;
    width: 100%;

    p {
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.medium};
      line-height: 24px;
    }
  `}
`

export const UserAddressContent = styled.span`
  ${({ theme }) => css`
    display: flex;
    gap: 1rem;

    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};

    button {
      border: 0;

      background-color: transparent;

      cursor: pointer;
    }
  `}
`

export const ActionsCardContainer = styled.div`
  ${() => css`
    display: flex;
    margin-top: 1.6rem;
    gap: 3.2rem;
  `}
`

export const ActionCard = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    width: 100%;
    height: 6.4rem;

    border-radius: 8px;
    background: rgba(252, 252, 252, 0.05);

    transition: background 200ms ease-in;

    text-decoration: none;
    cursor: pointer;

    p {
      color: ${theme.colors.white};
      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font14};
    }

    &:hover {
      background: rgba(252, 252, 252, 0.15);
    }
  `}
`
