import { plainToClass } from "class-transformer";
import { AppDataSource } from "../data-source";
import { Order } from "../database/entities/Order";
import { OrderProducts } from "../database/entities/OrderProducts";
import Product from "../database/entities/Product";
import { CreateOrderDto, UpdateOrderDto } from "../dto/order.dto";
import { AddProductToOrderDto } from "../dto/product.dto";
import { PaginationResponse } from "../interfaces/generic";
import SanitizedOrder, { SanitizedOrderProduct } from "../serializers/order";
import SanitizedUser from "../serializers/user";

export default class OrderController {
  listOrders = async (offset: number, limit: number, userId?: string): Promise<PaginationResponse<any>> => {
    const orderRepository = AppDataSource.getRepository(Order);
    const count = await orderRepository.count();
    const orders = orderRepository.createQueryBuilder("order");
    orders.leftJoinAndSelect("order.user", "user")
    if (userId) {
      orders.where("order.userId = :userId", { userId });
    }
    orders.offset(offset)
    orders.limit(limit)
    const data = await orders.getMany();
    const ordersToreturn = data.map((order) => {
      const _order = plainToClass(SanitizedOrder, order)
      _order.user = plainToClass(SanitizedUser, order.user)
      return _order
    });
    return <PaginationResponse<any>>{
      data: ordersToreturn,
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
      relations: ["user", "orderProducts", "orderProducts.product"],
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
    await AppDataSource.getRepository(OrderProducts).save(orderProduct, { data: { "user": "abcdef" } });
    order = await orderRepository.findOneOrFail({
      where: {
        uuid: orderId,
      }, relations: ["orderProducts"],
    });
    return order;
  };

  increaseProductQuantity = async (orderId: string, productId: string, quantity: number) => {
    const orderRepository = AppDataSource.getRepository(Order);
    const createQueryBuilder = orderRepository.createQueryBuilder("order");

    const order = await createQueryBuilder
      .leftJoinAndSelect("order.orderProducts", "orderProducts")
      .leftJoinAndSelect("orderProducts.product", "product")
      .where("order.uuid = :orderId", { orderId })
      .where("orderProducts.uuid = :productId", { productId })
      .getOneOrFail();
    const orderProduct = order.orderProducts[0];
    orderProduct.quantity += quantity;
    const op = await AppDataSource.manager.save(orderProduct, { data: { "user": "abcdef" } });
    order.orderProducts[0] = op
    const _order = plainToClass(SanitizedOrder, order);
    _order.user = plainToClass(SanitizedUser, order.user);
    _order.orderProducts = order.orderProducts.map((_orderProduct) => plainToClass(SanitizedOrderProduct, _orderProduct));
    return _order;
  }

  decreaseProductQuantity = async (orderId: string, productId: string, quantity: number) => {
    const orderRepository = AppDataSource.getRepository(Order);
    const createQueryBuilder = orderRepository.createQueryBuilder("order");

    const order = await createQueryBuilder
      .leftJoinAndSelect("order.orderProducts", "orderProducts")
      .leftJoinAndSelect("orderProducts.product", "product")
      .where("order.uuid = :orderId", { orderId })
      .where("orderProducts.uuid = :productId", { productId })
      .getOneOrFail();
    const orderProduct = order.orderProducts[0];
    orderProduct.quantity -= orderProduct.quantity > quantity ? quantity : 0;
    const op = await AppDataSource.manager.save(orderProduct, { data: { "user": "abcdef" } });
    order.orderProducts[0] = op
    const _order = plainToClass(SanitizedOrder, order);
    _order.user = plainToClass(SanitizedUser, order.user);
    _order.orderProducts = order.orderProducts.map((_orderProduct) => plainToClass(SanitizedOrderProduct, _orderProduct));
    return _order;
  }

  removeProductFromOrder = async (orderId: string, productId: string) => {
    const orderRepository = AppDataSource.getRepository(Order);
    const createQueryBuilder = orderRepository.createQueryBuilder("order");
    const order = await createQueryBuilder
      .leftJoinAndSelect("order.orderProducts", "orderProducts")
      .leftJoinAndSelect("orderProducts.product", "product")
      .where("order.uuid = :orderId", { orderId })
      .where("orderProducts.uuid = :productId", { productId })
      .getOneOrFail();
    const orderProduct = order.orderProducts[0];
    orderProduct.deletedAt = new Date();
    await AppDataSource.getRepository(OrderProducts).save(orderProduct, { data: { "user": "abcdef" } });
    return order;
  }

  resolveProductQuantity = async (orderId: string, productId: string) => {
    const orderRepository = AppDataSource.getRepository(Order);
    const createQueryBuilder = orderRepository.createQueryBuilder("order");

    const order = await createQueryBuilder
      .leftJoinAndSelect("order.orderProducts", "orderProducts")
      .leftJoinAndSelect("orderProducts.product", "product")
      .where("order.uuid = :orderId", { orderId })
      .where("orderProducts.uuid = :productId", { productId })
      .getOneOrFail();
    const orderProduct = order.orderProducts[0];
    orderProduct.isReady = true;
    await AppDataSource.getRepository(OrderProducts).save(orderProduct, { data: { "user": "abcdef" } });
    return order;
  }
}

