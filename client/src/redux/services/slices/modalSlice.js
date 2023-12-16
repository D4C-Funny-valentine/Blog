import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openModel: false,
  type: "signIn",
};

export const openModelSlice = createSlice({
  name: "ModelSlice",
  initialState,
  reducers: {
    setOpenModel: (state, action) => {
      state.openModel = action.payload.isOpen;
      state.type = action.payload.type;
    },
  },
});

export const { setOpenModel } = openModelSlice.actions;
export default openModelSlice.reducer;
