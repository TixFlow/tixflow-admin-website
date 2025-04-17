import { HttpStatusCode } from "axios";

export interface ItemResponse<T> {
  status: HttpStatusCode;
  message?: string;
  data: T;
}

export interface ListResponse<T> {
  status: HttpStatusCode;
  message?: string;
  page: number;
  size: number;
  totalPages: number;
  totalSize: number;
  data: T[];
}

export interface ErrorReponse {
  status: HttpStatusCode;
  message: string;
}
