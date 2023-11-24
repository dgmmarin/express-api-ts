import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";

@EventSubscriber()
export class OrderSubscriber implements EntitySubscriberInterface {
  beforeInsert(event: InsertEvent<any>) {
    console.log("BeforeInsert", event.entity);
    console.log(event.queryRunner.data)
  }

  beforeUpdate(event: UpdateEvent<any>): void | Promise<any> {
    event.updatedColumns.forEach((column) => {
      const key: string = column.databaseName;
      const oldValue = event.databaseEntity[column.propertyName];
      const newValue = event.entity ? event.entity[column.propertyName] : event.databaseEntity;
      console.log(`${key} was ${oldValue} is now ${newValue}`);
      console.log(event.queryRunner.data)
    });
  }
}