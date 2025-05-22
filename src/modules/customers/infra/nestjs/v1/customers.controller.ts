import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Patch,
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
import { GetCustomersUseCase } from 'src/modules/customers/application/usecases/get-all/get-customers.usecase';
import { ResponseGetCustomersMapper } from './mappers/response-get-customers.mapper';
import { GetCustomersResponseDto } from './dto/get-customers-response.dto';
import { RemoveCustomerByIdUseCase } from 'src/modules/customers/application/usecases/remove-by-id/remove-customer-by-id.usecase';
import { UpdateCustomerRequestDto } from './dto/update-customer-request.dto';
import { RequestUpdateCustomerMapper } from './mappers/request-update-customer.mapper';
import { UpdateCustomerUseCase } from 'src/modules/customers/application/usecases/update/update-customer.usecase';
import { ResponseUpdateCustomerMapper } from './mappers/response-update-customer.mapper';

@ApiBasicAuth()
@ApiTags('Customers')
@Controller('/customers')
export class CustomersController {
  private readonly logger: Logger;

  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly getCustomerByIdUseCase: GetCustomerByIdUseCase,
    private readonly getCustomersUseCase: GetCustomersUseCase,
    private readonly removeCustomerByIdUseCase: RemoveCustomerByIdUseCase,
    private readonly updateCustomerUseCase: UpdateCustomerUseCase,
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

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get customers',
    type: GetCustomersResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while get customers',
    type: ResponseError,
  })
  @Get()
  async getAll(): Promise<GetCustomersResponseDto> {
    try {
      this.logger.log(`Prepare to get customer all customers`);
      const result = await this.getCustomersUseCase.execute();
      return ResponseGetCustomersMapper.toResponse(result);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        `Failed to get customers`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Remove customer by id',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while remove customer',
    type: ResponseError,
  })
  @Delete(':customerId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('customerId') customerId: number): Promise<void> {
    try {
      this.logger.log(`Prepare to remove customer by id ${customerId}`);
      await this.removeCustomerByIdUseCase.execute(customerId);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        `Failed to remove customer`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update customer by id',
    type: GetCustomerResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error while update customer',
    type: ResponseError,
  })
  @Patch(':customerId')
  async update(
    @Param('customerId') customerId: number,
    @Body() dto: UpdateCustomerRequestDto,
  ): Promise<GetCustomerResponseDto> {
    try {
      this.logger.log(`Prepare to update customer by id ${customerId}`);
      const input = RequestUpdateCustomerMapper.toDomain(dto, customerId);
      const result = await this.updateCustomerUseCase.execute(input);
      return ResponseUpdateCustomerMapper.toResponse(result);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        `Failed to update customer`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
