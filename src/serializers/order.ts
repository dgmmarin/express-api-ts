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
  orderProducts: SanitizedOrderProduct[];
  constructor(partial: Partial<SanitizedOrder>) {
    Object.assign(this, partial);
  }
}

export class SanitizedOrderProduct {
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
  constructor(partial: Partial<SanitizedOrderProduct>) {
    Object.assign(this, partial);
  }
}