import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import '@testing-library/jest-dom'
import 'jest-styled-components'

import { ThemeProvider } from 'styled-components'
import theme from '@/styles/theme'
import { ReduxProvider } from '@/store/reduxContext'

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => {
    return 'Next image stub'
  }
}))

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <ReduxProvider>{children}</ReduxProvider>
    </ThemeProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
