import { CustomerModel } from 'src/modules/customers/domain/models/customer.model';
import { UpdateCustomerResponseDto } from '../dto/update-customer-response.dto';

export class ResponseUpdateCustomerMapper {
  static toResponse(model: CustomerModel): UpdateCustomerResponseDto {
    return {
      id: model.id,
      name: model.name,
      email: model.email,
      ...(model.document && { document: model.document }),
    } as UpdateCustomerResponseDto;
  }
}
