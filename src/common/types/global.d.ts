export declare global {
  interface TServiceErrorResponse {
    status: SERVICE_STATUS.ERROR;
    code: string;
    message: string;
  }

  type TServiceListResponse<T> = T[];

  interface IQuote {
    q: string;
    a: string;
    h: string;
  }
}
