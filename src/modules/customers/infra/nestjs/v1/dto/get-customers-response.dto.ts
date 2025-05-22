import { ApiProperty } from '@nestjs/swagger';
import { GetCustomerResponseDto } from './get-customer-response.dto';

export class GetCustomersResponseDto {
  @ApiProperty({
    description: 'Customer list',
    isArray: true,
    type: GetCustomerResponseDto,
  })
  customers: GetCustomerResponseDto[];
}
