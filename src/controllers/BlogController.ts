import { Request, Response } from "express";

export const getAllBlogs = async (req: Request, res: Response) => {
  res.json({ msg: "All Blogs" });
};

export const getCUBlogs = async (req: Request, res: Response) => {
  res.json({ msg: "All Current User Blogs" });
};

export const getBlog = async (req: Request, res: Response) => {
  res.json({ msg: "GET A Blog" });
};

export const createBlog = async (req: Request, res: Response) => {
  res.json({ msg: "Create Blog" });
};
export const updateBlog = async (req: Request, res: Response) => {
  res.json({ msg: "Update Blog" });
};

export const deleteBlog = async (req: Request, res: Response) => {
  res.json({ msg: "Delete Blog" });
};
