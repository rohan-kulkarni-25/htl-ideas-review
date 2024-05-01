import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Slices/userSlice";
import SideBarReducer from './Slices/sideBarSlice'

export const store = configureStore({
  reducer: {
    user: UserReducer,
    sideBar:SideBarReducer
  },
});
