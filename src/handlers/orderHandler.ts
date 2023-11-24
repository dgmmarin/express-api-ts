import OrderController from "../controllers/OrderController";
import { Request, Response } from "express";
import { CustomRequest } from "../middlewares/auth";
import { plainToClass } from "class-transformer";
import SanitizedOrder from "../serializers/order";
import SanitizedUser from "../serializers/user";
import { OrderProductQuantityDto } from "../dto/product.dto";

export default class OrderHandler {
  controller: OrderController;
  constructor() {
    this.controller = new OrderController();
    this.listOrders = this.listOrders.bind(this);
    this.createOrder = this.createOrder.bind(this);
    this.getOrder = this.getOrder.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.addProductToOrder = this.addProductToOrder.bind(this);
    this.increaseProductQuantity = this.increaseProductQuantity.bind(this);
    this.decreaseProductQuantity = this.decreaseProductQuantity.bind(this);
    this.resolveProductQuantity = this.resolveProductQuantity.bind(this);
    this.removeProductFromOrder = this.removeProductFromOrder.bind(this);
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
      const order = await this.controller.getOrder(orderId);
      const _order = plainToClass(SanitizedOrder, order, {});
      _order.user = plainToClass(SanitizedUser, order.user, {});
      res.json(_order);
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

  async addProductToOrder(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const addProductToOrderDto = (req as CustomRequest)["addProduct"];
      const result = await this.controller.addProductToOrder(
        orderId,
        addProductToOrderDto,
      );
      res.json(result);
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: error });
    }
  }

  async increaseProductQuantity(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const { productId, quantity } = (req as CustomRequest)['modifyOrderProductQuantity'] as OrderProductQuantityDto;
      const result = await this.controller.increaseProductQuantity(
        orderId,
        productId,
        quantity
      );
      res.json(result);
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: error });
    }
  }

  async decreaseProductQuantity(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const { productId, quantity } = (req as CustomRequest)['modifyOrderProductQuantity'] as OrderProductQuantityDto;
      const result = await this.controller.decreaseProductQuantity(
        orderId,
        productId,
        quantity
      );
      res.json(result);
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: error });
    }
  }

  async resolveProductQuantity(req: Request, res: Response) {
    try {
      const { orderId, productId } = req.params;
      const result = await this.controller.resolveProductQuantity(
        orderId,
        productId,
      );
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async removeProductFromOrder(req: Request, res: Response) {
    try {
      const { orderId, productId } = req.params;
      const result = await this.controller.removeProductFromOrder(
        orderId,
        productId,
      );
      res.json(result);
    } catch (error) {
      console.log(error)
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
