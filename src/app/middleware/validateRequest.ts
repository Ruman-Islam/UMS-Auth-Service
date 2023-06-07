import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

/**
This code exports a middleware function called 'validateRequest' which takes a Zod schema as input.
The middleware function is an asynchronous function that receives the request, response, and next function as parameters.
Inside the middleware function, the incoming request's body, query parameters, URL parameters, and cookies are passed to the Zod schema using the 'parseAsync' method.
If the validation succeeds, the next function is called to proceed to the next middleware or route handler.
If the validation fails, the error is passed to the next function, which will handle the error.
This middleware can be used to validate the request data against a specified Zod schema before processing the request further.
*/
const validateRequest =
  /*  'Zod schema' ==> */


    (schema: AnyZodObject) =>
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      // middleware function/handler
      try {
        await schema.parseAsync({
          body: req.body, // Passing for validations if body & body's schema exists
          query: req.query, // Passing for validations if query & query's schema exists
          params: req.params, // Passing for validations if params & params's schema exists
          cookies: req.cookies, // Passing for validations if cookies & cookies's schema exists
        });
        return next();
      } catch (error) {
        return next(error);
      }
    };

export default validateRequest;
