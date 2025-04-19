import http from "@/apis/http";
import { Event, ListResponse } from "@/models";
import { AxiosInstance } from "axios";

class EventApi {
  private http: AxiosInstance;
  constructor() {
    this.http = http;
  }

  async getEvents(): Promise<ListResponse<Event>> {
    const response = (await this.http.get("/events")) as ListResponse<Event>;
    if (response.status !== 200) {
      throw new Error(response.message);
    }
    return response;
  }
}

const eventApi = new EventApi();
export default eventApi;
