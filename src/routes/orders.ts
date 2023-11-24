import { Router } from "express";
import OrderHandler from "../handlers/orderHandler";
import { validateAddProduct, validateCreateOrder, validateModifyOrderProductQuantity, validateUpdateOrder } from "../validators/order";

const handler = new OrderHandler();
const router = Router();

router.get("/", handler.listOrders);
router.post("/", validateCreateOrder, handler.createOrder);
router.get("/:orderId", handler.getOrder);
router.put("/:orderId", validateUpdateOrder, handler.updateOrder);
router.post("/:orderId/products", validateAddProduct, handler.addProductToOrder);
router.post("/:orderId/products/:productId/increase", validateModifyOrderProductQuantity, handler.increaseProductQuantity);
router.post("/:orderId/products/:productId/decrease", validateModifyOrderProductQuantity, handler.decreaseProductQuantity);
router.post("/:orderId/products/:productId/resolve", handler.resolveProductQuantity);
router.delete("/:orderId/products/:productId", handler.removeProductFromOrder);
router.delete("/:orderId", handler.deleteOrder);
export default router;
