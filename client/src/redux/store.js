import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./services/slices/modalSlice";
import drawerUserSlice from "./services/slices/drawerUserSlice";
import userStoreSlice from "./services/slices/userStoreSlice";
import { userApi } from "./services/api/userApi";
import { blogApi } from "./services/api/blogApi";
import { favoriteApi } from "./services/api/favoriteApi";

export const store = configureStore({
  reducer: {
    model: modalSlice,
    drawerUser: drawerUserSlice,
    userStore: userStoreSlice,
    [userApi.reducerPath]: userApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [favoriteApi.reducerPath]: favoriteApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      blogApi.middleware,
      favoriteApi.middleware
    ),
});
