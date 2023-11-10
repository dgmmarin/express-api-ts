import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, ManyToMany, JoinTable, Generated, BeforeUpdate, BeforeInsert, AfterUpdate } from "typeorm"
import { Role } from "./Role"
import { v4 } from 'uuid';
import GenericEntity from "./GenericEntity"

@Entity("users")
export class User extends GenericEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column("uuid")
    uuid: string

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
    @JoinTable(
        {
            name: "user_roles",
            joinColumn: { name: "userId", referencedColumnName: "id" },
            inverseJoinColumn: { name: "roleId", referencedColumnName: "id" }
        })
    roles: Role[]

    @BeforeInsert()
    addUuid() {
        this.uuid = v4()
    }
}
