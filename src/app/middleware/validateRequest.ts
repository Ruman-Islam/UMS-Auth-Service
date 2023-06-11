import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodEffects } from 'zod';

/**
 * validateRequest is a middleware function that validates the request data against a provided Zod schema.
 * It accepts a Zod schema as a parameter and returns an async middleware function.
 * @param schema The Zod schema or schema effect to validate the request data against.
 * @returns An async middleware function that validates the request data.
 */
const validateRequest =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Middleware function/handler

    try {
      // Validate the request data against the provided schema
      await schema.parseAsync({
        body: req.body, // Passing for validations if body & body's schema exists
        query: req.query, // Passing for validations if query & query's schema exists
        params: req.params, // Passing for validations if params & params's schema exists
        cookies: req.cookies, // Passing for validations if cookies & cookies's schema exists
      });

      // If validation succeeds, proceed to the next middleware or route handler
      return next();
    } catch (error) {
      // If validation fails, pass the error to the error handling middleware
      return next(error);
    }
  };

export default validateRequest;
