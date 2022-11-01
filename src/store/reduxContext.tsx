import React from 'react'
import { ReactReduxContextValue } from 'react-redux'
import { Provider } from 'react-redux'

import { store } from '.'

// eslint-disable-next-line prettier/prettier
export const ReduxContext = React.createContext<ReactReduxContextValue>(null as any)

export function ReduxProvider({ children }: any) {
  return (
    <Provider context={ReduxContext} store={store}>
      {children}
    </Provider>
  )
}
