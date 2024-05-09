import styled, { css } from 'styled-components'
import theme from '../../../styles/theme'
import { CardContainer } from '@/components/FundCardNew/styles'

export const SliderPoolList = styled.div`
  ${() => css`
    position: relative;

    .slick-list {
      padding: 1.6rem;

      @media (max-width: 768px) {
        padding-block: 1.6rem;
        padding-left: 0.8rem;
      }
    }

    .slick-slide.slick-active.slick-current {
      ${CardContainer} {
        margin: 0 auto;
      }

      @media (min-width: 1024px) {
        display: flex;
      }
    }

    .slick-arrow {
      width: 5.4rem;
      height: 5.4rem;
      z-index: 10;
    }

    .slick-arrow.slick-prev {
      &::before {
        content: '';

        position: absolute;
        top: 0;
        left: 0.6rem;

        width: 5.4rem;
        height: 5.4rem;

        background-image: url('/assets/utilities/arrow-left-bold.svg');
        background-repeat: no-repeat;
        background-position: center;
        backdrop-filter: blur(10px);
        box-shadow: -2px -1px 70px 10px rgba(0, 0, 0, 0.43);
        border-radius: 50%;
        background-color: rgba(252, 252, 252, 0.05);

        border: 1px solid transparent;

        transition-duration: 300ms;
        transition-timing-function: ease-in-out;
        transition-property: border;

        &:hover {
          border: 1px solid rgba(252, 252, 252, 0.07);
        }
      }
    }

    .slick-arrow.slick-next {
      &::before {
        content: '';

        position: absolute;
        top: 0;
        right: 0.6rem;

        width: 5.4rem;
        height: 5.4rem;

        background-image: url('/assets/utilities/arrow-right-bold.svg');
        background-repeat: no-repeat;
        background-position: center;
        backdrop-filter: blur(4px);
        box-shadow: -2px -1px 70px 10px rgba(0, 0, 0, 0.43);
        border-radius: 50%;
        background-color: rgba(252, 252, 252, 0.05);

        border: 1px solid transparent;

        transition-duration: 300ms;
        transition-timing-function: ease-in-out;
        transition-property: border;

        &:hover {
          border: 1px solid rgba(252, 252, 252, 0.07);
        }
      }
    }

    .slick-arrow.slick-next.slick-prev.slick-disabled {
      opacity: 0;
    }

    .slick-dots {
      margin-top: -2rem;

      button {
        width: 1rem;
        height: 1rem;

        background-color: ${theme.colors.snow};
        border-radius: 1rem;

        transition-duration: 300ms;
        transition-timing-function: ease-in-out;
        transition-property: width background-color color;

        &:hover {
          background-color: ${theme.colors.amber};
        }

        &::before {
          content: '';
        }
      }

      .slick-active {
        margin-right: 0.8rem;

        button {
          width: 2rem;
          height: 1rem;

          background-color: ${theme.colors.amber};
          border-radius: 1rem;
        }
      }
    }
  `}
`
