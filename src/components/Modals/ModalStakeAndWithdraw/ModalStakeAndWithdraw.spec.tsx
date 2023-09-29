import React, { useState as useStateMock } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import 'jest-styled-components'
import '@testing-library/jest-dom'
import { ReduxProvider } from '@/store/reduxContext'
import theme from '@/styles/theme'
import { ThemeProvider } from 'styled-components'
import ModalStakeAndWithdraw from '.'

import { PoolDetails, PoolType } from '@/constants/pools'
import Big from 'big.js'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn()
}))

jest.mock('@web3-onboard/react', () => {
  return {
    useConnectWallet: () => [
      {
        wallet: null
      }
    ]
  }
})

import { BNtoDecimal } from '@/utils/numerals'
jest.mock('@/utils/numerals', () => {
  return {
    BNtoDecimal: jest.fn()
  }
})

const mockModalBuyKacyOnPangolin = jest.fn()
// eslint-disable-next-line react/display-name
jest.mock('../ModalBuyKacyOnPangolin', () => (props: unknown) => {
  mockModalBuyKacyOnPangolin(props)
  return <div />
})

const mockOverlay = jest.fn()
// eslint-disable-next-line react/display-name
jest.mock('@/components/Overlay', () => (props: unknown) => {
  mockOverlay(props)
  return <div data-testid="overlay" />
})

const mockInputTokenValue = jest.fn()
// eslint-disable-next-line react/display-name
jest.mock('./InputTokenValue', () => (props: unknown) => {
  mockInputTokenValue(props)
  return <></>
})

const poolMock: PoolDetails = {
  pid: process.env.NEXT_PUBLIC_MASTER === '1' ? 2 : 0,
  symbol: 'KACY',
  type: PoolType.STAKE,
  stakingContract: '0xfddc1956d88a34fcB0671508Fa3d5aaC73b2a031',
  poolTokenAddress: '0xf32398dae246C5f672B52A54e9B413dFFcAe1A44',
  chain: {
    id: 43114,
    logo: '/assets/logos/avax.png'
  },
  properties: {
    logo: {
      src: '/assets/logos/kacy-stake.svg',
      style: { width: '5.8rem' }
    },
    link: `https://legacy.pangolin.exchange/#/swap?outputCurrency=${'0xf32398dae246C5f672B52A54e9B413dFFcAe1A44'}`
  },
  stakeWithVotingPower: true,
  stakeWithLockPeriod: false,
  address: '0xf32398dae246C5f672B52A54e9B413dFFcAe1A44'
}

