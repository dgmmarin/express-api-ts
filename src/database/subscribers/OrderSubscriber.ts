import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import Context from "node-execution-context";
@EventSubscriber()
export class OrderSubscriber implements EntitySubscriberInterface {
  beforeInsert(event: InsertEvent<any>) {
    const { reference, request } = Context.get() as any;
    console.log("BeforeInsert", event.entity,);
  }

  beforeUpdate(event: UpdateEvent<any>): void | Promise<any> {
    const { reference, request } = Context.get() as any;
    console.log("BeforeUpdate", request, reference);
    event.updatedColumns.forEach((column) => {
      const key: string = column.databaseName;
      const oldValue = event.databaseEntity[column.propertyName];
      const newValue = event.entity ? event.entity[column.propertyName] : event.databaseEntity;
      console.log(`${key} was ${oldValue} is now ${newValue}`);
      console.log(event.queryRunner.data)
    });
  }
}