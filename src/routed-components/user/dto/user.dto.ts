import { Exclude } from "class-transformer";

export class UserDto {
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

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}