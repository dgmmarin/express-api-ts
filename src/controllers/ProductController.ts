import { AppDataSource } from "../data-source";
import Product from "../database/entities/Product";
import { CreateProductDto, UpdateProductDto } from "../dto/product.dto";
import { UpdateResult } from "typeorm";
import { PaginationResponse } from "../interfaces/generic";
export default class ProductController {
  listProducts = async (offset: number, limit: number): Promise<PaginationResponse<Product>> => {
    const productRepository = AppDataSource.getRepository(Product);
    const count = await productRepository.count();
    const products = await productRepository.createQueryBuilder("product")
      .offset(offset)
      .limit(limit)
      .getMany();
    return <PaginationResponse<Product>>{
      data: products,
      meta: {
        limit,
        offset,
        page: offset / limit,
        total: count,
        pages: Math.ceil(count / limit),
      },
    }
  };

  createProduct = async (
    createProductDto: CreateProductDto,
  ): Promise<Product> => {
    const product = new Product();
    product.name = createProductDto.name;
    product.description = createProductDto.description;
    product.price = createProductDto.price;
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
    product.price = updateProductDto.price ?? product.price;
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
