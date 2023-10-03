import { Router } from "express";
import { login, logout, register, getMe } from "@/controllers";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/logout", logout);
router.get("/me", getMe);

export default router;
