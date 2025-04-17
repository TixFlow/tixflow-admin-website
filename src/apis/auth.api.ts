import http from "@/apis/http";
import { ItemResponse, Token } from "@/models";
import { AxiosInstance } from "axios";

class AuthApi {
  private http: AxiosInstance;
  constructor() {
    this.http = http;
  }

  async login(body: { email: string; password: string }): Promise<Token> {
    const response = (await this.http.post(
      "/auth/login",
      body
    )) as ItemResponse<Token>;
    console.log(response);
    if (response.status !== 200) {
      throw new Error(response.message);
    }
    return response.data;
  }
}

const authApi = new AuthApi();
export default authApi;
