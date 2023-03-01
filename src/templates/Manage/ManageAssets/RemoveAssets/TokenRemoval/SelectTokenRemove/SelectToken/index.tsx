import React from 'react'

import * as S from './styles'

type ITokenSelectedProps = {
  logo: string,
  name: string,
  symbol: string
}

interface ISelectTokenProps {
  tokensList: ITokenSelectedProps;
}

const SelectToken = () => {
  const [selectToken, setSelectToken] = React.useState<ITokenSelectedProps>()
  const [IsOpenTokenList, setIsOpenTokenList] = React.useState(false)

  return (
    <S.SelectToken>
      <S.SelectedTokenContent
        onClick={() => setIsOpenTokenList(!IsOpenTokenList)}
      >
        <S.TokenInfoContent>
          {selectToken ? (
            <>
              <img src={selectToken.logo} alt="" width={20} height={20} />
              <p>{selectToken.symbol}</p>
            </>
          ) : (
            <p>Choose asset</p>
          )}
        </S.TokenInfoContent>
        <S.ArrowContent isOpen={IsOpenTokenList}>
          <img
            src="/assets/utilities/arrow-select-down.svg"
            alt=""
            width={14}
            height={14}
          />
        </S.ArrowContent>
      </S.SelectedTokenContent>
      <S.SelectTokenContainer
        isOpen={IsOpenTokenList}
        itemHeight={mockCoinsList.length * 63.3}
      >
        {mockCoinsList.map((token, index) => {
          return (
            <S.SelectTokenContent
              key={token.symbol + index}
              onClick={() => {
                setSelectToken({
                  logo: token.logo,
                  name: token.name,
                  symbol: token.symbol
                })
                setIsOpenTokenList(!IsOpenTokenList)
              }}
            >
              <S.TokenInfoContent>
                <img src={token.logo} alt="" width={20} height={20} />
                <p>{token.symbol}</p>
              </S.TokenInfoContent>
              <S.BalanaceInfoContent>
                <p>$200,00</p>
                <span>0.0001</span>
              </S.BalanaceInfoContent>
            </S.SelectTokenContent>
          )
        })}
      </S.SelectTokenContainer>
    </S.SelectToken>
  )
}

export default SelectToken

export const mockCoinsList = [
  {
    logo: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912',
    name: 'Polygon ',
    link: '',
    symbol: 'MATIC',
    currentWeight: 20,
    NewWeight: 20
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png?1547034700',
    name: 'Chainlink',
    link: '',
    symbol: 'LINK',
    currentWeight: 60,
    NewWeight: 60
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png?1600306604',
    name: 'Uniswap',
    link: '',
    symbol: 'UNI',
    currentWeight: 20,
    NewWeight: 20
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/22918/small/kacy.png?1643459818',
    name: 'Kassandra',
    link: '',
    symbol: 'KACY',
    currentWeight: 70,
    NewWeight: 70
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png?1600306604',
    name: 'Uniswap',
    link: '',
    symbol: 'UNI',
    currentWeight: 20,
    NewWeight: 20
  }
]
