import { Router } from "express";
import { protect } from "@/middleware";

import {
  createBlog,
  getBlog,
  deleteBlog,
  getAllBlogs,
  getCUBlogs,
  updateBlog,
} from "@/controllers";

const router = Router();

router.route("/me").get(protect, getCUBlogs);
router.route("/").get(getAllBlogs).post(protect, createBlog);
router.route("/:id/blog").get(getBlog);
router.route("/:id/edit").put(protect, updateBlog);
router.route("/:id/delete").delete(protect, deleteBlog);

export default router;
