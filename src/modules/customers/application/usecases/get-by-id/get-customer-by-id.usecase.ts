import { Injectable, Logger } from '@nestjs/common';
import { CustomerModel } from 'src/modules/customers/domain/models/customer.model';
import { CustomerService } from '../../services/customer.service';

@Injectable()
export class GetCustomerByIdUseCase {
  private readonly logger: Logger;

  constructor(private readonly customerService: CustomerService) {
    this.logger = new Logger(GetCustomerByIdUseCase.name);
  }

  async execute(customerId: number): Promise<CustomerModel> {
    try {
      const customer = await this.customerService.getCustomerById(customerId);

      if (!customer) {
        throw new Error('Customer not found');
      }

      return customer;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
