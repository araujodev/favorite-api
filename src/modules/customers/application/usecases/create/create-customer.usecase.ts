import { Injectable, Logger } from '@nestjs/common';
import { CustomerModel } from 'src/modules/customers/domain/models/customer.model';
import { CustomerService } from '../../services/customer.service';

@Injectable()
export class CreateCustomerUseCase {
  private readonly logger: Logger;

  constructor(private readonly customerService: CustomerService) {
    this.logger = new Logger(CreateCustomerUseCase.name);
  }

  async execute(input: CustomerModel): Promise<CustomerModel> {
    try {
      const existentCustomer = await this.customerService.getCustomerByEmail(
        input.email,
      );

      if (existentCustomer) {
        throw new Error('Customer already exists');
      }

      return await this.customerService.save(input);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
