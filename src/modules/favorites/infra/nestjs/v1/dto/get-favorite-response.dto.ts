import { ApiProperty } from '@nestjs/swagger';

export class GetFavoriteProductReviewResponseDto {
  @ApiProperty({ description: 'Rate', example: 1.1 })
  rate: number;

  @ApiProperty({ description: 'Count', example: 100 })
  count: number;
}

export class GetFavoriteResponseDto {
  @ApiProperty({ description: 'Favorite id', example: 1 })
  id: number;

  @ApiProperty({ description: 'Product id', example: 1 })
  productId: number;

  @ApiProperty({ description: 'Product title', example: 'Product Xpto' })
  title: string;

  @ApiProperty({
    description: 'Product image',
    example: 'http://test.com/im.jpg',
  })
  image: string;

  @ApiProperty({ description: 'Product price', example: 9.99 })
  price: number;

  @ApiProperty({
    description: 'Product review',
    type: GetFavoriteProductReviewResponseDto,
    required: false,
  })
  review?: GetFavoriteProductReviewResponseDto;
}
