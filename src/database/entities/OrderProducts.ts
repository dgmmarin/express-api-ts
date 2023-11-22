import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Order } from "./Order";
import Product from "./Product";
import { v4 } from "uuid";

@Entity("order_products")
export class OrderProducts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("uuid")
  uuid: string;

  @PrimaryColumn({ nullable: false })
  orderId: number;

  @PrimaryColumn({ nullable: false })
  productId: number;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false, default: 0 })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Order, (order) => order.orderProducts)
  @JoinColumn({ name: "orderId" })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderProducts)
  @JoinColumn({ name: "productId" })
  product: Product;

  @BeforeInsert()
  addUuid() {
    this.uuid = v4();
  }
}
