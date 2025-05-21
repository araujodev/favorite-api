import { Injectable, Logger } from '@nestjs/common';
import { ProductModel } from '../../domain/models/product.model';
import { ProductRepository } from '../../infra/db/repositories/product.repository';

@Injectable()
export class ProductService {
  private readonly logger: Logger;

  constructor(private readonly productRepository: ProductRepository) {
    this.logger = new Logger(ProductService.name);
  }

  async getAllProducts(): Promise<ProductModel[]> {
    try {
      return await this.productRepository.getAll();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
