import { ApiProperty } from '@nestjs/swagger';
import { ProductItemResponseDto } from './product-item-response.dto';

export class ProductListResponseDto {
  @ApiProperty({
    description: 'Product Items',
    isArray: true,
    type: ProductItemResponseDto,
  })
  products: ProductItemResponseDto[];
}
