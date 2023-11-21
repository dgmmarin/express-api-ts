import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "./auth";

const pagniation = (req: Request, res: Response, next: NextFunction) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = ((page - 1) * limit);
  (req as CustomRequest)["pagination"] = { limit, offset, page };
  next();
}

export default pagniation;