import { baseQueryWithRefreshToken } from "@/services/apis/base.api";
import { IItemResponse, IListResponse, Ticket, TicketStatus } from "@/services/types";
import { createApi } from "@reduxjs/toolkit/query/react";

export const ticketApi = createApi({
  reducerPath: "ticketApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: (builder) => ({
    getAllTickets: builder.query<
      IListResponse<Ticket>,
      { page?: number; size?: number; keyword?: string }
    >({
      query: ({ page = 1, size = 10, keyword = "" }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          size: size.toString(),
          ...(keyword && { keyword }),
        });
        return {
          url: `/tickets?${params.toString()}`,
          method: "GET",
        };
      },
    }),
    deleteTicket: builder.mutation<IItemResponse<Ticket>, { id: string }>({
      query: ({ id }) => ({
        url: `/tickets/${id}`,
        method: "DELETE",
      }),
    }),
    updateTicketStatus: builder.mutation<
      IItemResponse<Ticket>,
      { id: string; status: TicketStatus }
    >({
      query: ({ id, status }) => ({
        url: `/tickets/${id}/status/${status}`,
        method: "PUT",
        body: { status },
      }),
    }),
  }),
});

export const {
  useLazyGetAllTicketsQuery,
  useDeleteTicketMutation,
  useUpdateTicketStatusMutation,
} = ticketApi;
