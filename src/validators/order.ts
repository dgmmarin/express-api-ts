import { Request, Response, NextFunction } from "express";
import { CreateOrderDto } from "../dto/order.dto";
import { validate } from "class-validator";
import { CustomRequest } from "../middlewares/auth";
import { AddProductToOrderDto } from "../dto/product.dto";

const validateCreateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let createOrderDto = new CreateOrderDto();
    createOrderDto = Object.assign(createOrderDto, req.body);
    const errs = await validate(createOrderDto);
    if (errs.length > 0) {
      return res.status(400).json({ errors: errs });
    } else {
      (req as CustomRequest)["createOrderDto"] = createOrderDto;
      next();
    }
  } catch (error) {
    return res.status(400).json({ errors: error });
  }
};

const validateUpdateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let updateOrderDto = new CreateOrderDto();
    updateOrderDto = Object.assign(updateOrderDto, req.body);
    const errs = await validate(updateOrderDto);
    if (errs.length > 0) {
      return res.status(400).json({ errors: errs });
    } else {
      (req as CustomRequest)["updateOrderDto"] = updateOrderDto;
      next();
    }
  } catch (error) {
    return res.status(400).json({ errors: error });
  }
};

const validateAddProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let updateOrderDto = new AddProductToOrderDto();
    updateOrderDto = Object.assign(updateOrderDto, req.body);
    const errs = await validate(updateOrderDto);
    if (errs.length > 0) {
      return res.status(400).json({ errors: errs });
    } else {
      (req as CustomRequest)["addProduct"] = updateOrderDto;
      next();
    }
  } catch (error) {
    return res.status(400).json({ errors: error });
  }
};

export { validateCreateOrder, validateUpdateOrder, validateAddProduct };
