import http from "@/apis/http";
import { ListResponse, Order } from "@/models";
import { AxiosInstance } from "axios";

class OrderApi {
  private http: AxiosInstance;
  constructor() {
    this.http = http;
  }
  async getOrders(): Promise<ListResponse<Order>> {
    const response = (await this.http.get("/orders")) as ListResponse<Order>;
    if (response.status !== 200) {
      throw new Error(response.message);
    }
    return response;
  }
}