describe('ModalStakeAndWithdraw', () => {
  const setModalOpenMock = jest.fn()
  const setStakeTransactionMock = jest.fn()
  const handleApproveMock = jest.fn()
  const updateAllowance = jest.fn()
  const getUserInfoAboutPool = jest.fn()

  enum typeTransaction {
    NONE,
    STAKING,
    UNSTAKING
  }

  const tokenDecimals = '18'
  const stakingToken = '0xf32398dae246C5f672B52A54e9B413dFFcAe1A44'
  const stakeWithVotingPower = true
  const productCategories = [
    'Stake',
    process.env.NEXT_PUBLIC_MASTER === '1' ? 'Avalanche' : 'Fuji',
    stakeWithVotingPower ? 'VotingStake' : 'OtherStake'
  ]

  const BNtoDecimalValue = '1 122.3'
  BNtoDecimal.mockReturnValue(BNtoDecimalValue)

  const realUseState: any = useStateMock
  const setState = jest.fn()
  beforeEach(() => {
    realUseState.mockImplementation(init => [init, setState]) //important, let u change the value of useState hook
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const setup = ({
    transactionType,
    amountAppoved = Big(0),
    pool = poolMock
  }: {
    transactionType: typeTransaction
    amountAppoved?: Big
    pool?: PoolDetails
  }) => {
    const utils = render(
      <ThemeProvider theme={theme}>
        <ReduxProvider>
          <ModalStakeAndWithdraw
            pool={pool}
            setModalOpen={setModalOpenMock}
            decimals={tokenDecimals}
            stakingToken={stakingToken}
            productCategories={productCategories}
            stakeTransaction={transactionType}
            setStakeTransaction={setStakeTransactionMock}
            amountApproved={amountAppoved}
            handleApprove={handleApproveMock}
            updateAllowance={updateAllowance}
            getUserInfoAboutPool={getUserInfoAboutPool}
          />
        </ReduxProvider>
      </ThemeProvider>
    )

    const title = screen.getByTestId('title')
    const closeButton = screen.getByLabelText('close')
    const tokenInput = screen.getByTestId('token-input')
    const balance = screen.getByRole('heading')
    // const getButton = screen.getByText(`Get ${pool.symbol}`)

    return {
      title,
      closeButton,
      tokenInput,
      balance,
      // aproveButton,
      ...utils
    }
  }

  it('should display Transaction not defined', () => {
    const { title } = setup({ transactionType: typeTransaction.NONE })
    expect(title.textContent).toBe('Transaction not defined')
  })

  it('should display Transaction not defined', () => {
    const { title } = setup({ transactionType: typeTransaction.STAKING })
    expect(title.textContent).toBe('Stake in Pool')
  })

  it('should display Transaction not defined', () => {
    const { title } = setup({ transactionType: typeTransaction.UNSTAKING })
    expect(title.textContent).toBe('Withdraw')
  })

  it('should set the state with the correct value', () => {
    const { closeButton } = setup({
      transactionType: typeTransaction.UNSTAKING
    })
    fireEvent.click(closeButton)
    expect(setModalOpenMock).toBeCalledWith(false)
    expect(setStakeTransactionMock).toBeCalledWith(typeTransaction.NONE)
  })

  it('should display the corect token symbol', () => {
    const { tokenInput } = setup({ transactionType: typeTransaction.STAKING })
    expect(tokenInput.textContent).toBe(`$${poolMock.symbol} Total`)
  })

  it('should display balance', () => {
    const { balance } = setup({ transactionType: typeTransaction.STAKING })
    expect(balance.textContent).toBe(`Balance: ${BNtoDecimalValue}`)
  })

  it('should render percentage buttons', () => {
    setup({
      transactionType: typeTransaction.STAKING
    })
    expect(screen.queryByText('25%')).toBeInTheDocument()
    expect(screen.queryByText('50%')).toBeInTheDocument()
    expect(screen.queryByText('75%')).toBeInTheDocument()
    expect(screen.queryByText('100%')).toBeInTheDocument()
  })

  it('should render Approve Contract button and not render Confirm button', () => {
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => [false, () => null]) // this is first useState in the component
      .mockImplementationOnce(() => [Big(0), () => null]) // this is second useState in the component
      .mockImplementationOnce(() => [0, () => null]) // this is third useState in the component
      .mockImplementationOnce(() => [Big(2), () => null]) // this is fourth useState in the component
      .mockImplementationOnce(() => [false, () => null]) // this is fifth useState in the component

    setup({
      transactionType: typeTransaction.STAKING,
      amountAppoved: Big(1)
    })
    expect(screen.queryByText('Approve Contract')).toBeInTheDocument()
    expect(screen.queryByText('Confirm')).not.toBeInTheDocument()
  })

  it('should not render Approve Contract button and render Confirm button', () => {
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => [false, () => null]) // this is first useState in the component
      .mockImplementationOnce(() => [Big(0), () => null]) // this is second useState in the component
      .mockImplementationOnce(() => [0, () => null]) // this is third useState in the component
      .mockImplementationOnce(() => [Big(0), () => null]) // this is fourth useState in the component
      .mockImplementationOnce(() => [false, () => null]) // this is fifth useState in the component

    setup({
      transactionType: typeTransaction.STAKING,
      amountAppoved: Big(1)
    })
    expect(screen.queryByText('Approve Contract')).not.toBeInTheDocument()
    expect(screen.queryByText('Confirm')).toBeInTheDocument()
  })

  it('should not render Approve Contract button and render Confirm button', () => {
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => [false, () => null]) // this is first useState in the component
      .mockImplementationOnce(() => [Big(0), () => null]) // this is second useState in the component
      .mockImplementationOnce(() => [0, () => null]) // this is third useState in the component
      .mockImplementationOnce(() => [Big(1), () => null]) // this is fourth useState in the component
      .mockImplementationOnce(() => [false, () => null]) // this is fifth useState in the component

    setup({
      transactionType: typeTransaction.STAKING,
      amountAppoved: Big(1)
    })
    expect(screen.queryByText('Approve Contract')).not.toBeInTheDocument()
    expect(screen.queryByText('Confirm')).toBeInTheDocument()
  })

  it('should not render Buy button and render Get button', () => {
    setup({
      transactionType: typeTransaction.STAKING,
      pool: {
        ...poolMock,
        type: PoolType.LP
      }
    })
    expect(screen.queryByText(`Buy ${poolMock.symbol}`)).not.toBeInTheDocument()
    expect(screen.queryByText(`Get ${poolMock.symbol}`)).toBeInTheDocument()
  })

  it('should not render Buy button and render Get button', () => {
    setup({
      transactionType: typeTransaction.STAKING,
      pool: {
        ...poolMock,
        type: PoolType.FARM
      }
    })
    expect(screen.queryByText(`Buy ${poolMock.symbol}`)).not.toBeInTheDocument()
    expect(screen.queryByText(`Get ${poolMock.symbol}`)).toBeInTheDocument()
  })

  it('should render Buy button and not render Get button', () => {
    setup({
      transactionType: typeTransaction.STAKING
    })
    expect(screen.queryByText(`Buy ${poolMock.symbol}`)).toBeInTheDocument()
    expect(screen.queryByText(`Get ${poolMock.symbol}`)).not.toBeInTheDocument()
  })

  it('should call Get button function with correct values', () => {
    setup({
      transactionType: typeTransaction.STAKING,
      pool: {
        ...poolMock,
        type: PoolType.LP
      }
    })
    fireEvent.click(screen.getByText(`Get ${poolMock.symbol}`))
    expect(setStakeTransactionMock).toHaveBeenCalledWith(typeTransaction.NONE)
    expect(setModalOpenMock).toBeCalledWith(false)
  })

  it('should call Buy button function with correct values', () => {
    const setIsOpenModalPangolin = jest.fn()
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => [false, () => null]) // this is first useState in the component
      .mockImplementationOnce(() => [Big(0), () => null]) // this is second useState in the component
      .mockImplementationOnce(() => [0, () => null]) // this is third useState in the component
      .mockImplementationOnce(() => [Big(1), () => null]) // this is fourth useState in the component
      .mockImplementationOnce(() => [false, setIsOpenModalPangolin]) // this is fifth

    setup({
      transactionType: typeTransaction.STAKING
    })
    fireEvent.click(screen.getByText(`Buy ${poolMock.symbol}`))
    expect(setIsOpenModalPangolin).toHaveBeenCalledWith(true)
  })

  it('should not call handleApprove function', () => {
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => [false, () => null]) // this is first useState in the component
      .mockImplementationOnce(() => [Big(0), () => null]) // this is second useState in the component
      .mockImplementationOnce(() => [0, () => null]) // this is third useState in the component
      .mockImplementationOnce(() => [Big(2), () => null]) // this is fourth useState in the component
      .mockImplementationOnce(() => [false, () => null]) // this is fifth useState in the component

    setup({
      transactionType: typeTransaction.STAKING,
      amountAppoved: Big(1)
    })
    fireEvent.click(screen.getByText('Approve Contract'))
    expect(handleApproveMock).not.toHaveBeenCalled()
  })

  it('should call handleApprove function', () => {
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => [false, () => null]) // this is first useState in the component
      .mockImplementationOnce(() => [Big(2), () => null]) // this is second useState in the component
      .mockImplementationOnce(() => [0, () => null]) // this is third useState in the component
      .mockImplementationOnce(() => [Big(2), () => null]) // this is fourth useState in the component
      .mockImplementationOnce(() => [false, () => null]) // this is fifth useState in the component

    setup({
      transactionType: typeTransaction.STAKING,
      amountAppoved: Big(1)
    })
    fireEvent.click(screen.getByText('Approve Contract'))
    expect(handleApproveMock).toHaveBeenCalledTimes(1)
  })

  it('should call handleApprove function', () => {
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => [false, () => null]) // this is first useState in the component
      .mockImplementationOnce(() => [Big(3), () => null]) // this is second useState in the component
      .mockImplementationOnce(() => [0, () => null]) // this is third useState in the component
      .mockImplementationOnce(() => [Big(2), () => null]) // this is fourth useState in the component
      .mockImplementationOnce(() => [false, () => null]) // this is fifth useState in the component

    setup({
      transactionType: typeTransaction.STAKING,
      amountAppoved: Big(1)
    })
    fireEvent.click(screen.getByText('Approve Contract'))
    expect(handleApproveMock).toHaveBeenCalledTimes(1)
  })

  test('If isOpenModalPangolin is set to false the ModalBuyKacyOnPangolin is not rendered', () => {
    setup({
      transactionType: typeTransaction.STAKING
    })

    expect(mockModalBuyKacyOnPangolin).not.toHaveBeenCalled()
  })

  test('If isOpenModalPangolin is set to true the ModalBuyKacyOnPangolin is rendered', () => {
    const setModalOpenMock = jest.fn()
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => [false, () => null]) // this is first useState in the component
      .mockImplementationOnce(() => [Big(3), () => null]) // this is second useState in the component
      .mockImplementationOnce(() => [0, () => null]) // this is third useState in the component
      .mockImplementationOnce(() => [Big(2), () => null]) // this is fourth useState in the component
      .mockImplementationOnce(() => [true, setModalOpenMock]) // this is fifth useState in the component

    setup({
      transactionType: typeTransaction.STAKING
    })

    expect(mockModalBuyKacyOnPangolin).toHaveBeenCalledWith({
      modalOpen: true,
      setModalOpen: setModalOpenMock
    })
  })

  test('If InputTokenValue is called with decimals, setInputValue and inputRef', () => {
    const ref = React.createRef()
    const setAmountStake = jest.fn()
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => [false, () => null]) // this is first useState in the component
      .mockImplementationOnce(() => [Big(3), () => null]) // this is second useState in the component
      .mockImplementationOnce(() => [0, () => null]) // this is third useState in the component
      .mockImplementationOnce(() => [Big(2), setAmountStake]) // this is fourth useState in the component
      .mockImplementationOnce(() => [true, () => null]) // this is fifth useState in the component

    setup({
      transactionType: typeTransaction.STAKING
    })

    expect(mockInputTokenValue).toHaveBeenCalledWith(
      expect.objectContaining({
        decimals: Big('18'),
        setInputValue: setAmountStake,
        inputRef: ref
      })
    )
  })

  test('If Overlay is rendered', () => {
    setup({
      transactionType: typeTransaction.STAKING
    })

    expect(screen.getByTestId('overlay')).toBeInTheDocument()
  })
})
