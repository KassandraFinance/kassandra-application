import CoinCard from '../CoinCard'

import * as S from './styles'

const mockTokens = [
  {
    image:
      'https://tokens.1inch.io/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png',
    name: 'bitcoin',
    symbol: 'btc'
  },
  {
    image:
      'https://tokens.1inch.io/0x60781c2586d68229fde47564546784ab3faca982.png',
    name: 'pangolin',
    symbol: 'png'
  }
]

const PoolAssets = () => {
  return (
    <S.PoolAssets>
      <S.CoinCardContainer>
        {mockTokens.map(token => (
          <CoinCard
            key={token.name}
            image={token.image}
            name={token.name}
            symbol={token.symbol}
          />
        ))}
      </S.CoinCardContainer>
    </S.PoolAssets>
  )
}

export default PoolAssets
