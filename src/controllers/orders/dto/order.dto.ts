import { Exclude, Type } from "class-transformer";
import {
  IsString,
  IsNotEmpty,
  Length,
  IsNumber,
  Min,
  IsOptional,
  ValidateNested,
} from "class-validator";
import { UserDto } from "../../users/dto/user.dto";

export class CreateOrderDto {
  @IsString({ message: "description must be a string" })
  @IsNotEmpty({ message: "description is required" })
  @Length(3, 100, {
    message: "description must be between 3 and 100 characters long",
  })
  description: string;

  @IsNumber({}, { message: "userId must be a number" })
  @Min(1, { message: "userId must be greater than 0" })
  userId: number;

  @IsString({ message: "type must be a string" })
  @IsNotEmpty({ message: "type is required" })
  @Length(3, 20, { message: "type must be between 3 and 20 characters long" })
  type: string;
}

export class UpdateOrderDto {
  @IsOptional()
  @IsString({ message: "description must be a string" })
  @Length(3, 100, {
    message: "description must be between 3 and 100 characters long",
  })
  description: string;
}

export class OrderDto {
  @Exclude()
  id: number;
  uuid: string;
  description: string;

  @Exclude()
  userId: string;
  status: string;
  type: string;
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  deletedAt: Date;

  @ValidateNested({ each: true })
  @Type(() => UserDto)
  user: UserDto;
  orderProducts: OrderProduct[];

  constructor(partial: Partial<OrderDto>) {
    Object.assign(this, partial);
  }
}

export class OrderProduct {
  @Exclude()
  id: number;
  uuid: string;
  @Exclude()
  orderId: string;
  @Exclude()
  productId: string;
  quantity: number;
  price: number;
  isReady: boolean;
  status: string;
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  @Exclude()
  deletedAt: Date;
  constructor(partial: Partial<OrderProduct>) {
    Object.assign(this, partial);
  }
}
