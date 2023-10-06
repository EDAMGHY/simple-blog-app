import { Response } from "express";
import { IUser, Request } from "@/types";
import asyncHandler from "express-async-handler";
import { User } from "@/models";
import {
  sendSuccessResponse,
  checkField,
  generateToken,
  sendErrorResponse,
  createdUser,
} from "@/helpers";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    sendErrorResponse(res, "Please fill all the fields...", 400);
  }

  const user: IUser | null = await User.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  });

  const isMatchedPasswords = await user?.matchPasswords?.(password);

  if (!user || !isMatchedPasswords) {
    sendErrorResponse(res, "Invalid email or password", 400);
  }

  const CUser = createdUser(user);

  generateToken(res, user?._id);

  sendSuccessResponse(res, CUser, "User Successfully Logged in...", 200);
});

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { firstName, lastName, email, username, password } = req.body;

  if (!firstName || !lastName || !email || !username || !password) {
    sendErrorResponse(res, "Please fill all the fields...", 400);
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    sendErrorResponse(res, "User already exists...", 400);
  }

  checkField(res, username, "username", 4);
  checkField(res, password, "password", 8);

  const user = new User({
    username,
    email,
    password,
    lastName,
    firstName,
  });

  await user.save();

  const CUser = createdUser(user);

  generateToken(res, user?._id);

  sendSuccessResponse(res, CUser, "User Successfully Registered...");
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const cookieName = process.env.COOKIE_NAME;

  if (!cookieName) {
    throw new Error("[COOKIE_NAME] environment variable is not defined.");
  }

  res.cookie(cookieName, "", {
    httpOnly: true,
    expires: new Date(0),
  });
  sendSuccessResponse(res, null, "User Logged out");
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = req?.user || null;
  sendSuccessResponse(res, user, "User Successfully Fetched...");
});
