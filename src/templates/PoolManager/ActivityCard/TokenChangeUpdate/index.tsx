import Tippy from '@tippyjs/react'
import WeightChangeAssetList from '../WeightChangeAssetList'

import * as S from './styles'

export type AssetInfoList = {
  symbol: string
  logo: string
  weight?: string
  newWeight?: string
}

interface ITokenChangeUpdateProps {
  title: string
  assetChange?: {
    logo: string
    symbol: string
    newWeight: string
    weight: string
  }
  assetInfoList: AssetInfoList[]
}

const TokenChangeUpdate = ({
  title,
  assetChange,
  assetInfoList
}: ITokenChangeUpdateProps) => {
  return (
    <S.TokenChangeUpdate>
      <S.TokenChangeUpdateContent>
        <p>{title}</p>
        <S.TokenInfoContainer>
          <Tippy content={assetChange?.symbol ?? ''}>
            <img
              src={assetChange?.logo ?? ''}
              alt={`${assetChange?.symbol} logo`}
              width={32}
              height={32}
            />
          </Tippy>

          <S.WeightsWrapper>
            <p>{assetChange?.weight ?? ''}%</p>
            <img src="/assets/utilities/arrow-right.svg" alt="" width={18} />
            <p>{assetChange?.newWeight ?? ''}%</p>
          </S.WeightsWrapper>
        </S.TokenInfoContainer>
      </S.TokenChangeUpdateContent>

      <WeightChangeAssetList assetInfoList={assetInfoList ?? []} take={4} />
    </S.TokenChangeUpdate>
  )
}

export default TokenChangeUpdate
