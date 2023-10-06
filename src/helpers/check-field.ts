import { Response } from "express";
import { sendErrorResponse } from "./send-response";

export const checkField = (
  res: Response,
  field: string,
  name: string,
  characters: number = 8
) => {
  if (field.length < characters) {
    sendErrorResponse(
      res,
      `The ${name} should be at least ${characters} characters long...`,
      400
    );
  }
};
