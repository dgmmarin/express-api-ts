import { AppDataSource } from "../data-source";
import { Order } from "../database/entities/Order";
import { OrderProducts } from "../database/entities/OrderProducts";
import Product from "../database/entities/Product";
import { CreateOrderDto, UpdateOrderDto } from "../dto/order.dto";
import { AddProductToOrderDto } from "../dto/product.dto";
import { PaginationResponse } from "../interfaces/generic";

export default class OrderController {
  listOrders = async (offset: number, limit: number, userId?: string): Promise<PaginationResponse<any>> => {
    const orderRepository = AppDataSource.getRepository(Order);
    const count = await orderRepository.count();
    const orders = orderRepository.createQueryBuilder("order");
    if (userId) orders.leftJoinAndSelect("order.user", "user").where("user.uuid = :uuid", { uuid: userId });
    orders.offset(offset)
    orders.limit(limit)
    const data = await orders.getMany();
    return <PaginationResponse<any>>{
      data: data,
      meta: {
        limit,
        offset,
        page: Math.ceil(offset / limit) + 1,
        total: count,
        pages: Math.ceil(count / limit),
      },
    }
  };

  createOrder = async (crateOrderDto: CreateOrderDto) => {
    const order = new Order();
    order.description = crateOrderDto.description;
    order.userId = crateOrderDto.userId;
    order.type = crateOrderDto.type;
    order.status = "created";
    return await AppDataSource.manager.save(order);
  };

  getOrder = async (orderId: string) => {
    const orderRepository = AppDataSource.getRepository(Order);
    return await orderRepository.findOneOrFail({
      where: { uuid: orderId },
      relations: ["user", "orderProducts"],
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

  addProductToOrder = async (orderId: string, addProduct: AddProductToOrderDto) => {
    const orderRepository = AppDataSource.getRepository(Order);
    let order = await orderRepository.findOneOrFail({
      where: {
        uuid: orderId,

      }, relations: ["orderProducts"],
    });

    const product = await AppDataSource.getRepository(Product).findOneOrFail({
      where: { uuid: addProduct.productId },
    });
    const orderProduct = new OrderProducts();
    orderProduct.orderId = order.id;
    orderProduct.productId = product.id;
    orderProduct.quantity = addProduct.quantity;
    orderProduct.price = addProduct.price;
    // order.orderProducts.push(orderProduct);
    await AppDataSource.manager.save(orderProduct);
    order = await orderRepository.findOneOrFail({
      where: {
        uuid: orderId,
      }, relations: ["orderProducts"],
    });
    return order;
  };
}
