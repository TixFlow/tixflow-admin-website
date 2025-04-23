import { baseQueryWithRefreshToken } from "@/services/apis/base.api";
import { IItemResponse, IListResponse, User } from "@/services/types";
import { createApi } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: (builder) => ({
    getAllUsers: builder.query<
      IListResponse<User>,
      { page: number; size: number }
    >({
      query: ({ page, size }) => ({
        url: `/users?page=${page}&size=${size}`,
        method: "GET",
      }),
    }),
    deleteUser: builder.mutation<IItemResponse<User>, { id: string }>({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    })
  }),
});

export const { useLazyGetAllUsersQuery, useDeleteUserMutation } = userApi;
