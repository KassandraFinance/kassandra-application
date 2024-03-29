import { configureStore, combineReducers } from '@reduxjs/toolkit'

import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

import chainIdReducer from './reducers/chainId'
import feesReducer from './reducers/fees'
import chartSelectedReducer from './reducers/chartSelected'
import periodSelectedReducer from './reducers/periodSelected'
import poolImagesReducer from './reducers/poolImages'
import tokenAddress2IndexReducer from './reducers/tokenAddress2Index'
import performanceValuesReducer from './reducers/performanceValues'
import modalAlertTextReducer from './reducers/modalAlertText'
import poolCreationReducer from './reducers/poolCreationSlice'
import tokenSelectionActiveReducer from './reducers/tokenSelectionActive'
import tokenSelectReducer from './reducers/tokenSelect'
import tokenListSwapProviderReducer from './reducers/tokenListSwapProvider'
import addAssetReducer from './reducers/addAssetSlice'
import removeAssetReducer from './reducers/removeAssetSlice'
import rebalanceAssetsReducer from './reducers/rebalanceAssetsSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['poolCreation']
}

export const rootReducer = combineReducers({
  chainId: chainIdReducer,
  fees: feesReducer,
  chartSelected: chartSelectedReducer,
  poolImages: poolImagesReducer,
  tokenAddress2Index: tokenAddress2IndexReducer,
  performanceValues: performanceValuesReducer,
  periodSelected: periodSelectedReducer,
  modalAlertText: modalAlertTextReducer,
  poolCreation: poolCreationReducer,
  tokenSelectionActive: tokenSelectionActiveReducer,
  tokenSelect: tokenSelectReducer,
  tokenListSwapProvider: tokenListSwapProviderReducer,
  addAsset: addAssetReducer,
  removeAsset: removeAssetReducer,
  rebalanceAssets: rebalanceAssetsReducer
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
