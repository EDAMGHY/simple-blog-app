import { Response } from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

export const generateToken = (
  res: Response,
  userId: ObjectId | null = null
) => {
  const cookieName = process.env.COOKIE_NAME;
  const jwtSecret = process.env.JWT_SECRET;

  if (!cookieName) {
    throw new Error("[COOKIE_NAME] environment variable is not defined.");
  }

  if (!jwtSecret) {
    throw new Error("[JWT_SECRET] environment variable is not defined.");
  }

  if (!userId) {
    res.status(400);
    throw new Error("Invalid User Data");
  }

  const token = jwt.sign({ userId }, jwtSecret, {
    expiresIn: "30d",
  });

  res.cookie(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};
