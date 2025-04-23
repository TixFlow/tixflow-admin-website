export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ITokenReponse {
  accessToken: string;
  refreshToken: string;
}