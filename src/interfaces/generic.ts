export const DefaultQueue = "default";
export const OrdersQueue = "orders";
export const EmailsQueue = "emails";

export type Pagination = {
  limit: number;
  offset: number;
  page: number;
  total: number;
  pages: number;
};

export type PaginationResponse<T> = {
  data: T[];
  meta: Pagination;
};  
