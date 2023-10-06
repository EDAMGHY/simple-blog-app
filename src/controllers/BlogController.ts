import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { sendErrorResponse, sendSuccessResponse } from "@/helpers";
import { Blog } from "@/models";

export const getAllBlogs = asyncHandler(async (req: Request, res: Response) => {
  const blogs = await Blog.find();
  sendSuccessResponse(
    res,
    { count: blogs.length, blogs },
    "Blogs Fetched Successfully..."
  );
});

export const getCUBlogs = asyncHandler(async (req: Request, res: Response) => {
  const userID = req?.user?._id;

  const blogs = await Blog.find({ user: userID });

  sendSuccessResponse(
    res,
    { count: blogs.length, blogs },
    `[${req?.user?.username}] Blogs Fetched Successfully...`
  );
});

export const getBlog = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const blog = await Blog.findOne({ _id: id });

  if (!blog) {
    sendErrorResponse(res, `There is no blog with the ID [${id}]`, 404);
  }

  sendSuccessResponse(
    res,
    blog,
    `The Blog with ID [${id}] has been Fetched...`
  );
});

export const createBlog = asyncHandler(async (req: Request, res: Response) => {
  const { title, body, category } = req.body;

  const userID = req?.user?._id || null;

  if (!userID) {
    sendErrorResponse(
      res,
      "You should be authenticated to be able to see this...",
      400
    );
  }

  if (!title || !body || !category) {
    sendErrorResponse(res, "Please fill all the fields...", 400);
  }

  const blog = new Blog({ title, category, body, user: userID });

  await blog.save();

  sendSuccessResponse(res, blog, "Blog Created Succuessfully...");
});

export const updateBlog = asyncHandler(async (req: Request, res: Response) => {
  const { title, body, category } = req.body;
  const { id } = req.params;

  const userID = req?.user?._id || null;

  if (!userID) {
    sendErrorResponse(
      res,
      "You should be authenticated to be able to see this...",
      400
    );
  }

  const blog = await Blog.findOne({ _id: id, user: userID });

  if (!blog) {
    sendErrorResponse(
      res,
      `You don't OWN this resource OR There is no blog with the ID [${id}]`,
      404
    );
  }

  if (title) blog.title = title;
  if (category) blog.category = category;
  if (body) blog.body = body;

  await blog.save();

  sendSuccessResponse(res, blog, "Blog Updated Succuessfully...");
});

export const deleteBlog = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const userID = req?.user?._id || null;

  if (!userID) {
    sendErrorResponse(
      res,
      "You should be authenticated to be able to see this...",
      400
    );
  }

  const blog = await Blog.findOne({ _id: id, user: userID });

  if (!blog) {
    sendErrorResponse(
      res,
      `You don't OWN this resource OR There is no blog with the ID [${id}]`,
      404
    );
  }

  await Blog.findOneAndDelete({ _id: id, user: userID });

  sendSuccessResponse(res, null, "Blog Delete Successfully...");
});
