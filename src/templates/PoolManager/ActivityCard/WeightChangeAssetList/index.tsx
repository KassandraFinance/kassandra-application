import ExternalLink from '@/components/ExternalLink'

import * as S from './styles'

export type AssetInfoList = {
  symbol: string,
  imageUrl: string,
  weight: number,
  newWeight: number
}

interface IWeightChangeAssetListProps {
  AssetInfoList: AssetInfoList[];
  link: string;
}

const WeightChangeAssetList = ({
  AssetInfoList,
  link
}: IWeightChangeAssetListProps) => {
  return (
    <S.WeightChangeAssetList>
      <p>Assets</p>

      <S.AssetList>
        {AssetInfoList.map(item => {
          return (
            <S.AssetContent key={item.symbol}>
              <S.AssetInfo>
                <img src={item.imageUrl} alt="" width={16} height={16} />
                <p>WBTC</p>
              </S.AssetInfo>
              <S.WeightsValues>
                <span>{item.weight}%</span>
                <img
                  src="/assets/utilities/arrow-right.svg"
                  alt=""
                  width={14}
                />
                <span>{item.newWeight}%</span>
              </S.WeightsValues>
            </S.AssetContent>
          )
        })}
      </S.AssetList>
      <S.WrapperExternalLink>
        <ExternalLink text="Check all Weight Changes" hrefLink={link} />
      </S.WrapperExternalLink>
    </S.WeightChangeAssetList>
  )
}

export default WeightChangeAssetList
