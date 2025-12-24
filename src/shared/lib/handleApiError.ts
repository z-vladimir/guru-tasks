export interface ApiErrorParams<T = unknown> {
  path: string;
  params?: T;
  message: string;
}

export const handleApiError = <T = unknown>({
  path,
  params,
  message,
}: ApiErrorParams<T>): never => {
  throw new Error(message);
};
