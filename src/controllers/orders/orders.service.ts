import { Service } from "typedi";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Order } from "./entity/order.entity";
import { CreateOrderDto } from "./dto/order.dto";
import Product from "../products/entity/product.entity";
import { OrderProducts } from "../order-products/entity/order-products.entity";
import { AddProductToOrderDto, OrderProductQuantityDto } from "../products/dto/product.dto";

@Service()
export class OrdersService {
  private ordersRepository: Repository<Order>;
  constructor() {
    this.ordersRepository = AppDataSource.getRepository(Order);
  }

  paginateOrders = async (limit: number, offset: number) => {
    return await AppDataSource.getRepository(Order).findAndCount({ skip: offset, take: limit });
  }

  getOrderById = async (uuid: string) => {
    return await this.ordersRepository.findOneOrFail({ where: { uuid: uuid }, relations: ["orderProducts.product"] });
  }

  createOrder = async (createOrderDto: CreateOrderDto) => {
    const order = new Order();
    order.description = createOrderDto.description;
    order.userId = createOrderDto.userId;
    order.type = createOrderDto.type;
    order.status = "created";
    return await this.ordersRepository.save(order);
  }

  updateOrder = async (uuid: string, updateOrderDto: CreateOrderDto) => {
    const order = await this.ordersRepository.findOneOrFail({ where: { uuid: uuid } });
    order.description = updateOrderDto.description ?? order.description;
    return await this.ordersRepository.save(order);
  }

  deleteOrder = async (uuid: string) => {
    return await this.ordersRepository.softDelete({ uuid: uuid });
  }

  addProductToOrder = async (uuid: string, addProduct: AddProductToOrderDto) => {
    const order = await this.ordersRepository.findOneOrFail({
      where: { uuid: uuid }
    });

    const product = await AppDataSource.getRepository(Product).findOneOrFail({
      where: { uuid: addProduct.productId },
    });
    const orderProduct = new OrderProducts();
    orderProduct.orderId = order.id;
    orderProduct.productId = product.id;
    orderProduct.quantity = addProduct.quantity;
    orderProduct.price = addProduct.price;
    await AppDataSource.getRepository(OrderProducts).save(orderProduct);
    return order;
  }

  increaseProductQuantity = async (uuid: string, oPuuid: string, orderProduct: OrderProductQuantityDto) => {
    const order = await this.ordersRepository.createQueryBuilder("order")
      .leftJoinAndSelect("order.orderProducts", "orderProducts")
      .leftJoinAndSelect("orderProducts.product", "product")
      .where("order.uuid = :orderId", { "orderId": uuid })
      .andWhere("orderProducts.uuid = :opUUID", { "opUUID": oPuuid })
      .andWhere("product.uuid = :productId", { productId: orderProduct.productId })
      .getOneOrFail();
    const _orderProduct = order.orderProducts[0];
    orderProduct.quantity += orderProduct.quantity;
    const op = await AppDataSource.manager.save(_orderProduct);
    order.orderProducts[0] = op
    return order;
  }

  decreaseProductQuantity = async (uuid: string, oPuuid: string, orderProduct: OrderProductQuantityDto) => {
    const order = await this.ordersRepository.createQueryBuilder("order")
      .leftJoinAndSelect("order.orderProducts", "orderProducts")
      .leftJoinAndSelect("orderProducts.product", "product")
      .where("order.uuid = :orderId", { "orderId": uuid })
      .andWhere("orderProducts.uuid = :opUUID", { "opUUID": oPuuid })
      .andWhere("product.uuid = :productId", { productId: orderProduct.productId })
      .getOneOrFail();
    const _orderProduct = order.orderProducts[0];
    orderProduct.quantity -= orderProduct.quantity;
    const op = await AppDataSource.manager.save(_orderProduct);
    order.orderProducts[0] = op
    return order;
  }

  removeProductFromOrder = async (uuid: string, productUuid: string) => {
    const order = await this.ordersRepository.createQueryBuilder("order")
      .leftJoinAndSelect("order.orderProducts", "orderProducts")
      .leftJoinAndSelect("orderProducts.product", "product")
      .where("order.uuid = :orderId", { uuid })
      .where("orderProducts.uuid = :productId", { productId: productUuid })
      .getOneOrFail();
    return await AppDataSource.getRepository(OrderProducts).softDelete({ id: order.orderProducts[0].id });
  }

  resolveProductQuantity = async (uuid: string, productUuid: string) => {
    const order = await this.ordersRepository.createQueryBuilder("order")
      .leftJoinAndSelect("order.orderProducts", "orderProducts")
      .leftJoinAndSelect("orderProducts.product", "product")
      .where("order.uuid = :orderId", { uuid })
      .where("orderProducts.uuid = :productId", { productId: productUuid })
      .getOneOrFail();
    order.orderProducts[0].isReady = true;
    return await this.ordersRepository.save(order);
  }
}