import { AppDataSource } from "../data-source";
import { Order } from "../database/entities/Order";
import { Request, Response } from "express";

export default class OrderController {
    listOrders = async (req: Request, res: Response) => {
        try {
            const orderRepository = AppDataSource.getRepository(Order);
            const orders = await orderRepository.find();
            res.json(orders);
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }

    createOrder = async (req: Request, res: Response) => {
        try {
            const { description } = req.body;
            const order = new Order();
            order.description = description;
            order.userId = Number(req.body.userId);
            order.type = req.body.type;
            order.status = "created";
            const result = await AppDataSource.manager.save(order);
            res.json(result);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    }

    getOrder = async (req: Request, res: Response) => {
        try {
            const orderRepository = AppDataSource.getRepository(Order);
            const order = await orderRepository.findOneByOrFail({ id: Number(req.params.orderId) });
            res.json(order);
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }

    updateOrder = async (req: Request, res: Response) => {
        try {
            const orderRepository = AppDataSource.getRepository(Order);
            const order = await orderRepository.findOneByOrFail({ id: Number(req.params.orderId) });
            const { description } = req.body;
            order.description = description ?? order.description;
            const result = await orderRepository.save(order);
            res.json(result);
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }

    deleteOrder = async (req: Request, res: Response) => {
        try {
            const orderRepository = AppDataSource.getRepository(Order);
            const order = await orderRepository.findOneByOrFail({ id: Number(req.params.orderId) });
            await orderRepository.softDelete({ id: Number(order.id) });
            res.json({ message: "Order deleted successfully" });
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }
}