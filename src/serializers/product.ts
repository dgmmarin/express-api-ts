import { Exclude } from "class-transformer";

export default class SanitizedProduct {
  @Exclude()
  id: number;
  uuid: string;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  @Exclude()
  deletedAt: Date;
  constructor(partial: Partial<SanitizedProduct>) {
    Object.assign(this, partial);
  }
}