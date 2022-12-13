import styled from 'styled-components'
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
  isKacyStatsModal?: boolean;
}

// eslint-disable-next-line prettier/prettier
export const Ul =
  styled.ul <
  IhavePaddingProps >
  `
  padding-block: ${props => props.isKacyStatsModal && 0} 1.6rem;
`

export const Li = styled.li`
  display: flex;
  justify-content: space-between;

  color: ${theme.colors.snow};
  font-weight: ${theme.font.weight.light};
  font-size: ${theme.font.sizes.font16};
  line-height: 100%;
  letter-spacing: 0.05em;

  &:not(:last-of-type) {
    margin-bottom: 1.6rem;
  }

  @media (max-width: 500px) {
    font-size: ${theme.font.sizes.font14};
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

  margin-bottom: 2.4rem;

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

export const ChainIcon = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
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

export const Line = styled.div`
  width: 100%;
  height: 0.2rem;

  border-radius: 0.1rem;
  background-color: rgba(255, 255, 255, 0.15);
`
