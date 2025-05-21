import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ApiBasicAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseError } from 'src/common/exception/types/base.error';
import { GetProductsUseCase } from 'src/modules/products/application/usecases/get-products/get-products.usecase';
import { ResponseProductListMapper } from './mappers/response-product-list.mapper';
import { ProductListResponseDto } from './dto/product-list-response.dto';

@ApiBasicAuth()
@ApiTags('Products')
@Controller('/products')
export class ProductsController {
  private readonly logger: Logger;

  constructor(private readonly getProductsUseCase: GetProductsUseCase) {
    this.logger = new Logger(ProductsController.name);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Available Products',
    type: ProductListResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while get products',
    type: ResponseError,
  })
  @Get()
  async list(): Promise<ProductListResponseDto> {
    try {
      this.logger.log(`Prepare to get available products`);
      const result = await this.getProductsUseCase.execute();
      return ResponseProductListMapper.toResponse(result);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(`Failed to get products`, HttpStatus.BAD_REQUEST);
    }
  }
}
