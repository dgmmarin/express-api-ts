import { Exclude } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateCategoryDto {
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

export class UpdateCategoryDto {
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

export class CategoryDto {
  @Exclude()
  id: number;
  uuid: string;
  name: string;
  description: string;
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  @Exclude()
  deletedAt: Date;
}
