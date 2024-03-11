import styled, { css } from 'styled-components'
import theme from '../../../../styles/theme'

export const Kacy = styled.div``

export const ModalContent = styled.div`
  width: 40rem;

  @media (max-width: 576px) {
    width: 100%;
  }
`

export const WebDisabledWrapper = styled.div`
  section {
    height: fit-content;
    padding: 0;
    margin-bottom: 2.4rem;

    @media (max-width: 500px) {
      margin-bottom: 1.6rem;
    }
  }
`

interface IhavePaddingProps {
  isKacyStatsModal?: boolean
}

export const Ul = styled.ul<IhavePaddingProps>`
  padding-block: ${props => props.isKacyStatsModal && 0} 1.6rem;
`

export const Li = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: ${theme.colors.snow};
  font-weight: ${theme.font.weight.light};
  font-size: ${theme.font.sizes.font16};
  line-height: 100%;
  letter-spacing: 0.05em;

  &:not(:last-of-type) {
    margin-bottom: 1.2rem;
  }

  @media (max-width: 500px) {
    font-size: ${theme.font.sizes.font14};
  }
`

export const WrapperToggle = styled.div`
  display: flex;
  justify-content: center;

  padding-bottom: 1.6rem;
`

interface IToggleList {
  isShowMore: boolean
}

export const ToggleList = styled.div<IToggleList>`
  position: relative;
  font-size: ${theme.font.sizes.font16};
  color: ${theme.colors.white};
  cursor: pointer;
  align-content: center;

  img {
    transform: ${props => (props.isShowMore ? 'rotate(180deg)' : null)};
    margin-left: 8px;
    transition-duration: 200ms;
  }

  &:hover {
    &::after {
      content: '';
      max-width: 100%;
      text-align: left;
      position: absolute;
      display: block;
      height: 0.1rem;
      background-color: ${theme.colors.white};
      animation: hoverAnimation 0.3s forwards;
    }
    @keyframes hoverAnimation {
      from {
        width: 0;
        left: 50%;
      }
      to {
        width: 100%;
        left: 0;
      }
    }
  }
`

export const Value = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.4rem;

  color: ${theme.colors.snow};
  font-weight: ${theme.font.weight.medium};
  font-size: ${theme.font.sizes.font18};

  span {
    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
  }

  @media (max-width: 500px) {
    font-size: ${theme.font.sizes.font16};
  }
`

export const KacyTotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 1.6rem;

  @media (max-width: 500px) {
    margin-bottom: 1.6rem;
  }
`

export const ImgContainer = styled.div`
  position: relative;
`

export const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 5.6rem;
  height: 5.6rem;

  background: ${theme.colors.darkPurple};
  border-radius: 50%;
`

export const TotalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`

export const BodyTitle = styled.span`
  color: ${theme.colors.snow};
  font-weight: ${theme.font.weight.light};
  font-size: ${theme.font.sizes.font16};
  line-height: 100%;
  letter-spacing: 0.15em;

  @media (max-width: 500px) {
    font-size: ${theme.font.sizes.font14};
  }
`

export const KacyTotal = styled.span`
  margin-top: 0.4rem;

  color: ${theme.colors.snow};
  font-weight: ${theme.font.weight.medium};
  font-size: ${theme.font.sizes.font32};
  line-height: 100%;
  letter-spacing: 0.05em;

  @media (max-width: 500px) {
    font-size: ${theme.font.sizes.font24};
  }
`

export const KacyUSDTotal = styled.span`
  color: ${theme.colors.snow};
  font-weight: ${theme.font.weight.light};
  font-size: ${theme.font.sizes.font16};
  line-height: 100%;
  letter-spacing: 0.05em;

  @media (max-width: 500px) {
    font-size: ${theme.font.sizes.font14};
  }
`

export const Chain = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.8rem;
`

export const ChainTotalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`

export const ChainKacyTotal = styled.span`
  margin-top: 0.4rem;

  color: ${theme.colors.snow};
  font-weight: ${theme.font.weight.medium};
  font-size: ${theme.font.sizes.font18};
  line-height: 100%;
  letter-spacing: 0.05em;
`

export const ChainKacyUSDTotal = styled.span`
  color: ${theme.colors.snow};
  font-weight: ${theme.font.weight.light};
  font-size: ${theme.font.sizes.font14};
  line-height: 100%;
  letter-spacing: 0.05em;
`

export const Line = styled.div`
  width: 100%;
  height: 0.2rem;

  border-radius: 0.1rem;
  background-color: rgba(255, 255, 255, 0.15);
`

export const ChainContainer = styled.div<IToggleList>`
  ${() => css`
    max-height: 5rem;

    overflow-y: hidden;

    transition-timing-function: ease-in-out;
    transition-duration: 300ms;
    transition-property: max-height;

    margin-top: 1.6rem;
  `}

  ${({ isShowMore }) =>
    isShowMore &&
    css`
      max-height: 32rem;
    `}
`

export const ChainWrapper = styled.div`
  ${() => css`
    width: 100%;

    color: rgb(189, 189, 189);
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font14};
    letter-spacing: 0.22em;
    text-transform: uppercase;

    display: flex;
    align-items: center;
    justify-content: space-between;
  `}
`

export const ButtonContainer = styled.div`
  ${() => css`
    display: flex;
    gap: 0.8rem;
  `}
`
