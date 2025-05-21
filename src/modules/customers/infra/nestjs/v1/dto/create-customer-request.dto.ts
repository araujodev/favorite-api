import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCustomerRequestDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'x6b5U@example.com' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: '123456789', required: false })
  @IsOptional()
  document?: string;
}
