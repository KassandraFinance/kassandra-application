import styled from 'styled-components'
import theme from '../../../../styles/theme'

export const IntroWalletAddress = styled.section`
  margin-top: ${theme.spacings.space16};
`

interface IHorizontalLineProps {
  none?: boolean;
}

// prettier-ignore
export const HorizontalLine =styled.div<IHorizontalLineProps>`
  content: '';

  display: block;

  width: 0.1rem;
  height: 100%;

  background: rgb(255 255 255 / 0.2);

  @media (max-width: 680px) {
    display: ${props => (props.none ? 'none' : 'block')};
  }

  @media (max-width: 576px) {
    height: 1.6rem;
  }
`

export const VerticalLine = styled.div`
  display: none;

  @media (max-width: 680px) {
    content: '';

    display: block;

    width: 100%;
    height: 0.1rem;

    background: rgb(255 255 255 / 0.2);
  }
`

export const VotingPowerContent = styled.div`
  display: flex;
  gap: ${theme.spacings.space24};

  margin-top: ${theme.spacings.space24};

  @media (max-width: 1100px) {
    flex-direction: column;
  }

  @media (max-width: 576px) {
    gap: ${theme.spacings.space16};

    margin-top: ${theme.spacings.space16};
  }
`

export const AllVotingPowerCard = styled.div`
  display: grid;
  grid-template-columns: 3fr 0.1rem 2fr;
  gap: 2.4rem;
  align-items: center;

  min-width: 75rem;
  padding: 2.3rem;
  border: 0.1px solid rgb(255 255 255 / 0.2);
  border-radius: 8px;

  background: rgb(255 255 255 / 0.04);

  @media (max-width: 1100px) {
    grid-template-columns: 3fr 0.01rem 2fr;

    min-width: 20rem;
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 576px) {
    padding: 1.6rem;
  }
`

export const AddressTotalVotingPower = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 2.4rem;
  border: 0.1px solid rgb(255 255 255 / 0.2);
  border-radius: 8px;

  background: rgb(255 255 255 / 0.04);

  .address-total-voting-power {
    display: flex;

    color: ${theme.colors.grayDisabled};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font14};
    line-height: ${theme.font.sizes.font16};

    @media (max-width: 1100px) {
      margin-bottom: 0;

      font-size: ${theme.font.sizes.font16};
    }

    @media (max-width: 576px) {
      max-width: 16rem;
      margin-bottom: 0;

      font-size: ${theme.font.sizes.font12};
    }

    @media (max-width: 370px) {
      max-width: 100rem;
    }
  }

  .value-total-voting-power {
    margin-top: 1rem;

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font32};
    line-height: ${theme.font.sizes.font32};

    @media (max-width: 1100px) {
      font-size: ${theme.font.sizes.font24};
    }

    @media (max-width: 576px) {
      font-size: ${theme.font.sizes.font18};
    }
  }

  @media (max-width: 1100px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding: 2.8rem 2.4rem;
  }

  @media (max-width: 576px) {
    flex-direction: row;
    justify-content: space-between;

    border-radius: 8px;
  }
`

export const Tooltip = styled.div`
  position: relative;

  height: 1.75rem;
  margin-left: 0.8rem;
  padding: 0.01rem;
`

export const ReceivedAndOwnedVotingPower = styled.div`
  font-weight: ${theme.font.weight.medium};
  font-size: ${theme.font.sizes.font14};
  line-height: ${theme.font.sizes.font16};
  text-transform: uppercase;

  .gray-color {
    color: ${theme.colors.grayDisabled};
  }

  .bold {
    @media (max-width: 576px) {
      font-size: ${theme.font.sizes.font14};
    }
  }

  @media (max-width: 576px) {
    font-size: ${theme.font.sizes.font12};
  }
`

export const OwnedVotingPower = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 1.2rem;
`

export const TextAndTooltip = styled.div`
  display: flex;
  align-items: center;
`

export const ReceivedVotingPower = styled.div`
  display: flex;
  justify-content: space-between;
`

export const ManageDelegation = styled.div`
  width: 100%;
  border-radius: 8px;

  a {
    display: flex;
    justify-content: center;

    margin-top: 1.1rem;
    margin-bottom: 0;
  }

  button {
    width: 100%;
  }

  @media (max-width: 576px) {
    padding: ${theme.spacings.space16};
  }
`
