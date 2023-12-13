import { Body, Delete, Get, JsonController, Param, Post, Req, UseBefore } from "routing-controllers";
import Container, { Inject } from "typedi";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/category.dto";
import { Category } from "./entity/category.entity";
import { PaginationResponse } from "../../interfaces/generic";
import { AuthMiddleware } from "../../middlewares/AuthMiddleware";

@JsonController('/categories')
@UseBefore(AuthMiddleware)
export class CategoriesController {
  constructor(
    @Inject() readonly categoriesService: CategoriesService = Container.get(CategoriesService)
  ) { }

  @Get('/')
  async getAllCategories(@Req() req: any) {
    const { limit, offset } = req.pagination;
    const [data, count] = await this.categoriesService.paginateCategories(limit, offset);
    return <PaginationResponse<Category>>{
      data,
      meta: {
        total: count,
      },
    }
  }

  @Get('/:uuid')
  async getCategory(@Param('uuid') uuid: string) {
    return await this.categoriesService.getCategory(uuid);
  }

  @Post('/')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.createCategory(createCategoryDto);
  }

  @Post('/:uuid')
  async updateCategory(@Param('uuid') uuid: string, @Body() updateCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.updateCategory(uuid, updateCategoryDto);
  }

  @Delete('/:uuid')
  async deleteCategory(@Param('uuid') uuid: string) {
    return await this.categoriesService.deleteCategory(uuid);
  }
}