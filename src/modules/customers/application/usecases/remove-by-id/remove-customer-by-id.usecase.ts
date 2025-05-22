import { Injectable, Logger } from '@nestjs/common';
import { CustomerModel } from 'src/modules/customers/domain/models/customer.model';
import { CustomerService } from '../../services/customer.service';

@Injectable()
export class RemoveCustomerByIdUseCase {
  private readonly logger: Logger;

  constructor(private readonly customerService: CustomerService) {
    this.logger = new Logger(RemoveCustomerByIdUseCase.name);
  }

  async execute(customerId: number): Promise<void> {
    try {
      const customerFound =
        await this.customerService.getCustomerById(customerId);

      if (!customerFound) {
        throw new Error('Customer not found to remove');
      }

      await this.customerService.removeById(customerId);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
