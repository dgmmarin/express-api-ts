import { Service } from "typedi";
import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { AppDataSource } from "../../data-source";
import AuthService from "../../auth/Auth";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Order } from "../orders/entity/order.entity";
import { Role } from "../roles/entity/role.entity";

@Service()
export class UsersService {
  private usersRepository: Repository<User>;
  private rolesRepository: Repository<Role>;
  constructor() {
    this.usersRepository = AppDataSource.getRepository(User);
    this.rolesRepository = AppDataSource.getRepository(Role);
  }

  getUserByEmail = async (email: string): Promise<User | null> => {
    return await this.usersRepository.findOne({
      where: { email: email },
      relations: ["roles"],
    });
  };

  paginateUsers = async (limit: number, offset: number) => {
    return await AppDataSource.getRepository(User).findAndCount({ skip: offset, take: limit });
  }

  getUserById = async (uuid: string) => {
    return await this.usersRepository.findOneOrFail({
      where: {
        uuid: uuid
      },
      relations: ["roles"]
    });
  }

  createUser = async (userDto: CreateUserDto) => {
    const user = new User();
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.email = userDto.email;
    user.password = AuthService.hashPassword(userDto.password);
    return await this.usersRepository.save(user);
  }

  updateUser = async (uuid: string, userDto: UpdateUserDto) => {
    const user = await this.usersRepository.findOneOrFail({ where: { uuid: uuid } });
    user.firstName = userDto.firstName ?? user.firstName;
    user.lastName = userDto.lastName ?? user.lastName;
    user.email = userDto.email ?? user.email;
    return await this.usersRepository.save(user);
  }

  deleteUser = async (uuid: string) => {
    return await this.usersRepository.softDelete({ uuid: uuid });
  }

  addRole = async (uuid: string, roleUuid: string) => {
    const role = await this.rolesRepository.findOneOrFail({ where: { uuid: roleUuid } });
    const user = await this.usersRepository.findOneOrFail({ where: { uuid: uuid }, relations: ["roles"] });
    user.roles.push(role);
    return await this.usersRepository.save(user);
  }

  removeRole = async (uuid: string, roleUuid: string) => {
    const role = await this.rolesRepository.findOneOrFail({ where: { uuid: roleUuid } });
    const user = await this.usersRepository.findOneOrFail({ where: { uuid: uuid }, relations: ["roles"] });
    user.roles = user.roles.filter((userRole) => userRole.uuid !== role.uuid);
    return await this.usersRepository.save(user);
  }

  paginateOrders = async (uuid: string, limit: number, offset: number) => {
    return await AppDataSource.getRepository(Order).createQueryBuilder("orders")
      .leftJoin("orders.user", "user")
      .where("user.uuid = :uuid", { uuid: uuid })
      .skip(offset)
      .take(limit)
      .getManyAndCount();
  }

  getOrder = async (uuid: string, orderId: string) => {
    return await AppDataSource.getRepository(Order).createQueryBuilder("orders")
      .leftJoin("orders.user", "user")
      .where("user.uuid = :uuid", { uuid: uuid })
      .andWhere("orders.uuid = :orderId", { orderId: orderId })
      .getOneOrFail();
  }



}