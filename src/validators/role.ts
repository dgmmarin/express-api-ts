import { Request, Response, NextFunction } from "express";
import { CreateRoleDto } from "../dto/role.dto";
import { validate } from "class-validator";
import { CustomRequest } from "../middlewares/auth";

const validateRoleCreate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let createdRole: CreateRoleDto = new CreateRoleDto();
    createdRole = Object.assign(createdRole, req.body);
    const errs = await validate(createdRole);
    if (errs.length > 0) {
      return res.status(400).json({ errors: errs });
    } else {
      (req as CustomRequest)["createRoleDto"] = createdRole;
      next();
    }
  } catch (error) {
    return res.status(400).json({ errors: error });
  }
};

const validateRoleUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let updateRoleDto = new CreateRoleDto();
    updateRoleDto = Object.assign(updateRoleDto, req.body);
    const errs = await validate(updateRoleDto);
    if (errs.length > 0) {
      return res.status(400).json({ errors: errs });
    } else {
      (req as CustomRequest)["updateRoleDto"] = updateRoleDto;
      next();
    }
  } catch (error) {
    return res.status(400).json({ errors: error });
  }
};

export { validateRoleCreate, validateRoleUpdate };
