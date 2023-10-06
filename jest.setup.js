import '@testing-library/jest-dom'
import {
  mockUseConnectWallet,
  mockUseSetChain,
  useConnectWalletDefault,
  useSetChainDefault
} from '@/__mocks__/web3OnboardMock'

import * as web3Onboard from '@web3-onboard/react'

jest.mock('@web3-onboard/react')

web3Onboard.useConnectWallet = mockUseConnectWallet(useConnectWalletDefault)
web3Onboard.useSetChain = mockUseSetChain(useSetChainDefault)

