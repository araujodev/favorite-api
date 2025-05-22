import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBasicAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFavoriteProductToCustomerRequest } from './dto/create-favorite-product-to-customer-request.dto';
import { ResponseError } from 'src/common/exception/types/base.error';
import { RequestCreateFavoriteMapper } from './mappers/request-create-favorite.mapper';
import { CreateFavoriteUseCase } from 'src/modules/favorites/application/usecases/create/create-favorite.usecase';
import { ResponseCreateFavoriteMapper } from './mappers/response-create-favorite.mapper';
import { CreateFavoriteResponseDto } from './dto/create-favorite-response.dto';
import { GetFavoriteListUseCase } from 'src/modules/favorites/application/usecases/get-favorites-list/get-favorite-list.usecase';
import { ResponseGetFavoritesMapper } from './mappers/response-get-favorites.mapper';
import { GetFavoritesResponseDto } from './dto/get-favorites-response.dto';
import { GetFavoriteByProductAndCustomerUseCase } from 'src/modules/favorites/application/usecases/get-favorite-by-product-and-customer/get-favorite-by-product-and-customer.usecase';
import { ResponseGetFavoriteMapper } from './mappers/response-get-favorite.mapper';
import { GetFavoriteResponseDto } from './dto/get-favorite-response.dto';

@ApiBasicAuth()
@ApiTags('Customer Favorite Products')
@Controller('/customers')
export class FavoritesController {
  private readonly logger: Logger;

  constructor(
    private readonly createFavoriteUseCase: CreateFavoriteUseCase,
    private readonly getFavoriteUseCase: GetFavoriteListUseCase,
    private readonly getFavoriteByProductAndCustomerUseCase: GetFavoriteByProductAndCustomerUseCase,
  ) {
    this.logger = new Logger(FavoritesController.name);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Favorite product created to customer',
    type: CreateFavoriteResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while create favorite product to customer',
    type: ResponseError,
  })
  @Post('/:customerId/favorites')
  async includeNewProductToFavorite(
    @Body() dto: CreateFavoriteProductToCustomerRequest,
    @Param('customerId') customerId: number,
  ): Promise<CreateFavoriteResponseDto> {
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

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List favorite products of customer',
    type: GetFavoritesResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while list favorite products of customer',
    type: ResponseError,
  })
  @Get('/:customerId/favorites')
  async list(
    @Param('customerId') customerId: number,
  ): Promise<GetFavoritesResponseDto> {
    try {
      this.logger.log(
        `Prepare to List favorite products to customer ${customerId}`,
      );
      const result = await this.getFavoriteUseCase.execute(customerId);
      return ResponseGetFavoritesMapper.toResponse(result);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        `Failed to list favorite products to customer`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get favorite product of customer',
    type: GetFavoriteResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while get favorite product of customer',
    type: ResponseError,
  })
  @Get('/:customerId/favorites/:productId')
  async getFavorite(
    @Param('customerId') customerId: number,
    @Param('productId') productId: number,
  ): Promise<GetFavoriteResponseDto> {
    try {
      this.logger.log(
        `Prepare to get favorite product ${productId} to customer ${customerId}`,
      );
      const result = await this.getFavoriteByProductAndCustomerUseCase.execute(
        productId,
        customerId,
      );
      return ResponseGetFavoriteMapper.toResponse(result);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        `Failed to get favorite product to customer`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
