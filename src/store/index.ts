import { configureStore, combineReducers } from '@reduxjs/toolkit'
import Big from 'big.js'
import BigNumber from 'bn.js'
import { IPoolCreationDataState } from './reducers/poolCreationSlice'

import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore, createTransform } from 'redux-persist'
import thunk from 'redux-thunk'

import userWalletAddressReducer from './reducers/userWalletAddress'
import chainIdReducer from './reducers/chainId'
import feesReducer from './reducers/fees'
import chartSelectedReducer from './reducers/chartSelected'
import periodSelectedReducer from './reducers/periodSelected'
import poolImagesReducer from './reducers/poolImages'
import tokenAddress2IndexReducer from './reducers/tokenAddress2Index'
import performanceValuesReducer from './reducers/performanceValues'
import modalAlertTextReducer from './reducers/modalAlertText'
import userReducer from './reducers/userSlice'
import poolCreationReducer from './reducers/poolCreationSlice'

const SetTransform = createTransform(
  inboundState => {
    return inboundState
  },
  (outboundState: IPoolCreationDataState) => {
    outboundState.createPoolData.tokens?.forEach(element => {
      element.amount = Big(element.amount)
    })

    return outboundState
  },
  { whitelist: ['poolCreation'] }
)

const persistConfig = {
  key: 'root',
  storage,
  transforms: [SetTransform],
  whitelist: ['poolCreation']
}

export const rootReducer = combineReducers({
  userWalletAddress: userWalletAddressReducer,
  chainId: chainIdReducer,
  fees: feesReducer,
  chartSelected: chartSelectedReducer,
  poolImages: poolImagesReducer,
  tokenAddress2Index: tokenAddress2IndexReducer,
  performanceValues: performanceValuesReducer,
  periodSelected: periodSelectedReducer,
  modalAlertText: modalAlertTextReducer,
  user: userReducer,
  poolCreation: poolCreationReducer
})

export type RootReducer = ReturnType<typeof rootReducer>

const persistedReducer = persistReducer<RootReducer>(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
