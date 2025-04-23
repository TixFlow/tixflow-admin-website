import { baseQueryWithRefreshToken } from "@/services/apis/base.api";
import {
  Event,
  EventStatus,
  IItemResponse,
  IListResponse,
} from "@/services/types";
import { createApi } from "@reduxjs/toolkit/query/react";

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: (builder) => ({
    getAllEvents: builder.query<
      IListResponse<Event>,
      { page?: number; size?: number; keyword?: string }
    >({
      query: ({ page = 1, size = 10, keyword = "" }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          size: size.toString(),
          ...(keyword && { keyword }),
        });
        return {
          url: `/events?${params.toString()}`,
          method: "GET",
        };
      },
    }),
    deleteEvent: builder.mutation<IItemResponse<Event>, { id: string }>({
      query: ({ id }) => ({
        url: `/events/${id}`,
        method: "DELETE",
      }),
    }),
    updateEventStatus: builder.mutation<
      IItemResponse<Event>,
      { id: string; status: EventStatus }
    >({
      query: ({ id, status }) => ({
        url: `/events/${id}/status/${status}`,
        method: "PUT",
        body: { status },
      }),
    }),
  }),
});

export const {
  useLazyGetAllEventsQuery,
  useDeleteEventMutation,
  useUpdateEventStatusMutation,
} = eventApi;
