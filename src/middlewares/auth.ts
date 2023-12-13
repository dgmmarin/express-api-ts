/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from "express";
import { JwtPayload, } from "jsonwebtoken";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { User } from "../controllers/users/entity/user.entity";


export interface CustomRequest extends Request {
  token: string | JwtPayload;
  email: string;
  exp: number;
  iat: number;
  roles: string[];
  user: User;
  [x: string]: any;
}

@Middleware({ type: 'before', priority: 100 })
export class IsPublic implements ExpressMiddlewareInterface {
  use(request: any, response: any, next: (err?: any) => any): any {
    console.log("IsPublic");
    request.headers["public"] = "true";
    next();
  }
}

