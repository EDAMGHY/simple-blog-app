import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { User } from "@/models";
import { NextFunction, Request, Response } from "express";

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    token = req?.cookies?.[process.env.COOKIE_NAME];
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select("-password");
        next();
      } catch (err) {
        res.status(401);
        throw new Error("Not Authorized, invalid token");
      }
    } else {
      res.status(401);
      throw new Error("You should be authenticated to be able to see this...");
    }
  }
);

export { protect };
