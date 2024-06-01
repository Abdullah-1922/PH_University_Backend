import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
export default {
    port :process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    bcrypt_salt_rounds:process.env.BCRYPT_SALT_POUNDS,
    NODE_ENV: process.env.NODE_ENV
}