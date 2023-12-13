import { Delete, Get, JsonController, Param, Body, Post, Req, UseBefore, HttpError } from "routing-controllers";
import { OrdersService } from "./orders.service";
import Container, { Inject } from "typedi";
import { CreateOrderDto } from "./dto/order.dto";
import { PaginationResponse } from "../../interfaces/generic";
import { Order } from "./entity/order.entity";
import { AddProductToOrderDto, OrderProductQuantityDto } from "../products/dto/product.dto";
import { AuthMiddleware } from "../../middlewares/AuthMiddleware";

@JsonController('/orders')
@UseBefore(AuthMiddleware)
export class OrderController {
  constructor(
    @Inject() readonly orderService: OrdersService = Container.get(OrdersService)
  ) { }

  @Get('/')
  async getAllOrders(@Req() req: any) {
    const { limit, offset } = req.pagination;
    const [data, count] = await this.orderService.paginateOrders(limit, offset);
    return <PaginationResponse<Order>>{
      data,
      meta: {
        total: count,
      },
    }
  }

  @Post('/')
  async createOrder(@Body() order: CreateOrderDto) {
    return await this.orderService.createOrder(order);
  }

  @Get('/:orderUuid')
  async getOrderById(@Param('orderUuid') uuid: string) {
    return await this.orderService.getOrderById(uuid);
  }

  @Post('/:orderUuid/products')
  async addProductToOrder(@Param('orderUuid') uuid: string, @Body() product: AddProductToOrderDto) {
    return await this.orderService.addProductToOrder(uuid, product);
  }

  @Post('/:orderUuid/products/:productUuid/increase')
  async updateProductInOrder(@Param('orderUuid') uuid: string, @Param("productUuid") oPuuid: string, @Body() product: OrderProductQuantityDto) {
    return await this.orderService.increaseProductQuantity(uuid, oPuuid, product);
  }

  @Post('/:orderUuid/products/:productUuid/decrease')
  async decreaseProductInOrder(@Param('orderUuid') uuid: string, @Param("productUuid") oPuuid: string, @Body() product: OrderProductQuantityDto) {
    return await this.orderService.decreaseProductQuantity(uuid, oPuuid, product);
  }

  @Post('/:orderUuid/products/:productUuid/resolve')
  async resolveProductQuantity(@Param('orderUuid') uuid: string, @Param('productUuid') oPuuid: string) {
    return await this.orderService.resolveProductQuantity(uuid, oPuuid);
  }

  @Delete('/:orderUuid/products/:productUuid')
  async removeProductFromOrder(@Param('orderUuid') uuid: string, @Param('productUuid') oPuuid: string) {
    return (await this.orderService.removeProductFromOrder(uuid, oPuuid)).affected == 1 ? { "success": true } : new HttpError(400, "Product not found in order");
  }

  @Delete('/:orderUuid')
  async deleteOrder(@Param('orderUuid') uuid: string) {
    return await this.orderService.deleteOrder(uuid);
  }
}