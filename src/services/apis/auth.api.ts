import { baseQueryWithRefreshToken } from "@/services/apis/base.api";
import { IItemResponse, User } from "@/services/types";
import { ILoginRequest, ITokenReponse } from "@/services/types/auth.type";
import { createApi } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: (builder) => ({
    login: builder.mutation<IItemResponse<ITokenReponse>, ILoginRequest>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
    getMe: builder.query<IItemResponse<User>, void>({
      query: () => ({
        url: "auth/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery, useLazyGetMeQuery } = authApi;
