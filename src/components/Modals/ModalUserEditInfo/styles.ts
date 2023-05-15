/* eslint-disable prettier/prettier */
import styled from 'styled-components'
import theme from '../../../styles/theme'

export const ModalUserEditInfo = styled.div``

export const BodyModalEditInfo = styled.form`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  width: 63rem;

  @media (max-width: 768px) {
    width: 48.4rem;
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`

export const UserProfileInfoContent = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const UserProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -1rem;
  margin-right: 6rem;

  #userImageSelect {
    border-radius: 100%;
  }

  #InputFile {
    display: none;
  }

  > div {
    margin-top: 1.6rem;
  }

  input {
    width: 32rem;
    padding: 1.6rem;

    color: #c4c4c4;
    font-size: 1.6rem;
    font-weight: ${theme.font.weight.light};

    background: #1b1d22;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 0.8rem;
  }

  @media (max-width: 768px) {
    margin-right: 0;
  }
`

export const NicknameTilte = styled.p`
  margin-bottom: 1.2rem;

  color: #c4c4c4;
  font-size: 1.4rem;
  font-weight: ${theme.font.weight.medium};
`
export const UserNameContent = styled.div`
  > input {
    width: 100%;
  }
`

export const UserImageContent = styled.div`
  display: flex;
  justify-content: space-between;

  > img {
    object-fit: cover;
  }

  > span {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 1.6rem;

    label {
      padding: 1.6rem 1.6rem;

      background: rgba(255, 255, 255, 0.1);
      border: 1px solid transparent;
      border-radius: 0.4rem;

      color: #fcfcfc;
      font-size: 1.6rem;
      font-weight: ${theme.font.weight.light};

      text-align: center;
      transition: 0.3s;
      cursor: pointer;

      :hover {
        border-color: rgba(255, 255, 255, 0.3);
      }
    }
  }
`
interface isDropdownAddNftProps {
  isDropdownAddNft: boolean
}

// prettier-ignore
export const ButtonAddNft = styled.button<isDropdownAddNftProps>`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 1rem;
  margin-top: 1rem;
  padding: 1.6rem 1.6rem;

  color: #FCFCFC;
  font-size: 1.6rem;
  font-weight: ${theme.font.weight.light};

  background: rgba(255, 255, 255, 0.1);
  border: 1px solid transparent;
  border-radius: 0.4rem;

  transition: 0.3s;

  :hover {
    border-color: rgba(255, 255, 255, 0.3);
  }

  text-align: center;
  transition: 0.2s;
  cursor: pointer;

  img {
    transition: transform 400ms ease;
    ${props =>
      props.isDropdownAddNft
        ? `transform: rotate(180deg)`
        : `transform: rotate(0)`}
  }
`

interface isDropdownAddNftProps {
  isDropdownAddNft: boolean
}

// prettier-ignore
export const UserAddNftImage = styled.div<isDropdownAddNftProps>`
  position: absolute;
  top: 12.5rem;

  display: ${props => (props.isDropdownAddNft ? 'flex' : 'none')};

  @media (max-width: 768px) {
    right: 0.1rem;
  }

  img {
    height: 5rem;
    width: 5rem;
  }
`

interface IUserSocialMidiaProps {
  isStateSocialMidia: boolean
}

// prettier-ignore
export const UserSocialMidia = styled.div<IUserSocialMidiaProps>`
  display: ${props => (props.isStateSocialMidia ? 'flex' : 'none')};
  justify-content: flex-start;
  flex-direction: column;
  margin-top: 1rem;

  @media (max-width: 768px) {
    animation: go-back 1s ease;
    @keyframes go-back {
      from {
        transform: translateY(-12%);
      }
      to {
        transform: translateY(0);
      }
    }
  }


  p {
    color: #C4C4C4;
    font-size: 1.4rem;
    font-weight: ${theme.font.weight.medium};

    margin-bottom: 1.2rem;

    @media (max-width: 768px) {
      display: none;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
`

export const SocialIcon = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 3.2rem;
    width: 3.2rem;
    margin-right: 1.6rem;

    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0);
    border-radius: 50%;
  }

  input {
    width: 100%;
    height: 4rem;

    padding-top: 1.2rem;
    padding-bottom: 1.2rem;
    padding-left: 1.6rem;

    color: #c4c4c4;
    font-size: 1.6rem;
    font-weight: ${theme.font.weight.light};

    background: #1b1d22;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 0.8rem;
  }
`

interface IModalManagerInfoProps {
  isStateManagerInfo: boolean
}

// prettier-ignore
export const ModalManagerInfo = styled.div<IModalManagerInfoProps>`
  display: ${props => (props.isStateManagerInfo ? 'flex' : 'none')};
  flex-direction: column;
  padding-top: 2.4rem;

  @media (max-width: 768px) {
    padding-top: 0;

    animation: go-back 1s ease;
    @keyframes go-back {
      from {
        transform: translateY(-12%);
      }
      to {
        transform: translateY(0);
      }
    }
  }

  p {
    margin-bottom: 1.2rem;

    color: #C4C4C4;
    font-size: 1.4rem;
    font-weight: ${theme.font.weight.medium};

    @media (max-width: 768px) {
      display: none;
    }
  }

  textarea {
    width: 100%;
    min-height: 10rem;
    padding: 1.6rem;

    border: 0;
    border-radius: 0.8rem;
    background: #1B1D22;

    font-family: ${theme.font.family};
    color: #ffffff;
    font-size: 1.6rem;
    font-weight: ${theme.font.weight.light};

    resize: none;

    ::-webkit-scrollbar {
      width: 0.8rem;
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 1rem;
    }
  }

  span {
    width: 100%;
    margin-top: 0.4rem;

    color: #C4C4C4;
    font-size: 1.6rem;
    font-weight: ${theme.font.weight.light};

    text-align: right;
  }
`

export const UserEditInfoButtons = styled.div`
  display: flex;
  width: 100%;
  gap: 1.6rem;

  padding-top: 2.4rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

interface IUserSocialAndInfoButtonProps {
  isStateSocialMidia: boolean
}

// prettier-ignore
export const UserSocialAndInfoButton = styled.button<IUserSocialAndInfoButtonProps>`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;

    width: 13rem;
    margin-top: 2rem;
    margin-bottom: ${props => (props.isStateSocialMidia ? `1.2rem` : ``)};

    color: #C4C4C4;
    font-size: 1.4rem;
    font-weight: ${theme.font.weight.medium};

    background-color: transparent;
    border: 0;

    cursor: pointer;

    #ImageContainer {
      display: flex;
      align-items: center;
      margin-left: 0.8rem;
    }

    img {
      ${props =>
        props.isStateSocialMidia
          ? `transform: rotate(180deg)`
          : `transform: rotate(0)`}
    }
  }
`
