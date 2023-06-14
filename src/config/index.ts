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
};

export default config;
