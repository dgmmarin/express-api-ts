import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm"
import { Role } from "./Role"
import { UUID } from "typeorm/driver/mongodb/bson.typings"

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @PrimaryGeneratedColumn("uuid")
    uuid: UUID

    @Column({ length: 100, nullable: false })
    firstName: string

    @Column({ length: 100, nullable: false })
    lastName: string

    @Column({ length: 100, nullable: false, unique: true })
    email: string

    @Column({ nullable: false })
    password: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @ManyToMany(() => Role, role => role.users)
    @JoinTable({name: "user_roles"})
    roles: Role[]
}
