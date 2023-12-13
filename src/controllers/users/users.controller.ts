import { Body, Delete, Get, HttpCode, JsonController, Param, Post, Put, Req, UseAfter, UseBefore } from "routing-controllers";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entity/user.entity"
import { HasRoles } from "../../auth/decorators";
import { Order } from "../orders/entity/order.entity";
import { PaginationResponse } from "../../interfaces/generic";
import Container, { Inject } from "typedi";
import { UsersService } from "./users.service";
import QueueWorker from "../../components/services/queue";
import { AuthMiddleware } from "../../middlewares/AuthMiddleware";
import { CurrentUserMiddleware } from "../../middlewares/getUserOnRequest";

@UseBefore(CurrentUserMiddleware)
@UseBefore(AuthMiddleware)
@JsonController('/users')
export class UserController {
  constructor(
    @Inject() private readonly usersService: UsersService = Container.get(UsersService),
    @Inject() private readonly ordersService: UsersService = Container.get(UsersService),
    @Inject() private readonly queueService: QueueWorker = Container.get(QueueWorker),
  ) { }

  @Get('/')
  async getAllUsers(@Req() req: any) {
    const { limit, offset } = req.pagination;
    const [users, count] = await this.usersService.paginateUsers(limit, offset);
    return <PaginationResponse<User>>{
      data: users,
      meta: {
        total: count,
      },
    }
  }

  @UseAfter(HasRoles(["admin"]).use)
  @Get('/:userUuid')
  async getUserById(@Param('userUuid') uuid: string) {
    return await this.usersService.getUserById(uuid);
  }

  @Post('/')
  @HttpCode(201)
  async createUser(@Body() userDto: CreateUserDto) {
    await this.usersService.createUser(userDto);
  }

  @Put('/:userUuid')
  async updateUser(@Param('userUuid') uuid: string, @Body() userDto: UpdateUserDto) {
    return await this.usersService.updateUser(uuid, userDto);
  }

  @Delete('/:userUuid')
  async deleteUser(@Param('userUuid') uuid: string) {
    return await this.usersService.deleteUser(uuid);
  }

  @UseBefore(HasRoles(["admin"]).use)
  @Post('/:userUuid/roles/:roleUuid')
  async addRole(@Param('userUuid') uuid: string, @Param('roleUuid') roleUuid: string) {
    return await this.usersService.addRole(uuid, roleUuid);
  }

  @UseBefore(HasRoles(["admin"]).use)
  @Delete('/:userUuid/roles/:roleUuid')
  async removeRole(@Param('userUuid') uuid: string, @Param('roleUuid') roleUuid: string) {
    return await this.usersService.removeRole(uuid, roleUuid);
  }

  @Get('/:userUuid/orders')
  async listOrders(@Param('userUuid') uuid: string, @Req() req: any): Promise<PaginationResponse<Order>> {
    const { limit, offset } = req.pagination;
    const [oredrs, count] = await this.usersService.paginateOrders(uuid, limit, offset);
    return <PaginationResponse<Order>>{
      data: oredrs,
      meta: {
        total: count,
      },
    }
  }

  @Get('/:userUuid/orders/:orderUuid')
  async getOrder(@Param('userUuid') uuid: string, @Param('orderUuid') orderUuid: string) {
    return await this.usersService.getOrder(uuid, orderUuid);
  }
}

