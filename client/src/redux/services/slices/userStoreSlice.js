import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  token: null,
  user: null,
};

export const userStoreSlice = createSlice({
  name: "UserStore",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      Cookies.set("token", state.token);
      Cookies.set("user", JSON.stringify(state.user));
    },
    removeUser: (state) => {
      state.token = null;
      state.user = null;
      Cookies.remove("token");
      Cookies.remove("user");
    },
  },
});

export const { addUser, removeUser } = userStoreSlice.actions;
export default userStoreSlice.reducer;
