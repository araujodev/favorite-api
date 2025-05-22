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
import { RequestCreateCustomerMapper } from './mappers/request-create-customer.mapper';
import { CreateCustomerUseCase } from 'src/modules/customers/application/usecases/create/create-customer.usecase';
import { ResponseCreateCustomerMapper } from './mappers/response-create-customer.mapper';
import { CreateCustomerResponseDto } from './dto/create-customer-response.dto';
import { CreateCustomerRequestDto } from './dto/create-customer-request.dto';
import { ResponseError } from 'src/common/exception/types/base.error';
import { GetCustomerByIdUseCase } from 'src/modules/customers/application/usecases/get-by-id/get-customer-by-id.usecase';
import { ResponseGetCustomerMapper } from './mappers/response-get-customer.mapper';
import { GetCustomerResponseDto } from './dto/get-customer-response.dto';

@ApiBasicAuth()
@ApiTags('Customers')
@Controller('/customers')
export class CustomersController {
  private readonly logger: Logger;

  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly getCustomerByIdUseCase: GetCustomerByIdUseCase,
  ) {
    this.logger = new Logger(CustomersController.name);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Customer created',
    type: CreateCustomerResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while create customer',
    type: ResponseError,
  })
  @Post()
  async create(
    @Body() dto: CreateCustomerRequestDto,
  ): Promise<CreateCustomerResponseDto> {
    try {
      this.logger.log(`Prepare to create new customer`);
      const input = RequestCreateCustomerMapper.toDomain(dto);
      const result = await this.createCustomerUseCase.execute(input);
      return ResponseCreateCustomerMapper.toResponse(result);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        `Failed to create customer`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get customer by id',
    type: GetCustomerResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while get customer',
    type: ResponseError,
  })
  @Get(':customerId')
  async get(
    @Param('customerId') customerId: number,
  ): Promise<GetCustomerResponseDto> {
    try {
      this.logger.log(`Prepare to get customer by id ${customerId}`);
      const result = await this.getCustomerByIdUseCase.execute(customerId);
      return ResponseGetCustomerMapper.toResponse(result);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(`Failed to get customer`, HttpStatus.BAD_REQUEST);
    }
  }
}
