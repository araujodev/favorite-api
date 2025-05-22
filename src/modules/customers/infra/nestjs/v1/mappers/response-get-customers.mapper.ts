import { CustomerModel } from 'src/modules/customers/domain/models/customer.model';
import { GetCustomerResponseDto } from '../dto/get-customer-response.dto';
import { GetCustomersResponseDto } from '../dto/get-customers-response.dto';

export class ResponseGetCustomersMapper {
  static toResponse(models: CustomerModel[]): GetCustomersResponseDto {
    return {
      customers: models.map((model) => {
        return {
          id: model.id,
          name: model.name,
          email: model.email,
          ...(model.document && { document: model.document }),
        } as GetCustomerResponseDto;
      }),
    } as GetCustomersResponseDto;
  }
}
