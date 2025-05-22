import { Injectable, Logger } from '@nestjs/common';
import { CustomerRepository } from '../../infra/db/repositories/customer.repository';
import { CustomerModel } from '../../domain/models/customer.model';

@Injectable()
export class CustomerService {
  private readonly logger: Logger;

  constructor(private readonly customerRepository: CustomerRepository) {
    this.logger = new Logger(CustomerService.name);
  }

  async removeById(customerId: number): Promise<void> {
    try {
      return await this.customerRepository.removeById(customerId);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getCustomers(): Promise<CustomerModel[]> {
    try {
      return await this.customerRepository.findAll();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getCustomerById(customerId: number): Promise<CustomerModel | null> {
    try {
      return await this.customerRepository.findById(customerId);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getCustomerByEmail(email: string): Promise<CustomerModel | null> {
    try {
      return await this.customerRepository.findByEmail(email);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async save(customer: CustomerModel): Promise<CustomerModel> {
    try {
      return await this.customerRepository.save(customer);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async update(customer: CustomerModel): Promise<CustomerModel> {
    try {
      return await this.customerRepository.update(customer);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
