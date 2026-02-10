export interface ICustomError extends Error {
  statusCode?: number;
  code?: number;
  errors?: any;
  keyValue?: Record<string, any>;
}
