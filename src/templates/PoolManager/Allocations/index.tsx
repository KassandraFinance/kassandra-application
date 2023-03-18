import { getWeightsNormalizedV2 } from '@/utils/updateAssetsToV2'
import { underlyingAssetsInfo, WeightsV2 } from '@/store/reducers/pool'

import PieChart from './PieChart'
import * as S from './styles'

interface IAllocationsProps {
  weightGoals: WeightsV2[];
  underlyingAssets: underlyingAssetsInfo[];
}

const Allocations = (props: IAllocationsProps) => {
  const assets = getWeightsNormalizedV2(
    props.weightGoals,
    props.underlyingAssets
  )
  return (
    <S.Allocations>
      <S.Intro>
        <S.GridChart>
          <PieChart assets={assets} />
        </S.GridChart>
        <S.GridRebalancing>asdasd</S.GridRebalancing>
      </S.Intro>
    </S.Allocations>
  )
}

export default Allocations
