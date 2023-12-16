import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../../helper/baseUrl";

export const favoriteApi = createApi({
  reducerPath: "favoriteApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/user` }),
  tagTypes: ["favorite"],
  endpoints: (builder) => ({
    getUserFavorites: builder.query({
      query: ({ token, page = 1 }) => ({
        url: `/favorites?page=${page}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ["favorite"],
    }),
    createUserFavorite: builder.mutation({
      query: ({ token, id }) => ({
        url: `/favorites/${id}`,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["favorite"],
    }),
    deleteUserFavorite: builder.mutation({
      query: ({ token, id }) => ({
        url: `/favorites/${id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["favorite"],
    }),
  }),
});

export const {
  useGetUserFavoritesQuery,
  useCreateUserFavoriteMutation,
  useDeleteUserFavoriteMutation,
} = favoriteApi;
