import { CustomerEntity } from 'src/modules/customers/domain/entities/customer.entity';
import { CustomerModel } from 'src/modules/customers/domain/models/customer.model';

export class CustomerMapper {
  static toDomain(entity: CustomerEntity): CustomerModel {
    const model: CustomerModel = {
      name: entity.name,
      email: entity.email,
      document: entity.document,
      id: entity.id,
    };
    return new CustomerModel(model);
  }

  static toPersistence(model: CustomerModel): CustomerEntity {
    const entity = new CustomerEntity();
    entity.name = model.name;
    entity.email = model.email;
    entity.document = model.document;

    return entity;
  }
}
