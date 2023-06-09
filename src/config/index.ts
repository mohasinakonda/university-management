import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
export default {
    port: process.env.PORT,
    db_url: process.env.DB_URL,
    student_default_pass: process.env.STUDENT_DEFAULT_PASS,
    env: process.env.NODE_ENV,
};
