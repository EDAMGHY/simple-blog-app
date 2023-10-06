import { Response } from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

export const generateToken = (
  res: Response,
  userId: ObjectId | null = null
) => {
  if (!userId) {
    res.status(400);
    throw new Error("Invalid User Data");
  }

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie(process.env.COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};
