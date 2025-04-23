export interface IItemResponse<T> {
  status: number;
  message?: string;
  data: T;
}

export interface IListResponse<T> {
  status: number;
  message?: string;
  page: number;
  size: number;
  totalPages: number;
  totalSize: number;
  data: T[];
}

export interface IErrorResponse {
  status: number;
  message: string;
}