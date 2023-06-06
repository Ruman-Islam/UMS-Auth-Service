import cors from 'cors';
import express, { Application } from 'express';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route';

const app: Application = express(); // Create an instance of the Express application

// Application Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Application Routes
app.use('/api/v1/users/', UserRoutes); // Mount the UserRoutes to handle requests with the '/api/v1/users/' path prefix
app.use('/api/v1/academic-semesters/', AcademicSemesterRoutes); // Mount the AcademicSemesterRoutes to handle requests with the '/api/v1/academic-semesters/' path prefix

// Global Error Handler
app.use(globalErrorHandler); // Middleware to handle errors globally and send standardized error responses

export default app;
