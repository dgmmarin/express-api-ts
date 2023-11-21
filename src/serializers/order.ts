import { Exclude } from "class-transformer";
import SanitizedUser from "./user";

export default class SanitizedOrder {
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
  user: SanitizedUser;
  constructor(partial: Partial<SanitizedOrder>) {
    Object.assign(this, partial);
  }
}