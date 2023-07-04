import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from the .env file
dotenv.config({ path: path.join(process.cwd(), '.env') });

// Defining the configuration object
const config = {
  env: process.env.NODE_ENV, // Environment mode (development, production, etc.)
  port: process.env.PORT, // Port number for the server
  database_url: process.env.DATABASE_URL, // URL for the database
  default_student_pass: process.env.DEFAULT_STUDENT_PASS, // Default password for student
  default_faculty_pass: process.env.DEFAULT_FACULTY_PASS, // Default password for faculty
  default_admin_pass: process.env.DEFAULT_ADMIN_PASS, // Default password for faculty
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN,
    refresh_expires_in: process.env.JWT_SECRET_EXPIRES_IN,
  },
};

export default config;
