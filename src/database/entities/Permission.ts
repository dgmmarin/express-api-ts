import { BeforeInsert, Column, CreateDateColumn, Entity, Generated, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "./Role";
import { UUID } from "crypto";
import { v4 } from "uuid";

@Entity("permissions")  
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("uuid")
    uuid: string
    
    @Column()
    name: string;
    
    @Column()
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => Role, role => role.permissions)
    roles: Permission[];

    @BeforeInsert()
    addUuid() {
        this.uuid = v4()
    }
}