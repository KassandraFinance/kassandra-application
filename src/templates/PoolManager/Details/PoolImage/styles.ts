import styled, { css } from 'styled-components'

export const PoolImage = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    width: 100%;
    margin-top: 2.4rem;
    padding: 2.4rem;
    border-radius: 8px;

    background: rgb(255 255 255 / 0.05);
  `}
`

export const PoolSettingTitle = styled.h4`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font14};
    line-height: 1.6rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  `}
`

export const PoolSettingParagraph = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font16};
    line-height: 135%;

    @media (max-width: 360px) {
      font-size: ${theme.font.sizes.font14};
    }
  `}
`

export const UploadImage = styled.div`
  ${() => css`
    display: flex;
    gap: 1.6rem;
    align-items: center;

    img {
      object-fit: cover;

      border-radius: 50%;
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
      font-weight: ${theme.font.weight.normal};
      font-size: ${theme.font.sizes.font16};
      line-height: 2.4rem;
    }

    strong {
      width: fit-content;
      margin-top: 0.8rem;
      padding: 0.8rem 1.1rem;
      border-radius: 8px;

      color: ${theme.colors.white};
      font-weight: ${theme.font.weight.normal};
      font-size: ${theme.font.sizes.font12};
      line-height: 100%;
      text-align: center;

      background: rgb(0 0 0 / 0.19);
    }
  `}
`

export const ErrorParagraph = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.red};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: 100%;
  `}
`

export const Label = styled.label`
  ${({ theme }) => css`
    width: 100%;
    padding: 1.6rem 3.2rem;
    border-radius: 4px;

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font16};
    line-height: 1.6rem;
    text-align: center;

    background: rgb(255 255 255 / 0.05);

    cursor: pointer;
  `}
`
