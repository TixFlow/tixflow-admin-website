import http from "@/apis/http";
import { ListResponse, Ticket } from "@/models";
import { AxiosInstance } from "axios";

class TicketApi {
  private http: AxiosInstance;
  constructor() {
    this.http = http;
  }
  async getTickets(): Promise<ListResponse<Ticket>> {
    const response = (await this.http.get("/tickets")) as ListResponse<Ticket>;
    if (response.status !== 200) {
      throw new Error(response.message);
    }
    return response;
  }
}

const ticketApi = new TicketApi();
export default ticketApi;
