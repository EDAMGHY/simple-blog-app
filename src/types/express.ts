import { Request as ExpressRequest } from "express";
import { ObjectId } from "mongoose";

export interface Request extends ExpressRequest {
  user?: {
    _id: ObjectId;
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    password?: string;
  };
}
