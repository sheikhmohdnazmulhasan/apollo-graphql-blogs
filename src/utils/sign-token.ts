import jwt from "jsonwebtoken";
import { config } from "../config";

export function signToken(payload: any) {
  return jwt.sign(payload, config.JWT_SECRET!, {
    expiresIn: "7d",
  });
}
