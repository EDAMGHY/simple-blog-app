import { Document } from "mongoose";

// Define the interface for the User document
export interface IUser extends Document {
  // fields
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  // methods
  matchPasswords?: (enteredPassword: string) => Promise<boolean>;
}
