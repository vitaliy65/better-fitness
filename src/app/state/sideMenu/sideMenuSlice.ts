import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Store
type SideMenuState = {
  open: boolean;
};

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
  extraReducers: (builder) => {
    builder
      .addCase(openSideMenuAsync.pending, () => {
        console.log("Pending openSideMenuAsync");
      })
      .addCase(
        openSideMenuAsync.fulfilled,
        (state, action: PayloadAction<boolean>) => {
          state.open = action.payload;
        }
      );

    builder
      .addCase(closeSideMenuAsync.pending, () => {
        console.log("Pending closeSideMenuAsync");
      })
      .addCase(
        closeSideMenuAsync.fulfilled,
        (state, action: PayloadAction<boolean>) => {
          state.open = action.payload;
        }
      );
  },
});

export const openSideMenuAsync = createAsyncThunk(
  "sideMenu/openSideMenuAsync",
  async (action: boolean) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return action;
  }
);

export const closeSideMenuAsync = createAsyncThunk(
  "sideMenu/closeSideMenuAsync",
  async (action: boolean) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return action;
  }
);

export const { openSideMenu, closeSideMenu } = sideMenuSlice.actions;
export default sideMenuSlice.reducer;
