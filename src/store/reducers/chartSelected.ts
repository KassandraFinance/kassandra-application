import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = 'TVL'

export const chartSelectedSlice = createSlice({
  name: 'chartSelected',
  initialState,
  reducers: {
    setChartSelected: (state: string, action: PayloadAction<string>) =>
      action.payload
  }
})

export const { setChartSelected } = chartSelectedSlice.actions

export default chartSelectedSlice.reducer
