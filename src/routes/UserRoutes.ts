import { Router } from "express";
import { login, logout, register, getMe } from "@/controllers";
import { protect } from "@/middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/logout", logout);
router.get("/me", protect, getMe);

export default router;
