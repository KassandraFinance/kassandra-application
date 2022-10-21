import styled, { css } from 'styled-components'

interface INftImageProps {
  imageSize: 'medium' | 'large' | 'small' | 'smallest';
}

const imageSizes = {
  medium: () => css`
    display: flex;
    flex-direction: column;
    min-height: 9rem;
    min-width: 9rem;
    cursor: pointer;

    img {
      object-fit: cover;
      background-color: #c4c4c410;
      min-height: 9.6rem;
      min-width: 9.6rem;
      clip-path: url(#nftImageMedium);
    }

    svg {
      position: absolute;
    }
  `,

  large: () => css`
    display: flex;
    flex-direction: column;

    max-height: 13rem;
    max-width: 13rem;

    img {
      object-fit: cover;
      background-color: #c4c4c410;
      clip-path: url(#nftImageLarge);
    }
  `,

  small: () => css`
    display: flex;
    flex-direction: column;

    img {
      position: absolute;
      object-fit: cover;

      background-color: #c4c4c410;
      clip-path: url(#nftImageSmall);
    }

    svg {
      position: relative;
    }
  `,
  smallest: () => css`
    display: flex;
    flex-direction: column;

    /* height: 1.6rem;
    width: 1.6rem; */

    img {
      position: absolute;
      object-fit: cover;

      background-color: #c4c4c410;
      clip-path: url(#nftImageSmallest);
    }

    svg {
      position: relative;
    }
  `
}
// eslint-disable-next-line prettier/prettier
export const NftImageContainer =
  styled.div <
  INftImageProps >
  `
 ${({ imageSize }) =>
   css`
     ${!!imageSize && imageSizes[imageSize]};
   `}
`
