import { useToast } from "@/hooks";
import { getAccessToken } from "@/utils";
import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const toastError = (message: string) => {
  const { showToast } = useToast();
  showToast(message, "error");
};

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    headers.set("Content-Type", "application/json");
  },
});

export const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    toastError("An error occurred while fetching data.");
  }
  return result;
};
