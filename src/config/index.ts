import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from the .env file
dotenv.config({ path: path.join(process.cwd(), '.env') });

// Define the configuration object
const config = {
  env: process.env.NODE_ENV, // Environment mode (development, production, etc.)
  port: process.env.PORT, // Port number for the server
  database_url: process.env.LOCAL_URL, // URL for the database
  default_user_pass: process.env.DEFAULT_USER_PASS, // Default password for user
};

export default config;
