import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "@/config";
import { BlogRoutes, UserRoutes } from "@/routes";

//For env File
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "The APU is Running..." });
});

app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/blogs", BlogRoutes);

app.listen(PORT, () => {
  console.log(`Server is Fire at http://localhost:${PORT}`);
});
