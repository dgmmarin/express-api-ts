import { Body, Delete, Get, JsonController, Param, Post, Put, Req } from "routing-controllers";
import Container, { Inject } from "typedi";
import { ProductsService } from "./products.service";
import { CreateProductDto, UpdateProductDto } from "./dto/product.dto";
import Product from "./entity/product.entity";
import { PaginationResponse } from "../../interfaces/generic";

@JsonController('/products')
export class ProductsController {
  constructor(
    @Inject() readonly productsService: ProductsService = Container.get(ProductsService)
  ) { }

  @Get('/')
  async getAllProducts(@Req() req: any) {
    const { limit, offset } = req.pagination;
    const [data, count] = await this.productsService.paginateProducts(limit, offset);
    return <PaginationResponse<Product>>{
      data,
      meta: {
        total: count,
      },
    }
  }

  @Get('/:uuid')
  async getProduct(@Param('uuid') uuid: string) {
    return await this.productsService.getProductById(uuid);
  }

  @Post('/')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.createProduct(createProductDto);
  }

  @Put('/:uuid')
  async updateProduct(@Param('uuid') uuid: string, @Body() updateProductDto: UpdateProductDto) {
    return await this.productsService.updateProduct(uuid, updateProductDto);
  }

  @Delete('/:uuid')
  async deleteProduct(@Param('uuid') uuid: string) {
    return await this.productsService.deleteProduct(uuid);
  }
}