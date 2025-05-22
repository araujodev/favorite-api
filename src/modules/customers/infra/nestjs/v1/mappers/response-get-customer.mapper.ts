import { CustomerModel } from 'src/modules/customers/domain/models/customer.model';
import { GetCustomerResponseDto } from '../dto/get-customer-response.dto';

export class ResponseGetCustomerMapper {
  static toResponse(model: CustomerModel): GetCustomerResponseDto {
    return {
      id: model.id,
      name: model.name,
      email: model.email,
      ...(model.document && { document: model.document }),
    } as GetCustomerResponseDto;
  }
}
