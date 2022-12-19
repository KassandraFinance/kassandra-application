import React from 'react'

import Steps from '../../../../components/Steps'
import CreatePoolHeader from '../CreatePoolHeader'
import FeeBreakdown from './FeeBreakdown'
import FeeConfig from './FeeConfig'

import * as S from './styles'

export type IIsActiveTogglesProps = {
  depositFee: boolean,
  managementFee: boolean,
  refferalCommission: boolean
}
export type IDepositAndManagementFeesProps = {
  rate: number,
  address: string
}
export type IRefferalCommissionProps = {
  broker: number,
  share: number
}

const ConfigureFee = () => {
  // eslint-disable-next-line prettier/prettier
  const [isActiveToggles, setisActiveToggles] = React.useState<IIsActiveTogglesProps>({
      depositFee: false,
      managementFee: false,
      refferalCommission: false
    })
  const [depositFee, setDepositFee] =
    React.useState<IDepositAndManagementFeesProps>({
      rate: 0,
      address: ''
    })
  const [refferalCommission, setRefferalCommission] =
    React.useState<IRefferalCommissionProps>({
      broker: 0,
      share: 0
    })
  const [managementFee, setManagementFee] =
    React.useState<IDepositAndManagementFeesProps>({
      rate: 0,
      address: ''
    })

  return (
    <S.ConfigureFee>
      <CreatePoolHeader title={`Create pool on Avalanche`} />

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
            state: 'CURRENT'
          },
          {
            stepNumber: 3,
            stepeTitle: 'Add Liquidity',
            state: 'CURRENT'
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
        <FeeConfig
          isActiveToggles={isActiveToggles}
          setisActiveToggles={setisActiveToggles}
          depositFee={depositFee}
          setDepositFee={setDepositFee}
          managementFee={managementFee}
          setManagementFee={setManagementFee}
          refferalCommission={refferalCommission}
          setRefferalCommission={setRefferalCommission}
        />
        <FeeBreakdown
          isActiveToggles={isActiveToggles}
          depositFee={depositFee}
          managementFee={managementFee}
          refferalCommission={refferalCommission}
        />
      </S.ConfigureFeeContainer>
    </S.ConfigureFee>
  )
}

export default ConfigureFee
