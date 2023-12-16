import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  owner: false,
};

export const drawerUserSlice = createSlice({
  name: "ModelSlice",
  initialState,
  reducers: {
    setDrawerUser: (state, action) => {
      state.owner = action.payload.owner;
    },
  },
});

export const { setDrawerUser } = drawerUserSlice.actions;
export default drawerUserSlice.reducer;
