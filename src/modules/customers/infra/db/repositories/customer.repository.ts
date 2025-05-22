import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from 'src/modules/customers/domain/entities/customer.entity';
import { CustomerModel } from 'src/modules/customers/domain/models/customer.model';
import { CustomerMapper } from '../mappers/customer.mapper';

export class CustomerRepository {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async save(customer: CustomerModel): Promise<CustomerModel> {
    const toPersist = CustomerMapper.toPersistence(customer);
    const createdCustomer = await this.customerRepository.save(toPersist);
    return CustomerMapper.toDomain(createdCustomer);
  }

  async findByEmail(email: string): Promise<CustomerModel | null> {
    const entity = await this.customerRepository.findOneBy({ email });

    if (!entity) {
      return null;
    }

    return CustomerMapper.toDomain(entity);
  }

  async findById(customerId: number): Promise<CustomerModel | null> {
    const entity = await this.customerRepository.findOneBy({ id: customerId });

    if (!entity) {
      return null;
    }

    return CustomerMapper.toDomain(entity);
  }
}
