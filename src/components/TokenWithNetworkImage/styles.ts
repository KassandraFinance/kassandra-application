/* eslint-disable prettier/prettier */
import styled, { css } from 'styled-components'

interface IwithoutBorderProps {
  withoutBorder?: boolean;
  isRound?: boolean;
}

// prettier-ignore
export const TokenWithNetworkImage = styled.div<IwithoutBorderProps>`
  ${({ withoutBorder, isRound = true }) => css`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: ${!withoutBorder ? '0.6rem' : '0'};
    border-radius: 50%;

    background-color: ${!withoutBorder && '#211426'};

    .poolIcon {
      border-radius: 50%;
    }

    img {
      overflow: hidden;

      border-radius: ${isRound ? "50%" : ''};
    }
  `}
`

// prettier-ignore
export const networkImageContainer = styled.span<IwithoutBorderProps>`
  ${({ withoutBorder }) => css`
    position: absolute;
    right: ${!withoutBorder ? '-0.2rem' : '0.3rem'};
    bottom: ${!withoutBorder ? '-0.5rem' : '-0.1rem'};

    display: flex;
    justify-content: center;
    align-items: center;

    padding: ${!withoutBorder ? '0.3rem' : '0'};
    border-radius: 50%;

    background-color: ${!withoutBorder && '#211426'};

    > img {
      z-index: 10;
    }
  `}
`
