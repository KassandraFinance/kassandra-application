import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ImageType = {
  profilePic: string,
  isNFT: boolean
}

interface IUserDataState {
  nickName: string;
  image: ImageType;
}

const initialState: IUserDataState = {
  nickName: '',
  image: {
    profilePic: '',
    isNFT: false
  }
}

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setNickName: (state, action: PayloadAction<string>) => {
      state.nickName = action.payload
    },
    setProfilePic: (state, action: PayloadAction<ImageType>) => {
      state.image = action.payload
    }
  }
})

export const { setNickName, setProfilePic } = userSlice.actions

export default userSlice.reducer
