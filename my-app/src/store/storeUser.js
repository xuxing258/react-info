import { createSlice } from "@reduxjs/toolkit";


export const useUserInfo = createSlice({
  name: "useUserInfo",
  initialState: {
    userInfo: null
  },
  reducers: {
    changeInfo: (state, val) => {
      state.userInfo = val.val
    },
  }
})



export const { changeInfo } = useUserInfo.actions;

export default useUserInfo.reducer