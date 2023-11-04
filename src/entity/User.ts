import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm"
import { Role } from "./Role"

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100, nullable: false })
    firstName: string

    @Column({ length: 100, nullable: false })
    lastName: string

    @Column({ length: 100, nullable: false })
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
