import { Exclude } from "class-transformer";
import { IsString, IsNotEmpty, Length, IsOptional } from "class-validator";

export class CreateRoleDto {
  @IsString({ message: "name must be a string" })
  @IsNotEmpty({ message: "name is required" })
  @Length(3, 20, { message: "name must be between 3 and 20 characters long" })
  name: string;

  @IsString({ message: "description must be a string" })
  @IsNotEmpty({ message: "description is required" })
  @Length(3, 100, {
    message: "description must be between 3 and 100 characters long",
  })
  description: string;
}

export class UpdateRoleDto {
  @IsOptional()
  @IsString({ message: "name must be a string" })
  @Length(3, 20, { message: "name must be between 3 and 20 characters long" })
  name: string;

  @IsOptional()
  @IsString({ message: "description must be a string" })
  @Length(3, 100, {
    message: "description must be between 3 and 100 characters long",
  })
  description: string;
}

export class RoleDto {
  @Exclude()
  id: number;
  name: string;
  description: string;
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
  @Exclude()
  deletedAt: Date;
  constructor(partial: Partial<RoleDto>) {
    Object.assign(this, partial);
  }
}