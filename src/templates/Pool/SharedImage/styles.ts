import styled, { css } from 'styled-components'

export const SharedImage = styled.div`
  position: relative;

  display: grid;
  grid-template-rows: auto 1fr auto;

  width: 100.1rem;
  height: 50.6rem;
  margin: 0 auto;
  padding-top: 4rem;
  border-radius: 12px;

  background-color: rgb(31 41 55 / 1);
`

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 6rem;
`

export const Title = styled.div`
  display: flex;
  align-items: center;

  h1 {
    margin-right: 1.6rem;
    margin-left: 1.6rem;

    font-weight: 300;
    font-size: 4rem;
  }

  .poolIcon {
    border-radius: 50%;
  }
`

export const Detail = styled.div`
  margin-right: 2rem;
  padding: 0.8rem 1rem;
  border-radius: 10px;

  font-weight: 300;
  font-size: 1.8rem;

  background: rgb(0 0 0 / 0.19);
`

export const HorizontalLine = styled.div`
  width: 11.9rem;
  height: 0.2rem;

  background-color: rgb(255 255 255 / 0.3);
`

export const UserInfo = styled.div`
  display: flex;
  gap: 1.8rem;

  h2 {
    font-weight: 700;
    font-size: 3rem;
  }
`

export const Profile = styled.div`
  display: flex;
  gap: 1.8rem;
  align-items: center;
`

export const ProfileImage = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;

  background-color: red;
`

export const ProfileAddress = styled.p`
  font-weight: 300;
  font-size: 2.4rem;
`

export const Main = styled.main`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 3.5rem 0;
  padding: 0 6rem;
`

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`
export const InfoTitle = styled.div`
  display: flex;
  gap: 1.3rem;
  align-items: center;

  span {
    font-weight: 300;
    font-size: 1.8rem;
  }
`

interface InfoValueProps {
  color: 'white' | 'green' | 'red'
}

const colors = {
  green: '#5ee56b',
  white: '#FFFFFF',
  red: '#EA3224'
}

// prettier-ignore
export const InfoValue = styled.div<InfoValueProps>`
  color: ${({ color }) => colors[color]};
  font-weight: 500;
  font-size: 5.6rem;
`

export const Assets = styled.div`
  font-weight: 300;
  font-size: 1.8rem;
`

export const AssetsContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;

  width: 33.4rem;
  margin-top: 1.6rem;

  img {
    border-radius: 50%;
  }
`

export const ChartContainer = styled.div`
  width: 100%;
  max-width: 54.7rem;
  height: 29.6rem;
`

export const Footer = styled.footer`
  display: flex;
  gap: 1.6rem;

  height: 5.2rem;
  padding: 1.6rem 6rem;
  border-radius: 0 0 12px 12px;

  background-color: #2d152b;
`

export const SocialMedia = styled.div`
  display: flex;
  gap: 0.8rem;

  font-weight: 300;
  font-size: 1.8rem;
`

export const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;

  svg {
    width: 100.1rem;
    height: 100%;
    border-radius: 12px;
  }
`

export const PoolLogoWrapper = styled.div`
  ${() => css`
    overflow: hidden;

    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  `}
`
