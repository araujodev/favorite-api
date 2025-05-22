import { Module } from '@nestjs/common';
import { CustomerEntity } from './domain/entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersController } from './infra/nestjs/v1/customers.controller';
import { CreateCustomerUseCase } from './application/usecases/create/create-customer.usecase';
import { CustomerService } from './application/services/customer.service';
import { CustomerRepository } from './infra/db/repositories/customer.repository';
import { GetCustomerByIdUseCase } from './application/usecases/get-by-id/get-customer-by-id.usecase';
import { GetCustomersUseCase } from './application/usecases/get-all/get-customers.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  controllers: [CustomersController],
  providers: [
    CreateCustomerUseCase,
    GetCustomerByIdUseCase,
    GetCustomersUseCase,
    CustomerService,
    CustomerRepository,
  ],
  exports: [],
})
export class CustomerModule {}
