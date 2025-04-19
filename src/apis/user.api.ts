import http from "@/apis/http";
import { ListResponse, User } from "@/models";
import { AxiosInstance } from "axios";

class UserApi {
  private http: AxiosInstance;
  constructor() {
    this.http = http;
  }
  async getUsers(): Promise<ListResponse<User>> {
    const response = (await this.http.get("/users")) as ListResponse<User>;
    if (response.status !== 200) {
      throw new Error(response.message);
    }
    return response;
  }
}

const userApi = new UserApi();
export default userApi;
