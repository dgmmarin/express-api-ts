import { Router } from "express";
import OrderController from "../controllers/OrderController";

const controller = new OrderController();
const router = Router();

router.get('/', controller.listOrders);
router.post('/', controller.createOrder);
router.get('/:orderId', controller.getOrder);
router.put('/:orderId', controller.updateOrder);
router.delete('/:orderId', controller.deleteOrder);

export default router;
