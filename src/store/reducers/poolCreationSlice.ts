import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TutorialType = {
  network: string
}

export type DetailsType = {
  poolName?: string,
  poolSymbol?: string,
  image?: string,
  strategy?: string,
  privacy?: 'PUBLIC' | 'PRIVATE'
}

interface IPoolCreationDataState {
  stepNumber: number;
  isValid: boolean;
  createPoolData: {
    tutorial: TutorialType,
    Details: DetailsType
  };
}

const initialState: IPoolCreationDataState = {
  stepNumber: 0,
  isValid: false,
  createPoolData: {
    tutorial: {
      network: ''
    },
    Details: {
      poolName: '',
      poolSymbol: '',
      image: '',
      strategy: '',
      privacy: 'PUBLIC'
    }
  }
}

export const poolCreationSlice = createSlice({
  name: 'poolCreationData',
  initialState,
  reducers: {
    setNextStepNumber: state => {
      state.stepNumber = state.stepNumber + 1
      state.isValid = false
    },
    setBackStepNumber: state => {
      state.stepNumber = state.stepNumber - 1
    },
    setIsValid: (state, action: PayloadAction<boolean>) => {
      state.isValid = action.payload
    },
    setTutorial: (state, action: PayloadAction<TutorialType>) => {
      state.createPoolData.tutorial = {
        ...state.createPoolData.tutorial,
        ...action.payload
      }
    },
    setDetails: (state, action: PayloadAction<DetailsType>) => {
      state.createPoolData.Details = {
        ...state.createPoolData.Details,
        ...action.payload
      }
    }
  }
})

export const {
  setBackStepNumber,
  setNextStepNumber,
  setIsValid,
  setTutorial,
  setDetails
} = poolCreationSlice.actions

export default poolCreationSlice.reducer
