import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFavoriteProductToCustomerRequest {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  productId: number;
}
