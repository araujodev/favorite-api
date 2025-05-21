import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBasicAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFavoriteProductToCustomerRequest } from './dto/create-favorite-product-to-customer-request.dto';
import { ResponseError } from 'src/infra/exception/http-exception-impl/base.error';
import { RequestCreateFavoriteMapper } from './mappers/request-create-favorite.mapper';
import { CreateFavoriteUseCase } from 'src/modules/favorites/application/usecases/create/create-favorite.usecase';
import { ResponseCreateFavoriteMapper } from './mappers/response-create-favorite.mapper';

@ApiBasicAuth()
@ApiTags('Customer Favorite Products')
@Controller('/customers')
export class FavoritesController {
  private readonly logger: Logger;

  constructor(private readonly createFavoriteUseCase: CreateFavoriteUseCase) {
    this.logger = new Logger(FavoritesController.name);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Favorite product created to customer',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while create favorite product to customer',
    type: ResponseError,
  })
  @Post('/:customerId/favorites')
  async includeNewProduct(
    @Body() dto: CreateFavoriteProductToCustomerRequest,
    @Param('customerId') customerId: number,
  ): Promise<any> {
    try {
      this.logger.log(
        `Prepare to favorite new product ${dto.productId} to customer ${customerId}`,
      );
      const input = RequestCreateFavoriteMapper.toDomain(dto, customerId);
      const result = await this.createFavoriteUseCase.execute(input);
      return ResponseCreateFavoriteMapper.toResponse(result);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        `Failed to favorite product to customer`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
