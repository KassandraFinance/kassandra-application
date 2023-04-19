import styled from 'styled-components'
import theme from '../../../styles/theme'

export const UserDescription = styled.div`
  display: flex;

  width: 100%;
  border-radius: 8px;

  background: rgb(255 255 255 / 0.05);

  @media (max-width: 650px) {
    flex-direction: column;
  }
`

export const BarBottom = styled.div`
  @media (max-width: 650px) {
    width: 90%;
    margin: 0 auto;
    border: 1px solid rgb(255 255 255 / 0.2);
  }
`

export const UserInfo = styled.div`
  display: flex;

  padding-top: 3.2rem;
  padding-bottom: 3.2rem;
  padding-left: 3.2rem;

  @media (max-width: 650px) {
    padding-top: 3.2rem;
    padding-bottom: 1.3rem;
    padding-left: 3.2rem;
  }
`

export const UserInfoContent = styled.div`
  margin-top: 1.2rem;

  > img {
    object-fit: cover;

    border-radius: 50%;
  }

  > span {
    min-width: 7.2rem;
  }

  > button {
    display: none;

    @media (max-width: 650px) {
      display: flex;
      justify-content: center;

      width: 10rem;
      margin-top: 1rem;
      border: none;

      color: #fff;
      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font14};

      background-color: transparent;

      cursor: pointer;

      > img {
        margin-left: 0.8rem;
      }
    }
  }

  @media (max-width: 650px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-top: 0;
    padding-right: 3rem;

    #userImage {
      width: 6.5rem;
      height: 6.5rem;
      margin-top: -0.4rem;
    }
  }
`

interface IisSelectSeeMoreProps {
  isSelectSeeMore: boolean;
}

// prettier-ignore
export const UserProfileContent = styled.div<IisSelectSeeMoreProps>`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin-left: 1.6rem;
  padding-right: 3.2rem;
  border-right: 0.1rem solid rgb(255 255 255 / 0.2);

  p {
    margin-bottom: 0.8rem;

    color: #fff;
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font20};

    @media (max-width: 650px) {
      margin-bottom: 1.3rem;
      padding-top: 0.6rem;
    }
  }

  ul {
    display: flex;
    gap: 0.8rem;

    margin-top: 0.5rem;
    margin-bottom: 1.3rem;

    @media (max-width: 650px) {
      margin-top: 0.9rem;
    }
  }

  @media (max-width: 650px) {
    margin-left: 0;
    border: none;
  }
`

export const EditInfoButton = styled.button`
  display: flex;
  gap: 0.8rem;

  max-width: 8rem;
  border: none;

  color: #fff;
  font-weight: ${theme.font.weight.light};
  font-size: ${theme.font.sizes.font14};

  background-color: transparent;

  cursor: pointer;

  @media (max-width: 650px) {
    display: none;
  }
`

export const UserAddressContent = styled.span`
  display: flex;
  gap: 1rem;
  align-items: center;

  width: 100%;
  margin-bottom: 0.8rem;

  font-weight: ${theme.font.weight.light};
  font-size: ${theme.font.sizes.font14};

  button {
    border: 0;

    background-color: transparent;

    cursor: pointer;
  }
`

export const ManagerInfo = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 3.2rem;

  .titleManagerInfo {
    display: flex;

    margin-bottom: 0.8rem;

    color: #c4c4c4;
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font14};

    > span {
      margin-left: 0.8rem;
    }
  }
`

// eslint-disable-next-line prettier/prettier
export const DescriptionManagerInfo = styled.p`
  color: #fff;
  font-weight: ${theme.font.weight.light};
  font-size: ${theme.font.sizes.font16};
  line-height: 2.1rem;
  white-space: pre-wrap;
  word-break: break-all;
`
interface IisSeeMoreProps {
  isSeeMore: boolean;
}

// prettier-ignore
export const ButtonSeeMore = styled.button<IisSeeMoreProps>`
  position: relative;

  width: 7rem;
  margin-left: 1rem;
  border: 0;

  color: #fff;
  font-weight: ${theme.font.weight.medium};
  font-size: 1.1rem;
  font-family: ${theme.font.family};
  text-align: start;

  background-color: transparent;

  cursor: pointer;

  > span {
    position: absolute;
    right: -0.1rem;

    img {
      ${props =>
        props.isSeeMore ? `transform: rotate(180deg)` : `transform: rotate(0)`}
    }
  }
`

interface ISocialIconProps {
  isActiveSocial?: boolean;
}

// prettier-ignore
export const SocialIcon = styled.a<ISocialIconProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 2.4rem;
  height: 2.4rem;
  border: 1px solid rgb(255 255 255 / 0);
  border-radius: 50%;

  background: rgb(255 255 255 / 0.1);

  opacity: ${props => (props.isActiveSocial ? 'none' : '50%')};
  cursor: pointer;
  pointer-events: ${props => (props.isActiveSocial ? 'auto' : 'none')};

  transition: border ${theme.transition.default};

  &:hover {
    border: 1.5px solid rgb(255 255 255 / 0.3);
  }
`
