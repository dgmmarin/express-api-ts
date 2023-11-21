import OrderController from "../controllers/OrderController";
import { Request, Response } from "express";
import { CustomRequest } from "../middlewares/auth";

export default class OrderHandler {
  controller: OrderController;
  constructor() {
    this.controller = new OrderController();
    this.listOrders = this.listOrders.bind(this);
    this.createOrder = this.createOrder.bind(this);
    this.getOrder = this.getOrder.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
  }
  async listOrders(req: Request, res: Response) {
    console.log("fetch orders");
    try {
      const { limit, offset } = (req as CustomRequest)["pagination"];
      const orders = await this.controller.listOrders(offset, limit);
      res.json(orders);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  createOrder = async (req: Request, res: Response) => {
    try {
      const createOrderDto = (req as CustomRequest)["createOrderDto"];
      const result = await this.controller.createOrder(createOrderDto);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  };

  async getOrder(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const order = await this.controller.getOrder(Number(orderId));
      res.json(order);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async updateOrder(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const updateOrderDto = (req as CustomRequest)["updateOrderDto"];
      const result = await this.controller.updateOrder(
        Number(orderId),
        updateOrderDto,
      );
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async deleteOrder(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      await this.controller.deleteOrder(Number(orderId));
      res.json({ message: "Order deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
}
