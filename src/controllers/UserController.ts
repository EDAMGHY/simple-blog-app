import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { sendSuccessResponse } from "@/helpers";

export const login = asyncHandler(async (req: Request, res: Response) => {
  sendSuccessResponse(res, { msg: "Login" });
});
export const register = asyncHandler(async (req: Request, res: Response) => {
  sendSuccessResponse(res, { msg: "Register" });
});
export const logout = asyncHandler(async (req: Request, res: Response) => {
  sendSuccessResponse(res, { msg: "Logout" });
});
export const getMe = asyncHandler(async (req: Request, res: Response) => {
  sendSuccessResponse(res, { msg: "Get Me" });
});
