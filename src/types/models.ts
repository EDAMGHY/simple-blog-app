import { Document } from "mongoose";

// Define the interface for the User document
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}
