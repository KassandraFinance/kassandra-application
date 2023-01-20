import { useAppSelector } from '../../../../store/hooks'

import Steps from '../../../../components/Steps'
import CreatePoolHeader from '../CreatePoolHeader'
import PoolDetails from './PoolDetails'
import PoolSettings from './PoolSettings'

import * as S from './styles'

const SetDetails = () => {
  const network = useAppSelector(
    state => state.poolCreation.createPoolData.network
  )

  return (
    <S.SetDetails>
      <CreatePoolHeader title={`Create pool on ${network}`} />

      <Steps
        steps={[
          {
            stepNumber: 1,
            stepeTitle: 'set details',
            state: 'CURRENT'
          },
          {
            stepNumber: 2,
            stepeTitle: 'select assets',
            state: 'NEXT'
          },
          {
            stepNumber: 3,
            stepeTitle: 'Add Liquidity',
            state: 'NEXT'
          },
          {
            stepNumber: 4,
            stepeTitle: 'Configure Fee',
            state: 'NEXT'
          },
          {
            stepNumber: 5,
            stepeTitle: 'Review',
            state: 'NEXT'
          }
        ]}
      />

      <S.PoolContainer>
        <PoolDetails />

        <PoolSettings />
      </S.PoolContainer>
    </S.SetDetails>
  )
}

export default SetDetails
