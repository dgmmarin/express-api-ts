import { NextFunction, Response, Request } from "express";
import { CreateCategoryDto } from "../dto/category.dto";
import { CustomRequest } from "../middlewares/auth";
import { validate } from "class-validator";

const validateCategoryCreate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let createCategoryDto = new CreateCategoryDto();
    createCategoryDto = Object.assign(createCategoryDto, req.body);
    const errs = await validate(createCategoryDto);
    if (errs.length > 0) {
      return res.status(400).json({ errors: errs });
    } else {
      (req as CustomRequest)["createCategoryDto"] = createCategoryDto;
      next();
    }
  } catch (error) {
    return res.status(400).json({ errors: error });
  }
};

const validateCategoryUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let updateCategoryDto = new CreateCategoryDto();
    updateCategoryDto = Object.assign(updateCategoryDto, req.body);
    const errs = await validate(updateCategoryDto);
    if (errs.length > 0) {
      return res.status(400).json({ errors: errs });
    } else {
      (req as CustomRequest)["updateCategoryDto"] = updateCategoryDto;
      next();
    }
  } catch (error) {
    return res.status(400).json({ errors: error });
  }
};

export { validateCategoryCreate, validateCategoryUpdate };
