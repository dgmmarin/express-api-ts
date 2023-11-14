import { AppDataSource } from "../data-source";
import { Order } from "../database/entities/Order";
import { CreateOrderDto, UpdateOrderDto } from "../dto/order.dto";

export default class OrderController {
  listOrders = async () => {
    const orderRepository = AppDataSource.getRepository(Order);
    return await orderRepository.find();
  };

  createOrder = async (crateOrderDto: CreateOrderDto) => {
    const order = new Order();
    order.description = crateOrderDto.description;
    order.userId = crateOrderDto.userId;
    order.type = crateOrderDto.type;
    order.status = "created";
    return await AppDataSource.manager.save(order);
  };

  getOrder = async (orderId: number) => {
    const orderRepository = AppDataSource.getRepository(Order);
    return await orderRepository.findOneByOrFail({
      id: orderId,
    });
  };

  updateOrder = async (orderId: number, updateOrderDto: UpdateOrderDto) => {
    const orderRepository = AppDataSource.getRepository(Order);
    const order = await orderRepository.findOneByOrFail({
      id: orderId,
    });
    order.description = updateOrderDto.description ?? order.description;
    return await orderRepository.save(order);
  };

  deleteOrder = async (orderId: number) => {
    const orderRepository = AppDataSource.getRepository(Order);
    return await orderRepository.softDelete({ id: orderId });
  };
}
