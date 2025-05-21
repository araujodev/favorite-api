import { ApiProperty } from '@nestjs/swagger';

export class ProductReviewItemResponseDto {
  @ApiProperty({ description: 'Review rate', example: 5 })
  rate: number;

  @ApiProperty({ description: 'Review count', example: 10 })
  count: number;
}

export class ProductItemResponseDto {
  @ApiProperty({ description: 'Product id', example: 1 })
  id: number;

  @ApiProperty({ description: 'Product title', example: 'Product Xpto' })
  title: string;

  @ApiProperty({
    description: 'Image of Product',
    example: 'https://example.com/image.png',
  })
  image: string;

  @ApiProperty({ description: 'Decimal price', example: '9.99' })
  price: number;

  @ApiProperty({
    description: 'Product review',
    type: ProductReviewItemResponseDto,
    required: false,
  })
  review?: ProductReviewItemResponseDto;
}
