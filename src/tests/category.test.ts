import { describe } from "jest-circus";
import CategoryController from "../controllers/CategoryController";
import { AppDataSource } from "../data-source";
import { Category } from "../database/entities/Category";

describe("Category testing", () => {
  const controller = new CategoryController();
  let category: Category;
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.manager.query("DELETE FROM categories WHERE name LIKE 'category%'");
    await AppDataSource.destroy();
  });

  it("Create category", async () => {
    category = await controller.createCategory({
      name: "category 3",
      description: "category 3 description",
    });
    expect(category).toHaveProperty("name", "category 3");
  });

  it("Get all categories", async () => {
    const categories = await controller.listCategories();
    expect(categories.length).toBeGreaterThanOrEqual(1);
  });

  it("Get category by id", async () => {
    category = await controller.getCategory(category.id);
    expect(category).toHaveProperty("name", "category 3");
  });

  it("Update category", async () => {
    category = await controller.updateCategory(category.id, {
      name: "category 3 updated",
      description: "category 3 description updated",
    });
    expect(category).toHaveProperty("name", "category 3 updated");
  });

  it("Delete category", async () => {
    const rez = await controller.deleteCategory(category.id);
    expect(rez.affected).toEqual(1);
  });
});

