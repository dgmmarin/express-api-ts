import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error(error: any, request: any, response: any, next: (err: any) => any) {
    console.log(error)
    try {
      if (error instanceof QueryFailedError) {
        return response.status(400).json({ error: error.message, status: "Bad Request", statusCode: 400 });
      }

      if (error instanceof EntityNotFoundError) {
        return response.status(404).json({ error: error.message, status: "Not Found", statusCode: 404 });
      }

      if (error.httpCode) {
        return response.status(error.httpCode).json({ error: error.message, status: error.name, statusCode: error.httpCode, errorBag: error?.errors });
      }

      if (error.driverError && error.driverError.code != undefined) {
        return response.status(400).json({ error: error.driverError.sqlMessage, status: "Bad Request", statusCode: 400, errorBag: error?.errors });
      }

      return response.status(500).json({ error: error.toString(), status: "Unknown error", statusCode: 500, errorBag: error?.errors });
    } catch (error: any) {
      return response.status(400).json({ error: error, status: "Bad Request", statusCode: 400, errorBag: error?.errors });
    }
  }
}

