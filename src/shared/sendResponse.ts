import { Response } from 'express';

type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  data: T | null;
};

const sendResponse = <T>(res: Response, data: IApiResponse<T>): Response => {
  const responseData: IApiResponse<T> = {
    statusCode: data?.statusCode,
    success: data?.success,
    message: data?.message || null,
    data: data?.data || null,
  };
  return res.status(data?.statusCode).json(responseData);
};

export default sendResponse;
