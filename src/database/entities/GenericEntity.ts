import { AfterUpdate, BeforeInsert, BeforeUpdate } from "typeorm";
import { uuid } from "uuidv4";

export default class GenericEntity {
    updatedDate: Date;
    initialData: any;
    updatedData: any;
}