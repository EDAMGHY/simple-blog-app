import { Request, Response, NextFunction } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (
  err: any,
  req: Request,
  res: Response
  // next: NextFunction
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err?.name === "CastError" && err?.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  if (err?.errors && err?.errors?.["email"]) {
    statusCode = 400;
    message = `This [${err?.errors?.["email"]?.value}] is not a valid email`;
  }
  if (err?.code && err?.code === 11000 && err?.message?.includes("duplicate")) {
    statusCode = 400;
    message = `The ${Object.keys(err?.keyValue)[0]} [${
      Object.values(err?.keyValue)[0]
    }] is already in use,Try a different value...`;
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
