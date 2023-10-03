import { Router } from "express";

import {
  createBlog,
  getBlog,
  deleteBlog,
  getAllBlogs,
  getCUBlogs,
  updateBlog,
} from "@/controllers";

const router = Router();

router.route("/me").get(getCUBlogs);
router.route("/").get(getAllBlogs).post(createBlog);
router.route("/:id").get(getBlog);
router.route("/:id/edit").put(updateBlog);
router.route("/:id/delete").delete(deleteBlog);

export default router;
