import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { OrderProducts } from "../../order-products/entity/order-products.entity";
import { User } from "../../users/entity/user.entity";
import { v4 } from "uuid";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("uuid")
  uuid: string;

  @Column({ nullable: false })
  userId: number;

  @Column({ length: 100, nullable: false })
  description: string;

  @Column({ length: 100, nullable: false })
  "type": string;

  @Column({ length: 100, nullable: false })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => OrderProducts, (orderProduct) => orderProduct.order)
  orderProducts: OrderProducts[];

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @BeforeInsert()
  addUuid() {
    this.uuid = v4();
  }
}
