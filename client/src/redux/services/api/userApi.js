import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../../helper/baseUrl";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/user` }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    signIn: builder.mutation({
      query: (data) => ({
        url: "/signin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    updatePassword: builder.mutation({
      query: ({ token, data }) => ({
        url: "/update-password",
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    updateProfile: builder.mutation({
      query: ({ token, data }) => ({
        url: "/update-profile",
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    userInfo: builder.query({
      query: (token) => ({
        url: `/userinfo`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ["user"],
    }),
    userBlogs: builder.query({
      query: ({ token, id, page }) => ({
        url: `/${id}/blogs?page=${page}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ["user"],
    }),
    logout: builder.mutation({
      query: (token) => ({
        url: "/logout",
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useUpdatePasswordMutation,
  useUpdateProfileMutation,
  useUserInfoQuery,
  useLogoutMutation,
  useUserBlogsQuery,
} = userApi;
