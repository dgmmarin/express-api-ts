import { Service } from "typedi";
import { Repository } from "typeorm";
import { Category } from "./entity/category.entity";
import { AppDataSource } from "../../data-source";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto/category.dto";

@Service()
export class CategoriesService {
  private categoriesRepository: Repository<Category>;
  constructor() {
    this.categoriesRepository = AppDataSource.getRepository(Category);
  }

  paginateCategories = async (limit: number, offset: number) => {
    return await AppDataSource.getRepository(Category).findAndCount({ skip: offset, take: limit });
  }

  getCategory = async (uuid: string) => {
    return await this.categoriesRepository.findOneOrFail({
      where: {
        uuid: uuid
      }
    });
  }

  createCategory = async (createCategoryDto: CreateCategoryDto) => {
    const category = new Category();
    category.name = createCategoryDto.name;
    category.description = createCategoryDto.description;
    return await this.categoriesRepository.save(category);
  }

  updateCategory = async (uuid: string, updateCategoryDto: UpdateCategoryDto) => {
    const category = await this.categoriesRepository.findOneOrFail({ where: { uuid: uuid } });
    category.name = updateCategoryDto.name ?? category.name;
    category.description = updateCategoryDto.description ?? category.description;
    return await this.categoriesRepository.save(category);
  }

  deleteCategory = async (uuid: string) => {
    return await this.categoriesRepository.softDelete({ uuid: uuid });
  }
}