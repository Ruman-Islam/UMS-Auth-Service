import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { logger, errorLogger } from './shared/logger';
import { Server } from 'http';

// Handling uncaught exceptions
/**
 The uncaughtException event in Node.js is emitted when an unhandled exception occurs in the application. It provides a way to catch and handle exceptions that would otherwise cause the Node.js process to terminate abruptly.
 Using this mechanism allows you to catch unhandled exceptions and perform necessary actions, such as logging the error, performing cleanup tasks, or gracefully shutting down the application before it crashes. It helps in preventing the process from hanging or becoming unresponsive due to an unhandled exception.
 */
process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    // Connect to the database
    await mongoose.connect(config.database_url as string);
    logger.info('✅ Database is connected successfully');

    // Start the server
    server = app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`);
    });
  } catch (error) {
    // Log error if database connection fails
    errorLogger.error('❌ Failed to connect database', error);
  }

  // Gracefully shutting down the server in case of unhandled rejection
  process.on('unhandledRejection', error => {
    if (server) {
      // Close the server and log the error
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      // If server is not available, exit the process
      process.exit(1);
    }
  });
}

// Call the bootstrap function to start the application
bootstrap();

/** SIGTERM
 The SIGTERM signal is a standard signal in Unix-like operating systems that is used to request termination of a process. It is typically sent by the operating system or a process manager to gracefully stop a process.
 This mechanism allows the process to perform any necessary cleanup or shutdown tasks before it exits, ensuring that resources are released properly and any pending operations are completed.
 */
process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
