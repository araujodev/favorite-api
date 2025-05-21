import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { ApiBasicAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestCreateCustomerMapper } from './mappers/request-create-customer.mapper';
import { CreateCustomerUseCase } from 'src/modules/customers/application/usecases/create/create-customer.usecase';
import { ResponseCreateCustomerMapper } from './mappers/response-create-customer.mapper';
import { CreateCustomerResponseDto } from './dto/create-customer-response.dto';
import { CreateCustomerRequestDto } from './dto/create-customer-request.dto';
import { ResponseError } from 'src/infra/exception/http-exception-impl/base.error';

@ApiBasicAuth()
@ApiTags('Customers')
@Controller('/customers')
export class CustomersController {
  private readonly logger: Logger;

  constructor(private readonly createCustomerUseCase: CreateCustomerUseCase) {
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
}
