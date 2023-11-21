import ProductController from "../controllers/ProductController";
import { Request, Response } from "express";
import { CustomRequest } from "../middlewares/auth";

export class ProductHandler {
  controller: ProductController;

  constructor() {
    this.controller = new ProductController();
    this.listProducts = this.listProducts.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  async listProducts(req: Request, res: Response) {
    try {
      const { limit, offset } = (req as CustomRequest)["pagination"];
      const products = await this.controller.listProducts(offset, limit);
      res.json(products);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  }

  createProduct = async (req: Request, res: Response) => {
    try {
      const createProductDto = (req as CustomRequest)["createProductDto"];
      const result = await this.controller.createProduct(createProductDto);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  };

  getProduct = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const product = await this.controller.getProduct(Number(productId));
      res.json(product);
    } catch (error) {
      res.status(400).json({ message: "Product not found" });
    }
  };

  updateProduct = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const updateProductDto = (req as CustomRequest)["updateProductDto"];
      const result = await this.controller.updateProduct(
        Number(productId),
        updateProductDto,
      );
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: "Product not found" });
    }
  };

  deleteProduct = async (req: Request, res: Response) => {
    try {
      await this.controller.deleteProduct(Number(req.params.productId));
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: "Product not found" });
    }
  };
}
