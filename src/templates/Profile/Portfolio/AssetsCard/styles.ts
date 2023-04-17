import styled from 'styled-components'
import theme from '../../../../styles/theme'

interface IAssetsContainerProps {
  isThreeCards: boolean;
}
// eslint-disable-next-line prettier/prettier
export const AssetsContainer =
  styled.div <
  IAssetsContainerProps >
  `
  display: flex;
  flex-wrap: wrap;
  justify-content: ${props =>
    props.isThreeCards ? 'space-between' : 'space-around'};

  @media (max-width: 640px) {
    justify-content: center;
  }
`

export const AssetsHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 29.6rem;
  margin-bottom: 3rem;
  border-radius: 8px;

  box-shadow: -1px 2px 24px 4px rgb(0 0 0 / 0.2);

  > span {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 29rem;
    height: 10rem;
    border-top-left-radius: 1.2rem;
    border-top-right-radius: 1.2rem;

    background-color: rgb(0 0 0 / 0.25);
  }
`

export const AssetsBodyContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  padding: 2.4rem 0;
  border-bottom-right-radius: 1.2rem;
  border-bottom-left-radius: 1.2rem;

  color: #fff;
  font-weight: ${theme.font.weight.normal};
  font-size: ${theme.font.sizes.font12};
  letter-spacing: 3px;

  background-color: #ffffff0a;
`

export const Tooltip = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  margin-bottom: 0.1rem;
`

export const Balance = styled.span`
  display: flex;
`

export const AssetsValue = styled.span`
  padding: 0.8rem 1rem 0.4rem;

  font-weight: ${theme.font.weight.medium};
  font-size: ${theme.font.sizes.font24};
  letter-spacing: normal;

  strong {
    margin-left: 0.4rem;

    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font14};
    letter-spacing: 1.5px;
  }
`

export const AssetsValueDollar = styled.p`
  color: #d3d3d3;
  font-weight: ${theme.font.weight.normal};
  font-size: ${theme.font.sizes.font14};
  letter-spacing: normal;
`

export const LineSeperator = styled.span`
  width: 4.8rem;
  height: 0.1rem;
  margin: 1.6rem 0;

  background-color: #ffffff4d;
`

export const AssetsName = styled.p`
  margin-bottom: 0.4rem;

  font-weight: ${theme.font.weight.medium};
  font-size: ${theme.font.sizes.font20};
  letter-spacing: 1.5px;
`

export const AssetsSob = styled.p`
  color: #c4c4c4;
  font-weight: ${theme.font.weight.normal};
  font-size: ${theme.font.sizes.font12};
  letter-spacing: normal;
  text-transform: uppercase;
`
