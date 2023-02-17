import TitleSection from '../../../components/TitleSection'
import PoolAssets from './PoolAssets'

import poolsAssetsIcon from '../../../../public/assets/iconGradient/assets-distribution.svg'

import * as S from './styles'

const Analytics = () => {
  return (
    <S.Analytics>
      <S.TitleWrapper>
        <TitleSection title="Pool Assets" image={poolsAssetsIcon} />
      </S.TitleWrapper>

      <PoolAssets />
    </S.Analytics>
  )
}

export default Analytics
