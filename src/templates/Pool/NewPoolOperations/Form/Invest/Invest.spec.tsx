// import { render, screen } from '@/utils/test-utils'
// import { mock } from 'jest-mock-extended'
import { render } from '@testing-library/react'
import 'jest-styled-components'
import { Wallet } from 'ethers'
import { ReduxProvider } from '@/store/reduxContext'
import theme from '@/styles/theme'
import { ThemeProvider } from 'styled-components'

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => {
    return 'Next image stub' // whatever
  }
}))

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))
import { useRouter } from 'next/router'

jest.mock('../../../../../components/Toastify/toast')
import { ToastWarning } from '../../../../../components/Toastify/toast'

jest.mock('@/hooks/query/usePoolData', () => {
  return {
    usePoolData: () => {
      return {
        data: {}
      }
    }
  }
})
import { usePoolData } from '@/hooks/query/usePoolData'

jest.mock('@/hooks/query/usePoolInfo', () => {
  return {
    usePoolInfo: () => {
      return {
        data: {}
      }
    }
  }
})
import { usePoolInfo } from '@/hooks/query/usePoolInfo'

jest.mock('@web3-onboard/react', () => {
  return {
    useConnectWallet: () => [
      {
        wallet: null,
        connecting: () => false
      },
      jest.fn()
    ],
    useSetChain: () => [
      {
        connectedChain: {
          id: '',
          namespace: ''
        }
      },
      jest.fn()
    ]
  }
})

import Invest from './'

const privateInvestors: string[] = []

describe('Invest component', () => {
  // const MockWeb3OnboardProvider = mock<Web3OnboardProviderType>()

  // const [{ connecting, wallet }, connect] = mockUserConnectWallet()
  // const web3Onboard = init({ chains, wallets })
  useRouter.mockReturnValue({ query: {} })
  it('should render Invest component', () => {
    render(
      <ThemeProvider theme={theme}>
        <ReduxProvider>
          <Invest typeAction="Invest" privateInvestors={privateInvestors} />
        </ReduxProvider>
      </ThemeProvider>
    )
  })
})
