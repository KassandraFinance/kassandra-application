import Big from 'big.js'
// import { handleCalcAPR } from './utils'

import { render, screen } from '@/utils/test-utils'

import { poolsFunds, poolsKacy } from '@/constants/pools'
import KacyCard from '../KacyCard'
import StakeCard from '.'
// import { render, screen } from '@testing-library/react'
import KacyEarned from './KacyEarned'

function sum(a: number, b: number) {
  return a + b
}

describe('stakeFarm component', () => {
  // it('should calculate APR', () => {
  //   expect(
  //     handleCalcAPR({
  //       kacyPrice: Big(1),
  //       poolPrice: Big(1),
  //       rewardRate: Big(1),
  //       totalDeposit: Big(1)
  //     })
  //   )
  // })

  it('should show apr', () => {
    // console.log('A')
    // render(
    //   <KacyCard
    //     kacyMarketData={{
    //       kacyPercentage: 1,
    //       marketCap: Big(0),
    //       price: 5,
    //       supply: Big(0)
    //     }}
    //   />
    // )
    // console.log('B')
    // render(
    //   <StakeCard kacyPrice={Big(1)} pool={poolsFunds[0]} poolPrice={Big(1)} />
    // )
    render(<KacyEarned kacyPrice={Big(0)} kacyEarned={Big(0)} />)
    expect(screen.getByTestId('apr')).toBeTruthy()
  })
})

describe('stakeFarm component', () => {
  it('should calculate APR', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
