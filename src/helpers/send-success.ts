import { Response } from "express";

export const sendSuccessResponse = (
  res: Response,
  data: any | null = null,
  message: string | null = null,
  statusCode = 200
) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
