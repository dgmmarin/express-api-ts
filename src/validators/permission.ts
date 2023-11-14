import { Request, Response, NextFunction } from "express";
import { CreatePermisionDto } from "../dto/permission.dto";
import { CustomRequest } from "../middlewares/auth";
import { validate } from "class-validator";

const validateCreatePermission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let createPermissionDto: CreatePermisionDto = new CreatePermisionDto();
    createPermissionDto = Object.assign(createPermissionDto, req.body);
    const errs = await validate(createPermissionDto);
    if (errs.length > 0) {
      return res.status(400).json({ errors: errs });
    } else {
      (req as CustomRequest)["createPermissionDto"] = createPermissionDto;
      next();
    }
  } catch (error) {
    return res.status(400).json({ errors: error });
  }
};

const validateUpdatePermission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let updatePermissionDto = new CreatePermisionDto();
    updatePermissionDto = Object.assign(updatePermissionDto, req.body);
    const errs = await validate(updatePermissionDto);
    if (errs.length > 0) {
      return res.status(400).json({ errors: errs });
    } else {
      (req as CustomRequest)["updatePermissionDto"] = updatePermissionDto;
      next();
    }
  } catch (error) {
    return res.status(400).json({ errors: error });
  }
};

export { validateCreatePermission, validateUpdatePermission };
