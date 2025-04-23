import { baseQueryWithRefreshToken } from "@/services/apis/base.api";
import { createApi } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: (builder) => ({}),
});
