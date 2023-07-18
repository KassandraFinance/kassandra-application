import { CoinsMetadataType } from '@/hooks/query/useTokensData'

import { BalancesType } from '..'
import SelectAddLiquidityAsset from './SelectAddLiquidityAsset'
import AddLiquidityAnyAsset from './AddLiquidityAnyAsset'

import { useAppSelector } from '@/store/hooks'

import * as S from './styles'

type AddLiquidityAssetProps = {
  tokensList: CoinsMetadataType
  tokensBalance: BalancesType
  priceToken: (address: string) => string
}

const AddLiquidityAsset = ({
  tokensList,
  tokensBalance,
  priceToken
}: AddLiquidityAssetProps) => {
  const { tokenSelectionActive } = useAppSelector(state => state)

  return (
    <S.AddLiquidityAsset>
      {tokenSelectionActive ? (
        <SelectAddLiquidityAsset
          tokensList={tokensList}
          tokensBalance={tokensBalance}
        />
      ) : (
        <AddLiquidityAnyAsset priceToken={priceToken} />
      )}
    </S.AddLiquidityAsset>
  )
}

export default AddLiquidityAsset
