import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerResponseDto {
  @ApiProperty({ description: 'Customer id', example: 1 })
  id: number;

  @ApiProperty({ description: 'Customer name', example: 'John Doe' })
  name: string;

  @ApiProperty({ description: 'Customer email', example: 'x6b5U@example.com' })
  email: string;

  @ApiProperty({
    description: 'Customer document',
    example: '123456789',
    required: false,
  })
  document?: string;
}
