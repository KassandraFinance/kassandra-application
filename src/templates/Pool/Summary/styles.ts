import styled from 'styled-components'
import theme from '../../../styles/theme'

export const Summary = styled.div`
  p {
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: 1.5rem;
  }

  a {
    display: flex;
    align-items: flex-end;

    max-width: 100%;
    border: none;
    border-radius: 0.75rem;

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    font-family: ${theme.font.family};
    text-decoration: none;

    background-color: rgb(255 255 255 / 0.04);
    outline: none;

    transition: 0.15s;

    svg {
      margin-left: ${theme.spacings.space8};

      path {
        color: white;

        transition: fill 0.15s ease;
      }
    }

    &:hover {
      color: ${theme.colors.cyan};

      > svg {
        path {
          fill: ${theme.colors.cyan};
        }
      }
    }
  }
`

export const Line = styled.div`
  width: 100%;
  height: 0.06rem;
  margin: ${theme.spacings.space24} 0;

  background-color: rgb(255 255 255 / 0.1);
`

export const Title = styled.div`
  display: flex;
  align-items: center;

  h2 {
    margin-left: ${theme.spacings.space16};

    font-weight: ${theme.font.weight.bold};
    font-size: ${theme.font.sizes.font18};
  }
`

export const LinkContent = styled.div`
  display: flex;
  justify-content: space-between;

  max-width: 25rem;
`

export const ContractsName = styled.p`
  margin-bottom: 1.2rem;

  /* margin-top: 1.25rem; */

  font-weight: ${theme.font.weight.normal} !important;
  text-transform: uppercase;
`

export const CopyContract = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  max-width: 100%;
  margin: 1rem 0;
  padding: 1.38rem;
  border: none;
  border-radius: 0.75rem;

  color: #fff;
  font-size: ${theme.font.sizes.font14};
  font-family: ${theme.font.family};
  text-decoration: none;

  background-color: rgb(255 255 255 / 0.04);

  .metamask {
    margin-right: 0.5rem;

    @media (max-width: 1060px) {
      margin-left: 1.25rem;
    }
  }

  & > div {
    display: flex;
  }

  button {
    display: flex;
    align-items: center;

    border: none;

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    font-family: ${theme.font.family};
    text-decoration: none;

    background-color: transparent;
    outline: none;

    cursor: pointer;

    transition: 0.15s;

    svg {
      margin-left: ${theme.spacings.space8};
    }

    &:hover {
      color: ${theme.colors.cyan};

      > svg {
        path {
          fill: ${theme.colors.cyan};
        }
      }
    }

    @media (max-width: 1060px) {
      margin-top: 6px;
    }

    @media (max-width: 538px) {
      display: none;
    }
  }

  @media (max-width: 1060px) {
    flex-wrap: wrap;
    align-items: flex-start;

    padding: 1rem;

    > button {
      margin-left: 2.5rem;
    }
  }

  @media (max-width: 950px) {
    flex-direction: row;
  }

  @media (max-width: 530px) {
    flex-direction: column;
  }
`

export const Blockchain = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  .poolIcon {
    border-radius: 50%;
  }

  .image {
    overflow: hidden;

    max-width: 2.4rem;
    max-height: 2.4rem;
    border-radius: 50%;
  }

  svg {
    margin-bottom: 0.2rem;
  }

  span {
    font-size: ${theme.font.sizes.font14};
    text-transform: uppercase;
  }

  a {
    background-color: inherit;
  }

  @media (max-width: 1060px) {
    margin-bottom: 0.5rem;
  }
`
