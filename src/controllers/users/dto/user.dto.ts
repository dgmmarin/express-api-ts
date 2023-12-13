import { Exclude, Type } from "class-transformer";
import { OrderDto } from "../../orders/dto/order.dto";
import { ValidateNested } from "class-validator";
import { RoleDto } from "../../roles/dto/role.dto";

export class UserDto {
  @Exclude()
  id: number;
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  @Exclude()
  password: string;
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  @Exclude()
  deletedAt: Date;

  @ValidateNested({ each: true })
  @Type(() => RoleDto)
  roles: Partial<RoleDto>[];

  @ValidateNested({ each: true })
  @Type(() => OrderDto)
  orders: Partial<OrderDto>[];
  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}