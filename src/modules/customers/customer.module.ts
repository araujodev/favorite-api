import { Module } from '@nestjs/common';
import { CustomerEntity } from './domain/entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersController } from './infra/nestjs/v1/customers.controller';
import { CreateCustomerUseCase } from './application/usecases/create/create-customer.usecase';
import { CustomerService } from './application/services/customer.service';
import { CustomerRepository } from './infra/db/repositories/customer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  controllers: [CustomersController],
  providers: [CreateCustomerUseCase, CustomerService, CustomerRepository],
  exports: [],
})
export class CustomerModule {}
