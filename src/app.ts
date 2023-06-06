import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import routes from './app/routes';

const app: Application = express(); // Create an instance of the Express application

// Application Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Application Routes
app.use('/api/v1', routes);

// Global Error Handler
app.use(globalErrorHandler); // Middleware to handle errors globally and send standardized error responses

export default app;
