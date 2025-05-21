import { CustomerModel } from 'src/modules/customers/domain/models/customer.model';
import { CreateCustomerResponseDto } from '../dto/create-customer-response.dto';

export class ResponseCreateCustomerMapper {
  static toResponse(model: CustomerModel): CreateCustomerResponseDto {
    return {
      id: model.id,
      name: model.name,
      email: model.email,
      ...(model.document && { document: model.document }),
    } as CreateCustomerResponseDto;
  }
}
