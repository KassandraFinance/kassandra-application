import React from 'react'

import Steps from '../../../../components/Steps'
import CreatePoolHeader from '../CreatePoolHeader'
import FeeBreakdown from './FeeBreakdown'
import FeeConfig from './FeeConfig'

import * as S from './styles'

const ConfigureFee = () => {
  return (
    <S.ConfigureFee>
      <CreatePoolHeader title={`Create pool on Avalanche`} />

      <Steps
        steps={[
          {
            stepNumber: 1,
            stepeTitle: 'set details',
            state: 'PREVIOUS'
          },
          {
            stepNumber: 2,
            stepeTitle: 'select assets',
            state: 'PREVIOUS'
          },
          {
            stepNumber: 3,
            stepeTitle: 'Add Liquidity',
            state: 'PREVIOUS'
          },
          {
            stepNumber: 4,
            stepeTitle: 'Configure Fee',
            state: 'CURRENT'
          },
          {
            stepNumber: 5,
            stepeTitle: 'Review',
            state: 'NEXT'
          }
        ]}
      />

      <S.ConfigureFeeContainer>
        <FeeConfig />

        <FeeBreakdown />
      </S.ConfigureFeeContainer>
    </S.ConfigureFee>
  )
}

export default ConfigureFee
