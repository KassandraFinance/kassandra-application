import { usePoolAssets } from '@/hooks/query/usePoolAssets'
import { useTokensData } from '@/hooks/query/useTokensData'

import CoinCard from '@/templates/PoolManager/Analytics/CoinCard'
import { mockTokens } from '@/constants/tokenAddresses'
import Loading from '@/components/Loading'

import * as S from './styles'

interface IPoolAssetsProps {
  poolId: string
  chainId: number
}

const PoolAssets = (props: IPoolAssetsProps) => {
  const { data: poolAssets } = usePoolAssets({ id: props.poolId })

  let addresses
  if (props.chainId === 5) {
    addresses = poolAssets?.map(asset =>
      mockTokens[asset.token.id].toLocaleLowerCase()
    )
  } else {
    addresses = poolAssets?.map(asset => asset.token.id.toLowerCase())
  }

  const { data: data } = useTokensData({
    chainId: props.chainId,
    tokenAddresses: addresses || []
  })

  return (
    <S.PoolAssets>
      {data ? (
        <S.CoinCardContainer>
          {Object.values(data).map(token => (
            <CoinCard
              key={token.heimdallId}
              image={token.logo ?? ''}
              name={token.name}
              symbol={token.symbol}
              sparkLine={token.sparklineFrom7d?.map(line => ({
                close: line.toString()
              }))}
              priceChangeIn7d={Number(token.pricePercentageChangeIn7d)?.toFixed(
                4
              )}
              marketCap={Number(token.marketCap)}
              price={token.usd}
              period={{ time: 7, frame: 'days', abvFrame: 'D' }}
            />
          ))}
        </S.CoinCardContainer>
      ) : (
        <Loading marginTop={0} />
      )}
    </S.PoolAssets>
  )
}

export default PoolAssets
