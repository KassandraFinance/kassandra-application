import styled from 'styled-components'
import theme from '../../../styles/theme'

export const UserTableVotingHistory = styled.section`
  margin-top: 4rem;
  margin-right: auto;
  margin-left: auto;

  table {
    overflow: hidden;

    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;

    font-size: ${theme.font.sizes.font14};

    tbody {
      background-color: rgb(255 255 255 / 0.04);

      tr {
        cursor: pointer;

        &:first-child {
          .td-container,
          .td-container:hover {
            border-top: none;
          }
        }

        &:last-child {
          .td-container,
          .td-container:hover {
            border-bottom: none;
          }
        }
      }
    }
  }

  @media (max-width: 700px) {
    margin-top: ${theme.spacings.space56};
  }

  @media (max-width: 560px) {
    margin-top: 2.4rem !important;
  }
`

export const Th = styled.thead`
  font-weight: 300;
  font-size: ${theme.font.sizes.font18};
  line-height: ${theme.font.sizes.font18};

  background-color: rgb(0 0 0 / 0.25);

  tr {
    td {
      padding: 2.4rem 3.2rem;

      &:last-child {
        width: 22rem;

        text-align: right;
      }

      @media (max-width: 768px) {
        padding: 2.4rem;
      }

      @media (max-width: 540px) {
        padding: 2rem;
      }
    }
  }

  @media (max-width: 768px) {
    font-size: ${theme.font.sizes.font14};
    line-height: ${theme.font.sizes.font14};
  }

  @media (max-width: 540px) {
    font-size: ${theme.font.sizes.font12};
    line-height: ${theme.font.sizes.font12};
  }
`

export const Td = styled.td`
  .td-container {
    display: grid;
    grid-template-areas:
      'a a b'
      'c d e';
    grid-template-columns: auto 1fr 0.5fr;
    row-gap: 0.8rem;
    align-items: center;

    height: 10.6rem;
    margin: 0 3.2rem;
    margin-top: -0.1rem;
    padding: 2.4rem 0;
    border-top: 0.1rem solid rgb(255 255 255 / 0);
    border-bottom: 0.1rem solid rgb(255 255 255 / 0.3);

    transition:
      background-color ease-in-out 0.3s,
      border ease-in-out 0.3s,
      padding ease-in-out 0.3s,
      margin ease-in-out 0.3s;

    &:hover {
      margin: 0;
      margin-top: -0.1rem;
      padding: 2.4rem 3.2rem;
      border-top: 0.1px solid ${theme.colors.grayDisabled};
      border-bottom: 0.1px solid ${theme.colors.grayDisabled};

      background-color: ${theme.colors.darkPurple};

      @media (max-width: 768px) {
        padding: 2.4rem;
      }

      @media (max-width: 540px) {
        padding: 2rem;
      }
    }

    @media (max-width: 768px) {
      grid-template-areas:
        'a a a'
        'c b e';

      height: 9.8rem;
      margin: 0 2.4rem;
      margin-top: -0.1rem;
      padding: 2.4rem 0;
    }

    @media (max-width: 540px) {
      height: 7rem;
      margin: 0 2rem;
      margin-top: -0.1rem;
      padding: 2rem 0;
    }
  }
`

export const TextProposal = styled.p`
  grid-area: a;

  color: ${theme.colors.snow};
  font-weight: ${theme.font.weight.normal};
  font-size: ${theme.font.sizes.font24};
  line-height: 100%;

  @media (max-width: 768px) {
    font-size: ${theme.font.sizes.font18};
    line-height: 100%;
  }

  @media (max-width: 540px) {
    font-size: ${theme.font.sizes.font12};
    line-height: ${theme.font.sizes.font12};
  }
`

// export const StatusAndTimeframe = styled.div`
//   display: flex;
// `

interface ITypeVote {
  voteColor: string
}

// prettier-ignore
export const TypeVote = styled.span<ITypeVote>`
  grid-area: c;

  color: ${({ voteColor }) => voteColor};
  font-weight: ${theme.font.weight.medium};
  font-size: ${theme.font.sizes.font16};
  line-height: 100%;
  text-transform: capitalize;

  @media (max-width: 768px) {
    font-size: ${theme.font.sizes.font14};
    line-height: ${theme.font.sizes.font14};
  }

  @media (max-width: 540px) {
    font-size: 1rem;
    line-height: 1rem;
  }
`

export const TimeFrame = styled.p`
  grid-area: b;

  color: ${theme.colors.snow};
  font-weight: ${theme.font.weight.light};
  font-size: ${theme.font.sizes.font16};
  line-height: 100%;
  text-align: right;
  text-transform: capitalize;

  @media (max-width: 768px) {
    margin-left: 1.6rem;

    font-size: ${theme.font.sizes.font14};
    line-height: ${theme.font.sizes.font14};
    text-align: left;
  }

  @media (max-width: 540px) {
    margin-left: 0.8rem;

    font-size: 1rem;
    line-height: 1rem;
  }
`

interface IStateMutability {
  statusColor: string
}

// prettier-ignore
export const StateMutability = styled.span<IStateMutability>`
  display: flex;
  grid-area: e;
  justify-content: flex-end;
  align-items: center;

  color: ${({ statusColor }) => statusColor};
  font-weight: ${theme.font.weight.medium};
  font-size: ${theme.font.sizes.font24};
  line-height: 100%;
  text-align: right;
  text-transform: capitalize;

  img {
    width: 2.4rem;
  }

  span {
    margin-right: ${theme.spacings.space16};

    @media (max-width: 768px) {
      font-size: ${theme.font.sizes.font18};
      line-height: 100%;
    }

    @media (max-width: 540px) {
      font-size: 1rem;
      line-height: 1rem;
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

  @media (max-width: 768px) {
    font-size: ${theme.font.sizes.font18};
    line-height: 100%;
  }

  @media (max-width: 540px) {
    font-size: 1rem;
    line-height: 1rem;
  }
`
