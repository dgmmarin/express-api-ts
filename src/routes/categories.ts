import { Router } from "express";
import CategoryController from "../controllers/CategoryController";

const controller = new CategoryController();
const router = Router();
router.get('/', controller.listCategories);
router.post('/', controller.createCategory);
router.get('/:categoryId', controller.getCategory);
router.put('/:categoryId', controller.updateCategory);
router.delete('/:categoryId', controller.deleteCategory);

export default router;
