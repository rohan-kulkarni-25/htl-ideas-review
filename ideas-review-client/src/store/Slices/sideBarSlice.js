import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open:false
};

export const sideBarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    updateSlideBar: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateSlideBar } = sideBarSlice.actions;

export default sideBarSlice.reducer;
