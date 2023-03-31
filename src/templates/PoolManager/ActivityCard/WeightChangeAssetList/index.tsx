import React from 'react'

import ExternalLink from '@/components/ExternalLink'
import ModalWithMobile from '@/components/Modals/ModalWithMobile'
import Overlay from '@/components/Overlay'

import * as S from './styles'

export type AssetInfoList = {
  symbol: string,
  logo: string,
  weight?: string,
  newWeight?: string
}

interface IWeightChangeAssetListProps {
  assetInfoList: AssetInfoList[];
  take?: number;
}

const WeightChangeAssetList = ({
  assetInfoList,
  take = 10
}: IWeightChangeAssetListProps) => {
  const [isOpenModal, setisOpenModal] = React.useState(false)

  const WeightsList = (allWeightsList: AssetInfoList[]) => {
    return (
      <>
        {allWeightsList.map((item, index) => {
          return (
            <S.AssetContent key={item.symbol + index}>
              <S.AssetInfo>
                <img src={item.logo} alt="" width={16} height={16} />
                <p>{item.symbol}</p>
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
      </>
    )
  }

  return (
    <S.WeightChangeAssetList>
      <p>Assets</p>

      <S.AssetList>{WeightsList(assetInfoList.slice(0, take))}</S.AssetList>

      {assetInfoList.length >= take && (
        <S.WrapperCheckAllWeights>
          <ExternalLink
            text="Check all Weight Changes"
            onClick={() => setisOpenModal(true)}
          />
        </S.WrapperCheckAllWeights>
      )}

      {isOpenModal && (
        <>
          <Overlay onClick={() => setisOpenModal(false)} isOpen={isOpenModal} />

          <ModalWithMobile
            title="Weight Changes"
            onCloseModal={() => setisOpenModal(false)}
          >
            <S.AssetListMobile>{WeightsList(assetInfoList)}</S.AssetListMobile>
          </ModalWithMobile>
        </>
      )}
    </S.WeightChangeAssetList>
  )
}

export default WeightChangeAssetList
