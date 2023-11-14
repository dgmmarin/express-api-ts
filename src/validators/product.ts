import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { CustomRequest } from "../middlewares/auth";
import { CreateProductDto } from "../dto/product.dto";

const validateProductCreate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let createProductDto: CreateProductDto = new CreateProductDto();
    createProductDto = Object.assign(createProductDto, req.body);
    const errs = await validate(createProductDto);
    if (errs.length > 0) {
      return res.status(400).json({ errors: errs });
    } else {
      (req as CustomRequest)["createProductDto"] = createProductDto;
      next();
    }
  } catch (error) {
    return res.status(400).json({ errors: error });
  }
};

const validateProductUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let updateProductDto = new CreateProductDto();
    updateProductDto = Object.assign(updateProductDto, req.body);
    const errs = await validate(updateProductDto);
    if (errs.length > 0) {
      return res.status(400).json({ errors: errs });
    } else {
      (req as CustomRequest)["updateProductDto"] = updateProductDto;
      next();
    }
  } catch (error) {
    return res.status(400).json({ errors: error });
  }
};

export { validateProductCreate, validateProductUpdate };
