import styled, { css } from 'styled-components'

export const PoolImage = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    padding: 2.4rem;

    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.8rem;
  `}
`

export const PoolSettingTitle = styled.h4`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.normal};
    line-height: 1.6rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  `}
`

export const PoolSettingParagraph = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.light};
    line-height: 135%;

    @media (max-width: 360px) {
      font-size: ${theme.font.sizes.font14};
    }
  `}
`

export const UploadImage = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    gap: 1.6rem;

    img {
      border-radius: 50%;
      object-fit: cover;
    }

    input {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }
  `}
`

export const PoolSettingsName = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    p {
      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.normal};
      line-height: 2.4rem;
    }

    strong {
      margin-top: 0.8rem;
      padding: 0.8rem 1.1rem;

      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.normal};
      line-height: 100%;

      background: rgba(0, 0, 0, 0.19);
      border-radius: 0.8rem;
      text-align: center;
    }
  `}
`

export const ErrorParagraph = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.red};
    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.light};
    line-height: 100%;
  `}
`

export const Label = styled.label`
  ${({ theme }) => css`
    width: 100%;
    padding: 1.6rem 3.2rem;

    background-color: ${theme.colors.blue};
    border-radius: 0.4rem;

    color: ${theme.colors.snow};
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.light};
    line-height: 1.6rem;
    text-align: center;

    cursor: pointer;
  `}
`
