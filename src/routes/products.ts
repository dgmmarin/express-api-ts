import { Router } from "express";
import ProductController from "../controllers/ProductController";
import authenticateJWT from "../middlewares/auth";

const controller = new ProductController();
const router = Router();
router.get('/', controller.listProducts);
router.post('/', controller.createProduct);
router.get('/:productId', controller.getProduct);
router.put('/:productId', controller.updateProduct);
router.delete('/:productId', controller.deleteProduct);
export default router;
