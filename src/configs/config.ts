import { config } from "dotenv";

config();
export const configs = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  SECRET_ACCESS: process.env.SECRET_ACCESS,
  SECRET_REFRESH: process.env.SECRET_REFRESH,
};
