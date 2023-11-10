import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderProducts } from "./OrderProducts";

@Entity("orders")
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column("uuid")
    uuid: string

    @Column({ length: 100, nullable: false })
    description: string

    @Column({ length: 100, nullable: false })
    status: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @OneToMany(() => OrderProducts, (orderProduct) => orderProduct.order)
    orderProducts: OrderProducts[];
}