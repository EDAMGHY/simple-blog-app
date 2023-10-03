import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  res.json({ msg: "Login" });
};
export const register = async (req: Request, res: Response) => {
  res.json({ msg: "Register" });
};
export const logout = async (req: Request, res: Response) => {
  res.json({ msg: "Logout" });
};
export const getMe = async (req: Request, res: Response) => {
  res.json({ msg: "Get Me" });
};
