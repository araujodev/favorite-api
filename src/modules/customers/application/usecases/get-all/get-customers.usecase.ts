import { Injectable, Logger } from '@nestjs/common';
import { CustomerModel } from 'src/modules/customers/domain/models/customer.model';
import { CustomerService } from '../../services/customer.service';

@Injectable()
export class GetCustomersUseCase {
  private readonly logger: Logger;

  constructor(private readonly customerService: CustomerService) {
    this.logger = new Logger(GetCustomersUseCase.name);
  }

  async execute(): Promise<CustomerModel[]> {
    try {
      const customers = await this.customerService.getCustomers();

      if (customers.length === 0) {
        throw new Error('No customers found');
      }

      return customers;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
