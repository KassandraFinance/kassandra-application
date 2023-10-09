import styled from 'styled-components'
import theme from '@/styles/theme'

export const BaseCell = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
  justify-content: space-between;
  flex-direction: column;
  overflow: hidden;
`

export const TextProposal = styled.p`
  grid-area: a;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: ${theme.colors.snow};
  line-height: 100%;
  font-size: ${theme.font.sizes.font24};
  font-weight: ${theme.font.weight.normal};

  @media (max-width: 768px) {
    line-height: 100%;
    font-size: ${theme.font.sizes.font18};
  }

  @media (max-width: 540px) {
    line-height: ${theme.font.sizes.font12};
    font-size: ${theme.font.sizes.font12};
  }
`

interface IStatusProposalColor {
  statusColor: string
}

// prettier-ignore
export const StatusProposal = styled.span<IStatusProposalColor>`
  grid-area: c;

  color: ${({ statusColor }) => statusColor};
  line-height: 100%;
  font-size: ${theme.font.sizes.font16};
  font-weight: ${theme.font.weight.medium};
  text-transform: capitalize;

  @media (max-width: 768px) {
    line-height: ${theme.font.sizes.font14};
    font-size: ${theme.font.sizes.font14};
  }

  @media (max-width: 540px) {
    line-height: 1rem;
    font-size: 1rem;
  }
`

export const TimeFrame = styled.p`
  grid-area: b;
  text-align: right;

  color: ${theme.colors.snow};
  line-height: 100%;
  font-size: ${theme.font.sizes.font16};
  font-weight: ${theme.font.weight.light};

  @media (max-width: 768px) {
    margin-left: 1.6rem;

    line-height: ${theme.font.sizes.font14};
    font-size: ${theme.font.sizes.font14};
  }

  @media (max-width: 540px) {
    margin-left: 0.8rem;

    line-height: 1rem;
    font-size: 1rem;
  }
`

// prettier-ignore
export const StateMutability = styled.span<IStatusProposalColor>`
  grid-area: e;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  text-align: right;
  line-height: 100%;
  font-size: ${theme.font.sizes.font24};
  font-weight: ${theme.font.weight.medium};
  color: ${({ statusColor }) => statusColor};
  text-transform: capitalize;

  img {
    width: 2.4rem;
  }

  @media (max-width: 768px) {
    line-height: 100%;
    font-size: ${theme.font.sizes.font18};
  }

  @media (max-width: 540px) {
    line-height: 1rem;
    font-size: 1rem;
  }

  span {
    margin-right: ${theme.spacings.space16};

    @media (max-width: 768px) {
      line-height: 100%;
      font-size: ${theme.font.sizes.font18};
    }

    @media (max-width: 540px) {
      line-height: 1rem;
      font-size: 1rem;
    }
  }

  .status-icon-container {
    width: 2.4rem;
    height: 2.4rem;

     @media (max-width: 768px) {
      width: 1.4rem;
      height: 1.4rem;
    }
  }
`
