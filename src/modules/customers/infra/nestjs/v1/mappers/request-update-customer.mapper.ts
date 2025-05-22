import { CustomerModel } from 'src/modules/customers/domain/models/customer.model';
import { CreateCustomerRequestDto } from '../dto/create-customer-request.dto';
import { UpdateCustomerRequestDto } from '../dto/update-customer-request.dto';

export class RequestUpdateCustomerMapper {
  static toDomain(
    dto: UpdateCustomerRequestDto,
    customerId: number,
  ): CustomerModel {
    return {
      id: customerId,
      ...(dto.name && { name: dto.name }),
      ...(dto.email && { email: dto.email }),
      ...(dto.document && { document: dto.document }),
    } as CustomerModel;
  }
}
