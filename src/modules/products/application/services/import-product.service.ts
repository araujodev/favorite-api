import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ProductsFakestoreConnector } from '../../infra/connectors/fakestore-api/products-fakestore.connector';
import { FakeStoreProductResponseDto } from '../../infra/connectors/fakestore-api/dto/fakestore-products-response.dto';
import { ProductRepository } from '../../infra/db/repositories/product.repository';
import { ProductFakeStoreMapper } from '../../infra/connectors/fakestore-api/mappers/products-fakestore.mapper';

@Injectable()
export class ImportProductService implements OnModuleInit {
  private readonly logger: Logger;

  constructor(
    private readonly productsFakestoreConnector: ProductsFakestoreConnector,
    private readonly productRepository: ProductRepository,
  ) {
    this.logger = new Logger(ImportProductService.name);
  }

  onModuleInit() {
    this.handleCron();
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  private async handleCron() {
    try {
      this.logger.log(
        `Initialize Importing products start at ${new Date().toISOString()}`,
      );
      const productsRetrieved: FakeStoreProductResponseDto[] =
        await this.productsFakestoreConnector.getAllProducts();

      if (productsRetrieved.length === 0) {
        this.logger.log(
          `Nothing to import finish at ${new Date().toISOString()}`,
        );
        return;
      }

      productsRetrieved.forEach(
        async (product: FakeStoreProductResponseDto) => {
          this.logger.log(`Try Importing: ${product.id} - ${product.title} `);

          const existingProduct = await this.productRepository.getByExternalId(
            product.id,
          );
          if (existingProduct) {
            this.logger.log(
              `Product already exists: ${product.id} - ${product.title} - Skipping`,
            );
            return;
          }

          await this.productRepository.save(
            ProductFakeStoreMapper.toDomain(product),
          );
        },
      );

      this.logger.log(
        `Importing products finish at ${new Date().toISOString()}`,
      );
    } catch (error) {
      this.logger.error(`Import products error: ${error}`);
    }
  }
}
