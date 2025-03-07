import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import logger from "../utils/logger";
export function signToken(payload: any) {
  return jwt.sign(payload, config.JWT_SECRET!, {
    expiresIn: "7d",
  });
}

export async function getAuthUserInfo(
  token: string | undefined
): Promise<JwtPayload | null> {
  if (!token) return null;

  try {
    return jwt.verify(token, config.JWT_SECRET!) as JwtPayload;
  } catch (error) {
    logger.error(error);
    return null;
  }
}
