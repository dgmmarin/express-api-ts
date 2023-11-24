import { Middleware, ExpressErrorMiddlewareInterface, UseInterceptor } from 'routing-controllers';
import { Request, Response } from "express";
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

@Middleware({ type: 'after' })
@UseInterceptor(CustomErrorHandler)
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: Request, response: Response) {
    console.log(error);
    try {
      if (error instanceof QueryFailedError) {
        return response.status(400).json({ error: error.message, status: "Bad Request", statusCode: 400 });
      }

      if (error instanceof EntityNotFoundError) {
        return response.status(404).json({ error: error.message, status: "Not Found", statusCode: 404 });
      }

      if (error.httpCode) {
        return response.status(error.httpCode).json({ error: error.message, status: error.name, statusCode: error.httpCode, errorBag: error.errors });
      }

      if (error.driverError && error.driverError.code != undefined) {
        return response.status(400).json({ error: error.driverError.sqlMessage, status: "Bad Request", statusCode: 400 });
      }

      return response.status(500).json({ error: error, status: "Unknown error", statusCode: 500 });
    } catch (error) {
      return response.status(400).json({ error: error, status: "Bad Request", statusCode: 400 });
    }
  }
}

