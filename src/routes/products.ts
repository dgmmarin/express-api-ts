import { Router } from "express";
import { ProductHandler } from "../handlers/productHandler";

const handler = new ProductHandler();
const router = Router();
router.get("/", handler.listProducts);
router.post("/", handler.createProduct);
router.get("/:productId", handler.getProduct);
router.put("/:productId", handler.updateProduct);
router.delete("/:productId", handler.deleteProduct);
export default router;
