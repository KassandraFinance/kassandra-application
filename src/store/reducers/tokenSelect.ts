import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ITokenSelectProps {
  address: string
  decimals: number | null | undefined
  logoURI: string
  name: string | null | undefined
  symbol: string | null | undefined
}

const initialState: ITokenSelectProps = {
  address: '',
  decimals: 0,
  logoURI: '',
  name: '',
  symbol: ''
}

export const tokenSelect = createSlice({
  name: 'tokenSelect',
  initialState,
  reducers: {
    setTokenSelect: (state, action: PayloadAction<ITokenSelectProps>) => {
      return action.payload
    }
  }
})

export const { setTokenSelect } = tokenSelect.actions
export default tokenSelect.reducer
