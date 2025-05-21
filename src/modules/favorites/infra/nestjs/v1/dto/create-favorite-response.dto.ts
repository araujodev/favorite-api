import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteCustomerResponseDto {
  @ApiProperty({ description: 'id', example: 1 })
  id: number;

  @ApiProperty({ description: 'Customer name', example: 'John Doe' })
  name: string;
}

export class CreateFavoriteProductReviewResponseDto {
  @ApiProperty({ description: 'Rate', example: 1.1 })
  rate: number;

  @ApiProperty({ description: 'Count', example: 100 })
  count: number;
}

export class CreateFavoriteProductResponseDto {
  @ApiProperty({ description: 'id', example: 1 })
  id: number;

  @ApiProperty({ description: 'Product Title', example: 'SSD 128GB' })
  title: string;

  @ApiProperty({
    description: 'Product Image',
    example: 'http://test.com/im.jpg',
  })
  image: string;

  @ApiProperty({ description: 'Product Price', example: 100 })
  price: number;

  @ApiProperty({
    description: 'Product Review',
    type: CreateFavoriteProductReviewResponseDto,
    required: false,
  })
  review?: CreateFavoriteProductReviewResponseDto;
}

export class CreateFavoriteResponseDto {
  @ApiProperty({ description: 'Favorite id', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Customer id',
    type: CreateFavoriteCustomerResponseDto,
  })
  customer: CreateFavoriteCustomerResponseDto;

  @ApiProperty({
    description: 'Product id',
    type: CreateFavoriteProductResponseDto,
  })
  product: CreateFavoriteProductResponseDto;
}
