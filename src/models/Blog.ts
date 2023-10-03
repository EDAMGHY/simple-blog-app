import mongoose, { Schema } from "mongoose";

const BlogSchema: Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    body: {
      type: String,
      required: [true, "Body is required"],
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", BlogSchema);
