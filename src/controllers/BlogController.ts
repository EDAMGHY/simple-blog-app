import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { sendSuccessResponse } from "@/helpers";

export const getAllBlogs = asyncHandler(async (req: Request, res: Response) => {
  sendSuccessResponse(res, { msg: "All Blogs" });
});

export const getCUBlogs = asyncHandler(async (req: Request, res: Response) => {
  sendSuccessResponse(res, { msg: "All Current User Blogs" });
});

export const getBlog = asyncHandler(async (req: Request, res: Response) => {
  sendSuccessResponse(res, { msg: "GET A Blog" });
});

export const createBlog = asyncHandler(async (req: Request, res: Response) => {
  sendSuccessResponse(res, { msg: "Create Blog" });
});
export const updateBlog = asyncHandler(async (req: Request, res: Response) => {
  sendSuccessResponse(res, { msg: "Update Blog" });
});

export const deleteBlog = asyncHandler(async (req: Request, res: Response) => {
  sendSuccessResponse(res, { msg: "Delete Blog" });
});
