import styled from 'styled-components'
import theme from '../../../../styles/theme'

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  background: linear-gradient(164.99deg, #1b1d22 19.85%, #333437 116.33%);
  border-radius: 0 0 10px 10px;
`

export const WrapperIconsBackGround = styled.button`
  display: flex;
  align-items: center;

  margin-top: 2.4rem;
  margin-right: 2.4rem;
  margin-left: 2.4rem;
  padding: 0.15rem;

  background: #1f1f1fb8;
  border-radius: 1rem;
  border: none;

  transition: 200ms;

  background-image: linear-gradient(0deg, #ffffff15 -0.02%, #ffffff15 99.99%);

  @media (max-width: 440px) {
    margin-top: 1.6rem;
    margin-right: 1.6rem;
    margin-left: 1.6rem;
  }

  &:last-child {
    margin-top: 1.6rem;
    margin-bottom: 2.4rem;
  }

  &.disabled {
    filter: grayscale(1);
  }

  &:hover,
  &:focus {
    background-image: linear-gradient(45deg, #ffbf00 -0.02%, #e843c4 99.99%);
  }

  &:focus {
    outline: none;
  }
`

export const WrapperIcons = styled.div`
  position: relative;
  z-index: 2;

  display: flex;
  align-items: center;

  padding-top: 1.6rem;
  padding-right: 1.6rem;
  padding-bottom: 1.6rem;

  background: #1f1f1f;
  border: none;
  border-radius: 1rem;

  cursor: pointer;

  @media (max-width: 440px) {
    padding-left: 1.6rem;
  }

  img {
    margin: 0 1.6rem;
    @media (max-width: 440px) {
      display: none;
    }
  }
`

export const Option = styled.div`
  color: ${theme.colors.snow};
  font-family: ${theme.font.family};
  text-align: left;
  letter-spacing: 0.05rem;

  h3 {
    margin-bottom: ${theme.spacings.space8};

    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.bold};
  }
  p {
    line-height: ${theme.font.sizes.font18};
    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.light};

    @media (max-width: 440px) {
      font-size: ${theme.font.sizes.font12};
    }
  }
`
