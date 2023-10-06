import asyncHandler from "express-async-handler";
import { Response } from "express";
import { Request } from "@/types";
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
  const username = req?.user?.username;

  const blogs = await Blog.find({ user: userID });

  sendSuccessResponse(
    res,
    { count: blogs.length, blogs },
    `[${username}] Blogs Fetched Successfully...`
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
    return; // Return early to avoid further processing
  }

  // Use optional chaining and nullish coalescing operator to safely update properties
  blog.title = title ?? blog.title;
  blog.category = category ?? blog.category;
  blog.body = body ?? blog.body;

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
