import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
// dotenv.config() will load the .env file in the root directory
// dotenv.config({ path: path.join(process.cwd(), ".env") }) will load the .env file in the root directory
// process.cwd() returns the current working directory
dotenv.config({ path: path.join(process.cwd(), ".env") });

export const config = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET,
};
