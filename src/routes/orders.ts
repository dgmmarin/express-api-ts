import { Router } from "express";
import OrderHandler from "../handlers/orderHandler";
import { validateAddProduct, validateCreateOrder, validateUpdateOrder } from "../validators/order";

const handler = new OrderHandler();
const router = Router();

router.get("/", handler.listOrders);
router.post("/", validateCreateOrder, handler.createOrder);
router.get("/:orderId", handler.getOrder);
router.put("/:orderId", validateUpdateOrder, handler.updateOrder);
router.post("/:orderId/product", validateAddProduct, handler.addProductToOrder);
router.delete("/:orderId", handler.deleteOrder);
export default router;
