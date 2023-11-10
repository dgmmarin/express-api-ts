import { BeforeInsert, Column, CreateDateColumn, Entity, Generated, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Permission } from "./Permission";
import { UUID } from "crypto";
import { v4 } from "uuid";

@Entity("roles")
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("uuid")
    uuid: string

    @Column({ length: 100, nullable: false })
    name: string;

    @Column({ length: 100, nullable: false })
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => User, user => user.roles)
    users: User[];

    @ManyToMany(() => Permission, permission => permission.roles)
    @JoinTable({
        name: "role_permissions",
        joinColumn: { name: "roleId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "permissionId", referencedColumnName: "id" }
    })
    permissions: Permission[];

    @BeforeInsert()
    addUuid() {
        this.uuid = v4()
    }
}