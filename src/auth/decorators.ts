/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../middlewares/auth";
import { Action, ExpressMiddlewareInterface, Middleware, getMetadataArgsStorage } from "routing-controllers";

export function Body() {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const value = descriptor.value;
    descriptor.value = function (
      req: Request,
      res: Response,
      next: NextFunction,
    ) {
      console.log(target);
      console.log(propertyKey);
      console.log(descriptor.value);
      const out = value.apply(this, [req, res, next]);
      return out;
    };
    return descriptor;
  };
}

export function Catch(name: any[]) {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const value = descriptor.value;
    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction,
    ) {
      try {
        const out = await value.apply(this, [req, res, next]);
        return out;
      } catch (error: any) {
        if (error.name != undefined) {
          if (name.includes(error.name)) {
            return res.status(400).json({ message: error.message });
          } else {
            return res.status(500).json({ message: error });
          }
        } else {
          return res.status(500).json({ message: error });
        }
      }
    };
    return descriptor;
  };
}

export function Roles(roles: string[]) {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const value = descriptor.value;
    descriptor.value = function (
      req: Request,
      res: Response,
      next: NextFunction,
    ) {
      const _roles = (req as CustomRequest).roles;
      let hasRole = false;
      if (_roles && _roles.length && _roles.some((r) => roles.includes(r))) {
        hasRole = true;
      }
      if (!hasRole) {
        return res.status(403).json({ message: "Unauthorized action" });
      } else {
        const out = value.apply(this, [req, res, next]);
        return out;
      }
    };
    return descriptor;
  };
}


export function HasRoles(roles: string[]) {
  @Middleware({ type: "before" })
  class HasRolesInterceptor implements ExpressMiddlewareInterface {
    constructor(private roles: string[]) { }
    use(req: any, res: any, next: any): any {
      const _roles = req.roles;
      console.log(_roles);
      let hasRole = false;
      if (_roles && _roles.length && _roles.some((r: any) => roles.includes(r))) {
        hasRole = true;
      }
      if (!hasRole) {
        return res.status(403).json({ message: "Unauthorized action" });
      } else {
        next();
      }
    }
  }
  return new HasRolesInterceptor(roles);

}
