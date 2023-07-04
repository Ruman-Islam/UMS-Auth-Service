import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import routes from './app/routes';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';

const app: Application = express(); // Create an instance of the Express application

// Application Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(cookieParser());
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Application Routes
app.use('/api/v1', routes);

// Handle not found
app.use((req: Request, res: Response) => {
  // Return a JSON response with the appropriate status code and error message
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API not found',
      },
    ],
  });
});

// Global Error Handler
// Middleware to handle errors globally and send standardized error responses
app.use(globalErrorHandler);

export default app;
