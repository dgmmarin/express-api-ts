import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import Product from '../database/entities/Product';
export default class ProductController {
    listProducts = async (req: Request, res: Response) => {
        try {
            const productRepository = AppDataSource.getRepository(Product);
            const products = await productRepository.find();
            res.json(products);
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }

    createProduct = async (req: Request, res: Response) => {
        try {
            const { name, description } = req.body;
            const product = new Product();
            product.name = name;
            product.description = description;
            const result = await AppDataSource.manager.save(product);
            res.json(result);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    }

    getProduct = async (req: Request, res: Response) => {
        try {
            const productRepository = AppDataSource.getRepository(Product);
            const product = await productRepository.findOneByOrFail({ id: Number(req.params.productId) });
            res.json(product);
        } catch (error) {
            res.status(400).json({ message: "Product not found" });
        }
    }

    updateProduct = async (req: Request, res: Response) => {
        try {
            const productRepository = AppDataSource.getRepository(Product);
            const product = await productRepository.findOneByOrFail({ id: Number(req.params.productId) });
            const { name, description } = req.body;
            product.name = name ?? product.name;
            product.description = description ?? product.description;
            const result = await productRepository.save(product);
            res.json(result);
        } catch (error) {
            res.status(400).json({ message: "Product not found" });
        }
    }

    deleteProduct = async (req: Request, res: Response) => {
        try {
            const productRepository = AppDataSource.getRepository(Product);
            const product = await productRepository.findOneByOrFail({ id: Number(req.params.productId) });
            await productRepository.softDelete({ id: Number(product.id) });
            res.json({ message: "Product deleted successfully" });
        } catch (error) {
            res.status(400).json({ message: "Product not found" });
        }
    }
}