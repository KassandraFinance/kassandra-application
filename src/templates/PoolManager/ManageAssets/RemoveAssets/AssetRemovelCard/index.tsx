import React from 'react'
import Button from '../../../../../components/Button'

import * as S from './styles'

// interface IAssetRemovelCardProps {
//   test: string;
// }

const AssetRemovelCard = () => {
  return (
    <S.AssetRemovelCard>
      <img
        src="/assets/iconGradient/remove.svg"
        alt=""
        width={70}
        height={70}
      />
      <h2>Asset removel has been approved</h2>

      <S.RemovalInformation>
        <p>Asset removed</p>

        <S.SymbolAndImgWrapper>
          <p>wBTC</p>
          <img src="" alt="" width={20} height={20} />
        </S.SymbolAndImgWrapper>
      </S.RemovalInformation>

      <S.LpSendWrapper>
        <p>LP Sent</p>

        <S.LpSendValueWrapper>
          <S.LpSendValue>
            <p>500</p>
            <span>~$500.00</span>
          </S.LpSendValue>
          <img src="" alt="" width={20} height={20} />
        </S.LpSendValueWrapper>
      </S.LpSendWrapper>

      <Button text="Done" backgroundPrimary fullWidth type="button" />
    </S.AssetRemovelCard>
  )
}

export default AssetRemovelCard
