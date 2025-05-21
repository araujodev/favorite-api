import { CustomerModel } from 'src/modules/customers/domain/models/customer.model';
import { CreateCustomerRequestDto } from '../dto/create-customer-request.dto';

export class RequestCreateCustomerMapper {
  static toDomain(dto: CreateCustomerRequestDto): CustomerModel {
    return {
      name: dto.name,
      email: dto.email,
      ...(dto.document && { document: dto.document }),
    } as CustomerModel;
  }
}
