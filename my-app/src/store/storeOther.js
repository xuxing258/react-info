import { createSlice } from "@reduxjs/toolkit";


export const useOther = createSlice({
  name: "useOther",
  initialState: {
    menuSelect: "home/child"
  },
  reducers: {
    changeMenuSelect: (state, val) => {
      state.menuSelect = val.val
    },
  }
})

export const { changeMenuSelect } = useOther.actions;

export default useOther.reducer