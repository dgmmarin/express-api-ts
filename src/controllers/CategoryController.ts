import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Category } from "../database/entities/Category";

export default class CategoryController {
    listCategories = async (req: Request, res: Response) => {
        try {
            const categoryRepository = AppDataSource.getRepository(Category);
            const categories = await categoryRepository.find();
            res.json(categories);
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }

    createCategory = async (req: Request, res: Response) => {
        try {
            const { name, description } = req.body;
            const category = new Category();
            category.name = name;
            category.description = description;
            const result = await AppDataSource.manager.save(category);
            res.json(result);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    }

    getCategory = async (req: Request, res: Response) => {
        try {
            const categoryRepository = AppDataSource.getRepository(Category);
            const category = await categoryRepository.findOneByOrFail({ id: Number(req.params.categoryId) });
            res.json(category);
        } catch (error) {
            res.status(400).json({ message: "Category not found" });
        }
    }

    updateCategory = async (req: Request, res: Response) => {
        try {
            const categoryRepository = AppDataSource.getRepository(Category);
            const category = await categoryRepository.findOneByOrFail({ id: Number(req.params.categoryId) });
            const { name, description } = req.body;
            category.name = name ?? category.name;
            category.description = description ?? category.description;
            const result = await categoryRepository.save(category);
            res.json(result);
        } catch (error) {
            res.status(400).json({ message: "Category not found" });
        }
    }

    deleteCategory = async (req: Request, res: Response) => {
        try {
            const categoryRepository = AppDataSource.getRepository(Category);
            const category = await categoryRepository.findOneByOrFail({ id: Number(req.params.categoryId) });
            await categoryRepository.softDelete({ id: Number(category.id) });
            res.json({ message: "Category deleted successfully" });
        } catch (error) {
            res.status(400).json({ message: "Category not found" });
        }
    }
}