import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../../helper/baseUrl";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}` }),
  tagTypes: ["blog"],
  endpoints: (builder) => ({
    getAllBlog: builder.query({
      query: (page) => ({
        url: `/blogs/?page=${page}`,
        method: "GET",
      }),
      providesTags: ["blog"],
    }),
    getMostReadBlog: builder.query({
      query: (page) => ({
        url: `/blogs/most-read?page=${page}`,
        method: "GET",
      }),
      providesTags: ["blog"],
    }),
    getLatestBlog: builder.query({
      query: (page) => ({
        url: `/blogs/latest?page=${page}`,
        method: "GET",
      }),
      providesTags: ["blog"],
    }),
    getSingleBlog: builder.query({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "GET",
      }),
      providesTags: ["blog"],
    }),
    createBlog: builder.mutation({
      query: ({ token, data }) => ({
        url: "/blogs",
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      }),
      invalidatesTags: ["blog"],
    }),
    updateBlog: builder.mutation({
      query: ({ token, id, data }) => ({
        url: `/blogs/${id}`,
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      }),
      invalidatesTags: ["blog"],
    }),
    deleteBlog: builder.mutation({
      query: ({ token, id }) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["blog"],
    }),
  }),
});

export const {
  useGetAllBlogQuery,
  useGetLatestBlogQuery,
  useGetMostReadBlogQuery,
  useGetSingleBlogQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
