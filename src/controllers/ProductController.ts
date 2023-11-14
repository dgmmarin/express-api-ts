import { AppDataSource } from "../data-source";
import Product from "../database/entities/Product";
import { CreateProductDto, UpdateProductDto } from "../dto/product.dto";
import { UpdateResult } from "typeorm";
export default class ProductController {
  listProducts = async (): Promise<Product[]> => {
    const productRepository = AppDataSource.getRepository(Product);
    return await productRepository.find();
  };

  createProduct = async (
    createProductDto: CreateProductDto,
  ): Promise<Product> => {
    const product = new Product();
    product.name = createProductDto.name;
    product.description = createProductDto.description;
    return await AppDataSource.manager.save(product);
  };

  getProduct = async (productId: number): Promise<Product> => {
    const productRepository = AppDataSource.getRepository(Product);
    return await productRepository.findOneByOrFail({
      id: productId,
    });
  };

  updateProduct = async (
    productId: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> => {
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOneByOrFail({
      id: productId,
    });
    product.name = updateProductDto.name ?? product.name;
    product.description = updateProductDto.description ?? product.description;
    return await productRepository.save(product);
  };

  deleteProduct = async (productId: number): Promise<UpdateResult> => {
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOneByOrFail({
      id: productId,
    });
    return await productRepository.softDelete({ id: Number(product.id) });
  };
}
