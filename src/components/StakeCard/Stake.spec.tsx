import React from 'react'
import Big from 'big.js'
import * as web3Onboard from '@web3-onboard/react'

import { poolsFunds } from '@/constants/pools'

import { handleCalcAPR } from './utils'
import { render, screen, waitFor } from '@/utils/test-utils'

import StakeCard from '.'
import { mockUseConnectWallet } from '@/__mocks__/web3OnboardMock'

describe.skip('should StakeFarm component', () => {
  it('calculates the APR correctly', () => {
    const data = {
      kacyPrice: Big('0.05'),
      poolPrice: Big('8.36'),
      rewardRate: Big('388888888888888876800'),
      totalDeposit: Big('1372541966384482762331')
    }

    const expectedResult = Big('62')
    const result = handleCalcAPR(data)

    expect(result).toEqual(expectedResult)
  })

  it('handles edge cases correctly', () => {
    const data = {
      kacyPrice: Big('0'),
      poolPrice: Big('0'),
      rewardRate: Big('388888888888888876800'),
      totalDeposit: Big('1372541966384482762331')
    }
    const result = handleCalcAPR(data)
    expect(result).toEqual(Big(0))
  })

  it('should re-render component when state is updated', () => {
    render(
      <StakeCard kacyPrice={Big(1)} pool={poolsFunds[0]} poolPrice={Big(1)} />
    )

    expect(screen.getByTestId('loading')).toBeVisible()

    waitFor(() => {
      expect(screen.getByTestId('apr')).toBeVisible()
    })
  })
})

describe('Wallet Status Testing', () => {
  it('should be disconnected', () => {
    render(
      <StakeCard kacyPrice={Big(1)} pool={poolsFunds[0]} poolPrice={Big(1)} />
    )

    expect(screen.getByTestId('not-connected')).toBeTruthy()
  })

  it('should be connected', () => {
    const mockWeb3Onboard = web3Onboard as jest.Mocked<typeof web3Onboard>
    mockWeb3Onboard.useConnectWallet = mockUseConnectWallet()

    const { getByTestId } = render(
      <StakeCard kacyPrice={Big(1)} pool={poolsFunds[0]} poolPrice={Big(1)} />
    )
    expect(getByTestId('connected')).toBeTruthy()
  })
})
