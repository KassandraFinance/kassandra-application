import React from 'react'
import { TypedUseSelectorHook } from 'react-redux'
import { createDispatchHook } from 'react-redux'

import { ReduxContext } from './reduxContext'
import { RootState, store } from '.'

export const useAppDispatch = createDispatchHook(ReduxContext)

export const useAppSelector: TypedUseSelectorHook<RootState> = selector => {
  const [, forceUpdate] = React.useReducer(c => c + 1, 0)
  const currentState = React.useRef<any>()
  currentState.current = selector(store.getState())

  React.useEffect(() => {
    return store.subscribe(() => {
      try {
        const nextState = selector(store.getState())
        if (nextState === currentState.current) {
          return
        }
      } catch (err) {
        console.log(err)
      }
      forceUpdate()
    })
  }, [store, forceUpdate, selector, currentState])

  return currentState.current
}
