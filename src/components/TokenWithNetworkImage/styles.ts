/* eslint-disable prettier/prettier */
import styled, { css } from 'styled-components'

interface IwithoutBorderProps {
  withoutBorder?: boolean;
}

// prettier-ignore
export const TokenWithNetworkImage = styled.div<IwithoutBorderProps>`
  ${({ withoutBorder }) => css`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${!withoutBorder ? '0.6rem' : '0'};

    background-color: ${!withoutBorder && '#211426'};
    border-radius: 50%;
  `}
`

// prettier-ignore
export const networkImageContainer = styled.span<IwithoutBorderProps>`
  ${({ withoutBorder }) => css`
    position: absolute;
    bottom: ${!withoutBorder ? '-0.5rem' : '-0.1rem'};
    right: ${!withoutBorder ? '-0.2rem' : '0.3rem'};

    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${!withoutBorder ? '0.3rem' : '0'};

    background-color: ${!withoutBorder && '#211426'};
    border-radius: 50%;
  `}
`
