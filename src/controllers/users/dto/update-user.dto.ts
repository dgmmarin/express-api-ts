import { IsOptional, IsString, Length, IsEmail } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: "firstName must be a string" })
  @Length(3, 20, {
    message: "firstName must be between 3 and 20 characters long",
  })
  firstName: string;

  @IsOptional()
  @IsString({ message: "lastName must be a string" })
  @Length(3, 20, {
    message: "lastName must be between 3 and 20 characters long",
  })
  lastName: string;

  @IsOptional()
  @IsEmail({}, { message: "email must be a valid email address" })
  email: string;
}