import { createSlice } from "@reduxjs/toolkit";

// Store
interface SideMenuState {
  open: boolean;
}

const initialState: SideMenuState = {
  open: false,
};

const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {
    openSideMenu: (state) => {
      state.open = true;
    },
    closeSideMenu: (state) => {
      state.open = false;
    },
  },
});

export const { openSideMenu, closeSideMenu } = sideMenuSlice.actions;
export default sideMenuSlice.reducer;
