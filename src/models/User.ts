import mongoose, { Schema } from "mongoose";
import validator from "validator";
import { IUser } from "@/types";

const UserSchemaFields: Record<keyof IUser, any> = {
  firstName: {
    type: String,
    required: [true, "firstName is required"],
  },
  lastName: {
    type: String,
    required: [true, "lastName is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: (props: any) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
};

const UserSchema = new Schema<IUser>(UserSchemaFields, { timestamps: true });

export const User = mongoose.model<IUser>("User", UserSchema);
