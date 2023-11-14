import { AppDataSource } from "../data-source";
import { Category } from "../database/entities/Category";
import { CreateCategoryDto, UpdateCategoryDto } from "../dto/category.dto";

export default class CategoryController {
  listCategories = async (): Promise<Category[]> => {
    const categoryRepository = AppDataSource.getRepository(Category);
    return await categoryRepository.find();
  };

  createCategory = async (createCategoryDto: CreateCategoryDto) => {
    const category = new Category();
    category.name = createCategoryDto.name;
    category.description = createCategoryDto.description;
    return await AppDataSource.manager.save(category);
  };

  getCategory = async (categoryId: number) => {
    const categoryRepository = AppDataSource.getRepository(Category);
    return await categoryRepository.findOneByOrFail({ id: categoryId });
  };

  updateCategory = async (
    categoryId: number,
    updateCategoryDto: UpdateCategoryDto,
  ) => {
    const categoryRepository = AppDataSource.getRepository(Category);
    const category = await categoryRepository.findOneByOrFail({
      id: categoryId,
    });
    category.name = updateCategoryDto.name ?? category.name;
    category.description =
      updateCategoryDto.description ?? category.description;
    return await categoryRepository.save(category);
  };

  deleteCategory = async (categoryId: number) => {
    const categoryRepository = AppDataSource.getRepository(Category);
    const category = await categoryRepository.findOneByOrFail({
      id: categoryId,
    });
    return await categoryRepository.softDelete({ id: Number(category.id) });
  };
}
