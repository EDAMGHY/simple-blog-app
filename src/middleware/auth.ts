import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { User } from "@/models";
import { Request, JWTDecoded } from "@/types";
import { NextFunction, Response } from "express";

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    const cookieName = process.env.COOKIE_NAME;
    const jwtSecret = process.env.JWT_SECRET;

    if (!cookieName) {
      throw new Error("[COOKIE_NAME] environment variable is not defined.");
    }

    if (!jwtSecret) {
      throw new Error("[JWT_SECRET] environment variable is not defined.");
    }

    token = req?.cookies?.[cookieName];
    if (token) {
      try {
        const decoded: JWTDecoded | string = jwt.verify(token, jwtSecret);

        if (typeof decoded === "string") {
          // Handle the case where decoded is a string (e.g., invalid token)
          const error = new Error("Not Authorized, invalid token");
          res.status(401);
          return next(error);
        }

        req.user = await User.findById(decoded?.userId).select("-password");
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
