import { JwtPayload } from "jsonwebtoken";

export interface JWTDecoded extends JwtPayload {
  userId?: string | null;
  iat?: number;
  exp?: number;
}
