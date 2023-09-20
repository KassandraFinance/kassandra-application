import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Web3OnboardProvider } from '@web3-onboard/react'

import web3Onboard from './web3Onboard'
import { MatomoProvider } from '@datapunt/matomo-tracker-react'
import { instance } from '@/pages/_app'

// const web3Onboard = init({
//   theme: {
//     '--w3o-background-color':
//       'linear-gradient(164.99deg, #1b1d22 19.85%, #333437 116.33%)',
//     '--w3o-foreground-color': '#1B1D22',
//     '--w3o-text-color': '#fcfcfc',
//     '--w3o-border-color': 'rgba(255, 255, 255, 0.05)',
//     '--w3o-action-color': 'unset',
//     '--w3o-border-radius': '8px',
//     '--w3o-font-family': 'Rubik'
//   },
//   disableFontDownload: true,
//   wallets: [],
//   chains: [],
//   appMetadata: {
//     name: 'Kassandra'
//   },
//   accountCenter: {
//     desktop: {
//       enabled: false
//     },
//     mobile: {
//       enabled: false
//     }
//   }
// })

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <MatomoProvider value={instance}>{children}</MatomoProvider>
    </Web3OnboardProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
