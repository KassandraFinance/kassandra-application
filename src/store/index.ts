import { configureStore, combineReducers } from '@reduxjs/toolkit'

import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
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

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['poolCreation']
}

const rootReducer = combineReducers({
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

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
