import { Injectable, Logger } from '@nestjs/common';
import { ProductService } from '../../services/product.service';

@Injectable()
export class GetProductsUseCase {
  private readonly logger: Logger;

  constructor(private readonly productService: ProductService) {
    this.logger = new Logger(GetProductsUseCase.name);
  }

  async execute() {
    try {
      return await this.productService.getAllProducts();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
