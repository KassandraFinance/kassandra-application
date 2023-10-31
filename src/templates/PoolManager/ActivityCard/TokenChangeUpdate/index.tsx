import WeightChangeAssetList from '../WeightChangeAssetList'

import * as S from './styles'

interface ITokenChangeUpdateProps {
  title: string
  assetChange?: {
    logo: string
    newWeight: string
    weight: string
  }
  assetInfoList: any
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
          <img src={assetChange?.logo ?? ''} alt="" width={32} height={32} />

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
