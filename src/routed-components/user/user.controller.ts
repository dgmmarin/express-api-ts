import { Body, Delete, Get, HttpCode, JsonController, Param, Post, Put } from "routing-controllers";
import { UserFromSession } from "../../middlewares/CustomInterceptor";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Repository } from "typeorm";
import { User } from "../../database/entities/User";
import { AppDataSource } from "../../data-source";
import AuthService from "../../auth/Auth";

@JsonController('/users')
// @UseInterceptor(CustomInterceptor)
export class UserController {
  constructor(
    private readonly userRepository: Repository<User> = AppDataSource.getRepository(User)
  ) { }
  @Get('/')
  async getAllUsers() {
    return await this.userRepository.find();
  }

  @Get('/:uuid')
  async getUserById(@Param('uuid') uuid: string) {
    return await this.userRepository.findOneOrFail({ where: { uuid: uuid } });
  }

  @Post('/')
  @HttpCode(201)
  async createUser(@Body() userDto: CreateUserDto, @UserFromSession({ required: true }) authUser: any) {
    const user = new User();
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.email = userDto.email;
    user.password = AuthService.hashPassword(userDto.password);
    return await this.userRepository.save(user, { data: { "userOnRequest": authUser } });
  }

  @Put('/:uuid')
  async updateUser(@Param('uuid') uuid: string, userDto: UpdateUserDto) {
    const user = await this.userRepository.findOneOrFail({ where: { uuid: uuid } });
    user.firstName = userDto.firstName ?? user.firstName;
    user.lastName = userDto.lastName ?? user.lastName;
    user.email = userDto.email ?? user.email;
    return await this.userRepository.save(user);
  }

  @Delete('/:uuid')
  async deleteUser(@Param('uuid') uuid: string) {
    const user = await this.userRepository.findOneOrFail({ where: { uuid: uuid } });
    user.deletedAt = new Date();
    return await this.userRepository.manager.save(user, { data: "123" });

  }
}