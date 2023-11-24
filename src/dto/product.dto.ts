import { IsString, IsNotEmpty, Length, IsOptional, IsUUID, IsNumber, Min } from "class-validator";

export class CreateProductDto {
  @IsString({ message: "name must be a string" })
  @IsNotEmpty({ message: "name is required" })
  @Length(3, 20, { message: "name must be between 3 and 20 characters long" })
  name: string;

  @IsNumber({}, { message: "price must be a number" })
  @Min(1, { message: "price must be greater than 0" })
  price: number;

  @IsString({ message: "description must be a string" })
  @IsNotEmpty({ message: "description is required" })
  @Length(3, 100, {
    message: "description must be between 3 and 100 characters long",
  })
  description: string;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString({ message: "name must be a string" })
  @Length(3, 20, { message: "name must be between 3 and 20 characters long" })
  name: string;

  @IsOptional()
  @IsNumber({}, { message: "price must be a number" })
  @Min(1, { message: "price must be greater than 0" })
  price: number;

  @IsOptional()
  @IsString({ message: "description must be a string" })
  @Length(3, 100, {
    message: "description must be between 3 and 100 characters long",
  })
  description: string;
}

export class AddProductToOrderDto {
  @IsUUID("4", { message: "productId must be a valid uuid" })
  @IsNotEmpty({ message: "productId is required" })
  productId: string;

  @IsNumber({}, { message: "quantity must be a number" })
  @Min(1, { message: "quantity must be greater than 0" })
  quantity: number;

  @IsNumber({}, { message: "price must be a number" })
  @Min(1, { message: "price must be greater than 0" })
  price: number;
}

export class OrderProductQuantityDto {
  @IsNumber({}, { message: "quantity must be a number" })
  @Min(1, { message: "quantity must be greater than 0" })
  quantity: number;

  @IsUUID("4", { message: "productId must be a valid uuid" })
  @IsNotEmpty({ message: "productId is required" })
  productId: string;
}

