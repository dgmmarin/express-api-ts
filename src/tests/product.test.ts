import { describe } from "jest-circus";
import ProductController from "../controllers/ProductController";
import Product from "../database/entities/Product";
import { AppDataSource } from "../data-source";

describe("Product testing", () => {
  const controller = new ProductController();
  let product: Product;

  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.manager.query("DELETE FROM products WHERE name LIKE 'product%'");
    await AppDataSource.destroy();
  });

  it("Create product", async () => {
    product = await controller.createProduct({
      name: "product 3",
      description: "product 3 description"
    });
    expect(product).toHaveProperty("name", "product 3");
  });

  it("Get all products", async () => {
    const products = await controller.listProducts();
    expect(products.length).toBeGreaterThanOrEqual(1);
  });

  it("Get product by id", async () => {
    product = await controller.getProduct(product.id);
    expect(product).toHaveProperty("name", "product 3");
  });

  it("Update product", async () => {
    product = await controller.updateProduct(product.id, {
      name: "product 3 updated",
      description: "product 3 description updated",
    });
    expect(product).toHaveProperty("name", "product 3 updated");
  });

  it("Delete product", async () => {
    const rez = await controller.deleteProduct(product.id);
    expect(rez.affected).toEqual(1);
  });
});