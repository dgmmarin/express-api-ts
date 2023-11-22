import { Router } from "express";
import { ProductHandler } from "../handlers/productHandler";
import { validateProductCreate } from "../validators/product";

const handler = new ProductHandler();
const router = Router();
router.get("/", handler.listProducts);
router.post("/", validateProductCreate, handler.createProduct);
router.get("/:productId", handler.getProduct);
router.put("/:productId", handler.updateProduct);
router.delete("/:productId", handler.deleteProduct);
export default router;
