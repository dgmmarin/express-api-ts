import { Service } from "typedi";
import { Repository } from "typeorm";
import Product from "./entity/product.entity";
import { AppDataSource } from "../../data-source";
import { CreateProductDto, UpdateProductDto } from "./dto/product.dto";

@Service()
export class ProductsService {
  private productsRepository: Repository<Product>;
  constructor() {
    this.productsRepository = AppDataSource.getRepository(Product);
  }

  paginateProducts = async (limit: number, offset: number) => {
    return await AppDataSource.getRepository(Product).findAndCount({ skip: offset, take: limit });
  }

  getProductById = async (uuid: string) => {
    return await this.productsRepository.findOneOrFail({ where: { uuid: uuid } });
  }

  createProduct = async (createProductDto: CreateProductDto) => {
    const product = new Product();
    product.name = createProductDto.name;
    product.description = createProductDto.description;
    product.price = createProductDto.price;
    return await this.productsRepository.save(product);
  }

  updateProduct = async (uuid: string, updateProductDto: UpdateProductDto) => {
    const product = await this.productsRepository.findOneOrFail({ where: { uuid: uuid } });
    product.name = updateProductDto.name ?? product.name;
    product.description = updateProductDto.description ?? product.description;
    product.price = updateProductDto.price ?? product.price;
    return await this.productsRepository.save(product);
  }

  deleteProduct = async (uuid: string) => {
    return await this.productsRepository.softDelete({ uuid: uuid });
  }
}