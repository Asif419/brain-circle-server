export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorResponse = {
  success: boolean;
  message: string;
  statusCode: number;
  error: TErrorSources;
  stack: string | undefined | null;
};
