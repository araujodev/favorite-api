import { Injectable, Logger } from '@nestjs/common';
import { CustomerModel } from 'src/modules/customers/domain/models/customer.model';
import { CustomerService } from '../../services/customer.service';

@Injectable()
export class UpdateCustomerUseCase {
  private readonly logger: Logger;

  constructor(private readonly customerService: CustomerService) {
    this.logger = new Logger(UpdateCustomerUseCase.name);
  }

  async execute(input: CustomerModel): Promise<CustomerModel> {
    try {
      const customer = await this.customerService.getCustomerById(
        Number(input.id),
      );

      if (!customer) {
        throw new Error('Customer not found');
      }

      if (input.email) {
        const existentCustomer = await this.customerService.getCustomerByEmail(
          input.email,
        );

        if (existentCustomer && existentCustomer.id !== customer.id) {
          throw new Error('Customer already exists');
        }
      }

      customer.email = input.email ? input.email : customer.email;
      customer.name = input.name ? input.name : customer.name;

      return await this.customerService.update(input);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
