import { Request, Response } from "express";
import CategoryController from "../controllers/CategoryController";
import { CustomRequest } from "../middlewares/auth";

export class categoryHandler {
  controller: CategoryController;
  constructor() {
    this.controller = new CategoryController();
    this.listCategories = this.listCategories.bind(this);
    this.createCategory = this.createCategory.bind(this);
    this.getCategory = this.getCategory.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  async listCategories(req: Request, res: Response) {
    try {
      const categories = await this.controller.listCategories();
      res.json(categories);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async createCategory(req: Request, res: Response) {
    try {
      const createCategoryDto = (req as CustomRequest)["createCategoryDto"];
      const result = await this.controller.createCategory(createCategoryDto);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  }

  async getCategory(req: Request, res: Response) {
    try {
      const category = await this.controller.getCategory(
        Number(req.params.categoryId),
      );
      res.json(category);
    } catch (error) {
      res.status(400).json({ message: "Category not found" });
    }
  }

  async updateCategory(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;
      const updateCategoryDto = (req as CustomRequest)["updateCategoryDto"];
      const result = await this.controller.updateCategory(
        Number(categoryId),
        updateCategoryDto,
      );
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: "Category not found" });
    }
  }

  async deleteCategory(req: Request, res: Response) {
    try {
      await this.controller.deleteCategory(Number(req.params.categoryId));
      res.json({ message: "Category deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: "Category not found" });
    }
  }
}
